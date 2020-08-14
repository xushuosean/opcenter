<template>
  <el-container class="pageContainer">
    <el-header>
      <h3>站点管理 <el-button @click="newSiteVisible=true">+新增站点</el-button></h3>
    </el-header>
    <el-container>
      <el-aside>
        <!-- 左边栏选择树 -->
        <el-tree
          :highlight-current="true"
          :data="treeData"
          node-key="code"
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="treeClick"
        />
      </el-aside>
      <el-main>
        <div class="title">
          <div><span>{{ levelName }}</span></div>
          <p>该省层级下共有{{ siteCount }}个站点</p>
        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="cityCode" label="站点编号" />
          <el-table-column prop="cityName" label="站点名称" />
          <el-table-column prop="siteStatus" label="站点状态" />
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
                @click="editSite(scope.$index, scope.row)"
              >编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="deleteSite(scope.row)"
              >删除</el-button>
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

      <!-- 新增站点弹框 -->
      <el-dialog title="新增站点" :visible.sync="newSiteVisible" width="500px">
        <el-form ref="newSite" :model="newSiteForm" :rules="newSiteRule" label-width="96px">
          <el-form-item label="新增站点" prop="newSiteLoc">
            <el-cascader v-model="newSiteForm.newSiteLoc" :options="options" :props="{value:'id',label:'name'}" @change="handleChange" />
          </el-form-item>
          <el-form-item label="站点状态" prop="siteStatus">
            <el-select v-model="newSiteForm.siteStatus">
              <el-option value="OPEN" label="开通" />
              <el-option value="CLOSE" label="关闭" />
            </el-select>
          </el-form-item>
        </el-form>

        <template slot="footer">
          <el-button @click="cancelNewSite">取消返回</el-button>
          <el-button type="primary" @click="affirmNewSite">确定新增</el-button>
        </template>
      </el-dialog>

      <!-- 站点编辑对话框 -->
      <el-dialog title="站点编辑" :visible.sync="editSiteVisible" width="500px">
        <el-form ref="editSiteForm" :model="editSiteForm" :rule="editSiteRule">
          <el-form-item label="城市站点">
            <div>{{ editSiteForm.fullAddrName }}</div>
          </el-form-item>
          <el-form-item label="站点编号">
            <div>{{ editSiteForm.cityCode }}</div>
          </el-form-item>
          <el-form-item label="站点状态" prop="siteStatus">
            <el-select v-model="editSiteForm.siteStatus">
              <el-option value="OPEN" label="开通" />
              <el-option value="CLOSE" label="关闭" />
            </el-select>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelEdit">取消返回</el-button>
          <el-button type="primary" @click="submitEdit">确认修改</el-button>
        </template>
      </el-dialog>

      <!-- 删除按钮对话框 -->
      <el-dialog :visible.sync="deleteSiteVisible" title="删除站点" width="500px">
        <el-form label-width="118px" label-position="left">
          <el-form-item label="站点名称">
            <div>{{ deleteSiteData.fullAddrName }}</div>
          </el-form-item>
          <el-form-item label="站点编号">
            <div>{{ deleteSiteData.cityCode }}</div>
          </el-form-item>
          <el-form-item label="站点状态">
            <div>{{ deleteSiteData.siteStatus }}</div>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelDelete">取消返回</el-button>
          <el-button type="danger" @click="submitDelete">确认删除</el-button>
        </template>
      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
