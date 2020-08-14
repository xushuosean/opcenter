<template>
  <el-card class="el-card-mt20" shadow="hover">
    <el-collapse v-model="activeName">
      <el-collapse-item name="merchantInfo">
        <template slot="title">
          <h3 class="head-title">签约交易类型<el-button v-if="isShowEditButton" type="primary" size="small" style="margin-left:48px;" @click.stop="editShopInfo">修改商户信息</el-button></h3>
        </template>
        <el-form ref="transTypeInfoForm" label-position="left" :model="transTypeInfoForm" :rules="transTypeInfoRules" label-width="140px" class="componentForm" :disabled="isDisabledCopy">
          <!-- 在线买单 -->
          <template>
            <el-form-item label="交易类型" style="margin-bottom:10px;" prop="signTransType">
              <el-checkbox v-model="isSignOnlinePay">在线买单</el-checkbox>
            </el-form-item>
            <el-row class="form-item-row">
              <span class="row-label">手续费</span>
              <el-input-number v-model="transTypeInfoForm.onlineCommisRate" controls-position="right" :min="0" :disabled="!isSignOnlinePay" />‰(千分比)
            </el-row>
            <el-row class="form-item-row line14">
              <span class="row-label">交易限额</span>
              <el-input-number v-model="transTypeInfoForm.perTransLimit" controls-position="right" size="medium" :min="0" :disabled="!isSignOnlinePay" />元/笔
              <el-input-number v-model="transTypeInfoForm.dailyTransLimit" controls-position="right" size="medium" :min="0" :disabled="!isSignOnlinePay" />元/天
            </el-row>
          </template>
          <!--优惠券 -->
          <template>
            <el-form-item style="margin-bottom:10px;margin-top:10px;">
              <el-checkbox v-model="isSignCoupon">优惠券</el-checkbox>
            </el-form-item>
            <el-row class="form-item-row">
              <el-checkbox v-model="isPrincipalPay" :disabled="!isSignCoupon">本金购买</el-checkbox>
            </el-row>
            <el-row class="form-item-row">
              <span class="row-label">手续费</span>
              <el-input-number v-model="transTypeInfoForm.cashCommisRate" controls-position="right" size="medium" :min="0" :disabled="!isPrincipalPay" />‰(千分比)
            </el-row>
          </template>
          <el-form-item v-if="!isDisabledCopy" style="margin-top:20px;">
            <el-button type="primary" :loading="TransTypeInfoLoading" @click="submitComponentForm">保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import merchantInfoMixin from '@/mixin/merchantInfo-mixin.js'
