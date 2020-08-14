<template>
  <div :class="['container-box',type==='UPDATE'?'pd24':'']">
    <merchantBaseInfo ref="merchantBaseInfo" :is-disabled="isDisabled" :type="type" form-item-type="ADD" />
    <merchantSettleAccount ref="merchantSettleAccount" :is-disabled="isDisabled" :type="type" form-item-type="ADD" />
    <merchantPictureResource ref="merchantPictureResource" :is-disabled="isDisabled" :type="type" form-item-type="ADD" />
    <el-card v-if="shopLength>0" class="el-card-mt20" shadow="hover">
      <merchantStoreAdd ref="storeAdd" :is-disabled="true" :shop-info-data="shopInfoData" :is-shop-add="false" />
    </el-card>
    <el-row v-if="type==='UPDATE'" class="el-row-flex">
      <el-button type="primary" size="medium" @click="cancle">
        取消返回
      </el-button>
      <el-button style="margin-left:24px;" type="primary" size="medium" @click="submitComponentForm">
        确认并审核
      </el-button>
    </el-row>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import merchantBaseInfo from './merchantBaseInfo.vue'
import merchantSettleAccount from './merchantSettleAccount.vue'
import merchantPictureResource from './merchantPictureResource.vue'
import merchantStoreAdd from './merchantStoreAdd'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  // 商户提交审核
  name: 'MerchantResultAudit',
  components: { merchantBaseInfo, merchantSettleAccount, merchantPictureResource, merchantStoreAdd },
  data() {
    return {
      currentStep: 4,
      shopInfoData: { },
      shopLength: 0,
      isDisabled: true,
      // 组件用途：ADD - 入驻时 UPDATE - 变更时
      type: 'ADD'
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'merchantId', 'applyId'])
  },
  created() {
    const { type } = this.$route.query
    if (type) {
      this.type = type
    }
    if (this.type === 'UPDATE') {
      this.isDisabled = false
      this.queryMerFormalInfo()
    }
  },
  mounted() {
    // 修改商户详情时不需查门店信息
    if (this.type === 'ADD' && this.merchantStep <= this.currentStep) {
      this[`${types.SET_MERCHANT_STEP}`](this.currentStep)
      this.handleShopInfo()
    }
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`, types.CLEAR_STORE_DATA]),
    // 查询门店配置信息
    queryShopInfo() {
      return new Promise(async(resolve, reject) => {
        try {
          const responseData = await merchantManageService.queryMerchantInfo({
            applyId: this.applyId
          })
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            this.shopLength = responseData.data.shopList.length
            this.shopInfoData = this.shopLength > 0 ? responseData.data.shopList[0] : ''
            resolve(true)
          } else {
            this.$message.error(responseData.resultMsg)
            resolve(false)
          }
        } catch (error) {
          this.$message.error('查询门店信息发生错误')
          reject('查询门店信息发生错误')
          console.log(error)
        }
      })
    },
    // 门店信息回显
    async handleShopInfo() {
      await this.queryShopInfo()
      if (this.shopLength > 0) {
        this.$refs['storeAdd'].setShopInfo()
      }
    },
    // 查询商户详情
    async queryMerFormalInfo() {
      try {
        let res = await merchantManageService.queryMerchantInfo({
          applyId: this.applyId
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.merchantInfoData = res.data
          this.$refs['merchantBaseInfo'].handleDefaultData(this.merchantInfoData)
          this.$refs['merchantSettleAccount'].handleDefaultData(this.merchantInfoData)
          this.$refs['merchantPictureResource'].handleDefaultData(this.merchantInfoData)
        } else {
          this.$message.error('查询商户详情失败')
        }
        console.log(res)
      } catch (e) {
        this.$message.error('查询商户详情发生错误')
        console.log(e)
      }
    },
    // 提交审核
    submitComponentForm() {
      /**
       * 提交审核的参数
       * auditObjId  审核对象Id;其它大部分为申请Id(门店申请id,商户申请id)
       * auditObjType 审核对象类型：商户：MERCHANT;门店：SHOP
       * applyType 申请操作类型：新增/入驻：ADD;变更:UPD;状态变更：UPD_STATE;续约：RECONTRACT
       * */
      const requestData = {
        auditObjId: this.applyId,
        auditObjType: 'MERCHANT',
        applyType: this.type === 'ADD' ? 'ADD' : 'UPD'
      }
      return new Promise(async(resolve, reject) => {
        try {
          const responseData = await merchantManageService.merchantSubmitExamine(requestData)
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            this.$message({
              message: '提交审核成功',
              type: 'success',
              onClose: () => {
                // 跳转至进件列表,并清空applyId,merchantId
                if (this.type === 'UPDATE') {
                  this.$router.push('/merchantManage/entryList')
                  this[`${types.CLEAR_STORE_DATA}`]()
                }
                resolve(true)
              }
            })
          } else {
            this.$message.error(responseData.resultMsg)
            resolve(false)
          }
        } catch (error) {
          this.$message.error('提交审核发生错误')
          reject('提交审核发生错误')
          console.log(error)
        }
      })
    },
    cancle() {
      this.$router.push({
        name: 'merchantList'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .pd24{
    padding:24px;
  }
  .el-row-flex{
    display: flex;
    justify-content: center;
    margin-top:24px;
  }
</style>
