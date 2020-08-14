<template>
  <el-container class="auditPage">
    <el-main>

      <div>
        <h3>优惠买单变更审核</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="优惠买单名称" prop="discountsPayName">
            <el-input v-model="formModel.discountsPayName" clearable placeholder="请输入优惠买单名称" />
          </el-form-item>
          <el-form-item label="优惠买单批次号" prop="discountsPayId">
            <el-input v-model="formModel.discountsPayId" clearable placeholder="请输入优惠买单批次号" />
          </el-form-item>
          <el-form-item label="适用门店名称" prop="shopName">
            <el-input v-model="formModel.shopName" clearable placeholder="请输入适用门店名称" />
          </el-form-item>
          <el-form-item label="审核状态" prop="auditState">
            <el-select v-model="formModel.auditState" clearable>
              <el-option v-for="(item, index) in $AUDIT_STATUS_UPDATE" :key="index" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="初审人编号" prop="firstAuditPerId">
            <el-input v-model="formModel.firstAuditPerId" clearable placeholder="请输入初审人编号" />
          </el-form-item>
          <el-form-item label="终审人编号" prop="finalAuditPerId">
            <el-input v-model="formModel.finalAuditPerId" clearable placeholder="请输入终审人编号" />
          </el-form-item>
          <el-form-item class="timeRange" label="提交审核时间" prop="submitDate">
            <el-date-picker
              v-model="formModel.submitDate"
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
          prop="discountsPayName"
          label="优惠买单名称"
        />
        <el-table-column
          prop="discountsPayId"
          label="优惠买单批次号"
        />
        <el-table-column
          prop="shopName"
          label="适用门店名称"
          width="120"
        />
        <el-table-column
          prop="firstAuditPerId"
          label="初审人"
          width="120"
        />
        <el-table-column
          prop="finalAuditPerId"
          label="终审人"
          width="120"
        />
        <el-table-column
          prop="auditStateShow"
          label="审核状态"
          width="120"
        />
        <el-table-column
          prop="submitAuditTime"
          label="提交审核时间"
        />
        <el-table-column
          width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.auditOp"
              size="mini"
              @click="handleAudit(scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              v-else
              size="mini"
              type="info"
              @click="viewDetails(scope.$index, scope.row)"
            >详情</el-button>
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
  </el-container>

</template>

<script>

import auditService from '@api/audit.service.js'
import discountPaymentService from '@api/discountPaymentManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {
      formModel: {
        discountsPayName: '',
        discountsPayId: '',
        auditState: '',
        shopName: '',
        firstAuditPerId: '',
        finalAuditPerId: '',
        submitDate: ''
      },
      formRule: {},
      //   formChanged: false,
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
      this.$refs.form.validate(vali => {
        if (vali) {
          this.pageNum = 1
          this.getTableData()
        }
      })
    },
    async getTableData() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

      const formData = {
        discountsPayName: this.formModel.discountsPayName,
        discountsPayId: this.formModel.discountsPayId,
        shopName: this.formModel.shopName,
        auditState: this.formModel.auditState,
        firstAuditPerId: this.formModel.firstAuditPerId,
        finalAuditPerId: this.formModel.finalAuditPerId,
        createStartDate: this.formModel.submitDate[0],
        createEndDate: this.formModel.submitDate[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        var res = await discountPaymentService.queryUpdAuditList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          let sourceTableData = res.data.listRows
          let queryList = sourceTableData.map(item => { return item.auditJnlNo })
          let data2 = { auditjnlNoList: queryList }
          let auditListRes = await auditService.getUserAuditTasks(data2)
          if (!auditListRes.resultCode === AjaxReturnType.SUCCESS || !auditListRes.data) {
            sourceTableData.forEach(item => { item.auditOp = false })
          } else {
            let auditList = auditListRes.data

            sourceTableData.forEach(item => {
              if (auditList.indexOf(item.auditJnlNo) > -1) {
                item.auditOp = true
              } else { item.auditOp = false }
            })
          }

          sourceTableData.forEach(item => {
            item.auditStateShow = this.$AUDIT_STATUS_OBJ[item.auditState]
          })

          this.tableData = sourceTableData
          this.rowTotal = res.data.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询优惠买单审核信息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.error(err)
        this.$notify.error({
          titile: '错误', message: '查询优惠买单审核信息时发生错误'
        })
      }
    },

    handleAudit(index, row) {
      this.$router.push({ path: '/audit/discountPayCreationAudit/DiscountPayUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditState: row.auditState,
        op: 'audit',
        auditJnlNo: row.auditJnlNo

      }})
    },
    viewDetails(index, row) {
      this.$router.push({ path: '/audit/discountPayCreationAudit/DiscountPayUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditState: row.auditState,
        op: 'view',
        auditJnlNo: row.auditJnlNo

      }})
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
    download() {
      const formData = {
        discountsPayName: this.formModel.discountsPayName,
        discountsPayId: this.formModel.discountsPayId,
        shopName: this.formModel.shopName,
        auditState: this.formModel.auditState,
        firstAuditPerId: this.formModel.firstAuditPerId,
        finalAuditPerId: this.formModel.finalAuditPerId,
        createStartDate: this.formModel.submitDate[0],
        createEndDate: this.formModel.submitDate[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      let paramsList = []
      for (let i in data) {
        paramsList.push(`${i}=${data[i]}`)
      }
      let params = paramsList.join('&')
      let { origin, pathname } = window.location
      window.location.href = origin + '/' + pathname.split('/')[1] + '/discount/pay/exportAddAuditList.json' + '?' + params
    } }
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

</style>

