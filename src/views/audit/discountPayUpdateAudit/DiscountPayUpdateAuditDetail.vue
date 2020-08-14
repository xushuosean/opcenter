<template>
  <div class="box">
    <AuditStatusBar v-if="$route.query.op==='audit'" @click="modify" />
    <el-card>
      <h3>优惠买单基本信息</h3>
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
    <!-- 审核日志 -->
    <AuditLog v-if="$route.query.op==='view'" />

    <!-- 审核操作 -->
    <el-card v-if="$route.query.op==='audit'">
      <h3>审核结果</h3>
      <div class="formWrapper">
        <el-form ref="form" :model="formModel" :rules="formRule" label-width="96px" label-position="left">
          <el-form-item prop="auditResult" label="选择结果">
            <el-radio-group v-model="formModel.auditResult">
              <el-radio label="PASS"> 审核通过</el-radio>
              <el-radio label="NOTPASS">审核不通过 </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formModel.auditResult==='NOTPASS'" prop="auditOpinion" label="审核意见">
            <el-input v-model="formModel.auditOpinion" type="textarea" :rows="3" placeholder="请输入审核意见" />
            <el-form-item />
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <div class="buttonWrapper">
      <el-button v-if="$route.query.op==='audit'" type="primary" @click="submit">提交审核结果</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>

  </div>
</template>
<script>
// 这是什么？
// import { type } from 'os';
import discountPayEnum from '@enum/discountPay-enum.js'
import { mapMutations } from 'vuex'
import * as types from '@store/mutation-types'

import discountPaymentService from '@api/discountPaymentManage.service.js'
import auditService from '@api/audit.service.js'
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
      apportionInfoData: [],
      formModel: {
        auditResult: '',
        auditOpinion: ''
      },
      formRule: {
        auditResult: [{ required: true, trigger: 'blur', message: '请选择审核结果' }],
        auditOpinion: [{ required: true, trigger: 'blur', message: '请输入审核意见' }]
      }

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
    ...mapMutations('discountPayment', [types.CLEAR_DISCOUNTPAYMENT_DATA, types.SET_DISCOUNTPAYMENT_APPLYID]),
    modify() {
      this[ types.CLEAR_DISCOUNTPAYMENT_DATA]()
      this[ types.SET_DISCOUNTPAYMENT_APPLYID](this.$route.query.applyId)
      this.$router.push('/discountPaymentManage/createDiscountPayment/createDiscountPaymentBaseInfo')
    },
    // 获取审核相关的数据
    async getData() {
      try {
        let res = await discountPaymentService.queryDiscountPayDetail({ applyId: this.$route.query.applyId })
        if (res.resultCode === '000000') {
          this.resData = res.data
        } else {
          throw new Error('查询优惠买单新增失败')
        }
      } catch (err) {
        console.error(err)
        console.log('this.resData', this.resData)
        this.$message.error({ message: '查询优惠买单新增失败' })
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

    goBack() {
      this.$router.push('/audit/DiscountPayCreationAudit')
    },
    judgeAuditStage() {
      if (this.$AUDIT_STATUS_FIRST.indexOf(this.$route.query.auditState) > -1) {
        return 'FIRST'
      } else if (this.$AUDIT_STATUS_FINAL.indexOf(this.$route.query.auditState) > -1) {
        return 'FINAL'
      }
    },

    async submit() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ message: '不合法的提交数据' }); return }
      try {
        let res = await auditService.completeAudit({
          auditObjId: this.$route.query.applyId,
          auditJnlNo: this.$route.query.auditJnlNo,
          auditType: this.judgeAuditStage(),
          auditResult: this.formModel.auditResult,
          auditOpinion: this.formModel.auditOpinion

        })
        if (res.resultCode === '000000') {
          this.$notify.success({ message: '提交审核结果成功' })
        } else {
          throw new Error('审核失败')
        }
      } catch (err) {
        this.$notify.error({ message: '审核失败' })
        console.error(err)
      }
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

