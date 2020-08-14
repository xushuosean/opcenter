<template>
  <div class="business-container-box">
    <el-card class="el-card-mt20" shadow="hover">
      <el-collapse v-model="activeName">
        <el-collapse-item name="merchantInfo">
          <template slot="title">
            <h3 class="head-title">商户基础信息<el-button v-if="isShowEditButton" type="primary" size="small" style="margin-left:48px;" @click.stop="editShopInfo">修改商户信息</el-button></h3>
          </template>
          <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm" size="medium" :disabled="isDisabledCopy">
            <!-- 变更时 -->
            <template v-if="formItemType==='UPDATE'">
              <el-form-item label="商户编号">
                <el-input v-model="componentForm.merchantId" />
              </el-form-item>
            </template>
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="componentForm.merchantName" :clearable="true" placeholder="请输入营业执照上的商户注册名称" />
            </el-form-item>
            <el-form-item label="商户地区" prop="siteCode" required>
              <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.siteCode" :multilevel-selection-options="regionData" @on-select="handleAreaSelect" />
            </el-form-item>
            <el-form-item label="商户地址" prop="detailAddr" required>
              <el-input v-model="componentForm.detailAddr" :clearable="true" placeholder="请输入营业执照上的地址(无需输入省，市，区)" />
            </el-form-item>
            <el-form-item label="商户类型" prop="merchantType" required>
              <el-select v-model="componentForm.merchantType" :clearable="true" placeholder="请选择商户类型">
                <el-option v-for="item in merchantTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <template v-if="IsIndivid">
              <el-form-item label="经营者姓名" prop="juriPersonName" required>
                <el-input v-model="componentForm.juriPersonName" :clearable="true" placeholder="请输入商户经营者姓名" />
              </el-form-item>
              <el-form-item label="经营者证件类型" prop="juriPersonCertType" required>
                <el-select v-model="componentForm.juriPersonCertType" :clearable="true" placeholder="请选择商户类型">
                  <el-option v-for="item in juriPersonCertTypeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="经营者证件号码" prop="juriPersonCertNo" required>
                <el-input v-model="componentForm.juriPersonCertNo" :clearable="true" placeholder="请输入商户法定代表人的身份证件号码" />
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="法定代表人" prop="juriPersonName" required>
                <el-input v-model="componentForm.juriPersonName" :clearable="true" placeholder="请输入商户法定代表人姓名" />
              </el-form-item>
              <el-form-item label="法定证件类型" prop="juriPersonCertType" required>
                <el-select v-model="componentForm.juriPersonCertType" :clearable="true" placeholder="请选择商户类型">
                  <el-option v-for="item in juriPersonCertTypeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="法定证件号码" prop="juriPersonCertNo" required>
                <el-input v-model="componentForm.juriPersonCertNo" :clearable="true" placeholder="请输入商户法定代表人的身份证件号码" />
              </el-form-item>
            </template>
            <el-form-item label="商户联系人姓名" prop="contactName" required>
              <el-input v-model="componentForm.contactName" :clearable="true" placeholder="请输入商户联系人姓名" />
            </el-form-item>
            <el-form-item label="商户联系人手机号" prop="contactPhone" required>
              <el-input v-model="componentForm.contactPhone" :clearable="true" placeholder="请输入商户联系人手机号" />
            </el-form-item>
            <el-form-item label="工商执照类型" prop="bussLicenseType" required>
              <el-select v-model="componentForm.bussLicenseType" :clearable="true" placeholder="请选择工商执照类型">
                <el-option v-for="item in bussLicenseTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <template v-if="IsThreeEvidenceUnity">
              <!-- 三证合一时 -->
              <el-form-item label="统一社会信用代码" prop="unifSocialCreditCode" required>
                <el-input v-model="componentForm.unifSocialCreditCode" :clearable="true" placeholder="请输入营业执照上的统一社会信用代码" />
              </el-form-item>
              <el-form-item label="执照编号" prop="licenseNo" required>
                <el-input v-model="componentForm.licenseNo" :clearable="true" placeholder="请输入营业执照上的执照编号" />
              </el-form-item>
            </template>
            <template v-else>
              <!-- 非三证合一时 -->
              <el-form-item label="营业执照注册号" prop="licenseRegistNo" required>
                <el-input v-model="componentForm.licenseRegistNo" :clearable="true" placeholder="请输入营业执照注册号" />
              </el-form-item>
              <el-form-item label="组织机构代码" prop="orgCode" required>
                <el-input v-model="componentForm.orgCode" :clearable="true" placeholder="请输入组织机构代码证的代码" />
              </el-form-item>
              <el-form-item label="税务登记号" prop="taxRegsitNo" required>
                <el-input v-model="componentForm.taxRegsitNo" :clearable="true" placeholder="请输入税务登记证的登记号" />
              </el-form-item>
            </template>
            <el-form-item label="营业执照有效期" prop="merchantLicenDate" required>
              <el-date-picker
                v-model="componentForm.merchantLicenDate"
                :clearable="true"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="商户合作属性" prop="coopType" required>
              <el-select v-model="componentForm.coopType" :clearable="true" placeholder="请选择商户合作属性">
                <el-option v-for="item in merchantCooperTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="商户经营类别" prop="bizClassesId" required>
              <el-select v-model="componentForm.bizClassesId" :clearable="true" placeholder="请选择商户经营类别">
                <el-option v-for="item in merchantOptTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="合同有效期" prop="contractDate" required>
              <el-date-picker
                v-model="componentForm.contractDate"
                :clearable="true"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="所属分行机构" prop="orgnaztionCode" required>
              <multilevelSelection :multilevel-selection-value="componentForm.orgnaztionCode" type="orgCode" :multilevel-selection-options="orgData" @on-select="handleOrgCodeSelect" />
            </el-form-item>
            <el-form-item label="业务员编号" prop="clerkNo" required>
              <el-input v-model="componentForm.clerkNo" :clearable="true" placeholder="请输入营业执照上的执照编号" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="componentForm.remark" type="textarea" :clearable="true" placeholder="请输入营业执照上的执照编号" />
            </el-form-item>
            <!-- 变更时 -->
            <template v-if="formItemType==='UPDATE'">
              <el-form-item label="商户状态">
                <el-input v-model="componentForm.merchantStatus" size="medium" />
                <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" :disabled="false" plain>冻结商户</button>
              </el-form-item>
              <el-form-item label="商户管理员账号">
                <el-input v-model="componentForm.merAdminAccount" size="medium" />
                <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" :disabled="false" plain>重置密码</button>
              </el-form-item>
            </template>
            <el-form-item v-if="!isDisabledCopy">
              <el-button type="primary" :loading="requestLoading" @click="submitComponentForm">保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import { merchantType, juriPersonCertType, bussLicenseType, merchantCooperType } from '@enum/merchantManage-enum.js'
