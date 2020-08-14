<template>
  <div>
    <div>
      <createDiscountPaymentBaseInfo ref="baseInfo" :modify-mode="true" />
      <createDiscountPaymentRules ref="rules" :modify-mode="true" />
    </div>
    <div class="foot">
      <el-button type="primary" @click="goBack">取消并返回</el-button>
      <el-button type="primary" @click="submit">确认并提交审核</el-button>
    </div>
  </div>
</template>

<script>
import createDiscountPaymentBaseInfo from './createDiscountPayment/createDiscountPaymentBaseInfo.vue'
import createDiscountPaymentRules from './createDiscountPayment/createDiscountPaymentRules.vue'
import { mapMutations } from 'vuex'
import discountPaymentService from '@api/discountPaymentManage.service.js'
import * as types from '@store/mutation-types'
export default {
  components: {
    createDiscountPaymentBaseInfo,
    createDiscountPaymentRules
  },
  data() {
    return {}
  },
  beforeRouteLeave(to, from, next) {
    this[types.CLEAR_DISCOUNTPAYMENT_DATA]()
    next()
  },
  methods: {
    ...mapMutations('discountPayment', [types.CLEAR_DISCOUNTPAYMENT_DATA]),
    goBack() {
      this.$router.go(-1)
    },
    async submit() {
      let data1 = await this.$refs.baseInfo.saveComponentInfo()
      let data2 = await this.$refs.rules.saveComponentInfo()
      if (!data1 || !data2) {
        return
      }
      let data = {}
      Object.assign(data, data1, data2, { 'changeType': 'UPD' })
      try {
        let res = await discountPaymentService.updateDiscountPayment(data)
        if (res.resultCode === '000000') {
          this.$message.success({ message: '提交审核成功' })
        } else {
          throw new Error('提交变更失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '提交变更失败' })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.foot{
    margin-top:10px;
    display:flex;
    justify-content: center
}
</style>
