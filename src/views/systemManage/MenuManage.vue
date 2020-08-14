<template>
  <el-container class="pageContainer">
    <el-header>
      <h3>菜单管理 <el-button @click="newPermClick">+新增权限</el-button></h3>
    </el-header>
    <el-container>
      <el-aside>
        <!-- 左边栏选择树 -->
        <el-tree
          :highlight-current="true"
          default-expand-all
          :data="treeData"
          node-key="permissionId"
          :props="{ children: 'children', label: 'permName'}"
          :expand-on-click-node="false"
          @node-click="treeClick"
        />
      </el-aside>
      <el-main>
        <div class="title">
          <div>{{ node.permName }}</div>

        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="permissionId" label="权限ID" />
          <el-table-column prop="permName" label="权限名称" />
          <el-table-column prop="permCode" label="权限代码" />
          <el-table-column prop="parentId" label="父权限ID" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="permType" label="权限类型" />

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
                @click="editPerm( scope.row)"
              >编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="deletePerm(scope.row)"
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

      <!-- 新增权限弹框 -->
      <el-dialog title="新增权限" :visible.sync="newPermVisible" width="600px">
        <el-form ref="newPerm" :model="newPermModel" :rule="newPermRule" label-width="96px">
          <el-form-item label="权限名称" prop="permName">
            <el-input v-model="newPermModel.permName" />
          </el-form-item>
          <el-form-item label="父权限" prop="parentNode">
            <div>{{ node.permName }}</div>
          </el-form-item>
          <el-form-item label="权限代码" prop="permCode">
            <el-input v-model="newPermModel.permCode" />
          </el-form-item>
          <el-form-item label="权限类型" prop="perType">
            <el-select v-model="newPermModel.perType">
              <el-option label="菜单" value="MENU" />
              <el-option label="按钮" value="BUTTON" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="newPermModel.status">
              <el-option label="开通" value="ON" />
              <el-option label="关闭" value="OFF" />
            </el-select>
          </el-form-item> -->
        </el-form>
        <template slot="footer">
          <el-button @click="cancelnewPerm">取消</el-button>
          <el-button type="primary" @click="affirmNewPerm">新增</el-button>
        </template>
      </el-dialog>

      <!-- 权限编辑弹框 -->
      <el-dialog title="权限编辑" :visible.sync="editPermVisible" width="600px">
        <el-form ref="editPerm" :model="editPermModel" :rule="editPermRule" label-width="96px">
          <el-form-item label="权限ID" prop="permissionId">
            <el-input v-model="editPermModel.permissionId" />
          </el-form-item>

          <el-form-item label="父权限" prop="parentId">
            <el-input
              v-model="editPermModel.parentId"
              disabled
            />
          </el-form-item>
          <el-form-item label="权限名称" prop="permName">
            <el-input v-model="editPermModel.permName" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="editPermModel.status">
              <el-option label="开通" value="ON" />
              <el-option label="关闭" value="OFF" />
            </el-select>
          </el-form-item>

        </el-form>
        <template slot="footer">
          <el-button @click="cancelEdit">取消返回</el-button>
          <el-button type="primary" @click="affirmEdit">确认修改</el-button>
        </template>
      </el-dialog>

      <!-- 删除对话框 -->
      <el-dialog :visible.sync="deletePermVisible" title="确认要删除该权限吗？" width="500px">

        <div class="delete">
          <span>权限ID:</span>
          <span>{{ deletePermModel.permissionId }}</span>
        </div>
        <div class="delete">
          <span>权限名称:</span>
          <span>{{ deletePermModel.permName }}</span>
        </div>

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

