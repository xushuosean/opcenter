<template>
  <el-container :class="['container-box',mode==='single'?'el-card':'',mode==='single'?'is-hover-shadow':'']">
    <el-main class="container-main-box">
      <h3 class="bold">门店基本信息</h3>
      <el-form ref="componentForm" label-position="left" :model="componentForm" :rules="rules" label-width="140px" class="componentForm" :disabled="isDisabled">
        <el-form-item label="门店名称" prop="shopName">
          <el-input v-model="componentForm.shopName" :clearable="true" size="medium" placeholder="请输入门店对外经营全称" />
        </el-form-item>
        <!-- 正式表中门店独有 -->
        <template v-if="type==='UPDATE'">
          <el-form-item label="门店编号" prop="shopId">
            <el-input v-model="componentForm.shopId" size="medium" />
          </el-form-item>
          <el-form-item label="APP端详情页Url" prop="shopUrl">
            <el-input v-model="componentForm.shopUrl" size="medium" />
            <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" plain>复制链接</button>
          </el-form-item>
          <el-form-item label="门店所属商户" prop="shopMerchant">
            <el-input v-model="componentForm.shopMerchant" size="medium" />
            <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" plain>查看所属商户</button>
          </el-form-item>
          <el-form-item label="门店状态" prop="shopStatus">
            <el-input v-model="componentForm.shopStatus" size="medium" />
            <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" plain>隐藏门店</button>
            <button class="el-button el-button--default el-button--medium is-plain" size="medium" plain>冻结门店</button>
          </el-form-item>
        </template>
        <el-form-item label="门店Logo" prop="shopLogoPath">
          <imgUpload tips="仅支持上传一张图片" :limit="1" @upload-success="uploadPictureSuccess" />
        </el-form-item>
        <el-form-item label="门店类别" prop="shopCtgrId">
          <multilevelSelection type="shopClassifyCode" :multilevel-selection-value="componentForm.shopCtgrId" :multilevel-selection-options="shopClassifyData" @on-select="handleShopCtgrSelect" />
        </el-form-item>
        <el-form-item label="门店地区" prop="siteCode">
          <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.siteCode" :multilevel-selection-options="regionData" @on-select="handleAreaSelect" />
        </el-form-item>
        <el-form-item label="门店地址" prop="detailAddr">
          <el-input v-model="componentForm.detailAddr" :clearable="true" size="medium" placeholder="请输入门店地址（无须输入省、市、区）" />
        </el-form-item>
        <el-form-item label="门店商圈" prop="bizAreaId">
          <el-select v-model="componentForm.bizAreaId" :clearable="true" size="medium" placeholder="请选择门店商圈">
            <el-option v-for="(item,index) in bizAreaIdList" :key="index" :label="item.districtName" :value="item.districtId" />
          </el-select>
          <span style="margin-left:24px;">若无对应商圈，可至“系统管理-商圈管理”新增或修改</span>
        </el-form-item>
        <el-form-item label="营业时间" prop="compeleteDate">
          <el-checkbox-group v-model="weeks" @change="bussiDateChange">
            <el-checkbox label="全周" />
            <el-checkbox label="周一" />
            <el-checkbox label="周二" />
            <el-checkbox label="周三" />
            <el-checkbox label="周四" />
            <el-checkbox label="周五" />
            <el-checkbox label="周六" />
            <el-checkbox label="周日" />
          </el-checkbox-group>
          <el-time-picker
            v-model="componentForm.bussiTime"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="bussiTimeChange"
          />
          <span style="margin-left:24px;">该营业时间仅用于用户端App的商家详情页内展示</span>
        </el-form-item>
        <el-form-item label="门店服务电话" prop="shopServicePhone">
          <el-input v-model="componentForm.shopServicePhone" :clearable="true" size="medium" placeholder="请输入门店服务电话，展示于用户端App的商家详情页" />
        </el-form-item>
        <el-form-item label="门店联系人姓名" prop="shopContactName">
          <el-select v-model="componentForm.isSyncConName" :clearable="true" size="medium" placeholder="请选择门店联系人姓名">
            <el-option v-for="(item,index) in shopContactTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-if="isCustomName" v-model="componentForm.shopContactName" style="width:220px;margin-left:10px;" :clearable="true" size="medium" placeholder="请输入门店联系人真实姓名" />
          <span v-else style="margin-left:10px;">{{ componentForm.shopContactName }}</span>
        </el-form-item>
        <el-form-item label="门店联系人手机号" prop="shopContactTel">
          <el-select v-model="componentForm.isSyncConTel" :clearable="true" size="medium" placeholder="请选择门店联系人手机号">
            <el-option v-for="(item,index) in shopContactTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-if="isCustomPhone" v-model="componentForm.shopContactTel" style="width:220px;margin-left:10px;" :clearable="true" size="medium" placeholder="请输入门店联系人手机号" />
          <span v-else style="margin-left:10px;">{{ componentForm.shopContactTel }}</span>
        </el-form-item>
        <el-form-item label="是否支持在线买单" prop="isSignOnlinePay">
          <el-select v-model="componentForm.isSignOnlinePay" :clearable="true" size="medium" placeholder="请选择是否支持在线买单">
            <el-option v-for="item in isOpenOnlineList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否支持多券核销" prop="isManyCpnVerify">
          <el-select v-model="componentForm.isManyCpnVerify" :clearable="true" size="medium" placeholder="请选择是否支持多券核销">
            <el-option v-for="item in isOpenOnlineList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <h3 class="el-card-mt20 bold">门店管理员账号</h3>
        <el-form-item label="自定义登录账号" prop="shopManagerLoginNum" class="el-form-mt20">
          <el-input v-model="componentForm.shopManagerLoginNum" :clearable="true" size="medium" placeholder="自定义门店管理员登录好兴动商户平台的账号" />
        </el-form-item>
        <h3 class="el-card-mt20 bold">结算信息</h3>
        <el-form-item label="同步商户结算信息" prop="isSyncMechtSettle" class="el-form-mt20">
          <el-checkbox-group v-model="componentForm.isSyncMechtSettle">
            <el-checkbox label="同步所属商户结算信息" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="结算账号" prop="acctNo">
          <el-input v-model="componentForm.acctNo" :clearable="true" size="medium" placeholder="请输入门店结算账户账号" :disabled="settleAccountDisabled" />
        </el-form-item>
        <el-form-item label="账户类型" prop="acctType">
          <el-select v-model="componentForm.acctType" :clearable="true" size="medium" placeholder="请选择账户类型" :disabled="settleAccountDisabled">
            <el-option v-for="(item,index) in accountTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="开户名" prop="acctName">
          <el-input v-model="componentForm.acctName" :clearable="true" size="medium" placeholder="请输入结算账户的开户名" :disabled="settleAccountDisabled" />
        </el-form-item>
        <el-form-item label="开户银行" prop="bankId">
          <el-select v-model="componentForm.bankId" :clearable="true" size="medium" placeholder="请选择开户银行" :disabled="settleAccountDisabled">
            <el-option v-for="(item,index) in acctBankNameTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="开户网点" prop="orgCode">
          <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.orgCode" :disabled="settleAccountDisabled" :multilevel-selection-options="siteData" @on-select="handleOrgCodeSelect" />
        </el-form-item>
        <!-- 变更时存在 -->
        <template v-if="type==='UPDATE'">
          <h3 class="el-card-mt20 bold">门店最近机构</h3>
          <el-form-item label="最近机构" prop="nearOrg" class="el-form-mt20">
            <el-input v-model="componentForm.nearOrg" size="medium" />
          </el-form-item>
          <el-form-item label="机构与门店距离" prop="orgDistance">
            <el-input v-model="componentForm.orgDistance" size="medium" />
          </el-form-item>
          <h3 class="el-card-mt20 bold">门店管理员账号</h3>
          <el-form-item label="管理员登录账号" prop="loginNumber" class="el-form-mt20">
            <el-input v-model="componentForm.loginNumber" size="medium" />
            <button class="el-button el-button--default el-button--medium is-plain" style="margin-left:24px;" size="medium" :disabled="false" plain>重置密码</button>
          </el-form-item>
          <h3 class="el-card-mt20 bold">门店二维码</h3>
          <el-form-item label="二维码展示" prop="loginNumber" class="el-form-mt20" style="positon:relative">
            <imgUpload :limit="1" />
            <button class="el-button el-button--default el-button--medium is-plain" style="position:absolute;top:0;left:12%" size="medium" :disabled="false" plain>复制图片</button>
          </el-form-item>
        </template>
        <el-row v-if="mode==='single'" class="el-row-flex">
          <el-button type="primary" size="medium" @click="cancle">
            取消返回
          </el-button>
          <el-button style="margin-left:24px;" type="primary" size="medium" @click="submitComponentForm">
            确认并审核
          </el-button>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import imgUpload from '@com/imgUpload/imgUpload.vue'
