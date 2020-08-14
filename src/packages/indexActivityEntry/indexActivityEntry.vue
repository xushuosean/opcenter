<template>
  <div class="activity-box">
    <img :src="src" alt="">
  </div>
</template>
<script>
export default {
  name: 'IndexActivityEntry',
  props: {
    src: {
      type: String,
      default: require('./img/activityBanner.png')
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
.activity-box{
    position:relative;
    width:335px;
    height:60px;
    overflow:hidden;
    border-radius:30px;
    margin:0 auto;
    margin-top:8px;
    img {
        width:100%;
        height:60px;
    }
}
</style>
