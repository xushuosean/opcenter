<template>
  <div class="business-container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <el-collapse v-model="activeName">
        <el-collapse-item name="merchantInfo">
          <template slot="title">
            <h3 class="head-title">商户结算信息<el-button v-if="isShowEditButton" type="primary" size="small" style="margin-left:48px;" @click.stop="editShopInfo">修改商户信息</el-button></h3>
          </template>
          <el-form ref="settlementInfoForm" label-position="left" :model="settlementInfoForm" :rules="settlementInfoRules" label-width="140px" class="componentForm" :disabled="isDisabledCopy">
            <el-form-item label="结算账号" prop="acctNo" required>
              <el-input v-model="settlementInfoForm.acctNo" :clearable="true" size="medium" placeholder="请输入账户结算账户账号" />
            </el-form-item>
            <el-form-item label="账户类型" prop="acctType" required>
              <el-select v-model="settlementInfoForm.acctType" :clearable="true" size="medium" placeholder="请选择账户类型">
                <el-option v-for="item in accountTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="开户名" prop="acctName" required>
              <el-input v-model="settlementInfoForm.acctName" :clearable="true" size="medium" placeholder="请输入结算账户的开户名" />
            </el-form-item>
            <el-form-item label="开户银行" prop="bankId" required>
              <el-select v-model="settlementInfoForm.bankId" :clearable="true" size="medium" placeholder="请选择开户银行">
                <el-option v-for="item in acctBankNameTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="开户网点" prop="orgCode" required>
              <multilevelSelection :multilevel-selection-value="settlementInfoForm.orgCode" type="areaCode" :multilevel-selection-options="siteData" @on-select="handleOrgCodeSelect" />
            </el-form-item>
            <el-form-item v-if="!isDisabledCopy">
              <el-button type="primary" :loading="settlementInfoLoading" @click="submitComponentForm">保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 商戶签约信息 -->
    <merchantContractType ref="merchantContractType" :is-disabled="isDisabled" :type="type" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import { accountType, acctBankNameType } from '@enum/merchantManage-enum.js'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import merchantInfoMixin from '@/mixin/merchantInfo-mixin.js'
import merchantContractType from './merchantContractType.vue'
export default {
  // 商户结算信息
  name: 'MerchantSettleAccount',
  components: { multilevelSelection, merchantContractType },
  mixins: [merchantInfoMixin],
  data() {
    return {
      currentStep: 1,
      // 按钮状态
      settlementInfoLoading: false,
      settlementInfoForm: {
        // 所属商户申请id
        applyId: '',
        // 结算账户
        acctNo: '',
        // 账户类型
        acctType: '',
        // 开户名
        acctName: '',
        // 开户行
        bankId: '',
        // 开户网点
        orgCode: [],
        // orgCode[orgCode.length - 1]
        openNetworkId: ''
      },
      accountTypeList: accountType.transformEnumDepTypes('options'),
      acctBankNameTypeList: acctBankNameType.transformEnumDepTypes('options'),
      settlementInfoRules: {
        acctNo: [{
          required: true, message: '结算账号不能为空', trigger: 'blur'
        }],
        acctType: [{
          required: true, message: '账户类型不能为空', trigger: 'blur'
        }],
        acctName: [{
          required: true, message: '开户名不能为空', trigger: 'blur'
        }],
        bankId: [{
          required: true, message: '开户银行不能为空', trigger: 'blur'
        }],
        orgCode: [{
          required: true, message: '开户网点不能为空', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'applyId']),
    ...mapGetters('commonData', ['orgData', 'siteData']),
    // 判断是否未更新操作
    isUpdateOperation() {
      return this.merchantStep > this.currentStep
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
      if (!this.isUpdateOperation) {
        this.getDefaultData()
      } else {
        this[`${types.SET_MERCHANT_STEP}`](this.currentStep)
      }
    }
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`]),
    // 选择开户网点
    handleOrgCodeSelect(orgCode) {
      this.settlementInfoForm.orgCode = orgCode
      this.settlementInfoForm.openNetworkId = orgCode[orgCode.length - 1]
    },
    // 保存||更新商户商户结算信息
    submitComponentForm() {
      if (this.saveStatus) {
        return false
      }
      this.$refs['settlementInfoForm'].validate(async valid => {
        if (valid) {
          this.settlementInfoForm.applyId = this.applyId
          let requestData = this.settlementInfoForm
          let responseData = null
          this.settlementInfoLoading = true
          try {
            responseData = await merchantManageService.insertMerchantSettlementInfo(requestData)
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
              this.saveStatus = true
              // 更新成功时更新数据
              if (this.isUpdateOperation) {
                this.getDefaultData()
              }
            }
            this.settlementInfoLoading = false
          } catch (err) {
            this.$message.error('保存失败')
            this.settlementInfoLoading = false
            console.log(err)
          }
        }
      })
    },
    // 处理数据回显
    handleDefaultData(defaultData) {
      let Keys = Object.keys(this.settlementInfoForm)
      let componentForm = {}
      Keys.map(e => {
        componentForm[e] = defaultData[e]
      })
      this.settlementInfoForm = componentForm
      // 机构回显需后端额外处理
      this.settlementInfoForm.orgCode = ['666', '12345']
      if (this.type === 'UPDATE') {
        this.$refs['merchantContractType'].handleDefaultData(defaultData)
      }
    },
    // 回显数据
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
        .el-input{
            width:80px;
            margin:0 10px;
        }
    }
}
</style>