import systemManageService from '@api/systemManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import transTree2lv from '@tool/transTree2lv.js'
export default {
  data() {
    return {
      // 选择树数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中节点
      node: {},

      // 表格数据
      tableData: [
      ],
      levelName: '',

      newSiteVisible: false,
      options: [],
      // 新增站点
      newSiteForm: {
        newSiteLoc: '',
        siteStatus: ''
      },
      newSiteRule: {
        newSiteLoc: [
          { required: true, message: '请选择地区', trigger: 'blur' }
        ],
        siteStatus: [
          { required: true, message: '请选择站点状态', trigger: 'blur' }
        ]
      },

      editSiteVisible: false,
      editSiteForm: {
        fullAddrName: '',
        siteStatus: '',
        siteCode: '',
        site: ''

      },
      editSiteRule: {
        siteStatus: [
          { required: true, message: '请选择站点状态', trigger: 'blur' }
        ]
      },
      // 删除站点对话框显示
      deleteSiteVisible: false,

      siteCount: ' ',
      deleteSiteData: {
        fullAddrName: '',
        cityCode: '',
        siteStatus: ''
      },
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10

    }
  },
  created() {
    this.getRegions()
  },
  methods: {
    // handleChange(value) {
    //   console.log('选中的值', value)
    // },

    cancelNewSite() {
      this.$refs.newSite.resetFields()
      this.newSiteVisible = false
    },
    affirmNewSite() {
      this.$refs.newSite.validate(res => {
        if (res) {
          var data = {

            cityId: this.newSiteForm.newSiteLoc[1],
            siteStatus: this.newSiteForm.siteStatus
          }
          systemManageService.insertSite(data).then(res => {
            if (res.resultCode === AjaxReturnType.SUCCESS) {
              this.$message({
                type: 'success',
                message: '新增站点成功'
              })
              this.$refs.newSite.resetFields()
              this.getTableData()
            } else { this.$message.error({ message: '新增站点失败' }) }
            this.newSiteVisible = false
          }).catch(error => {
            console.log(error)
            this.$message.error({ message: '新增站点时发生错误' })
          })
        }
      })
    },
    editSite(index, row) {
      this.editSiteVisible = true
      systemManageService.querySite({ cityId: row.cityId }).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.editSiteForm = res.data
            this.editSiteForm.siteStatus = this.editSiteForm.siteStatus
          }
        }
      ).catch(error => {
        console.log(error)
        this.$message.error({ title: '错误', message: '查询站点信息时发生错误' })
      })
    },
    // 编辑站点

    // 取消修改
    cancelEdit() {
      this.$refs.editSiteForm.resetFields()
      this.editSiteVisible = false
    },
    // 确认修改
    submitEdit() {
      this.$refs.editSiteForm.validate(
        res => {
          if (res) {
            const data = {
              cityId: this.editSiteForm.cityId,
              siteStatus: this.editSiteForm.siteStatus
            }

            systemManageService.updateSite(data).then(res => {
              if (res.resultCode === AjaxReturnType.SUCCESS) {
                this.$message({ type: 'success', title: '成功', message: '站点修改成功' })
                this.getTableData()
              } else {
                this.$message({ type: 'error', title: '错误', message: '站点修改失败' })
              }
            }).catch(error => {
              console.log(error)
              this.$message.error({ title: '错误', message: '修改站点信息时发生错误' })
            })
            this.editSiteVisible = false
          }
        }
      )
    },
    // 删除站点按钮
    deleteSite(row) {
      this.deleteSiteVisible = true
      systemManageService.querySite({ cityId: row.cityId }).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.deleteSiteData = res.data
            if (this.deleteSiteData.siteStatus === 'OPEN') {
              this.deleteSiteData.siteStatus = '开通'
            } else if (this.deleteSiteData.siteStatus === 'CLOSE') {
              this.deleteSiteData.siteStatus = '关闭'
            }
          } else {
            this.$message.error({ title: '错误', message: '获取站点信息失败' })
          }
        }
      ).catch(error => {
        console.log(error)
        this.$message.error({ title: '错误', message: '获取站点信息时发生错误' })
      })
    },

    // 确认删除
    submitDelete() {
      systemManageService.deleteSite({ cityId: this.deleteSiteData.cityId }).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.$message.success({ title: '成功', message: '删除站点成功' })
            this.getTableData()
          } else {
            this.$message.error({ title: '错误', message: '删除站点失败' })
          }
        }
      ).catch(error => {
        console.log(error)
        this.$message.error({ title: '错误', message: '删除站点时发生错误' })
      })
      this.deleteSiteVisible = false
    },
    // 取消删除返回
    cancelDelete() {
      this.deleteSiteVisible = false
    },
    // 查询列表数据
    getTableData() {
      const data = {
        provinceId: this.node.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize

      }
      systemManageService.querySiteList(data).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.tableData = res.data.listRows.map(item => {
              if (item.siteStatus === 'OPEN') { item.siteStatus = '开通' } else if (item.siteStatus === 'CLOSE') { item.siteStatus = '关闭' }
              return item
            })

            this.siteCount = res.data.rowTotal
            this.rowTotal = res.data.rowTotal
            this.levelName = res.data.levelName
          } else {
            throw new Error('查询站点时发生错误')
          }
        }
      ).catch(error => {
        this.$message.error({ title: '错误', message: '查询站点时发生错误' })
        console.error(error)
      })
    },
    // 点击查询地区站点列表
    treeClick(node) {
      console.log(node)
      if (node.level !== 1) { this.tableData = []; this.rowTotal = 0; return }
      this.pageNum = 1
      this.node = node
      this.getTableData()
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },

    handlePageChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },

    async getRegions() {
      try {
        const res = await systemManageService.getRegions()

        this.treeData = res.data

        this.options = transTree2lv(res.data)
      } catch (e) {
        console.log(e)
        this.$message.error({
          titile: '错误', message: '获取地址列表时发生错误'
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
        width: 300px;
    }
    /deep/ .el-input{
        width: 300px;
    }
    .el-select{
        width: 300px;
    }
    .el-cascader{
        width: 300px;
    }
    .el-textarea{
        width: 300px;
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

.page{
    display: flex;
    justify-content: center;
    margin-top:10px;
}
</style>

