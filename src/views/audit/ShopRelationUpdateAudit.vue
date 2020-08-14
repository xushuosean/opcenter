<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>门店状态变更审核</h3>
        <el-form ref="form" :inline="true" size="medium" :model="formModel" :rules="formRule" label-width="114px">

          <el-form-item label="所属商户名称" prop="merchantName">
            <el-input v-model="formModel.merchantName" clearable placeholder="请输入商户名称" />
          </el-form-item>
          <el-form-item label="所属商户编号" prop="merchantId">
            <el-input v-model="formModel.merchantId" clearable placeholder="请输入商户编号" />
          </el-form-item>

          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="formModel.auditStatus" clearable>
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

          <el-form-item class="searchButton " label=" ">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button type="primary" @click="download">导出表格</el-button>
          </el-form-item>

        </el-form>
      </div>

      <el-table :data="tableData" border size="small" style="width:100%">
        <el-table-column
          fixed
          prop="shopName"
          label="门店名称"
          width="220"
        />
        <el-table-column
          prop="shopId"
          label="门店编号"
          width="150"
        />

        <el-table-column
          prop="merchantName"
          label="所属商户名称"
          width="220"
        />
        <el-table-column
          prop="merchantId"
          label="所属商户编号"
          width="150"
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
          width="160"
        />
        <el-table-column
          fixed="right"
          width="90"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.auditOp"
              size="mini"
              @click="handleAudit(scope.$index, scope.row)"
            >审核</el-button>

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
  </el-container>

</template>

<script>
import { merchantAuditService } from '@api/audit.service.js'
import auditService from '@api/audit.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
import { echoShopCat } from '@tool/echoTree.js'

export default {
  data() {
    return {
      formModel: {
        shopName: '',
        shopId: '',
        merchantName: '',
        merchantId: '',
        auditState: '',

        firstAuditPerId: '',
        finalAuditPerId: '',
        submitDate: ''
      },
      formRule: {},
      tableData: [],
      sourceTableData: '',
      // 页码
      pageNum: 1,
      pageSize: 10,
      rowTotal: 0,
      shopCatOptions: []

    }
  },
  created() {

  },
  methods: {
    // 点击查询按钮
    submitForm() {
      this.$refs.form.validate(vali => {
        if (vali) {
          this.pageNum = 1
          this.getTableData()
        }
      })
    },
    // 查询列表
    async getTableData() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

      const formData = {
        merchantName: this.formModel.merchantName,
        merchantId: this.formModel.merchantId,
        shopName: this.formModel.shopName,
        shopId: this.formModel.shopId,
        auditStatus: this.formModel.auditStatus,

        firstAuditPerId: this.formModel.firstAuditPerId,
        finalAuditPerId: this.formModel.finalAuditPerId,
        submitAuditStartTime: this.formModel.submitDate[0],
        submitAuditEndTime: this.formModel.submitDate[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        var res = await merchantAuditService.shopRelationAuditList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          let sourceTableData = res.data.list
          let queryList = sourceTableData.map(item => { return item.auditJnlNo })
          let data2 = { auditjnlNoList: queryList }
          let auditListRes = await auditService.getUserAuditTasks(data2)
          if (!auditListRes.success || !(auditListRes.data)) {
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
            item.auditState = item.auditStatus
            item.auditStateShow = this.$AUDIT_STATUS_OBJ[item.auditState]
          })

          this.tableData = sourceTableData
          this.rowTotal = res.data.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询门店变更审核信息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.error(err)
        this.$notify.error({
          titile: '错误', message: '查询门店变更审核信息时发生错误'
        })
      }
    },

    // 点击审核
    handleAudit(index, row) {
      this.$router.push({ path: '/audit/shopUpdateAudit/ShopUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditState: row.auditStatus,
        op: 'audit',
        auditJnlNo: row.auditJnlNo

      }})
    },
    // 点击详情
    viewDetails(index, row) {
      this.$router.push({ path: '/audit/shopUpdateAudit/ShopUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditState: row.auditStatus,
        op: 'audit',
        auditJnlNo: row.auditJnlNo

      }})
    },

    // 页码
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
    // 查询门店类目
    async getShopCateTree() {
      try {
        let res = await merchantAuditService.getShopCateTree()
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.shopCatOptions = res.data
        } else {
          throw new Error('查询门店类目失败')
        }
      } catch (err) {
        this.$notify.error({ message: '门店类目查询失败' })
        console.log(err)
      }
    },

    download() {}
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

</style>

