<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>账号管理 <el-button @click="newAcountVisible=true">+新增账号</el-button></h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="登陆账号" prop="loginId">
            <el-input v-model="formModel.loginId" placeholder="请输入用户的登陆账号" />
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="formModel.userName" placeholder="请输入用户的姓名" />
          </el-form-item>
          <el-form-item label="用户手机号" prop="phoneNo">
            <el-input v-model="formModel.phoneNo" placeholder="请输入用户的手机号码" />
          </el-form-item>
          <el-form-item label="用户角色" prop="roleId">
            <el-select v-model="formModel.roleId">
              <el-option label="全部" value="" />
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId" />

            </el-select>
          </el-form-item>
          <el-form-item label="所属分行" prop="orgIds">
            <el-cascader v-model="formModel.orgIds" :options="orgData" />
          </el-form-item>
          <el-form-item class="searchButton" label=" ">
            <el-button type="primary" @click="getTableData">查询</el-button>
            <el-button type="primary" @click="download">导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData" border style="width:100%">
        <el-table-column
          prop="loginId"
          label="登陆账号"
        />
        <el-table-column
          prop="userName"
          label="姓名"
        />
        <el-table-column
          prop="phoneNo"
          label="手机号码"
        />
        <el-table-column
          prop="roleNameShow"
          label="角色"
        />
        <el-table-column
          prop="statusShow"
          label="账号状态"
        />
        <el-table-column
          prop="orgIds"
          label="所属分行"
          width="250"
        />

        <el-table-column
          prop="createTime"
          label="创建时间"
          width="150"
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
              @click="modifyInfo(scope.$index, scope.row)"
            >修改信息
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="resetPassword(scope.$index, scope.row)"
            >重置密码
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAcount(scope.$index, scope.row)"
            >删除账号
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pageNum"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="rowTotal"
        @size-change="handlePageSizeChange"
        @current-change="handlePageChange"
      />
    </el-main>
    <!-- 新增账号 -->
    <el-dialog :visible.sync="newAcountVisible" width="800px" title="新增账号" @close="cancelNewAcount">
      <el-form ref="newAcount" :model="newAcountModel" :rules="newAcountRule" :inline="true" label-width="96px">

        <el-form-item label="登陆账号" prop="loginId">
          <el-input v-model="newAcountModel.loginId" placeholder="请输入用户的登陆账号" />
        </el-form-item>
        <template>
          <el-form-item label="密码" prop="password">
            <el-input v-model="newAcountModel.password" placeholder="请输入登陆密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="repeatPassword">
            <el-input v-model="newAcountModel.repeatPassword" placeholder="请再次输入登陆密码" />
          </el-form-item>
        </template>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="newAcountModel.userName" placeholder="请输入用户的姓名" />
        </el-form-item>
        <el-form-item label="用户手机号" prop="phoneNo">
          <el-input v-model="newAcountModel.phoneNo" placeholder="请输入用户的手机号码" />
        </el-form-item>
        <el-form-item label="所属分行" prop="orgIds">
          <el-cascader v-model="newAcountModel.orgIds" :options="orgData" :props="{value:'orgId',label:'orgName'}" />
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="newAcountModel.roleId">
            <el-option label="全部" value="allType" />
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="newAcountModel.status">
            <el-option label="可用" value="ON" />
            <el-option label="不可用" value="OFF" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelNewAcount">取消</el-button>
        <el-button type="primary" @click="affirmNewAcount">确认</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog :visible.sync="resetPasswordVisible" width="500px" title="重置密码">
      <el-form ref="resetPassword" :model="resetPasswordModel" :rules="resetPasswordRule" label-width="96px">
        <el-form-item label="登陆账号" prop="loginId">
          <el-input disabled :value="row.loginId" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPasswordModel.newPassword" placeholder="请输入新的登陆密码" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="repeatNewPassword">
          <el-input v-model="resetPasswordModel.repeatNewPassword" placeholder="请再次输入新的登陆密码" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelNewPassword">取消</el-button>
        <el-button type="primary" @click="affirmNewPassword">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除账号 -->
    <el-dialog :visible.sync="deleteAcountVisible" width="500px" title="确认要删除该账号吗？">

      <div class="delete">
        <span>登陆账号：</span> <span>{{ row.loginId }}</span>
      </div>

      <div slot="footer">
        <el-button type="primary" @click="cancelDelete">取消</el-button>
        <el-button type="primary" @click="affirmDelete">确认</el-button>
      </div>
    </el-dialog>
    <!-- 修改账号信息 -->
    <el-dialog :visible.sync="modifyAccountVisible" width="500px" title="修改信息">
      <el-form ref="modifyAccount" :model="modifyModel" :rules="modifyRule" label-width="96px">
        <el-form-item label="登陆账号" prop="loginId">
          <div>{{ row.loginId }}</div>

        </el-form-item>
        <el-form-item label="更改登陆账号" prop="loginId">
          <el-input v-model="modifyModel.loginId" placeholder="请输入用户的登陆账号" />
        </el-form-item>

        <el-form-item label="姓名" prop="userName">
          <el-input v-model="modifyModel.userName" placeholder="请输入用户的姓名" />
        </el-form-item>
        <el-form-item label="用户手机号" prop="phoneNo">
          <el-input v-model="modifyModel.phoneNo" placeholder="请输入用户的手机号码" />
        </el-form-item>
        <el-form-item label="所属分行" prop="orgIds">
          <el-cascader v-model="modifyModel.orgIds" :options="orgData" :props="{value:'orgId',label:'orgName'}" />
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="modifyModel.roleId">
            <el-option label="全部" value="allType" />
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="modifyModel.status">
            <el-option label="可用" value="ON" />
            <el-option label="不可用" value="OFF" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="cancelModify">取消</el-button>
        <el-button type="primary" @click="affirmModify">确认</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
