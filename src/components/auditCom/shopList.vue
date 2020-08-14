<template>
  <div class="box">
    <div v-for="(item,index) in args" :key="index" class="row">
      <span class="index">门店{{ index + 1 }}</span> <span>{{ item.shopName }}</span> <span>(门店编号:{{ item.shopId }})</span>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    args: {
      default: () => { return [] }
    }
  },
  data() {
    return {}
  },
  created() {

  }
}

</script>

<style lang="scss" scoped>
.box{
    max-height: 100px;
    overflow: auto;
    .row{
        display: flex;
        padding-bottom: 6px;
        span{
            margin-right:10px;

        }
    }
}
</style>
