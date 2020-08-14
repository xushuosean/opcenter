<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>角色管理 <el-button @click="newRoleVisible=true">+新增角色</el-button> <el-button @click="exportTable">导出表格</el-button></h3>

      </div>
      <el-table :data="tableData" border style="width:100%">

        <el-table-column
          prop="roleName"
          label="角色名称"
        />
        <el-table-column
          prop="roleDesc"
          label="角色描述"
        />

        <el-table-column
          fixed="right"
          width="300"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="modifyInfo(scope.row)"
            >修改信息
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="rolePermissions(scope.row)"
            >角色权限
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRole( scope.row)"
            >删除角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="rowTotal"
        @size-change="handlePageSizeChange"
        @current-change="handlePageChange"
      />
    </el-main>
    <!-- 新增角色对话框 -->
    <el-dialog :visible.sync="newRoleVisible" title="新增角色">
      <el-form ref="newRoleForm" label-width="96px" :model="newRoleModel" :rules="newRoleRule">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newRoleModel.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="newRoleModel.roleDesc" type="textarea" :rows="3" placeholder="请输入角色描述" />
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            ref="perTree"
            show-checkbox
            node-key="permissionId"
            :data="permissionTree"
            :props="{'children':'children', label:'perName',value:'permissionId', }"
          />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="closeNewRoleDialog">取消返回</el-button>
        <el-button type="primary" @click="affirmNewPer">确认新增</el-button>
      </template>
    </el-dialog>

    <!-- 修改角色信息对话框 -->
    <el-dialog :visible.sync="modifyVisible" title="修改信息">
      <el-form ref="modifyRole" label-width="96px" :model="modifyModel" :rules="modifyRule">
        <el-form-item label="角色名称" prop="roleName">
          <el-input :value="modifyModel.roleName" disabled />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="modifyModel.roleDesc" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="cancelModify">取消返回</el-button>
        <el-button type="primary" @click="affirmModify">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 删除角色对话框 -->
    <el-dialog :visible.sync="deleteVisible" title="确定删除该角色吗？" width="500px">
      <div class="deleteBody">
        <span>角色名称：</span> <span>{{ deleteModel.roleName }}</span>
      </div>
      <template slot="footer">
        <el-button @click="cancelDelete">取消返回</el-button>
        <el-button type="primary" @click="affirmDelete">确认删除</el-button>
      </template>
    </el-dialog>
    <!-- 设置角色权限 -->
    <el-dialog :visible.sync="permissionsVisible" title="角色权限设置" width="500px" @close="closeRolePerm">

      <el-tree
        ref="rolePerTree"
        show-checkbox
        node-key="permissionId"
        :data="permissionTree"
        :props="{'children':'children', label:'perName',value:'permissionId', }"
      />

      <template slot="footer">
        <el-button @click="closeRolePerm">取消</el-button>
        <el-button type="primary" @click="affirmRolePerm">确认</el-button>
      </template>
    </el-dialog>
  </el-container>

</template>

