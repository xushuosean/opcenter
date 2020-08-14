<template>
  <div class="list-item-box">
    <div class="icon-box">
      <img :src="src" alt="">
    </div>
    <span class="icon-text">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'IndexListItem',
  props: {
    src: {
      type: String,
      default: require('./img/coupons.png')
    },
    href: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '优惠券'
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
        title: this.title,
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
.list-item-box{
    width:47px;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:15px 17.5px;
    z-index:99;
    .icon-box {
        width:47px;
        height:47px;
        overflow:hidden;
        img {
            display:block;
            width:47px;
            height:47px;
        }
    }
    .icon-text {
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        white-space: nowrap;
        margin-top:2px;
    }
}
</style>
