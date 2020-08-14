<template>
  <div>
    <div v-if="args.isSignOnlinePay">
      <div class="detail">
        <span class="item">手续费</span> <span>{{ args.onlineCommisRate }}‰（千分比）</span>
      </div>
      <div class="detail">
        <span class="item">交易限额</span> <span>{{ args.perTransLimit }} 元/笔</span>   <span>{{ args.dailyTransLimit }}元/天</span>
      </div>

    </div>
    <div v-if="args.isSignOnlinePay === false">
      无
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
      content: ''
    }
  },
  created() {

  }
}

</script>

<style lang="scss" scoped>
span{
    margin:0 10px;
}
.item{
    margin-right:15px;
}
.detail{
  padding-bottom:10px;
}
</style>
