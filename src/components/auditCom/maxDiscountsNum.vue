<template>
  <div>
    <div v-if="args.setLimitNum">
      限量 {{ args.maxDiscountsNum }}笔订单/人
    </div>
    <div v-else>
      无上限
    </div>

  </div>

</template>

<script>
export default {
  props: {
    //   { label: '限购数量', keyObj: ['setLimitNum', 'maxDiscountsNum']
    args: {}
  },
  data() {
    return {}
  }
}

</script>

<style lang="scss" scoped>

</style>
