<template>
  <div class="box">
    <div v-for="(item,index) in ways" :key="index">
      {{ discountPayEnum.payWay[item] }}<span v-if="index<ways.length-1">,</span>
    </div>

  </div>

</template>

<script>
import discountPayEnum from '@enum/discountPay-enum.js'
export default {
  props: {
    args: {}
  },
  data() {
    return {
      discountPayEnum,
      ways: []
    }
  },
  created() {
    if (!this.args) { return }
    this.ways = this.args.split(',')
  }
}

</script>

<style lang="scss" scoped>
.box{
    display: flex;
}
</style>
