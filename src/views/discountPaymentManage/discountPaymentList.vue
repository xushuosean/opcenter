<template>
  <el-container class="auditPage">
    <el-main>

      <div>
        <h3>优惠买单列表</h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-form-item label="优惠买单名称" prop="discountsPayName">
            <el-input v-model="formModel.discountsPayName" clearable placeholder="请输入优惠买单名称" />
          </el-form-item>
          <el-form-item label="优惠买单批次号" prop="discountsPayId">
            <el-input v-model="formModel.discountsPayId" clearable placeholder="请输入优惠买单批次号" />
          </el-form-item>
          <el-form-item label="优惠买单状态" prop="type">
            <el-select v-model="formModel.discountsPayState" clearable>
              <el-option label="未生效" value="INVALID" />
              <el-option label="已生效" value="VALID" />
              <el-option label="已过期" value="EXPIRE" />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="formModel.auditStatus" clearable>
              <el-option v-for="(item, index) in $AUDIT_STATUS_ADD" :key="index" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="适用门店名称" prop="shopName">
            <el-input v-model="formModel.shopName" clearable placeholder="请输入适用门店名称" />
          </el-form-item>
          <el-form-item label="适用门店编号" prop="shopId">
            <el-input v-model="formModel.shopId" clearable placeholder="请输入适用门店编号" />
          </el-form-item>
          <el-form-item class="timeRange" label="创建时间" prop="createDate">
            <el-date-picker
              v-model="formModel.createtDate"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item class="timeRange" label="有效期" prop="validTime">
            <el-date-picker
              v-model="formModel.validTime"
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
          prop="discountsPayStateShow"
          label="优惠买单状态"
          width="120"
        />
        <el-table-column
          prop="shopName"
          label="适用门店名称"
          width="120"
        />
        <el-table-column
          prop="shopId"
          label="适用门店编号"
          width="120"
        />
        <el-table-column
          prop="auditStateShow"
          label="审核状态"
          width="120"
        />
        <el-table-column
          prop="displayStatusShow"
          label="展示状态"
          width="120"
        />
        <el-table-column
          prop="totalInventory"
          label="总库存"
          width="120"
        />
        <el-table-column
          prop="used"
          label="已使用"
          width="120"
        />

        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="validTime"
          label="有效期限"
        />
        <el-table-column
          width="260"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button

              size="mini"
              @click="viewDetails(scope.$index, scope.row)"
            >详情</el-button>

            <template v-if="scope.row.discountsPayState==='VALID'">

              <el-button
                v-if="(scope.row.displayState==='NOSHELVE' && scope.row.auditStatus==='PASS') || (scope.row.displayState==='OFFSHELVE'&& scope.row.auditStatus==='U_PASS') "
                size="mini"
                @click="showPutOnline(scope.row)"
              >上架</el-button>
              <el-button
                v-if="(scope.row.displayState==='ONSHELVE'&& (scope.row.auditStatus==='PASS' || scope.row.auditStatus==='U_PASS')) "
                size="mini"
                @click="showPutOffline(scope.row)"
              >下架</el-button>
              <el-button
                v-if="((scope.row.displayState==='ONSHELVE'|| scope.row.auditStatus==='OFFSHELVE')&& scope.row.auditStatus==='U_PASS') "
                size="mini"
                @click="updateLog(scope.$index, scope.row)"
              >变更日志</el-button>
            </template>
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
        title="提示"
        :visible.sync="putOnlineVisible"
        width="30%"
      >       <span>确认要上架该优惠买单吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="putOnlineVisible"
        width="30%"
      >       <span>确认要上架该优惠买单吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="putOnlineVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDisplayState('ONSHELVE')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="putOfflineVisible"
        width="30%"
      >       <span>确认要下架该优惠买单吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="putOfflineVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDisplayState('OFFSHELVE')">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import discountPayEnum from '@enum/discountPay-enum.js'
import discountPaymentService from '@api/discountPaymentManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {
      putOnlineVisible: false,
      putOfflineVisible: false,
      formModel: {
        discountsPayName: '',
        discountsPayId: '',
        discountsPayState: '',
        auditStatus: '',
        shopName: '',
        shopId: '',
        createDate: '',
        validTime: ''
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
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_APPLYID]),
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
      // const flag = await this.$refs.form.validate()
      // if (!flag) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ title: '错误', message: '表单不合法' }); return }
      const formData = {
        discountsPayName: this.formModel.discountsPayName,
        discountsPayId: this.formModel.discountsPayId,
        discountsPayState: this.formModel.discountsPayState,
        auditStatus: this.formModel.auditStatus,
        shopName: this.formModel.shopName,
        shopId: this.formModel.shopId,
        createStartDate: this.formModel.createDate[0],
        createEndDate: this.formModel.createDate[1],
        validStartTime: this.formModel.validTime[0],
        validEndTime: this.formModel.validTime[1]
      }
      var data = objectTool.addValidPropertyToTarget(
        {
          ...formData,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      )
      try {
        var res = await discountPaymentService.getDiscountList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          let sourceTableData = res.data.listRows
          sourceTableData.forEach(item => {
            item.discountsPayStateShow = discountPayEnum.discountsPayState[item.discountsPayState]
            item.auditStateShow = this.$AUDIT_STATUS_OBJ[item.auditStatus]
            item.displayStatusShow = discountPayEnum.displayStatus[item.displayState]
            if (item.totalInventory === -1) { item.totalInventory = '无限制' }
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
    showPutOnline(row) {
      this.row = row
      this.putOnlineVisible = true
    },
    showPutOffline(row) {
      this.row = row
      this.putOnlineVisible = true
    },
    viewDetails(index, row) {
      // '/discountPaymentManage/discountPayDetail'
      this.$router.push({ path: '/discountPaymentManage/discountPayDetail', query: { applyId: row.applyId }})
    },
    async updateDisplayState(state) {
      try {
        let row = this.row
        let data = {
          applyId: row.applyId,
          discountsPayId: row.discountsPayId,
          displayState: row.displayState,
          changeType: state
        }
        let res = await discountPaymentService.updateDisplaystate(data)
        if (res.resultCode === '000000') {
          if (state === 'ONSHELVE') {
            this.$message.success({ message: '上架成功' })
          } else if (state === 'OFFSHELVE') {
            this.$message.success({ message: '下架成功' })
          }
          this.getTableData()
        } else throw new Error('上下架失败')
      } catch (err) {
        console.error(err)

        if (state === 'ONSHELVE') {
          this.$message.error({ message: '上架失败' })
        } else if (state === 'OFFSHELVE') {
          this.$message.error({ message: '下架失败' })
        }
      } finally {
        this.putOnlineVisible = false
        this.putOfflineVisible = false
      }
    },

    putOffline() {},
    updateLog() {},

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
        discountPayName: this.formModel.discountPayName,
        discountsPayId: this.formModel.discountsPayId
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
      window.location.href = origin + '/' + pathname.split('/')[1] + '/discount/pay/exportList.json' + '?' + params
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

</style>

