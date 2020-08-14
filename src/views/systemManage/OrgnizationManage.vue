<template>
  <el-container class="pageContainer">
    <el-header>
      <h3>机构管理 <el-button @click="newOrgClick">+新增机构</el-button></h3>
    </el-header>
    <el-container>
      <el-aside>
        <!-- 左边栏选择树 -->
        <el-tree
          :highlight-current="true"
          default-expand-all
          :data="treeData"
          node-key="code"
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="treeClick"
        />
      </el-aside>
      <el-main>
        <div class="title">
          <div>{{ levelName }}</div>
          <p>该机构下共有{{ orgCount }}个子机构</p>
        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="orgId" label="机构ID" />
          <el-table-column prop="orgName" label="机构名称" />
          <el-table-column prop="orgCode" label="机构号" />
          <el-table-column prop="parentId" label="父级机构ID" />
          <el-table-column prop="orgStatus" label="状态" />
          <el-table-column prop="orgDetailAddr" label="地址" />
          <el-table-column prop="orgDesc" label="描述" />
          <!-- 表格的按钮栏目 -->
          <el-table-column
            fixed="right"
            width="160"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="editOrg( scope.row)"
              >编辑</el-button>

              <!-- <el-button
                size="mini"
                type="danger"
                @click="deleteOrg(scope.row)"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          :current-page.sync="pageNum"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="rowTotal"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
        />

      </el-main>

      <!-- 新增机构弹框 -->
      <el-dialog title="新增机构" :visible.sync="newOrgVisible" width="600px">
        <el-form ref="newOrg" :model="newOrgModel" :rule="newOrgRule" label-width="96px">
          <el-form-item label="机构名称" prop="orgName">
            <el-input v-model="newOrgModel.orgName" />
          </el-form-item>
          <el-form-item label="机构号" prop="orgCode">
            <el-input v-model="newOrgModel.orgCode" />
          </el-form-item>
          <el-form-item label="所属机构" prop="parentId">
            <div>{{ selectedOrg.orgName }}</div>
          </el-form-item>
          <el-form-item label="机构地址" prop="orgDetailAddr">
            <el-input v-model="newOrgModel.orgDetailAddr" />
          </el-form-item>
          <el-form-item label="机构描述" prop="orgDesc">
            <el-input v-model="newOrgModel.orgDesc" type="textarea" />
          </el-form-item>
          <el-form-item label="状态" prop="orgStatus">
            <el-select v-model="newOrgModel.orgStatus">
              <el-option label="开通" value="OPEN" />
              <el-option label="关闭" value="CLOSE" />
            </el-select>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelNewOrg">取消</el-button>
          <el-button type="primary" @click="affirmNewOrg">新增</el-button>
        </template>
      </el-dialog>

      <!-- 机构编辑弹框 -->
      <el-dialog title="机构编辑" :visible.sync="editOrgVisible" width="600px">
        <el-form ref="editOrg" :model="editOrgModel" :rule="editOrgRule" label-width="96px">
          <el-form-item label="机构ID" prop="orgId">
            <el-input v-model="editOrgModel.orgId" disabled />
          </el-form-item>

          <el-form-item label="所属机构" prop="parentId">
            <el-cascader
              v-model="editOrgModel.parentId"
              :options="tree2lv"
              clearable
              :props="{ label:'orgName', children:'children', value:'orgId',checkStrictly: true}"
              @change="changeParentId"
            />
          </el-form-item>
          <el-form-item label="机构名称" prop="orgName">
            <el-input v-model="editOrgModel.orgName" />
          </el-form-item>
          <el-form-item label="状态" prop="orgStatus">
            <el-select v-model="editOrgModel.orgStatus">
              <el-option label="开通" value="OPEN" />
              <el-option label="关闭" value="CLOSE" />
            </el-select>
          </el-form-item>
          <el-form-item label="机构地址" prop="orgDetailAddr">
            <el-input v-model="editOrgModel.orgDetailAddr" />
          </el-form-item>
          <el-form-item label="机构描述" prop="orgDesc">
            <el-input v-model="editOrgModel.orgDesc" type="textarea" />
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelEdit">取消返回</el-button>
          <el-button type="primary" @click="affirmEdit">确认修改</el-button>
        </template>
      </el-dialog>

      <!-- 删除对话框 -->
      <el-dialog :visible.sync="deleteOrgVisible" title="删除机构" width="500px">
        <el-row>
          <el-col :span="6">机构ID</el-col>
          <el-col :span="16">{{ deleteOrgModel.orgId }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">机构名称</el-col>
          <el-col :span="16">{{ deleteOrgModel.orgName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">机构层级</el-col>
          <el-col :span="16">{{ deleteOrgModel.level }}</el-col>
        </el-row>
        <template slot="footer">
          <el-button>取消返回</el-button>
          <el-button type="danger" @click="affirmDelete">确认删除</el-button>
        </template>
      </el-dialog>

    </el-container>
  </el-container>

</template>

<script>
import systemManageService from '@api/systemManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import transTree2lv from '@tool/transTree2lv.js'
import { findGrandId } from '@tool/transTree2lv.js'

export default {
  data() {
    return {
      selectedOrg: '',
      // 选择树数据
      treeData: [],
      // 1，2级树
      tree2lv: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },

      // 表格数据
      tableData: [
      ],
      levelName: '',
      orgCount: 0,

      // 新增机构
      newOrgVisible: false,
      newOrgModel: {
        orgName: '',
        orgCode: '',
        parentId: '',
        orgDetailAddr: '',
        orgStatus: '',
        orgDesc: ''
      },
      newOrgRule: {},

      editOrgModel: {
        orgID: '',

        orgStatus: '',
        orgName: '',
        orgDetailAddr: '',
        orgDesc: '',
        parentId: ''
      },
      editOrgRule: {},
      editOrgVisible: false,

      deleteOrgVisible: false,
      deleteOrgModel: {},

      // 页码相关
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10

    }
  },

  created() {
    this.getTreedata()
  },
  methods: {
    // 点击选择树节点 查询机构列表
    treeClick(node) {
      console.log('node节点', node)
      this.selectedOrg = node
      if (this.selectedOrg.level >= 3) { this.resetTableData(); return }
      this.getTableData()
      this.pageNum = 1
    },
    // 获取列表
    getTableData() {
      const data = {
        orgId: this.selectedOrg.orgId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      systemManageService.queryChildList(data).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.tableData = res.data.listRows.map(item => {
              if (item.orgStatus === 'OPEN') { item.orgStatus = '开通' } else if (item.orgStatus === 'CLOSE') { item.orgStatus = '关闭' }
              return item
            })
            this.levelName = res.data.orgNameStr
            this.orgCount = res.data.rowTotal
            this.rowTotal = res.data.rowTotal
          } else {
            this.$notify.error({ message: '查询机构列表失败' })
          }
        }
      ).catch(error => {
        this.$notify.error({ message: '查询时发生错误' })
        console.error(error)
      })
    },
    resetTableData() {
      this.levelName = ''
      this.orgCount = 0
      this.rowTotal = 0
      this.tableData = []
    },
    // 改变一页显示数目
    handlePageSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },
    // 改变页码
    handlePageChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },

    // 点击新增机构
    newOrgClick() {
      if (!this.selectedOrg) {
        this.$message.warning({ title: '非法操作', message: '请先选择父级机构' })
        return
      } else if (
        this.selectedOrg.level >= 3) {
        this.$message.warning({ message: '该层级机构不可再新增下属机构' })
        return
      }
      this.newOrgVisible = true
    },

    cancelNewOrg() {
      this.newOrgVisible = false
      this.$refs.newOrg.resetFields()
    },
    // 确认新增机构
    affirmNewOrg() {
      this.$refs.newOrg.validate(res => {
        if (res) {
          const data = {
            orgName: this.newOrgModel.orgName,
            orgCode: this.newOrgModel.orgNCode,
            parentId: this.selectedOrg.orgId,
            orgDetailAddr: this.newOrgModel.orgDetailAddr,
            orgDesc: this.newOrgModel.orgDesc,
            orgStatus: this.newOrgModel.orgStatus,
            level: this.selectedOrg.level + 1
          }
          systemManageService.insertOrg(data).then(
            res => {
              if (res.resultCode === AjaxReturnType.SUCCESS) {
                this.$notify({
                  type: 'success',
                  titlte: '成功',
                  message: '新增机构成功'
                })
                this.$refs.newOrg.resetFields()
                this.getTableData()
                this.getTreedata()
              } else {
                this.$notify({ title: '错误', message: '新增机构失败' })
                console.log('resultCode', res.resultCode)
              }
              this.newOrgVisible = false
            }
          ).catch(err => {
            console.log(err)
            this.$notify.error({ title: '错误', message: '新增机构时发生错误' })
          })
        }
      })
    },
    // 取消编辑
    cancelEdit() {
      this.$refs.editOrg.resetFields()
      this.editOrgVisible = false
    },

    // 编辑机构
    editOrg(row) {
      // 获取表格该行的数据
      Object.assign(this.editOrgModel, row)

      if (row.level === 3) {
        this.editOrgModel.parentId = [findGrandId(this.tree2lv, row.parentId), row.parentId]
      }
      console.log('edimodpid', this.editOrgModel.parentId)
      this.editOrgVisible = true
    },
    // 确认编辑
    async affirmEdit() {
      const flag = await this.$refs.editOrg.validate()
      if (!flag) {
        return
      }

      const data = {
        orgId: this.editOrgModel.orgId,
        orgName: this.editOrgModel.orgName,
        orgStatus: this.editOrgModel.orgStatus,
        parentId: this.editOrgModel.parentId[this.editOrgModel.parentId.length - 1],
        orgDetailAddr: this.editOrgModel.orgDetailAddr,
        orgDesc: this.editOrgModel.orgDesc
      }
      try {
        const res = await systemManageService.updateOrg(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '修该机构信息成功' })
          this.$refs.editOrg.resetFields
          this.getTableData()
          this.getTreedata()
        } else {
          this.$notify.error({ message: '修该机构信息失败' })
          console.log('code:', res.resultCode)
        }
        this.editOrgVisible = false
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: '修该机构信息发生错误' })
      }
    },

    // 编辑机构父机构 测试用
    changeParentId() {
      console.log('pid', this.editOrgModel.parentId)
    },
    // 点击删除机构按钮
    deleteOrg(row) {
      Object.assign(this.deleteOrgModel, row)
      this.deleteOrgVisible = true
    },
    // 确认删除
    async affirmDelete() {
      try {
        const res = await systemManageService.deleteOrg({ orgId: this.deleteOrgModel.orgId })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '机构删除成功' })
          this.getTableData()
          this.getTreedata()
        } else {
          this.$message.error({ message: '机构删除失败' })
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '机构删除失败' })
      } finally {
        this.deleteOrgVisible = false
      }
    },
    // 获取机构树
    async getTreedata() {
      try {
        const res = await systemManageService.queryOrgTree()
        this.treeData = [{ orgId: '0', level: 0, orgName: '总行', children: res.data }]
        this.tree2lv = transTree2lv(res.data)
        console.log('tree2lv', this.tree2lv)
      } catch (e) {
        console.log(e)
        this.$notify.error({
          titile: '错误', message: '获取机构树时发生错误'
        })
      }
    }

  }

}
</script>

<style lang="scss" scoped>

.pageContainer {
    margin:40px 20px 0 20px;
    background-color: #fff;
}

header{
    margin-top:15px;
    h3{
        button{
            margin-left: 2em;
        }
    }
}
.el-aside{
    margin-left: 15px;
    padding-top:15px;
    border:#DCDFE6 solid 1px;
        border-radius: 5px;
}
.title {
    color:#606266;
    p{
        margin: 10px 0;
    }
}

.el-dialog{

    .el-input{
        width: 400px;
    }
    /deep/ .el-input{
        width: 400px;
    }
    .el-select{
        width: 400px;
    }
    .el-cascader{
        width: 400px;
    }
    .el-textarea{
        width: 400px;
    }

    .el-col{
        margin:5px;
    }
}
/deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    color:#1494df;
    // background-color: #dfded0
    font-weight: bold
}

</style>

