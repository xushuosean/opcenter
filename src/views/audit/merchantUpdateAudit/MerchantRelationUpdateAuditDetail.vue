<template>
  <div class="box">
    <AuditStatusBar v-if="$route.query.op==='audit'" />
    <el-card>
      <h3>商户基础信息</h3>
      <AuditWrapTable :table-data="baseInfoData" :show-change="false" />
    </el-card>
    <el-card>
      <h3>签约交易类型</h3>
      <AuditWrap label="签约在线买单" :current-data="boolFormat(resData.isSignOnlinePay)" :show-change="false" />
      <AuditWrap
        template="signOnlinePayDetail"
        :show-change="false"
        label="在线买单相关信息"
        :current-data="{isSignOnlinePay:resData.isSignOnlinePay,
                        onlineCommisRate:resData.onlineCommisRate,
                        perTransLimit:resData.perTransLimit,
                        dailyTransLimit:resData.dailyTransLimit}"
      />

      <el-divider />
      <AuditWrap label="签约优惠券" :current-data="boolFormat(resData.isSignCoupon)" :show-change="false" />
      <AuditWrap
        template="signPrincipalPay"
        label="签约交易类型1"
        :current-data="{isPrincipalPay:resData.isPrincipalPay ,cashCommisRate:resData.cashCommisRate}"
        :show-change="false"
      />
      <AuditWrap label="签约交易类型2" template="signIntegralExchange" :current-data="{isIntegralExchange:resData.isIntegralExchange}" :show-change="false" />
    </el-card>

    <!-- 审核日志 -->
    <AuditLog v-if="$route.query.op==='view'" />

    <!-- 审核操作 -->
    <el-card v-if="$route.query.op==='audit'">
      <h3>审核结果</h3>
      <div class="formWrapper">
        <el-form ref="form" :model="formModel" :rules="formRule" label-width="96px" label-position="left">
          <el-form-item prop="auditResult" label="选择结果">
            <el-radio-group v-model="formModel.auditResult">
              <el-radio label="PASS"> 审核通过</el-radio>
              <el-radio label="NOTPASS">审核不通过 </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formModel.auditResult==='NOTPASS'" prop="auditOpinion" label="审核意见">
            <el-input v-model="formModel.auditOpinion" type="textarea" :rows="3" placeholder="请输入审核意见" />
            <el-form-item />
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <div class="buttonWrapper">
      <el-button v-if="$route.query.op==='audit'" type="primary" @click="submit">提交审核结果</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>

  </div>
