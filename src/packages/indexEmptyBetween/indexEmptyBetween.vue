<template>
  <div class="empty-box-between">
    <slot>
      <indexCouponEntry />
      <indexCouponEntry />
    </slot>
  </div>
</template>
<script>
import indexCouponEntry from '../indexCouponEntry/indexCouponEntry.vue'
export default {
  name: 'IndexEmptyBetween',
  components: { indexCouponEntry },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {}
    }
  }
}
</script>
<style lang="scss" scoped>
.empty-box-between{
    position:relative;
    width:335px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #FFFFFF;
    margin:0 auto;
    z-index:99;
    // margin-top:15px;
    min-height:100px;
}
</style>