export default {
  data() {
    return {
      node: { permissionId: '0', parentId: '0', permName: '根节点' },
      // 选择树数据
      treeData: [],
      // 1，2级树

      // 表格数据
      tableData: [
      ],
      levelName: '',
      permCount: 0,

      // 新增权限
      newPermVisible: false,
      newPermModel: {
        permName: '',
        permCode: '',
        parentId: '',
        permType: ''

      },
      newPermRule: {},

      editPermModel: {
        permissionId: '',
        parentId: '',
        permName: '',
        status: ''

      },
      editPermRule: {},
      editPermVisible: false,

      deletePermVisible: false,
      deletePermModel: {},

      // 页码相关
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10,
      rootNode: { permissionId: '0', parentId: '0', permName: '根权限' }

    }
  },

  created() {
    this.getTreedata()
  },
  methods: {
    // 点击选择树节点 查询权限列表
    treeClick(node) {
      console.log('node节点', node)
      this.node = node
      this.getTableData()
      this.pageNum = 1
    },
    // 获取列表
    getTableData() {
      const data = {
        permissionId: this.node.permissionId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      systemManageService.queryChildPermsList(data).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.tableData = res.data.listRows.map(item => {
              if (item.status === 'ON') { item.status = '开通' } else if (item.status === 'OFF') { item.status = '关闭' }
              return item
            })
            this.rowTotal = res.data.rowTotal
          } else {
            this.$notify.error({ message: '查询权限列表失败' })
          }
        }
      ).catch(error => {
        this.$notify.error({ message: '查询时发生错误' })
        console.error(error)
      })
    },
    resetTableData() {
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

    // 点击新增权限
    newPermClick() {
      this.newPermVisible = true
    },

    cancelnewPerm() {
      this.newPermVisible = false
      this.$refs.newPerm.resetFields()
    },
    // 确认新增权限
    affirmNewPerm() {
      this.$refs.newPerm.validate(res => {
        if (res) {
          const data = {
            permName: this.newPermModel.permName,
            parentId: this.node.permissionId,
		        permCode: this.newPermModel.permCode, // 权限代码
		        permType: this.newPermModel.permType // 权限类型
          }
          systemManageService.addPerm(data).then(
            res => {
              if (res.resultCode === AjaxReturnType.SUCCESS) {
                this.$notify({
                  type: 'success',
                  titlte: '成功',
                  message: '新增权限成功'
                })
                this.$refs.newPerm.resetFields()
                this.getTableData()
                this.getTreedata()
              } else {
                this.$notify({ title: '错误', message: '新增权限失败' })
                console.log('resultCode', res.resultCode)
              }
              this.newPermVisible = false
            }
          ).catch(err => {
            console.log(err)
            this.$notify.error({ title: '错误', message: '新增权限时发生错误' })
          })
        }
      })
    },

    // 编辑权限
    editPerm(row) {
      // 获取表格该行的数据
      Object.assign(this.editPermModel, row)
      this.editPermVisible = true
    },
    // 取消编辑
    cancelEdit() {
      this.$refs.editPerm.resetFields()
      this.editPermVisible = false
    },

    // 确认编辑
    async affirmEdit() {
      const flag = await this.$refs.editPerm.validate()
      if (!flag) {
        return
      }

      const data = {

        permName: this.editPermModel.permName,
        status: this.editPermModel.status,
        parentId: this.editPermModel.parentId,
        permissionId: this.editPermModel.permissionId

      }
      try {
        const res = await systemManageService.updatePerm(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '修该权限信息成功' })
          this.$refs.editPerm.resetFields
          this.getTableData()
          this.getTreedata()
        } else {
          this.$notify.error({ message: '修该权限信息失败' })
          console.log('code:', res.resultCode)
        }
        this.editPermVisible = false
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: '修该权限信息发生错误' })
      }
    },

    // 点击删除权限按钮
    deletePerm(row) {
      Object.assign(this.deletePermModel, row)
      this.deletePermVisible = true
    },
    // 取消删除
    cancelDelete() {
      this.deletePermVisible = false
    },
    // 确认删除
    async affirmDelete() {
      try {
        const res = await systemManageService.deletePerm({ permissionId: this.deletePermModel.permissionId })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '权限删除成功' })
          this.getTableData()
          this.getTreedata()
        } else {
          this.$message.error({ message: '权限删除失败' })
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '权限删除失败' })
      } finally {
        this.deletePermVisible = false
      }
    },
    // 获取权限树
    async getTreedata() {
      try {
        const res = await systemManageService.queryMenuTree()
        this.treeData = res.data
      } catch (e) {
        console.log(e)
        this.$notify.error({
          titile: '错误', message: '获取权限树时发生错误'
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

        margin: 10px 0;

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

}
/deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    color:#1494df;
    // background-color: #dfded0
    font-weight: bold
}
.delete{
  text-align: center;
  font-size: 18px;
  margin:8px auto;
  span{margin-right: 10px}
}
</style>