import { validatePhoneNumber } from '@utils/validator.js'
import MerchantManageService from '@api/merchantManage.service.js'
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import { AjaxReturnType } from '@enum/service-enum.js'
import merchantInfoMixin from '@/mixin/merchantInfo-mixin.js'
export default {
  // 商户基本信息
  name: 'MerchantBaseInfo',
  components: { multilevelSelection },
  mixins: [merchantInfoMixin],
  data() {
    return {
      currentStep: 0,
      componentForm: {
        // 商户编号
        merchantId: '',
        // 商户名称
        merchantName: '',
        // 商户地区
        siteCode: [],
        // siteCode[0]
        provinceId: '',
        // siteCode[1]
        cityId: '',
        // siteCode[2]
        areaId: '',
        // 商户地址
        detailAddr: '',
        // 商户类型
        merchantType: '',
        // 法定代表人
        juriPersonName: '',
        // 法人证件类型
        juriPersonCertType: '',
        // 法人证件号码
        juriPersonCertNo: '',
        // 商户联系人姓名
        contactName: '',
        // 商户联系人手机号
        contactPhone: '',
        // 工商执照类型
        bussLicenseType: '',
        // 统一社会信用代码
        unifSocialCreditCode: '',
        // 执照编号
        licenseNo: '',
        // 营业执照注册号
        licenseRegistNo: '',
        // 组织机构代码
        orgCode: '',
        // 税务登记号码
        taxRegsitNo: '',
        // 营业执照有效开始日期
        licenseStartDate: '',
        // 营业执照有效结束日期
        licenseEndDate: '',
        // 商户合作属性
        coopType: '',
        // 商户经营类别
        bizClassesId: '',
        // 合同有效开始日期
        contractStartDate: '',
        // 合同有效结束日期
        contractEndDate: '',
        // 分行机构
        orgnaztionCode: [],
        // orgnaztionCode[0]
        firstOrgId: '',
        // orgnaztionCode[1]
        secondOrgId: '',
        // orgnaztionCode[2]
        thirdOrgId: '',
        // 业务员编号
        clerkNo: '',
        // 备注
        remark: '',
        // 商户状态
        merchantStatus: '',
        // 管理员账号
        merAdminAccount: ''
      },
      // 按钮loading
      requestLoading: false,
      merchantTypeList: merchantType.transformEnumDepTypes('options'),
      juriPersonCertTypeList: juriPersonCertType.transformEnumDepTypes('options'),
      bussLicenseTypeList: bussLicenseType.transformEnumDepTypes('options'),
      merchantCooperTypeList: merchantCooperType.transformEnumDepTypes('options'),
      merchantOptTypeList: [],
      rules: {
        merchantName: [{
          required: true, message: '商户名称不能为空', trigger: 'blur'
        }],
        siteCode: [{
          required: true, message: '商户地区不能为空', trigger: 'blur'
        }],
        detailAddr: [{
          required: true, message: '商户地址不能为空', trigger: 'blur'
        }],
        merchantType: [{
          required: true, message: '商户类型不能为空', trigger: 'blur'
        }],
        juriPersonName: [{
          required: true, message: '法定代表人不能为空', trigger: 'blur'
        }],
        juriPersonCertType: [{
          required: true, message: '法人证件类型不能为空', trigger: 'blur'
        }],
        juriPersonCertNo: [{
          required: true, message: '法人证件号码不能为空', trigger: 'blur'
        }],
        contactName: [{
          required: true, message: '商户联系人姓名不能为空', trigger: 'blur'
        }],
        contactPhone: [{
          required: true, message: '商户联系人手机号不能为空', trigger: 'blur'
        }, {
          validator: validatePhoneNumber, trigger: 'blur'
        }],
        bussLicenseType: [{
          required: true, message: '工商执照类型不能为空', trigger: 'blur'
        }],
        unifSocialCreditCode: [{
          required: true, message: '统一社会信用代码不能为空', trigger: 'blur'
        }],
        licenseRegistNo: [{
          required: true, message: '营业执照注册号不能为空', trigger: 'blur'
        }],
        orgCode: [{
          required: true, message: '组织机构代码不能为空', trigger: 'blur'
        }],
        taxRegsitNo: [{
          required: true, message: '税务登记号不能为空', trigger: 'blur'
        }],
        licenseNo: [{
          required: true, message: '执照编号不能为空', trigger: 'blur'
        }],
        merchantLicenDate: [{
          required: true, message: '营业执照有效开始与结束日期不能为空', trigger: 'blur'
        }],
        coopType: [{
          required: true, message: '商户合作属性不能为空', trigger: 'blur'
        }],
        bizClassesId: [{
          required: true, message: '商户经营类别不能为空', trigger: 'blur'
        }],
        contractDate: [{
          required: true, message: '合同有效开始与结束日期不能为空', trigger: 'blur'
        }],
        orgnaztionCode: [{
          required: true, message: '所属分行机构不能为空', trigger: 'blur'
        }],
        clerkNo: [{
          required: true, message: '业务员编号不能为空', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters('merchantManage', ['merchantStep', 'applyId']),
    ...mapGetters('commonData', ['regionData', 'orgData']),
    // 判断工商执照的类型
    IsThreeEvidenceUnity() {
      return this.componentForm.bussLicenseType === bussLicenseType.transformEnumDepTypes('keys', bussLicenseType.UNITE_THREE_CARD)
    },
    // 判断商户类型
    IsIndivid() {
      return this.componentForm.merchantType === merchantType.transformEnumDepTypes('keys', merchantType.INDIVID)
    },
    // 判断是否是编辑更新操作
    isUpdateOperation() {
      return this.merchantStep > this.currentStep
    }
  },
  created() {
    this.queryBizClassList()
    // type||merchantInfoData 为props 定义在mixin中
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
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_STEP}`, `${types.SET_APPLY_ID}`, `${types.SET_MERCHANT_ID}`]),
    // 商户经营类别查询
    async queryBizClassList() {
      try {
        const responseData = await MerchantManageService.queryBizClassList()
        if (responseData.resultCode === AjaxReturnType.SUCCESS) {
          this.merchantOptTypeList = responseData.data.map(e => ({
            value: e.bizClassesId,
            label: e.classesName
          }))
        } else {
          this.$message.error('查询经营类别发生错误')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 选择商户地区
    handleAreaSelect(area) {
      this.componentForm.siteCode = area
      this.componentForm.provinceId = area[0]
      this.componentForm.cityId = area[1]
      this.componentForm.areaId = area[2]
    },
    // 选择分行机构
    handleOrgCodeSelect(orgCode) {
      this.componentForm.orgnaztionCode = orgCode
      this.componentForm.firstOrgId = orgCode[0]
      this.componentForm.secondOrgId = orgCode[1]
      this.componentForm.thirdOrgId = orgCode[2]
    },
    // 保存||更新商户基本信息
    submitComponentForm() {
      if (this.saveStatus) {
        return false
      }
      this.$refs['componentForm'].validate(async valid => {
        if (valid) {
          this.requestLoading = true
          const { merchantLicenDate, contractDate } = this.componentForm
          this.componentForm.licenseStartDate = merchantLicenDate[0]
          this.componentForm.licenseEndDate = merchantLicenDate[1]
          this.componentForm.contractStartDate = contractDate[0]
          this.componentForm.contractEndDate = contractDate[1]
          let requestData = this.componentForm
          try {
            let responseData = null
            // 变更时走更新接口
            if (this.type === 'UPDATE') {
              requestData = { ...this.componentForm, applyId: this.applyId }
              responseData = await MerchantManageService.updateMerchantBaseInfo(requestData)
            } else {
              if (!this.isUpdateOperation) {
                responseData = await MerchantManageService.insertMerchantBaseInfo(requestData)
              } else {
                requestData = { ...this.componentForm, applyId: this.applyId }
                responseData = await MerchantManageService.updateMerchantBaseInfo(requestData)
              }
            }
            this.requestLoading = false
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              // 保存applyId merchantId到vuex中
              this.saveStatus = true
              if (responseData.data != null) {
                const { applyId, merchantId } = responseData.data
                if (applyId) {
                  this[`${types.SET_APPLY_ID}`](applyId)
                  this[`${types.SET_MERCHANT_ID}`](merchantId)
                }
              }
              if (this.isUpdateOperation) {
                this.getDefaultData()
              }
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
            }
          } catch (error) {
            this.$message.error('保存失败')
            this.requestLoading = false
            console.log(error)
          }
        }
      })
    },
    // 处理数据回显
    handleDefaultData(defaultData) {
      let Keys = Object.keys(this.componentForm)
      let componentForm = {}
      Keys.map(e => {
        componentForm[e] = defaultData[e]
      })
      const { licenseStartDate, licenseEndDate, contractStartDate, contractEndDate, provinceId, cityId, areaId, firstOrgId, secondOrgId, thirdOrgId } = componentForm
      this.componentForm = componentForm
      this.componentForm.siteCode = [provinceId, cityId, areaId].filter(e => e != 0)
      this.componentForm.orgnaztionCode = [firstOrgId, secondOrgId, thirdOrgId].filter(e => e != 0)
      this.componentForm.merchantLicenDate = [new Date(licenseStartDate), new Date(licenseEndDate)]
      this.componentForm.contractDate = [new Date(contractStartDate), new Date(contractEndDate)]
    },
    // 回显数据
    async getDefaultData() {
      try {
        const requestData = { applyId: this.applyId }
        if (this.applyId) {
          const defaultResponseData = await MerchantManageService.queryMerchantInfo(requestData)
          this.handleDefaultData(defaultResponseData.data)
        }
      } catch (error) {
        this.$message.error('查询商户基本信息发生错误')
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
}
</style>
