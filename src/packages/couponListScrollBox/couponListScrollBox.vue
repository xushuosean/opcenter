<template>
  <div class="wrapper">
    <div v-for="(item,index) in couponIds" :key="index">
      <indexCouponItem />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import indexCouponItem from '../indexCouponItem/indexCouponItem.vue'
export default {
  name: 'CouponListScrollBox',
  components: {
    indexCouponItem
  },
  props: {
    num: {
      type: Number,
      default: null
    },
    // 自定义批次号数目
    couponIds: {
      type: Array,
      default: () => ['1', '1', '1']
    }
  },
  methods: {
    getConfig: function() {
      return {
        num: this.num,
        couponIds: this.couponIds
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .wrapper {
      width:100vw;
      overflow:auto;
      min-height:calc(100vh - 204px);
    }
</style>
