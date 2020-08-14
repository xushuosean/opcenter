<template>
  <el-container class="auditPage">
    <el-main>

      <div>

        <h3>定向发放授权配置 <el-button @click="toAddnew">+新增授权</el-button></h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="授权发放人" prop="userId">
            <el-input v-model="formModel.userId" clearable placeholder="请输入定向发放授权人id" />
          </el-form-item>
          <el-form-item label="发放物ID" prop="grantId">
            <el-input v-model="formModel.grantId" clearable placeholder="请输入定向发放物类型" />
          </el-form-item>
          <el-form-item label="发放物类型" prop="grantType">
            <el-select v-model="formModel.grantType" clearable>
              <el-option label="红包" value="RPK" />
              <el-option label="票券" value="COUPON" />
            </el-select>
          </el-form-item>

          <el-form-item label="发放物名称" prop="grantName">
            <el-input v-model="formModel.grantName" clearable placeholder="请输入发放物名称" />
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model="formModel.stock" clearable placeholder="请输入库存" />
          </el-form-item>
          <el-form-item class="timeRange" label="授权时间" prop="createTime">
            <el-date-picker
              v-model="formModel.createTime"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item class="timeRange" label="可发放时间" prop="grantTime">
            <el-date-picker
              v-model="formModel.grantTime"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item class="searchButton" label=" ">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button type="primary" @click="download">导出表格</el-button>
          </el-form-item>

        </el-form>
      </div>

      <el-table :data="tableData" size="small" border style="width:100%">
        <el-table-column
          prop="id"
          label="定向发放授权ID"
        />
        <el-table-column
          prop="userId"
          label="发起人ID"
        />
        <el-table-column
          prop="grantType"
          label="定向发放类型"
          width="120"
        />
        <el-table-column
          prop="grantId"
          label="发放物Id"
          width="120"
        />
        <el-table-column
          prop="grantName"
          label="发放物名称"
          width="120"
        />
        <el-table-column
          prop="stock"
          label="库存"
          width="120"
        />
        <el-table-column
          prop="grantStartTime"
          label="开始发放时间"
          width="120"
        />
        <el-table-column
          prop="grantEndTime"
          label="结束发放时间"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="120"
        />

        <el-table-column
          width="260"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateGrant(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              @click="revocation(scope.row)"
            >撤销授权</el-button>
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
      <el-dialog
        title="撤销发放授权"
        :visible.sync="revocationVisible"
        width="500px"
      >        <el-form ref="revocationForm" :model="revocationModel" label-position="left" size="medium" :inline="true" :rules="revocationRule" label-width="134px">
                 <el-form-item label="授权时间">
                   <div>{{ revocationModel.createTime }}</div>
                 </el-form-item>
                 <el-form-item label="授权发放人">
                   <div>{{ revocationModel.userId }}</div>
                 </el-form-item>
                 <el-form-item label="授权发放物品">
                   <div>{{ revocationModel.grantName }}（批次号{{ revocationModel.grantId }}）</div>
                 </el-form-item>
                 <el-form-item label="授权发放库存">
                   <div>{{ revocationModel.stock }}</div>
                 </el-form-item>

                 <el-form-item label="可发放时间">
                   <div>起始时间： {{ revocationModel.grantStartTime }}</div>
                   <div>结束时间： {{ revocationModel.grantEndTime }}</div>
                 </el-form-item>

               </el-form>
        <div class="alarm">撤销后不可修改，需重新新增授权，<br>您确认要撤销该笔发放授权吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="revocationVisible = false">取 消</el-button>
          <el-button type="primary" @click="affirmRevocation">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改发放授权"
        :visible.sync="updateVisible"
        width="600px"
      >
        <el-form ref="updateForm" :model="updateModel" label-position="left" size="medium" :inline="true" :rules="updateRule" label-width="134px">
          <el-form-item label="授权时间">
            <div>{{ updateModel.createTime }}</div>
          </el-form-item>
          <el-form-item label="授权发放人">
            <div>{{ updateModel.userId }}</div>
          </el-form-item>
          <el-form-item label="授权发放物品">
            <div>{{ updateModel.grantName }}（批次号{{ updateModel.grantId }}）</div>
          </el-form-item>
          <el-form-item label="原授权发放库存">
            <div>{{ updateModel.stock }}</div>
          </el-form-item>
          <el-form-item label="修改授权发放库存">
            <el-input v-model="updateModel.newStock" />
          </el-form-item>
          <el-form-item label="原可发放时间">
            <div>起始时间： {{ updateModel.grantStartTime }}</div>
            <div>结束时间： {{ updateModel.grantEndTime }}</div>
          </el-form-item>
          <el-form-item label="修改可发放时间" prop="grantTime">
            <el-date-picker
              v-model="formModel.newGrantTime"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="affirmUpdate">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>

import grantService from '@api/grantManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {
      row: '',
      revocationVisible: false,
      updateVisible: false,
      formModel: {
        userId: '',
        grantId: '',
        grantType: '',
        grantName: '',
        stock: '',
        createTime: '',
        grantTime: ''
      },
      updateModel: {
        userId: '',
        grantId: '',
        grantType: '',
        grantName: '',
        stock: '',
        newStock: '',
        grantTime: '',
        newGrantTime: ''
      },
      updateRule: {
        newStock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
        newGrantTime: [{ required: true, message: '请输入时间', trigger: 'blur' }]
      },

      revocationModel: {
        userId: '',
        grantId: '',
        grantType: '',
        grantName: '',
        stock: '',
        newStock: '',
        grantTime: '',
        newGrantTime: ''
      },
      revocationRule: {},

      formRule: {},
      tableData: [],
      sourceTableData: '',
      // 页码
      pageNum: 1,
      pageSize: 10,
      rowTotal: 0

    }
  },
  mounted() {
    this.getTableData()
  },
  created() {

  },

  methods: {

    submitForm() {
      this.pageNum = 1
      this.getTableData()
    },
    async getTableData() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
      const formData = {
        userId: this.formModel.userId,
        grantType: this.formModel.grantType,
        grantId: this.formModel.grantId,
        grantName: this.formModel.grantName,
        stock: this.formModel.stock,
        createStartDate: this.formModel.createTime[0],
        createEndDate: this.formModel.createTime[1],
        grantStartTime: this.formModel.grantTime[0],
        grantEndTime: this.formModel.grantTime[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        var res = await grantService.queryGrantAuthList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          let sourceTableData = res.body.authList
          sourceTableData.forEach(item => {
          })
          this.tableData = sourceTableData
          this.rowTotal = res.body.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询定向发放授权信息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.error(err)
        this.$notify.error({
          titile: '错误', message: '查询定向发放授权信息时发生错误'
        })
      }
    },
    // 点击修改
    updateGrant(row) {
      this.row = row
      this.updateVisible = true
      Object.assign(this.updateModel, row)
      this.updateModel.newStock = this.updateModel.stock
      this.updateModel.newGrantTime = [row.grantStartTime, row.grantEndTime]
    },
    // 确认修改
    async affirmUpdate() {
      try { await this.$refs.updateForm.validate() } catch (err) { this.$message.error({ message: '表单不合法' }); return }
      let data = {
        id: this.updateModel.id, // 定向发放授权Id
        stock: this.updateModel.newStock, // 库存
        grantStartTime: this.updateModel.newGrantTime[0], // 开始发放时间
        grantEndTime: this.updateModel.newGrantTime[1] // 结束发放时间
      }
      try {
        let res = await grantService.updateGrantAuth(data)
        if (res.resultCode !== '000000') { throw new Error('修改失败') }
        this.$message.success({ message: '修改成功' })
        this.getTableData()
      } catch (err) {
        console.log(err)
        this.$message.error({ message: '修改失败' })
      } finally {
        this.updateVisible = false
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
    // 下载
    download() {
      const formData = {
        userId: this.formModel.userId,
        grantType: this.formModel.grantType,
        grantId: this.formModel.grantId,
        grantName: this.formModel.grantName,
        stock: this.formModel.stock,
        createStartDate: this.formModel.createTime[0],
        createEndDate: this.formModel.createTime[1],
        grantStartTime: this.formModel.grantTime[0],
        grantEndTime: this.formModel.grantTime[1]
      }
      let data = objectTool.addValidPropertyToTarget(
        {
          ...formData
        }
      )
      let paramsList = []
      for (let i in data) {
        paramsList.push(`${i}=${data[i]}`)
      }
      let params = paramsList.join('&')
      let { origin, pathname } = window.location
      window.location.href = origin + '/' + pathname.split('/')[1] + '/gtantAuth/export' + '?' + params
    },
    // 点击撤销
    revocation(row) {
      this.row = row
      Object.assign(this.revocationModel, row)
      this.revocationVisible = true
    },
    // 确认撤销
    async affirmRevocation() {
      try {
        let res = await grantService.cancelGrantAuth({ id: this.row.id })
        if (res.resultCode === '000000') {
          this.$message.success({ message: '撤销授权成功' })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.revocationVisible = false
      }
    },
    // 跳去新增
    toAddnew() {
      this.$router.push('/targetedDistribution/newAuthorizeDistribution')
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
}
.el-breadcrumb{
    line-height: 30px;
}
.auditPage .el-main .el-dialog__wrapper .el-form-item{
  width: 450px;
}
 .el-dialog__wrapper  form.el-form{
  margin-bottom:0;
   .el-form-item{
     margin-bottom:10px;
   }
}
.alarm{
  text-align:center;
  font-size:18px;
  line-height:22px;
}
</style>

