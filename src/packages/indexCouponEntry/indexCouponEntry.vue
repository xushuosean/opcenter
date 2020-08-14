<template>
  <div class="coupon-empty-box">
    <img :src="src" alt="" class="bg-img">
  </div>
</template>
<script>
export default {
  name: 'IndexCouponEntry',
  props: {
    src: {
      type: String,
      default: require('./img/couponone.png')
    },
    href: {
      type: String,
      default: ''
    },
    linkType: {
      type: String,
      default: ''
    },
    couponId: {
      type: String,
      default: ''
    },
    shopId: {
      type: String,
      default: ''
    },
    shopType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
        src: this.src,
        href: this.href,
        linkType: this.linkType,
        couponId: this.couponId,
        shopId: this.shopId,
        shopType: this.shopType
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.coupon-empty-box{
    width:162px;
    height:100px;
    position:relative;
    overflow:hidden;
    border-radius:4px;
    z-index:99;
    .bg-img{
        display:block;
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
    }
    .decoration-icon{
        width:23px;
        height:23px;
        background:url("./img/openCoupon.png") no-repeat center;
        background-size:100% 100%;
        position:absolute;
        top:60px;
        left:14px;
        z-index:9;
    }
    .coupon-title {
        font-size: 17px;
        color: #FFFFFF;
        line-height:24px;
        position:absolute;
        top:14px;
        left:14px;
    }
    .coupon-price {
        font-size: 12px;
        color: #FFFFFF;
        line-height:16px;
        position:absolute;
        top:39px;
        left:14px;
    }
    .coupon-img {
      width:65px;
      position:absolute;
      right:4px;
      bottom:4px;
    }

}
</style>
