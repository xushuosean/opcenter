<template>
  <div class="box">
    <div class="title">
      {{ discountPayEnum.discountsRule[rule] }}
    </div>
    <div v-if="rule==='TOTAL'" class="content">
      <div class="row"> 总金额满{{ valueList[0][0] }}元，共减免{{ valueList[0][1] }}元</div>
    </div>
    <div v-if="rule==='LADDER'" class="content">
      <div class="row">第一层 金额满{{ valueList[0][0] }}元 减免{{ valueList[0][1] }}元</div>
      <div class="row">第二层 金额满{{ valueList[1][0] }}元 减免{{ valueList[1][1] }}元</div>
      <div class="row">第三层 金额满{{ valueList[2][0] }}元 减免{{ valueList[2][1] }}元</div>
    </div>
    <div v-if="rule==='FULL'" class="content">
      <div class="row"> 金额每满{{ valueList[0][0] }}元，每次立减{{ valueList[0][1] }}元</div>
      <div v-if="args.setLimitAmt" class="row">优惠封顶金额 {{ args.maxDiscountsAmt }}元</div>
    </div>
    <div v-if="rule==='DEBIT'" class="content">
      <div class="row"> 总金额满{{ valueList[0][0] }}元，全单折扣{{ valueList[0][1]*10 }}折</div>
      <div v-if="args.setLimitAmt" class="row">优惠封顶金额 {{ args.maxDiscountsAmt }}元</div>
    </div>
  </div>

</template>

<script>
import discountPayEnum from '@enum/discountPay-enum.js'
export default {
  props: {
    // ['discountsRule', 'discountsReduceValue','setLimitAmt', 'maxDiscountsAmt']两个参数
    args: {}
  },
  data() {
    return {
      discountPayEnum
    }
  },
  created() {
    if (!this.args) { return }
    this.rule = this.args.discountsRule
    let tempList = this.args.discountsReduceValue.split('|')
    this.valueList = tempList.map(item => {
      return item.split(':')
    })
  }
}

</script>

<style lang="scss" scoped>
.content{
    padding:6px 0;
    .row{padding:3px 0}
}
</style>
