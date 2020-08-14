<template>
  <el-container class="box">
    <el-header height="120px">
      <h3>用户端页面管理</h3>
      <el-form :model="choosePageForm" :rule="choosePageRule" label-width="98px">
        <el-form-item label="编辑页面">
          <el-select v-model="choosePageForm.page">
            <el-option label="本地优惠首页" value="homePage" />
            <el-option label="优惠券展示页" value="ticketPage" />
            <el-option label="附近优惠展示页" value="nearbyPage" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container class="content">
      <mobileClientMain mode="structure" />
    </el-container>
  </el-container>
</template>
<script>
import mobileClientMain from '@com/mobileClientPages/mobileClientMain/mobileClientMain.vue'
export default {
  components: {
    mobileClientMain
  },
  data() {
    return {
      choosePageForm: {
        station: '',
        page: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
    margin:40px 20px 0 20px;
    background-color: #fff;
    padding:20px;

    h3{
        margin-bottom: 20px;
    }
}
.content{
    min-height:500px;
}
.el-aside{
    padding-left: 20px;
}
.editArea{
  h4{
      color:#707070;
      margin-bottom:20px;
      margin-top:10px;
  }
}
</style>
