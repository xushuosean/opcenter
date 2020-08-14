<template>
  <div class="look-more-box">
    <h1 class="main-title">{{ mainTitle }}</h1>
    <span class="sub-title">{{ subTitle }}</span>
  </div>
</template>
<script>
export default {
  name: 'IndexEmptyBetween',
  props: {
    mainTitle: {
      type: String,
      default: '为您推荐'
    },
    subTitle: {
      type: String,
      default: '查看更多'
    }
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
        mainTitle: this.mainTitle,
        subTitle: this.subTitle
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.look-more-box{
    position:relative;
    width:100%;
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-top:5px;
    box-sizing:border-box;
    .main-title {
        font-size: 19px;
        color: #242120;
        font-weight:500;
        line-height:26px;
    }
    .sub-title {
        font-size: 12px;
        color: #0060F1;
        line-height:16px;
    }
}
</style>
