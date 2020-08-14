<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <el-button class="edit" type="primary" size="small" @click="editShopInfo">修改门店信息</el-button>
      <merchantStoreAdd :merchant-id="merchantId" :apply-id="applyId" :shop-info-data="shopInfoData" :is-disabled="true" type="UPDATE" />
      <el-button class="back" type="primary" @click="goBack">返回</el-button>
    </el-card>
    <el-dialog
      :visible.sync="visiableShow"
      width="60%"
      @close="dialogClose"
    >
      <merchantStoreAdd ref="storeAddDialog" :merchant-id="merchantId" :apply-id="applyId" :shop-info-data="shopInfoData" :is-shop-add="false" :is-shop-edit="true" @submitResult="submitResult" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submitDialogForm">确认并提交审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import merchantStoreAdd from './enter/merchantStoreAdd.vue'
import MerchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  // 门店详情
  name: 'StoreListDetail',
  components: { merchantStoreAdd },
  data() {
    return {
      // 门店id
      shopId: '',
      // 商户id
      merchantId: '',
      // 申请id
      applyId: '',
      // 门店数据
      shopInfoData: {},
      // dialog状态
      visiableShow: false
    }
  },
  computed: {
  },
  created() {
    this.shopId = this.$route.query.shopId
    if (this.shopId) {
      this.queryShopDetailInfo()
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 查询门店详情
    async queryShopDetailInfo() {
      try {
        let res = await MerchantManageService.queryShopDetailInfo({
          shopId: this.shopId
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.shopInfoData = res.data
          console.log(1)
        } else {
          this.$message.error('查询门店详情失败')
        }
      } catch (e) {
        this.$message.error('查询门店详情发生错误')
        console.log(e)
      }
    },
    // 编辑门店
    editShopInfo() {
      this.visiableShow = true
    },
    // 关闭弹窗
    dialogClose() {
      this.visiableShow = false
    },
    // 保存门店
    submitDialogForm() {

    },
    // 保存结果
    submitResult() {

    }
  }
}
</script>
<style lang="scss" scoped>
    .container-box{
        margin:20px;
        overflow:hidden;
        position: relative;
        .edit{
            position: absolute;
            top:48px;
            left:180px;
            z-index:99;
        }
        .back{
            display: block;
            margin:0 auto;
            width:120px;
            margin-top:-15px;
        }
        /deep/.el-dialog__header{
            display: none;
        }
    }

</style>
