<template>
  <div class="search-box">
    <div class="search-icon-box" />
    <div class="search-line" />
    <div class="search-input-box">
      <input disabled class="inner-input" type="text" :placeholder="placeHolderText">
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexSearch',
  props: {
    placeHolderText: {
      type: String,
      default: '大家都在搜：优惠商家'
    }
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
        placeHolderText: this.placeHolderText
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .search-box {
        width:335px;
        height:30px;
        // background: rgba(255,255,255,0.60);
        background:#efefef;
        border-radius: 30px;
        display:flex;
        align-items:center;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        top:10px;
        z-index:99;
        .search-icon-box {
            width:25px;
            height:25px;
            background:url("./img/searchIcon.png") no-repeat center;
            background-size:contain;
            margin-left:7px;
        }
        .search-line {
            width:1px;
            height:20px;
            background: url("./img/searchLine.png") no-repeat center;
            background-size:contain;
            margin:0 10px;
            margin-left:7px;
        }
        .search-input-box {
            flex:1;
            .inner-input{
                display:block;
                width:100%;
                height:30px;
                font-size:14px;
                line-height:30px;
                color:#fff;
                background:transparent;
                border-radius:30px;
                &::placeholder {
                    color:#fff;
                    opacity:0.8;
                }
            }
        }
    }
</style>