import systemManageService from '@api/systemManage.service.js'
import objectTool from '../../tool/objectTool.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      row: '', // 操作时选中的行
      formModel: {
        loginId: '',
        userName: '',
        phoneNo: '',
        roleId: '',
        orgIds: []
      },
      formRule: {},
      tableData: [

      ],
      newAcountVisible: false,
      newAcountModel: {
        loginId: '',
        password: '',
        repeatPassword: '',
        userName: '',
        phoneNo: '',
        roleId: '',
        orgIds: [],
        status: ''
      },
      newAcountRule: {},
      resetPasswordVisible: false,
      resetPasswordModel: {
        newPassword: '',
        repeatNewPassword: ''
      },
      resetPasswordRule: {},
      deleteAcountVisible: false,
      modifyAccountVisible: false,
      modifyModel: {
        loginId: '',
        userName: '',
        phoneNo: '',
        roleId: '',
        orgIds: [],
        status: ''
      },
      modifyRule: {},
      pageNum: 1,
      rowTotal: 0,
      pageSize: 10,
      roleList: []

    }
  },
  watch: {
    editOperate(newValue) {
      this.dialogTitle = newValue ? '修改账号信息' : '新增账号'
    }
  },
  computed: {
    ...mapGetters('commonData', ['orgData'])

  },
  created() {
    this.getRoles()
  },
  methods: {
    async getTableData() {
      try { await this.$refs.form.validate() } catch (err) { this.$message({ message: '表单不合法' }); return }
      let formData = {}
      Object.assign(formData, this.formModel)
      formData.orgIds = formData.orgIds.join(',')
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        let res = await systemManageService.queryUserList(data)
        if (res.resultCode !== '000000') { throw new Error('查询账户列表失败') }
        this.tableData = res.data.listRows
        this.rowTotal = res.data.rowTotal
        this.tableData.forEach(item => {
          item.roleNameShow = item.roles[0].roleName
          if (item.status === 'ON') { item.statusShow = '可用' } else if (item.status === 'OFF') { item.statusShow = '不可用' }
        })
      } catch (err) {
        console.error(err)
        this.$message({ message: '查询账户列表失败' })
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
    handleSizeChange() {},
    handleCurrentChange() {},
    download() {
      let { origin, pathname } = window.location
      let context = pathname.split('/')[1]
      window.location.href = `${origin}/${context}/systemMan/user/exportUserList.json`
    },
    modifyInfo(index, row) {
      this.modifyAccountVisible = true
      this.row = row
      Object.assign(this.modifyModel, row)
    },
    async affirmModify() {
      try { this.$refs.modifyAccount.validate() } catch (err) { this.$message({ message: '表单不合法' }); return }
      try {
        let data = {}
        Object.assign(data, this.modifyModel)

        data = objectTool.addValidPropertyToTarget({ ...data })
        let res = await systemManageService.updateUser(data)
        if (res.resultCode === '000000') {
          this.$message.success({ message: '新增账号成功' })
        } else {
          throw new Error('新增账号失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '新增账号失败' })
      }
      this.$refs.modifyAccount.resetFields()
      this.modifyAccountVisible = false
    },
    cancelModify() {
      this.modifyAccountVisible = false
    },
    resetPassword(index, row) {
      this.resetPasswordVisible = true
      this.row = row
    },
    deleteAcount(index, row) {
      this.deleteAcountVisible = true
      this.row = row
    },
    cancelNewAcount() {
      this.$refs.newAcount.resetFields()
      this.newAcountVisible = false
    },
    async affirmNewAcount() {
      try { this.$refs.newAcount.validate() } catch (err) { this.$message({ message: '表单不合法' }); return }
      try {
        let data = {}
        Object.assign(data, this.newAcountModel)
        data.orgIds = data.orgIds.join(',')
        data = objectTool.addValidPropertyToTarget({ ...data })
        let res = await systemManageService.addUser(data)
        if (res.resultCode === '000000') {
          this.$message.success({ message: '新增账号成功' })
        } else {
          throw new Error('新增账号失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '新增账户失败' })
      }
      this.$refs.newAcount.resetFields()
      this.newAcountVisible = false
    },
    cancelNewPassword() {
      this.resetPasswordVisible = false
    },
    async affirmNewPassword() {
      try { await this.$refs.resetPassword.validate() } catch (err) { this.$message.error({ message: '表单验证不通过' }); return }
      let data = {
        userId: this.row.userId,
        password: this.resetPasswordVisible.newPassword
      }
      try {
        let res = await systemManageService.updateUserPassword(data)
        if (res.resultCode === '000000') { this.$message.success({ message: '重置密码成功' }) } else { throw new Error('重置密码失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '重置密码失败' })
      } finally {
        this.resetPasswordVisible = false
      }
    },
    cancelDelete() {
      this.deleteAcountVisible = false
    },
    async affirmDelete() {
      try {
        let res = await systemManageService.deleteRole({ userId: this.row.userId })
        if (res.resultCode === '000000') { this.$message.success({ message: '删除成功' }) } else { throw new Error('删除失败') }
      } catch (err) {
        console.error(err)
        this.$message.error('删除失败')
      } finally {
        this.deleteAcountVisible = false
      }
    },
    async getRoles() {
      try {
        let res = await systemManageService.queryRoleList()
        this.roleList = res.data.listRows
      } catch (err) {
        console.error(err)
        this.$message({ message: '查询角色列表失败' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 15px;
    button{
        margin-left:2em;
    }
}
.el-breadcrumb{
    line-height: 30px;
}
.el-dialog{
    .el-input{
        width: 260px;
    }
    /deep/ .el-input{
        width: 260px;
    }
    .el-select{
        width: 260px;
    }
    .el-cascader{
        width: 260px;
    }
}

.delete{
    text-align: center;
    font-size:18px;
    line-height: 30px;

}

</style>

