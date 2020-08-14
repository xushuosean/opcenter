<template>
  <div class="container-box">
    <createDiscountPaymentBaseInfo :is-disabled="true" />
    <createDiscountPaymentRules :is-disabled="true" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import createDiscountPaymentBaseInfo from './createDiscountPaymentBaseInfo.vue'
import createDiscountPaymentRules from './createDiscountPaymentRules.vue'
export default {
  components: { createDiscountPaymentBaseInfo, createDiscountPaymentRules },
  data() {
    return {
      currentStep: 2
    }
  },
  computed: {
    ...mapGetters('discountPayment', ['discountPaymentStep'])
  },
  methods: {
    ...mapMutations('discountPayment', [types.SET_DISCOUNTPAYMENT_STEP])
  },
  created() {
    if (this.discountPaymentStep <= this.currentStep) {
      this.SET_DISCOUNTPAYMENT_STEP(this.currentStep)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
