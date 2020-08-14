<template>
  <el-container class="dashboard-box">
    <el-main>
      <loginMessage />
      <!-- 待审核 -->
      <el-row class="el-row-mt20">
        <el-col :span="24">
          <el-card shadow="hover">
            <h3>待审核</h3>
            <div class="wait-audit-box">
              <dashboardItem class="wait-audit-item" />
              <dashboardItem class="wait-audit-item" />
              <dashboardItem class="wait-audit-item" />
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 商户信息等 -->
      <el-row :gutter="20" class="el-row-mt20">
        <el-col :span="8">
          <el-card shadow="hover">
            <h3>商户信息</h3>
            <div class="shop-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
          <el-card class="el-card-mt20" shadow="hover">
            <h3>门店信息</h3>
            <div class="store-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <h3>票券信息</h3>
            <div class="ticket-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
          <el-card class="el-card-mt20" shadow="hover">
            <h3>优惠买单信息</h3>
            <div class="discount-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" shadow="hover">
          <el-card>
            <h3>红包信息</h3>
            <div class="redpackage-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
          <el-card class="el-card-mt20" shadow="hover">
            <h3>定向发放信息</h3>
            <div class="distribution-msg-box">
              <dashboardItem class="wait-audit-item" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import loginMessage from '@com/loginMessage/loginMessage.vue'
import dashboardItem from '@com/dashboardItem/dashboardItem.vue'
export default {
  components: { loginMessage, dashboardItem }
}
</script>
<style lang="scss" scoped>
.dashboard-box{
    h3{
        font-size:16px;
    }
    .wait-audit-box{
        display: flex;
        justify-content: space-between;
        .wait-audit-item{
            width:22%;
            position:relative;
            &::after{
                content:"";
                display:block;
                position:absolute;
                top:50%;
                transform: translateY(-50%);
                right:-10%;
                height:100px;
                width:1px;
                background-color:#ccc;

            }
        }
    }
}
</style>