export default {
  // 商户签约交易类型
  name: 'MerchantContractType',
  mixins: [merchantInfoMixin],
  data() {
    return {
      currentStep: 1,
      // 是否选择在线买单
      isSignOnlinePay: false,
      // 是否选择优惠券
      isSignCoupon: false,
      // 是否选择本金购买
      isPrincipalPay: false,
      // 请求接口未响应时按钮所处状态
      TransTypeInfoLoading: false,
      transTypeInfoForm: {
        // 申请id
        applyId: '',
        // 在线买单手续费率
        onlineCommisRate: '',
        // 每笔交易限额
        perTransLimit: '',
        // 每天交易限额
        dailyTransLimit: '',
        // 优惠券本金购买手续费率
        cashCommisRate: ''
      },
      transTypeInfoRules: {}
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'applyId']),
    // 判断是否为更新状态
    isUpdateOperation() {
      return this.merchantStep > this.currentStep
    }
  },
  watch: {
    // 监听勾选状态
    isSignOnlinePay(newValue, oldValue) {
      if (!newValue) {
        this.transTypeInfoForm.onlineCommisRate = ''
        this.transTypeInfoForm.perTransLimit = ''
        this.transTypeInfoForm.dailyTransLimit = ''
      }
    },
    isSignCoupon(newValue, oldValue) {
      if (!newValue) {
        this.isPrincipalPay = false
      }
    },
    isPrincipalPay(newValue, oldValue) {
      if (!newValue) {
        this.transTypeInfoForm.cashCommisRate = ''
      }
    }
  },
  created() {
    /**
     * type||merchantInfoData为props 定义在mixin中
     * merchantInfoData数据格式传入前做处理
     */
    if (this.type === 'UPDATE') {
      // this.handleDefaultData(this.merchantInfoData)
    } else {
      if (this.isUpdateOperation) {
        this.getDefaultData()
      } else {
        this[`${types.SET_MERCHANT_STEP}`](this.currentStep)
      }
    }
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`]),
    // 保存||更新签约交易类型
    async submitComponentForm() {
      if (this.saveStatus) {
        return false
      }
      const partOfRequest = {
        isSignOnlinePay: this.isSignOnlinePay,
        isSignCoupon: this.isSignCoupon,
        isPrincipalPay: this.isPrincipalPay
      }
      this.TransTypeInfoLoading = true
      this.transTypeInfoForm.applyId = this.applyId
      this.transTypeInfoForm.onlineCommisRate = this.transTypeInfoForm.onlineCommisRate / 1000
      this.transTypeInfoForm.cashCommisRate = this.transTypeInfoForm.cashCommisRate / 1000
      const requestData = { ...this.transTypeInfoForm, ...partOfRequest }
      try {
        if (this.isSignOnlinePay || this.isSignCoupon) {
          const responseData = await merchantManageService.insertMerchantTransTypeInfo(requestData)
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000
            })
            this.saveStatus = true
            if (this.isUpdateOperation) {
              this.getDefaultData()
            }
          }
          this.TransTypeInfoLoading = false
        } else {
          this.$message({
            message: '交易类型不能为空',
            type: 'warning',
            duration: 1000
          })
          this.TransTypeInfoLoading = false
        }
      } catch (error) {
        this.$message.error('保存错误错误')
        console.log(error)
        this.TransTypeInfoLoading = false
      }
    },
    // 处理数据回显
    handleDefaultData(defaultData) {
      let Keys = Object.keys(this.transTypeInfoForm)
      let componentForm = {}
      Keys.map(e => {
        componentForm[e] = defaultData[e]
      })
      const { onlineCommisRate, cashCommisRate, perTransLimit, dailyTransLimit } = componentForm
      this.transTypeInfoForm.onlineCommisRate = onlineCommisRate * 1000
      this.transTypeInfoForm.cashCommisRate = cashCommisRate * 1000
      this.transTypeInfoForm.perTransLimit = perTransLimit
      this.transTypeInfoForm.dailyTransLimit = dailyTransLimit
      this.isSignOnlinePay = defaultData.isSignOnlinePay
      this.isSignCoupon = defaultData.isSignCoupon
      this.isPrincipalPay = defaultData.isPrincipalPay
    },
    // 数据回显
    async getDefaultData() {
      try {
        const requestData = { applyId: this.applyId }
        if (this.applyId) {
          const responseData = await merchantManageService.queryMerchantInfo(requestData)
          this.handleDefaultData(responseData.data)
        }
      } catch (error) {
        this.$message.error('查询商户信息发生错误')
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-collapse{
    border:none !important;
}
/deep/.el-collapse-item__header{
    border:none;
}
/deep/.el-collapse-item__wrap{
    border:none;
}
.container-box{
    .head-title{
        margin-right:20px;
        line-height:40px;
        font-size:16px;
    }
    .page-title{
        display:flex;
        align-items:center;
    }
    .componentForm{
        margin-top:20px;
        .el-input{
            max-width:350px;
        }
        .el-textarea{
            max-width:350px;
        }
    }
    .form-item-row{
        width:fit-content;
        font-size:14px;
        margin-left:164px;
        margin-top:10px;
        position:relative;
        &.line,&.line14{
            padding-bottom:20px;
        }
        &.line::after{
            content:"";
            display:block;
            width:120%;
            height:1px;
            background-color:#ccc;
            position:absolute;
            left:0;
            bottom:0;
        }
        &.line14::after{
            content:"";
            display:block;
            width:120%;
            height:1px;
            background-color:#ccc;
            position:absolute;
            left:-24px;
            bottom:0;

        }
        .row-label{
            display:inline-block;
            width:60px;
        }
        .el-input-number{
            width:150px;
            margin:0 10px;
        }
    }
}
</style>
