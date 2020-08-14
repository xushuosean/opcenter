<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>商户关系变更审核</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model="formModel.merchantName" clearable placeholder="请输入商户名称" />
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantId">
            <el-input v-model="formModel.merchantId" clearable placeholder="请输入商户编号" />
          </el-form-item>
          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="formModel.auditStatus" clearable>
              <el-option v-for="(item, index) in $AUDIT_STATUS_UPDATE " :key="index" :label="item.value" :value="item.key" />
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
          prop="applyId"
          label="申请Id"
        />
        <el-table-column
          prop="merchantName"
          label="商户名称"
        />
        <el-table-column
          prop="merchantId"
          label="商户编号"
        />
        <el-table-column
          prop="addCount"
          label="新增数量"
        />
        <el-table-column
          prop="delCount"
          label="移除数量"
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
          prop="auditStatusShow"
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
        :current-page="1"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="rowTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
  </el-container>

</template>

<script>
import auditService from '@api/audit.service.js'
import { merchantAuditService } from '@api/audit.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {

      formModel: {
        merchantName: '',
        merchantId: '',
        auditStatus: '',
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
      rowTotal: 0
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {

    submitForm() {
      this.$refs.form.validate(vali => {
        if (vali) {
          this.pageNum = 1
          //   this.formChanged = false
          this.getTableData()
        }
      })
    },
    async getTableData() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }

      const formData = {
        merchantName: this.formModel.merchantName,
        merchantId: this.formModel.merchantId,
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
        var res = await merchantAuditService.merchantRelationAuditList(data)
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
            item.auditStatusShow = this.$AUDIT_STATUS_OBJ[item.auditStatus]
          })

          this.tableData = sourceTableData
          this.rowTotal = res.data.rowTotal
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询商户关系变更审核信息失败'
          })
          console.error(res)
        }
      } catch (err) {
        console.error(err)
        this.$notify.error({
          titile: '错误', message: '查询商户关系变更审核信息时发生错误'
        })
      }
    },
    handleAudit(index, row) {
      this.$router.push({ path: '/audit/merchantUpdateAudit/MerchantRelationUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditStatus: row.auditStatus,
        op: 'audit',
        auditJnlNo: row.auditJnlNo
      }})
    },
    viewDetails(index, row) {
      this.$router.push({ path: '/audit/merchantUpdateAudit/MerchantRelationUpdateAuditDetail', query: {
        applyId: row.applyId,
        auditStatus: row.auditStatus,
        op: 'view',
        auditJnlNo: row.auditJnlNo
      }})
    },
    handleSizeChange() {},
    handleCurrentChange() {},
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