</template>
<script>
// 这是什么？
// import { type } from 'os';
auditService
import auditService from '@api/audit.service.js'
import { merchantAuditService } from '@api/audit.service.js'
import auditMixin from '@mixin/audit-mixin.js'
import AuditWrap from '@com/audit/AuditWrap.vue'
import AuditWrapTable from '@com/audit/AuditWrapTable.vue'
const annexTypeEnum = { 'BIZ_LICENSE': '营业执照', 'ID_CARD': '身份证', CPA: '合作协议', FOOD_CERT: '食品经营许可证', OTHER: '其他' }
export default {
  filters: {
  },
  components: { AuditWrap, AuditWrapTable },
  mixins: [auditMixin],
  data() {
    return {
      resData: [],
      baseInfoData: [],
      settlementInfoData: [],
      imgData: [],
      shopData: [],
      // 商户基本信息
      baseInfo: [
        { label: '商户名称', key: 'merchantName', template: 'text' },
        { label: '商户地区', keyObj: ['provinceId', 'cityId', 'areaId'], template: 'area' },
        { label: '商户地址', key: 'detailAddr', template: 'text' },
        { label: '商户类型', keyEnum: 'merchantType', template: 'enum' },
        { label: '法定代表人', key: 'juriPersonName', template: 'text' },
        { label: '法人证件类型', keyEnum: 'juriPersonCertType', template: 'enum' },
        { label: '法人证件号码', key: 'juriPersonCertNo', template: 'text' },
        { label: '商户联系人姓名', key: 'contactName', template: 'text' },
        { label: '商户联系人手机号', key: 'contactPhone', template: 'text' },
        { label: '工商执照类型', keyEnum: 'bussLicenseType', template: 'enum' },
        { label: '统一社会信用代码', key: 'unifSocialCreditCode', template: 'text' },
        { label: '执照编号', key: 'licenseNo', template: 'text' },
        { label: '营业执照有效期', keyList: ['licenseStartDate', 'licenseEndDate'], template: 'auditTimeRange' },
        { label: '商户合作属性', keyEnum: 'coopType', template: 'enum' },
        { label: '商户经营类别', key: 'bizClassesId', template: 'text' },
        { label: '合同有效期限', keyList: ['contractStartDate', 'contractEndDate'], template: 'auditTimeRange' },
        { label: '所属分行机构', keyObj: ['firstOrgId', 'secondOrgId', 'thirdOrgId'], template: 'text' },
        { label: '业务员编号', key: 'clerkNo', template: 'text' },
        { label: '备注', key: 'remark', template: 'text' }
      ]
    }
  },
  mounted() {
  },
  async created() {
    await this.getData()
    // this.resData = JSON.parse(localStorage.getItem('resData'))
    console.log('resData', this.resData)
    this.baseInfoData = this.filterData(this.baseInfo, this.resData)
    // this.settlementInfoData = this.filterData(this.settlementInfo, this.resData)
    // this.processImgData()
    // this.processShopData()
  },
  methods: {

    boolFormat(val) {
      if (val) {
        return '是'
      } else if (val == false) {
        return '否'
      }
    },
    // 获取审核相关的数据
    async getData() {
      try {
        let res = await merchantAuditService.getMerApplyInfo({ applyId: this.$route.query.applyId })
        if (res.resultCode === '000000') {
          this.resData = res.data
        } else {
          throw new Error('查询商户详情失败')
        }
      } catch (err) {
        console.log(err)
        console.log('this.resData', this.resData)
        this.$message.error({ message: '查询商户详情失败' })
      }
    },

    // 处理图片信息
    processImgData() {
      let tempImgData = this.resData.annexList
      if (!tempImgData) { return }
      tempImgData.forEach(item => {
        item.label = annexTypeEnum[item.annexType]
        item.template = 'image'
        item.currentData = item.annexUrls
      })
      this.imgData = tempImgData
    },

    // 处理门店数据
    // processShopData() {
    //   let tempList = []
    //   if (this.resData.shopList.length === 0) { return }
    //   this.resData.shopList.forEach(item => {
    //     let shopItem = {}
    //     shopItem.sourceData = item
    //     shopItem.baseShopinfo = this.filterData(this.baseShopInfo, item)
    //     shopItem.shopManager = this.filterData(this.shopManager, item)
    //     shopItem.settlementInfo = this.filterData(this.settlementInfo, item)
    //     tempList.push(shopItem)
    //   })
    //   this.shopData = tempList
    // },
    goBack() {
      this.$router.push('/audit/merchantImportAudit')
    },
    judgeAuditStage() {
      if (this.$AUDIT_STATUS_FIRST.indexOf(this.$route.query.auditState) > -1) {
        return 'FIRST'
      } else if (this.$AUDIT_STATUS_FINAL.indexOf(this.$route.query.auditState) > -1) {
        return 'FINAL'
      }
    },

    async submit() {
      try { await this.$refs.form.validate() } catch (err) { this.$notify.error({ message: '不合法的提交数据' }); return }
      try {
        let res = await auditService.completeAudit({
          auditObjId: this.$route.query.applyId,
          auditJnlNo: this.$route.query.auditJnlNo,
          auditType: this.judgeAuditStage(),
          auditResult: this.formModel.auditResult,
          auditOpinion: this.formModel.auditOpinion

        })
        if (res.resultCode === '000000') {
          this.$notify.success({ message: '提交审核结果成功' })
        } else {
          throw new Error('审核失败')
        }
      } catch (err) {
        this.$notify.error({ message: '审核失败' })
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box{margin:40px 20px 0 20px;
    }
.el-card{
    margin-top:30px;
}
.buttonWrapper{
    margin-top:20px;
    display: flex;
    justify-content: center;
    button{
        margin-right:20px;
    }
}
.el-table {
    border:none;
   /deep/ td{border:none ;}
    &::before{
        height: 0px;
    }
    /deep/ th.is-leaf{
        display: none;

    }
}
h3{
    font-size: 18px;
    font-weight:bold;
    margin-bottom:15px;
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  // color:#606266
  font-weight:bold;
  margin:10px 0;
}
.formWrapper{
    width: 800px;
    min-height: 150px;
}

.imgRow{
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
    .label{
        width: 180px;
        margin-right: 50px;
    }
    .el-image{
        margin-right: 30px;
    }

    .el-carousel{
        width: 200px;
    }
}

</style>

