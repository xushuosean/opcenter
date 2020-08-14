<template>
  <el-container class="container-box">
    <el-main>
      <router-view ref="routerView" />
      <el-card class="el-card-mt20" shadow="hover">
        <steps class="steps-box" :steps-data="stepsData" :current-step="discountPaymentStep" />
        <div class="button-box">
          <el-button v-if="discountPaymentStep > 0" class="next-step-button" type="primary" size="medium" @click="toPrevStep">
            {{ discountPaymentStep === 2 ? '返回修改' : '上一步' }}
          </el-button>
          <el-button v-if="discountPaymentStep < 2" class="next-step-button" type="primary" size="medium" @click="toNextStep">
            下一步
          </el-button>
          <el-button v-if="discountPaymentStep === 2" class="jump-step-button" type="primary" size="medium" @click="confirmResultAndAudit">
            确认并审核
          </el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import steps from '@com/steps/steps.vue'
import discountPaymentService from '@api/discountPaymentManage.service.js'

export default {
  components: { steps },
  data() {
    return {
      stepsData: [ // 创建优惠买单进度条数据
        {
          name: '优惠买单基本信息',
          to: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentBaseInfo'
        },
        {
          name: '配置时间分摊规则及结算模式',
          to: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentRules'
        },
        {
          name: '确认提交审核',
          to: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentResultAudit'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('discountPayment', ['discountPaymentStep', 'applyId']),
    stepsLength() {
      return this.stepsData.length
    },
    nextStepPath() {
      if (this.discountPaymentStep <= 1) {
        return this.stepsData[this.discountPaymentStep + 1].to
      } else {
        return '/discountPaymentManage/discountPaymentList'
      }
    },
    prevStepPath() {
      if (this.discountPaymentStep >= 1) {
        return this.stepsData[this.discountPaymentStep - 1].to
      } else {
        return '/discountPaymentManage/discountPaymentList'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this[`${types.CLEAR_DISCOUNTPAYMENT_DATA}`]()
    next()
  },
  methods: {
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_STEP, types.CLEAR_DISCOUNTPAYMENT_DATA, types.ADD_DISCOUNTPAYMENT_STEP]),
    async toNextStep() {
      let res = await this.$refs.routerView.saveComponentInfo()
      if (!res) { return }
      if (this.discountPaymentStep <= this.stepsLength - 1) {
        this.$router.push(this.nextStepPath)
        this[types.ADD_DISCOUNTPAYMENT_STEP](1)
      }
    },
    toPrevStep() {
      if (this.discountPaymentStep > 0) {
        this.$router.push(this.prevStepPath)
        this[types.ADD_DISCOUNTPAYMENT_STEP](-1)
      }
    },
    async  confirmResultAndAudit() {
      try {
        let res = await discountPaymentService.submitAudit({ auditObjId: this.applyId , auditObjType: 'DISCOUNTPAY', applyType: 'ADD' })
        if (res.success === true) {
          this.$message.success('提交审核成功')
        } else {
          throw new Error('提交审核失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error('提交审核失败')
      }
      this.$router.push('/audit/DiscountPayCreationAudit')
    }
  }
}
</script>
<style lang="scss" scoped>
.container-box{
    .steps-box {
        width:80%;
        margin:0 auto;
        margin-top:20px;
        /deep/.el-step__title {
            font-size:15px;
        }
    }
    .button-box{
        text-align:center;
        margin-top:40px;
        .prev-step-button{
            display:inline-block;
        }
        .next-step-button{
            display:inline-block;
            margin-left:40px;
        }
    }
}
</style>

