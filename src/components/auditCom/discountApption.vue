<template>
  <div class="box">
    <div v-if="args.discountsRule==='TOTAL'">
      <div class="row">
        满{{ discountsReduceList[0][0] }}减{{ discountsReduceList[0][1] }}元
      </div>
      <div class="row">
        总行 {{ apptionList[0][0] }} 元, 分行 {{ apptionList[0][1] }} 元 ,商户 {{ apptionList[0][2] }} 元
      </div>
    </div>
    <div v-if="args.discountsRule==='LADDER'">
      <div class="row">
        满{{ discountsReduceList[0][0] }}减{{ discountsReduceList[0][1] }}元
      </div>
      <div class="row">
        总行 {{ apptionList[0][0] }} 元, 分行 {{ apptionList[0][1] }} 元 ,商户 {{ apptionList[0][2] }} 元
      </div>
      <div class="row">
        满{{ discountsReduceList[1][0] }}减{{ discountsReduceList[1][1] }}元
      </div>
      <div class="row">
        总行 {{ apptionList[1][0] }} 元, 分行 {{ apptionList[1][1] }} 元 ,商户 {{ apptionList[1][2] }} 元
      </div>
      <div class="row">
        满{{ discountsReduceList[2][0] }}减{{ discountsReduceList[2][1] }}元
      </div>
      <div class="row">
        总行 {{ apptionList[2][0] }} 元, 分行 {{ apptionList[2][1] }} 元 ,商户 {{ apptionList[2][2] }} 元
      </div>
    </div>
    <div v-if="args.discountsRule==='FULL'">
      <div class="row">
        每满{{ discountsReduceList[0][0] }}减{{ discountsReduceList[0][1] }}元
        <span> 优惠封顶 {{ args.maxDiscountsAmt }}元</span>
      </div>
      <div class="row">
        总行 {{ apptionList[0][0] }} 元, 分行 {{ apptionList[0][1] }} 元 ,商户 {{ apptionList[0][2] }} 元
      </div>
    </div>
    <div v-if="args.discountsRule==='REBATE'">
      <div class="row">
        满{{ discountsReduceList[0][0] }} 折扣{{ discountsReduceList[0][1]*10 }}折
      </div>
      <div class="row">
        总行 {{ apptionList[0][0]*10 }} 折, 分行 {{ apptionList[0][1]*10 }} 折 ,商户 {{ apptionList[0][2]*10 }} 折
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    // { "discountsRule": "TOTAL", "discountsReduceValue": "599:100", "apportionRuleValue": "5:4:3|3:2:1" }
    args: {}
  },
  data() {
    return {
      discountsReduceList: [],
      apptionList: []
    }
  },
  created() {
    let tempReduceList = this.args.discountsReduceValue.split('|')
    this.discountsReduceList = tempReduceList.map(item => {
      return item.split(':')
    })
    let tempApptionList = this.args.apportionRuleValue.split('|')
    this.apptionList = tempApptionList.map(item => {
      return item.split(':')
    })
  }
}

</script>

<style lang="scss" scoped>
.row{
    padding:5px 0;
}
</style>