<script>
import systemManageService from '@api/systemManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import transTreeToList from '@tool/transTreeToList.js'
export default {

  data() {
    return {
      // 所有权限树
      permissionTree: [],
      props: '',
      options: '',
      // 表格
      tableData: [
      ],
      // 新增角色
      newRoleVisible: false,
      newRoleModel: {
        roleName: '',
        roleDesc: ''
      },
      newRoleRule: {
        roleName: { required: true, trigger: 'blur', message: '请输入角色名称' },
        roleDesc: {}
      },
      newRolePerList: '',

      // 修改角色
      modifyVisible: false,
      modifyModel: {
        roleName: '',
        roleDesc: ''
      },
      modifyRule: [],
      // 删除角色
      deleteVisible: false,
      deleteModel: {},
      // 页码
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10,

      // 设置角色权限
      permissionsVisible: false,
      rolePermList: '',
      row: ''

    }
  },
  created() {
    this.getTableData()
    this.queryPermissionTree()
  },
  methods: {
    // 获取权限母树
    async queryPermissionTree() {
      try {
        const res = await systemManageService.queryPermissionTree()
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.permissionTree = res.data
        } else {
          throw new Error('查询权限树失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '查询权限树失败' })
      }
    },
    // 关闭新增角色对话框
    closeNewRoleDialog() {
      this.newRoleVisible = false
      this.$refs.perTree.setCheckedKeys([])
      this.$refs.newRoleForm.resetFields()
    },
    //  确认新增角色
    async affirmNewPer() {
      try {
        this.newRolePerList = this.$refs.perTree.getCheckedKeys(false, true)
        const data = {
          roleDesc: this.newRoleModel.roleDesc,
          roleName: this.newRoleModel.roleName,
          permIds: this.newRolePerList.join(',')
        }
        const res = await systemManageService.insertRole(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '新增角色成功' })
        } else {
          throw new Error('新增角色失败')
        }
      } catch (err) {
        this.$message.error({ message: '新增活动失败' })
        console.error(err)
      } finally {
        this.closeNewRoleDialog()
      }
    },
    // 点击修改角色
    modifyInfo(row) {
      this.modifyVisible = true
      this.modifyModel = row
    },
    // 取消角色修改
    cancelModify() {
      this.$refs.modifyRole.resetFields()
      this.modifyVisible = false
    },
    // 确认角色修改
    async affirmModify() {
      try {
        const data = {
          roleId: this.modifyModel.roleId,
          roleName: this.modifyModel.roleName,
          roleDesc: this.modifyModel.roleDesc
        }
        const res = await systemManageService.UpdateRole(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '修改角色成功' })
          this.getTableData()
        } else {
          throw new Error('修改角色信息失败')
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.modifyVisible = false
      }
    },
    // 点击删除角色
    deleteRole(row) {
      this.deleteVisible = true
      this.deleteModel = row
    },
    // 取消删除
    cancelDelete() {
      this.deleteVisible = false
    },
    // 确认删除
    async affirmDelete() {
      try {
        const res = await systemManageService.deleteRole({ roleId: this.deleteModel.rowId })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '删除角色成功' })
          this.getTableData()
        } else {
          throw new Error('删除角色失败')
        }
      } catch (err) {
        console.log(err)
        this.$message.success({ message: '删除角色失败' })
      } finally {
        this.deleteVisible = false
      }
    },
    // 点击角色权限
    async rolePermissions(row) {
      this.row = row
      this.permissionsVisible = true
      try {
        const res = await systemManageService.queryRolePermission({ roleId: row.roleId })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.rolePermList = transTreeToList(res.data)
          // 这里过滤出叶子节点
          this.rolePermList = this.rolePermList.map(item => {
            if (!(item.children)) {
              return item
            }
          })
          this.$refs.rolePerTree.setCheckedNodes(this.rolePermList)
        }
      } catch (err) {
        this.$message.error({ message: '查询角色权限失败' })
        console.error(err)
      }
    },
    closeRolePerm() {
      this.$refs.rolePerTree.setCheckedNodes([])
      this.permissionsVisible = false
    },
    async affirmRolePerm() {
      try {
        const permIds = this.$refs.rolePerTree.getCheckedKeys()
        const data = {
          permIds: permIds.join(','),
          roleId: this.row.roleId
        }
        const res = await systemManageService.updateRolePermission(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '设置角色权限成功' })
        }
      } catch (err) {
        this.$message.error({ message: '设置角色权限失败' })
      } finally {
        this.closeRolePerm()
      }
    },

    // 获取角色列表
    async getTableData() {
      try {
        const data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        const res = await systemManageService.queryRoleList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.tableData = res.data.listRows
          this.rowTotal = res.data.rowTotal
          // console.log(this.tableData)
        } else {
          throw new Error('查询角色列表失败')
        }
      } catch (err) {
        console.error(err)
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

    exportTable() {
      const { origin, pathname } = window.location
      const base = pathname.split('/')[1]

      window.location.href = origin + '/' + base + '/systemMan/role/exportRoleList.json'
    }
  }

}

</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 25px;
    button{
        margin-left:2em;
    }
}
.el-breadcrumb{
    line-height: 30px;
}
// .treeWrapper{
//     padding-left:96px;
// }
// .el-tree{border:#DCDFE6 solid 1px;
//         border-radius: 5px;
// }
.el-tree{
  min-width: 400px;
}
.deleteBody{
    display:flex;
    justify-content: center;

    // span{
    //     margin-right:15px;
    // }

        margin-top:10px;
        margin-bottom: 10px;
        font-size:20px;
        font-weight: bold;

}

</style>

