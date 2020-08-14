<template>
  <el-container class="pageContainer">
    <el-header>
      <h3>地区管理 <el-button @click="newAreaVisible=true">+新增地区</el-button></h3>
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
          <p>该层级下共有{{ areaCount }}个子地区</p>
        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="districtId" label="地区编号" />
          <el-table-column prop="districtName" label="地区名称" />
          <el-table-column prop="status" label="地区状态" />
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
                @click="editArea(scope.$index, scope.row)"
              >编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="deleteArea(scope.$index, scope.row)"
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

      <!-- 新增地区弹框 -->
      <el-dialog title="新增地区" :visible.sync="newAreaVisible" width="500px">
        <el-form ref="newArea" :model="newAreaForm" :rule="newAreaRule" label-width="96px">
          <el-form-item label="地区名称" prop="districtName">
            <el-input v-model="newAreaForm.districtName" placeholder="请输入新增地区的名称" />
          </el-form-item>
          <el-form-item label="所属地区">
            <el-cascader v-model="newAreaForm.location" :options="options" :props="{label:'name',value:'id'}" />
          </el-form-item>
          <el-form-item label="地区状态" prop="status">
            <el-select v-model="newAreaForm.status">
              <el-option value="Y" label="开通" />
              <el-option value="N" label="关闭" />
            </el-select>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelNewArea">取消返回</el-button>
          <el-button type="primary" @click="affirmNewArea">确定新增</el-button>
        </template>
      </el-dialog>

      <!-- 地区编辑对话框 -->
      <el-dialog title="地区编辑" :visible.sync="editAreaVisible" width="500px">
        <el-form ref="editArea" :model="editAreaForm" :rule="editAreaRule">
          <el-form-item label="地区编号">
            <div>{{ editAreaForm.districtId }}</div>
          </el-form-item>
          <el-form-item label="地区名称">
            <el-input v-model="editAreaForm.districtName" />
          </el-form-item>
          <el-form-item label="所属地区">
            <el-cascader v-model="editAreaForm.location" :options="options" :props="{label:'name',value:'id'}" />
          </el-form-item>
          <el-form-item label="地区状态">
            <el-select v-model="editAreaForm.status">
              <el-option value="Y" label="开通" />
              <el-option value="N" label="关闭" />
            </el-select>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelEditArea">取消返回</el-button>
          <el-button type="primary" @click="affirmEditArea">确认修改</el-button>
        </template>
      </el-dialog>

      <!-- 删除按钮对话框 -->
      <el-dialog :visible.sync="deleteAreaVisible" title="删除地区" width="500px">
        <el-row>
          <el-col :span="6">地区名称</el-col>
          <el-col :span="16"> {{ deleteAreaForm.districtName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">地区编号</el-col>
          <el-col :span="16">{{ deleteAreaForm.districtId }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">所属地区</el-col>
          <el-col :span="16">{{ deleteAreaForm.areaId }}</el-col>

        </el-row>
        <el-row>
          <el-col :span="6">地区状态</el-col>
          <el-col :span="16">{{ deleteAreaForm.status }}</el-col>
        </el-row>
        <template slot="footer">
          <el-button @click="cancelDelete">取消返回</el-button>
          <el-button type="danger" @click="affirmDelete">确认删除</el-button>
        </template>
      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import systemManageService from '@api/systemManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
export default {
  data() {
    return {
      // 选择树数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedNode: '',

      // 表格数据
      tableData: [

      ],
      levelName: '',
      areaCount: '',
      // 新增
      newAreaVisible: false,
      options: [],
      newAreaForm: {
        newArea: '',
        areaStatus: ''
      },
      newAreaRule: {},

      editAreaVisible: false,
      editAreaForm: {

      },
      editAreaRule: {},

      // delete the bizArea in a row
      deleteAreaVisible: false,
      deleteAreaForm: {

      },
      // 页码
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10

    }
  },
  //   computed: {
  //     ...mapGetters({ treeData: ['systerm/areaTree'] }),
  //     ...mapGetters({ options: ['systerm/areaTree'] })

  //   },
  async created() {
    this.getRegions()
  },
  methods: {
    // 获取地区树
    async getRegions() {
      try {
        const res = await systemManageService.getRegions()
        if (res.resultCode === '000000') {
          this.treeData = res.data
          this.options = res.data
        }
      } catch (e) {
        console.log(e)
        this.$message.error({
          titile: '错误', message: '获取地址列表时发生错误'
        })
      }
    },
    // 查询列表数据
    async getTableData() {
      if (this.selectedNode.level !== 3) { console.log('selected', this.selectedNode); return }
      let data = {
        areaId: this.selectedNode.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      try {
        let res = await systemManageService.queryBizAreaList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.tableData = res.data.listRows
          this.rowTotal = res.data.rowTotal
        } else {
          throw new Error('查询地区列表失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '查询地区列表失败' })
      }
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
    cancelNewArea() {
      this.$refs.newArea.resetFields()
      this.newAreaVisible = false
    },
    async affirmNewArea() {
      try {
        await this.$refs.newArea.validate()
      } catch (err) { this.$message.error({ message: '表单验证失败' }); return }

      try {
        let data = {
          'districtName': this.newAreaForm.districtName,
          'areaId': this.newAreaForm.location[2],
          'status': this.newAreaForm.status
        }
        let res = await systemManageService.BizAreaInsert(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '新增地区成功' })
        } else {
          throw new Error('新增地区失败')
        }
      } catch (err) { console.error(err); this.$message.error({ message: '新增地区失败' }) } finally {
        this.$refs.newArea.resetFields()
        this.newAreaVisible = false
      }
    },
    // 编辑地区
    editArea(index, row) {
      this.editAreaVisible = true
      Object.assign(this.editAreaForm, row)
    },
    cancelEditArea() {
      this.$refs.editArea.resetFields()
      this.editAreaVisible = false
    },
    // 确认编辑地区
    async affirmEditArea() {
      try {
        await this.$refs.editArea.validate()
      } catch (err) { this.$message.error({ message: '表单验证失败' }); return }
      try {
        let data = {
          'districtId': this.editAreaForm.districtId,
          'districtName': this.editAreaForm.districtName,
          'areaId': this.editAreaForm.location[2],
          'status': this.editAreaForm.status
        }
        let res = await systemManageService.updateBizArea(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '编辑地区成功' })
        } else {
          throw new Error('编辑地区失败')
        }
      } catch (err) { console.error(err); this.$message.error({ message: '编辑地区失败' }) } finally {
        this.$refs.editArea.resetFields()
        this.editAreaVisible = false
      }
    },
    // 点击删除按钮
    deleteArea(index, row) {
      this.deleteAreaVisible = true
      Object.assign(this.deleteAreaForm, row)
    },

    cancelDelete() {
      this.deleteAreaVisible = false
    },
    // 确认删除
    async affirmDelete() {
      try {
        let res = await systemManageService.deleteBizArea({ 'districtId': this.deleteAreaForm.districtId })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '地区删除成功' })
        } else { throw new Error('删除地区失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '删除地区失败' })
      } finally {
        this.deleteAreaVisible = false
      }
    },
    // 点击节点
    treeClick(node) {
      if (node.level !== 3) { return }
      this.pageNum = 1
      this.selectedNode = node
      this.getTableData()
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
    padding-left: 15px;
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

</style>

