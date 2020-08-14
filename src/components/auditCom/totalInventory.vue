<template>
  <div>
    <div v-if="args.setInventoryLimit">
      限量 {{ args.totalInventory }}笔订单
    </div>
    <div v-else>
      无上限
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
  },
  created() {

  }
}

</script>

<style lang="scss" scoped>

</style>
