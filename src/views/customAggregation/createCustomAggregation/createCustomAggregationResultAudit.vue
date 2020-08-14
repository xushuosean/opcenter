<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>自定义聚合基本信息</h3>
      <div class="detail">
        <div class="row">
          <div class="label">
            聚合名称
          </div>
          <div class="content">
            肯德基夏日优惠
          </div>
        </div>
        <div class="row">
          <div class="label">
            聚合对象
          </div>
          <div class="content">
            肯票券
          </div>
        </div>
        <div class="row">
          <div class="label">
            选择聚合对象
          </div>
          <div class="content">
            <div class="sub-row">肯德基夏日优惠</div>
            <div class="sub-row">肯德基冬日优惠</div>

          </div>
        </div>
        <div class="row">
          <div class="label">
            分享连链显示内容
          </div>
          <div class="content">
            自定义
          </div>
        </div>
        <div class="row">
          <div class="label">
            分享标题
          </div>
          <div class="content">
            肯德基夏日优惠
          </div>
        </div>
        <div class="row">
          <div class="label">
            分享描述
          </div>
          <div class="content">
            肯德基夏日优惠描述描述描述描述
          </div>
        </div>
        <div class="row">
          <div class="label">
            分享图片
          </div>
          <div class="content">
            <img src="" alt="分享图片">
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'

export default {
  components: { },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {
  },
  watch: {
    formData() {
      console.log(this.formData)
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.detail{
  padding:20px 0;
  .row{
    display:flex;
    padding:10px;
    .label{
      width: 180px;
      margin-right:10px
    }
    .content{
      flex:1;
      .sub-row{
        padding: 5px;
      }
      img{
        width: 150px;
       max-height: 300px;
      }

    }
  }
}

</style>
