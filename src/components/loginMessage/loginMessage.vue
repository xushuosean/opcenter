<template>
  <el-row>
    <el-col class="message-box" :span="24">
      <div>
        <span>2018年12月31日</span>
        <span class="week">星期一</span>
      </div>
      <div class="business-box">
        业务员编号：<span>{{ businessNumber }}</span>
      </div>
      <div class="org-box">
        所属分行机构：<span>{{ organName }}</span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    // 业务员编号
    businessNumber: {
      type: String,
      default: '012345'
    },
    // 机构名称
    organName: {
      type: String,
      default: '广州分行-广州分行'
    }
  }
}
</script>
<style lang="scss" scoped>
.message-box{
    display:flex;
    align-items:center;
    .week{
        margin-left:10px;
    }
    .business-box{
        margin-left:40px;
    }
    .org-box{
        margin-left:40px;
    }
}
</style>
