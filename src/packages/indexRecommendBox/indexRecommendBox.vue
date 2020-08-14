<template>
  <div class="recommend-box">
    <template v-for="(item,index) in couponIds">
      <indexCouponItem :key="index" :coupon-id="item.value" />
    </template>
  </div>
</template>
<script>
import indexCouponItem from '../indexCouponItem/indexCouponItem.vue'
export default {
  name: 'IndexRecommendox',
  components: { indexCouponItem },
  props: {
    // 设置的类型
    sourceType: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: null
    },
    // 自定义批次号数目
    couponIds: {
      type: Array,
      default: () => ['1']
    }
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
        sourceType: this.sourceType,
        couponIds: this.couponIds,
        num: this.num
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recommend-box{
    width:calc(100% - 20px);
    position:relative;
    // background: #FFE3B0;
    border-radius: 2px;
    padding-bottom:25px;
    overflow:hidden;
    margin:0 auto;
    min-height:100px;
}
</style>
