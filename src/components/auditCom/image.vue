<template>
  <!--  两个以内的照片直接显示，超过两个使用轮播图显示 -->
  <div>
    <div v-if="imgList.length===0">
      无图片数据
    </div>
    <div v-else-if="imgList.length<=2" class="container">
      <div v-for="(item,index) in imgList" :key="index" class="img-wrapper">
        <el-image
          style="width: 100px; height: 100px"
          :src="item"
          fit="contain"
          :preview-src-list="[item]"
        />
      </div>
    </div>
    <div v-else-if="imgList.length>2" class="container">
      <el-carousel height="120px">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image
            style="width: 100px; height: 100px"
            :src="item"
            fit="contain"
          />
        </el-carousel-item>
      </el-carousel>

    </div>
  </div>

</template>

<script>
export default {

  props: {
    args: {}
  },
  data() {
    return {
      imgList: []

    }
  },
  created() {
    if (this.args == '' || !this.args) {
      return
    } else {
      this.imgList = this.args.split(',')
    }
  }
}

</script>

<style lang="scss" scoped>
.container{
    display:flex;
    .img-wrapper{
        margin:10px;
    }
}
</style>
