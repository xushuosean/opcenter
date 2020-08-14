<template>
  <div class="container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <h3>新增商户下属门店(非必填)</h3>
      <p class="store-num">该商户本次共新增{{ shopLength }}家门店</p>
      <el-button v-if="shopLength === 0" size="medium" plain icon="el-icon-plus" @click="addShopInfo">新增一家门店</el-button>
      <el-row v-else>
        <el-button size="medium" plain icon="el-icon-edit" @click="editShopInfo">修改信息</el-button>
        <el-button size="medium" plain icon="el-icon-delete" @click="removeShop">移除门店</el-button>
      </el-row>
    </el-card>
    <el-card v-if="shopLength === 1" class="el-card-mt20">
      <storeAdd ref="storeAdd" :shop-info-data="shopInfoData" :is-disabled="true" />
    </el-card>
    <el-dialog
      :visible.sync="visiableShow"
      width="60%"
      @close="dialogClose"
    >
      <storeAdd ref="storeAddDialog" :merchant-id="merchantId" :apply-id="applyId" :shop-info-data="shopInfoData" :is-shop-add="isShopAdd" :is-shop-edit="isShopEdit" @submitResult="submitResult" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleComponentForm">取 消</el-button>
        <el-button type="primary" :loading="requestLoading" @click="submitDialogForm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import storeAdd from './merchantStoreAdd.vue'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  // 商户新增下属门店
  name: 'MerchantStores',
  components: { storeAdd },
  data() {
    return {
      currentStep: 3,
      // 按钮loading
      requestLoading: false,
      // dialog状态
      visiableShow: false,
      // 门店信息
      shopInfoData: {},
      // 是否是新增门店
      isShopAdd: false,
      // 是否编辑门店
      isShopEdit: false
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'merchantId', 'applyId']),
    ...mapGetters('commonData', ['shopClassifyData']),
    shopLength() {
      return this.shopInfoData.shopId ? 1 : 0
    },
    // 判断是否为更新操作
    isUpdateOperation() {
      return this.merchantStep > this.currentStep
    }
  },
  created() {
    if (!this.isUpdateOperation) {
      this[`${types.SET_MERCHANT_STEP}`](this.currentStep)
    }
    // 查询商户下是否有门店
    this.queryShopInfo()
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`]),
    /** 存在两个storeAdd组件，一个用于回显不可编辑，一个用于dialog保存
     * dialog模式下,保存门店数据
     */
    submitDialogForm() {
      this.$refs['storeAddDialog'].submitComponentForm()
    },
    /**
     * 非dialog模式下，保存数据,如直接点下一步保存数据
     */
    submitComponentForm() {
      this.$refs['storeAdd'].submitComponentForm()
    },
    /** 关闭dialog */
    cancleComponentForm() {
      this.visiableShow = false
    },
    // 查询门店信息
    async queryShopInfo() {
      try {
        const responseData = await merchantManageService.queryMerchantInfo({
          applyId: this.applyId
        })
        if (responseData.resultCode === AjaxReturnType.SUCCESS) {
          let shopLength = responseData.data.shopList.length
          this.shopInfoData = shopLength > 0 ? responseData.data.shopList[0] : {}
          if (this.isShopEdit) {
            this.$refs['storeAdd'].setShopInfo()
          }
          this.cancleComponentForm()
        } else {
          this.$message.error(responseData.resultMsg)
        }
      } catch (error) {
        this.$message.error('查询门店信息发生错误')
        console.log(error)
      }
    },
    // 删除门店
    async deleteShopInfo() {
      try {
        const responseData = await merchantManageService.deleteShopInfo({
          applyId: this.shopInfoData.applyId
        })
        if (responseData.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success('删除门店信息成功')
          this.queryShopInfo()
        } else {
          this.$message.error(responseData.resultMsg)
        }
      } catch (error) {
        this.$message.error('删除门店信息发生错误')
        console.log(error)
      }
    },
    // 监听storeAdd组件保存状态，若保存成功，需重新查一次门店数据
    submitResult(value) {
      this.cancleComponentForm()
      if (value) {
        this.queryShopInfo()
      }
    },
    dialogClose() {
      this.cancleComponentForm()
    },
    // 新增门店
    addShopInfo() {
      this.visiableShow = true
      this.isShopEdit = false
      this.isShopAdd = true
    },
    // 编辑门店
    editShopInfo() {
      this.visiableShow = true
      this.isShopEdit = true
      this.isShopAdd = false
      this.$refs['storeAdd'].setShopInfo()
    },
    // 删除门店
    removeShop() {
      this.isShopEdit = false
      this.isShopAdd = false
      this.$confirm('是否删除该门店?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteShopInfo()
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container-box{
    .store-num{
        padding:20px 0;
    }
    /deep/.el-dialog__body{
        padding-top:0px;
    }
}
.el-dialog__body {
    padding:30px;
}
</style>
