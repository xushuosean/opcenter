<template>
  <div>
    <div v-if="args.isIntegralExchange">
      <div>积分兑换</div>
    </div>
    <div v-if="args.isIntegralExchange===false">
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
