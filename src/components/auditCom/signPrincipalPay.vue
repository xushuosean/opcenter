<template>
  <div>
    <div v-if="args.isPrincipalPay">
      <div>本金购买</div>
      <div><span>手续费</span> {{ args.cashCommisRate }}‰（千分比）</div>
    </div>
    <div v-if="args.isPrincipalPay===false">
      无
    </div>

  </div>

</template>

<script>
export default {
  props: {
    args: {}
  },
  data() {
    return {}
  }
}

</script>

<style lang="scss" scoped>

</style>