import { validatePhoneNumber } from '@utils/validator.js'
import { shopContactType, isBooleanType, accountType, acctBankNameType, shopBussinessWeeks } from '@enum/merchantManage-enum.js'
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import { transformTime } from '@utils/helper.js'
export default {
  // 门店新增
  name: 'MerchantStoreAdd',
  components: { imgUpload, multilevelSelection },
  props: {
    // 组件用途：入驻(ADD)与变更(UPDATE)
    type: {
      type: String,
      default: 'ADD'
    },
    // 商户id
    merchantId: {
      type: null,
      default: ''
    },
    // 商户申请id
    applyId: {
      type: null,
      default: ''
    },
    // 用于控制整个表单是否编辑
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 用于门店信息回显数据
    shopInfoData: {
      type: Object,
      default: () => ({})
    },
    // 是否是新增门店
    isShopAdd: {
      type: Boolean,
      default: false
    },
    // 是否修改门店
    isShopEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentStep: 1,
      mode: '',
      // 每周营业日
      weeks: [],
      // 门店申请id 用于门店信息更新
      shopApplyId: '',
      syncMechtSettle: false,
      componentForm: {
        // 商户id
        merchantId: this.merchantId,
        // 门店名称
        shopName: '',
        // 门店logo
        shopLogoPath: '',
        // 门店分类
        shopCtgrId: [],
        // 门店一级分类
        firstCatId: '',
        // 门店二级分类
        secondCatId: '',
        // 门店所在站点
        siteCode: [],
        // 门店所在站点省份
        provinceId: '',
        // 门店所在站点市
        cityId: '',
        // 门店所在区
        areaId: '',
        // 门店地址
        detailAddr: '',
        // 门店商圈
        bizAreaId: '',
        // 营业时间，用于表单校验
        compeleteDate: '',
        // 0000000
        bussinessWeeks: '',
        // 每日营业开始时间
        bussiStartTime: '',
        // 每日营业结束时间
        bussiEndTime: '',
        // 门店服务电话
        shopServicePhone: '',
        // 是否同步商户联系人姓名
        isSyncConName: '',
        // 门店联系人姓名
        shopContactName: '',
        // 是否同步商户联系人电话
        isSyncConTel: '',
        // 门店联系人电话
        shopContactTel: '',
        // 是否支持在线买单
        isSignOnlinePay: '',
        // 是否支持多券核销
        isManyCpnVerify: '',
        // 网发门店编号
        onlineShopCode: '',
        // 自定义登录账号
        shopManagerLoginNum: '',
        // 是否同步商户结算信息
        isSyncMechtSettle: '',
        // 账户类型
        acctType: '',
        // 结算账号
        acctNo: '',
        // 开户名
        acctName: '',
        // 开户银行
        bankId: '',
        // 开户网点
        orgCode: [],
        // orgCode[orgCode.length-1]
        openNetworkId: '',
        type: []
      },
      // 商圈信息列表
      bizAreaIdList: [],
      // 同步结算信息，该内容不可再编辑
      settleAccountDisabled: false,
      rules: {
        shopName: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' }
        ],
        shopLogoPath: [
          { required: true, message: '门店Logo不能为空', trigger: 'blur' }
        ],
        shopCtgrId: [
          { required: true, message: '门店类别不能为空', trigger: 'blur' }
        ],
        siteCode: [
          { required: true, message: '门店地区不能为空', trigger: 'blur' }
        ],
        detailAddr: [
          { required: true, message: '门店地址不能为空', trigger: 'blur' }
        ],
        bizAreaId: [
          { required: true, message: '门店商圈不能为空', trigger: 'blur' }
        ],
        compeleteDate: [
          { required: true, message: '营业时间不能为空', trigger: 'blur' }
        ],
        shopServicePhone: [
          { required: true, message: '门店服务电话不能为空', trigger: 'blur' },
          { validator: validatePhoneNumber, trigger: 'blur' }
        ],
        shopContactName: [
          { required: true, message: '门店联系人姓名不能为空', trigger: 'blur' }
        ],
        shopContactTel: [
          { required: true, message: '门店联系人手机号不能为空', trigger: 'blur' },
          { validator: validatePhoneNumber, trigger: 'blur' }
        ],
        onlineShopCode: [
          { required: true, message: '网发门店编号不能为空', trigger: 'blur' }
        ],
        acctNo: [
          { required: true, message: '结算账号不能为空', trigger: 'blur' }
        ],
        acctType: [
          { required: true, message: '账户类型不能为空', trigger: 'blur' }
        ],
        acctName: [
          { required: true, message: '开户名不能为空', trigger: 'blur' }
        ],
        bankId: [
          { required: true, message: '开户银行不能为空', trigger: 'blur' }
        ],
        orgCode: [
          { required: true, message: '开户网点不能为空', trigger: 'blur' }
        ],
        isSignOnlinePay: [{
          required: true, message: '在线买单不能为空', trigger: 'blur'
        }],
        isManyCpnVerify: [{
          required: true, message: '多券核销不能为空', trigger: 'blur'
        }]
      },
      shopContactTypeList: shopContactType.transformEnumDepTypes('options'),
      isOpenOnlineList: isBooleanType.transformEnumDepTypes('options'),
      accountTypeList: accountType.transformEnumDepTypes('options'),
      acctBankNameTypeList: acctBankNameType.transformEnumDepTypes('options')
    }
  },
  computed: {
    ...mapGetters('commonData', ['shopClassifyData', 'siteData', 'regionData']),
    isCustomName() {
      return this.componentForm.isSyncConName === shopContactType.transformEnumDepTypes('keys', shopContactType['false'])
    },
    isCustomPhone() {
      return this.componentForm.isSyncConTel === shopContactType.transformEnumDepTypes('keys', shopContactType['false'])
    },
    // 新增渠道 在商户入驻时新增为：MERCHANT_ADD ；门店新增为：SHOP_ADD
    addChannel() {
      return 'MERCHANT_ADD'
    }
  },
  watch: {
    'componentForm.cityId': function() {
      this.queryBizAreaList()
    },
    'componentForm.isSyncConName': function(newValue, oldValue) {
      if (newValue === 'false') {
        this.componentForm.shopContactName = ' '
      }
      this.asyncMerchantAccountInfo()
    },
    'componentForm.isSyncConTel': function(newValue, oldValue) {
      if (newValue === 'false') {
        this.componentForm.shopContactTel = ' '
      }
      this.asyncMerchantAccountInfo()
    },
    'componentForm.isSyncMechtSettle': function(newValue, oldValue) {
      this.settleAccountDisabled = newValue
      this.syncMechtSettle = true
      if (newValue) {
        this.asyncMerchantAccountInfo()
      } else {
        this.emptyMerchantAccountInfo()
      }
    }
  },
  created() {
    this.mode = this.$route.query.mode
  },
  mounted() {
    this.setShopInfo()
  },
  methods: {
    /** 选择门店类别*/
    handleShopCtgrSelect(shopCtgr) {
      this.componentForm.shopCtgrId = shopCtgr
      this.componentForm.firstCatId = shopCtgr[0]
      this.componentForm.secondCatId = shopCtgr[1]
    },
    /** 选择门店地区*/
    handleAreaSelect(siteCode) {
      this.componentForm.siteCode = siteCode
      this.componentForm.provinceId = siteCode[0]
      this.componentForm.cityId = siteCode[1]
      this.componentForm.areaId = siteCode[2]
    },
    /** 选择开户网点*/
    handleOrgCodeSelect(orgCode) {
      this.componentForm.orgCode = orgCode
      this.componentForm.openNetworkId = orgCode[orgCode.length - 1]
    },
    /** 上传门店logo成功 */
    uploadPictureSuccess(fileList) {
      if (fileList && fileList.length > 0) {
        fileList.map(e => {
          if (e.response) {
            this.componentForm.shopLogoPath = e.response.data
          }
        })
      }
    },
    /** 营业时间-星期改变 */
    bussiDateChange(value) {
      let emptyWeeks = [0, 0, 0, 0, 0, 0, 0]
      if (this.weeks && this.componentForm.bussiTime) {
        this.componentForm.compeleteDate = 'compelete'
      } else {
        this.componentForm.compeleteDate = ' '
      }
      for (let i = 0; i < shopBussinessWeeks.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (value[j] === '全周') {
            emptyWeeks = [1, 1, 1, 1, 1, 1, 1]
          } else {
            if (shopBussinessWeeks[i] === value[j]) {
              emptyWeeks[i - 1] = 1
            }
          }
        }
      }
      this.componentForm.bussinessWeeks = parseInt(emptyWeeks.join(''))
    },
    /** 营业时间-星期的回显 */
    handleWeeks(week) {
      let weeks = week.split('')
      weeks = weeks.map((e, i) => {
        let weekNum = i + 1
        if (e == 1) {
          switch (weekNum) {
            case 1:
              weekNum = '一'
              break
            case 2:
              weekNum = '二'
              break
            case 3:
              weekNum = '三'
              break
            case 4:
              weekNum = '四'
              break
            case 5:
              weekNum = '五'
              break
            case 6:
              weekNum = '六'
              break
            case 7:
              weekNum = '日'
              break
            default:
              break
          }
        } else {
          weekNum = ''
        }
        return `周${weekNum}`
      })
      weeks = weeks.filter(e => e != '周')
      if (weeks.length === 7) {
        weeks = ['全周']
      }
      return weeks
    },
    /** 营业时间-时分改变*/
    bussiTimeChange(value) {
      this.componentForm.bussiStartTime = transformTime(value[0], 'hms')
      this.componentForm.bussiEndTime = transformTime(value[1], 'hms')
      if (this.weeks && this.componentForm.bussiTime) {
        this.componentForm.compeleteDate = 'compelete'
      } else {
        this.componentForm.compeleteDate = ' '
      }
    },
    /** 营业时间-时分秒的回显*/
    handleBussiime(startTime, endTime) {
      let time1 = new Date(`${transformTime(new Date(), 'ymd')} ${startTime}`)
      let time2 = new Date(`${transformTime(new Date(), 'ymd')} ${endTime}`)
      return [time1, time2]
    },
    /** 根据所在地区查询商圈信息*/
    async queryBizAreaList() {
      if (this.componentForm.areaId) {
        try {
          const responseData = await merchantManageService.queryBizAreaList({
            areaId: this.componentForm.areaId
          })
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            this.bizAreaIdList = responseData.data
          } else {
            this.$message.error(responseData.resultMsg)
          }
        } catch (error) {
          this.$message.error('查询商圈信息发生错误')
          console.log(error)
        }
      }
    },
    /** 同步商户结算信息-门店联系人姓名,门店联系人手机号,同步商户结算信息 */
    async asyncMerchantAccountInfo() {
      if (this.applyId) {
        try {
          const responseData = await merchantManageService.queryMerchantInfo({
            applyId: this.applyId
          })
          if (responseData.resultCode === AjaxReturnType.SUCCESS) {
            const { acctNo, acctType, acctName, bankId, contactName, contactPhone } = responseData.data
            if (this.componentForm.isSyncConName === 'true') {
              this.componentForm.shopContactName = contactName
            }
            if (this.componentForm.isSyncConTel === 'true') {
              this.componentForm.shopContactTel = contactPhone
            }
            if (this.componentForm.isSyncMechtSettle) {
              this.componentForm.acctNo = acctNo
              this.componentForm.acctType = acctType
              this.componentForm.acctName = acctName
              this.componentForm.bankId = bankId
              this.componentForm.orgCode = ['666', '12345']
            }
          } else {
            this.$message.error(responseData.resultMsg)
          }
        } catch (error) {
          this.$message.error('查询同步商户结算信息发生错误')
          console.log(error)
        }
      }
    },
    /** 清空商户结算信息 */
    emptyMerchantAccountInfo() {
      if (!this.syncMechtSettle) {
        this.componentForm.acctNo = ''
        this.componentForm.acctType = ''
        this.componentForm.acctName = ''
        this.componentForm.bankId = ''
        this.componentForm.orgCode = []
      }
    },
    /** 保存||更新门店信息 */
    submitComponentForm() {
      this.$refs['componentForm'].validate(async valid => {
        if (valid) {
          const partOfRequest = {
            addChannel: this.addChannel,
            merchantId: this.merchantId,
            applyId: this.shopApplyId
          }
          const requestData = { ...this.componentForm, ...partOfRequest }
          try {
            let responseData
            if (this.isShopAdd) {
              responseData = await merchantManageService.insertShopInfo(requestData)
            } else if (this.isShopEdit) {
              responseData = await merchantManageService.updateShopInfo(requestData)
            }
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.submitResult(true)
                }
              })
            } else {
              this.$message({
                message: responseData.resultMsg,
                type: 'error',
                duration: 1000,
                onClose: () => {
                  this.submitResult(false)
                }
              })
            }
          } catch (error) {
            this.$message({
              message: '新增门店发生错误',
              type: 'error',
              duration: 1000,
              onClose: () => {
                this.submitResult(false)
              }
            })
            console.log(error)
          }
        }
      })
    },
    /** 清空已有门店信息数据 */
    emptyComponentForm() {
      this.$refs['componentForm'].resetFields()
      this.componentForm.isSyncMechtSettle = false
      this.componentForm.bussiTime = ''
      this.weeks = []
    },
    /** 向父组件emit事件，告知其保存是否成功 */
    submitResult(value) {
      this.$emit('submitResult', value)
    },
    /** 回显门店数据 */
    setShopInfo() {
      if (this.shopInfoData.shopId) {
        const { isSyncMechtSettle, applyId, firstCatId, secondCatId, provinceId, cityId, areaId, bussiStartTime, bussiEndTime, isSyncConName, isSyncConTel, shopContactTel, isManyCpnVerify, isSignOnlinePay } = this.shopInfoData
        this.componentForm = this.shopInfoData
        this.shopApplyId = applyId
        this.syncMechtSettle = isSyncMechtSettle
        this.componentForm.shopCtgrId = [firstCatId, secondCatId]
        this.componentForm.siteCode = [provinceId, cityId, areaId].filter(e => e != 0)
        this.weeks = this.handleWeeks(this.componentForm.bussinessWeeks)
        this.componentForm.bussiTime = this.handleBussiime(bussiStartTime, bussiEndTime)
        this.componentForm.compeleteDate = 'compelete'
        this.componentForm.isSyncConName = `${isSyncConName}`
        this.componentForm.isSyncConTel = `${isSyncConTel}`
        this.componentForm.shopContactTel = shopContactTel
        this.componentForm.isManyCpnVerify = `${isManyCpnVerify}`
        this.componentForm.isSignOnlinePay = `${isSignOnlinePay}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card{
  margin:40px 0 0 24px;
  padding:20px;
}
.container-box{
  .container-main-box{
      padding:0;
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
  .bold{
      font-weight:bold;
  }
  .empty-box{
    height:40px;
    width:100%;
    background: #f8f8f8;
  }
}
.el-row-flex{
  display: flex;
  justify-content: center;
  margin-top:24px;
}
</style>
