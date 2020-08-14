<template>
  <el-row>
    <el-col class="dashboard-item">
      <h4 class="name">商户</h4>
      <div class="item">
        <span>商户入驻：</span>
        <div>
          <span class="num">10</span>
          <i class="el-icon-arrow-right" />
        </div>
      </div>
      <div class="item">
        <span>商户入驻：</span>
        <div>
          <span class="num">10</span>
          <i class="el-icon-arrow-right" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.dashboard-item{
    margin-top:15px;
    .item{
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding:14px 0;
        border-bottom:1px solid #ccc;
        .num{
            font-size:18px;
        }
    }
}
</style>
