<template>
  <div class="box">
    <el-card>
      <h3>优惠买单基本信息 &nbsp; <el-button @click="goToModify"> 修改优惠买单信息</el-button> </h3>
      <AuditWrapTable :table-data="baseInfoData" :show-change="false" />
    </el-card>
    <el-card>
      <h3>配置时间</h3>
      <!-- template discountPayTimeInfo -->
      <AuditWrap
        v-for="(item,index) in timeInfoData"
        :key="index"
        :label="item.label"
        :template="item.template"
        :current-data="item.currentData"
        :show-change="false"
      />

    </el-card>
    <el-card>
      <h3>分摊规则及结算模式</h3>
      <AuditWrapTable :table-data="apportionInfoData" :show-change="false" />
    </el-card>

    <div class="buttonWrapper">

      <el-button type="primary" @click="goBack">返回</el-button>
    </div>

    <el-dialog
      title="优惠买单下架提醒"
      :visible.sync="putOfflineVisible"
      width="30%"
    >       <span>
              该优惠买单处于在架状态，修改优惠买单信息需要先将其下架。
              是否将优惠买单下架</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putOfflineVisible = false">取 消</el-button>
        <el-button type="primary" @click="putOffline">确定下架</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="goToModifyVisible"
      width="30%"
    >       <span>
              该优惠买单处于下架成功是否去修改页面</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goToModifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="goToModify">确定下架</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// 这是什么？
// import { type } from 'os';
import discountPayEnum from '@enum/discountPay-enum.js'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import discountPaymentService from '@api/discountPaymentManage.service.js'
// import auditService from '@api/audit.service.js'
import auditMixin from '@mixin/audit-mixin.js'
import AuditWrap from '@com/audit/AuditWrap.vue'
import AuditWrapTable from '@com/audit/AuditWrapTable.vue'
export default {
  filters: {
  },
  components: { AuditWrap, AuditWrapTable },
  mixins: [auditMixin],
  data() {
    return {
      putOfflineVisible: false,
      goToModifyVisible: false,
      displayState: '',
      discountPayEnum,
      resData: [],
      baseInfoData: [],

      // 优惠买单基本信息
      baseInfo: [
        { label: '优惠买单批次号', key: 'discountsPayId', template: 'text' },
        { label: '适用门店范围', key: 'shopList', template: 'shopList' },
        { label: '满减规则', keyObj: ['discountsRule', 'discountsReduceValue', 'setLimitAmt', 'maxDiscountsAmt'], template: 'discountsRuleDetail' },
        { label: '优惠买单名称', key: 'discountsPayName', template: 'text' },
        { label: '总库存', keyObj: ['setInventoryLimit', 'totalInventory'], template: 'totalInventory' },
        { label: '限购数量', keyObj: ['setLimitNum', 'maxDiscountsNum'], template: 'maxDiscountsNum' },
        { label: '支付方式限制', key: 'payWay', template: 'payWay' }
      ],
      // 配置时间信息
      timeInfoData: [],
      // 分摊规则及结算模式信息
      apportionInfo: [
        { label: '补贴结算模式', keyEnum: 'subsidySettleWay', template: 'enum' },
        { label: '分摊规则', keyObj: ['discountsRule', 'discountsReduceValue', 'apportionRuleValue'], template: 'discountApption' },
        { label: '结算方式', keyEnum: 'settleWay', template: 'enum' }
      ],
      apportionInfoData: []

    }
  },
  mounted() {
  },
  async created() {
    await this.getData()

    this.baseInfoData = this.filterData(this.baseInfo, this.resData)
    this.processTimeInfo()
    this.apportionInfoData = this.filterData(this.apportionInfo, this.resData)
    // this.timeInfoData = this.filterData(this.settlementInfo, this.resData)
  },
  methods: {
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_APPLYID]),
    // 获取审核相关的数据
    async putOffline() {
      try {
        let data = {
          applyId: this.applyId,
          discountsPayId: this.discountsPayId,
          displayState: this.displayState,
          changeType: 'OFFSHELVE'
        }
        let res = await discountPaymentService.updateDisplaystate(data)
        if (res.resultCode === '000000') {
          this.$message.success({ message: '下架成功' })
          this.displayState = 'OFFSHELVE'
        } else throw new Error('上下架失败')
      } catch (err) {
        console.error(err)

        this.$message.error({ message: '下架失败' })
      } finally {
        this.putOfflineVisible = false
      }
    },
    // 获取数据
    async getData() {
      try {
        let res = await discountPaymentService.queryDiscountPayDetail({ applyId: this.$route.query.applyId })
        if (res.resultCode === '000000') {
          this.resData = res.data
          this.displayState = res.data.displayState
          this.applyId = res.data.applyId
          this.discountsPayId = res.data.discountsPayId
        } else {
          throw new Error('查询优惠买单详情失败')
        }
      } catch (err) {
        console.error(err)
        console.log('this.resData', this.resData)
        this.$message.error({ message: '查询优惠买单详情失败' })
      }
    },
    // 处理时间列表格式
    processTimeInfo() {
      for (let item of this.resData.timeConfList) {
        var tempObj = {}
        tempObj.label = this.discountPayEnum.timeType[item.timeType]
        tempObj.currentData = item
        tempObj.template = 'discountPayTimeInfo'
        this.timeInfoData.push(tempObj)
      }
    },
    // 去变更修改
    goToModify() {
      if (this.displayState === 'ONSHELVE') {
        this.putOfflineVisible = true
      } else {
        this[types.SET_DISCOUNTPAYMENT_APPLYID](this.$route.query.applyId)
        this.$router.push('/discountPaymentManage/discountPaymentModify')
      }
    },

    goBack() {
      this.$router.push('/discountPaymentManage/discountPaymentList')
    }

  }
}
</script>

<style scoped lang="scss">
.box{margin:40px 20px 0 20px;
    }
.el-card{
    margin-top:30px;
}
.buttonWrapper{
    margin-top:20px;
    display: flex;
    justify-content: center;
    button{
        margin-right:20px;
    }
}
.el-table {
    border:none;
   /deep/ td{border:none ;}
    &::before{
        height: 0px;
    }
    /deep/ th.is-leaf{
        display: none;

    }
}
h3{
    font-size: 18px;
    font-weight:bold;
    margin-bottom:15px;
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  // color:#606266
  font-weight:bold;
  margin:10px 0;
}
.formWrapper{
    width: 800px;
    min-height: 150px;
}

.imgRow{
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
    .label{
        width: 180px;
        margin-right: 50px;
    }
    .el-image{
        margin-right: 30px;
    }

    .el-carousel{
        width: 200px;
    }
}

</style>

