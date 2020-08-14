<template>
  <div class="box">
    <AuditStatusBar v-if="$route.query.op==='audit'" />
    <el-card>
      <h3>门店基础信息</h3>
      <div>
        <el-divider />
        <AuditWrapTable
          :table-data="shopData.baseShopinfo"
        />
        <h4>门店管理员账号</h4>
        <AuditWrapTable
          :table-data="shopData.shopManager"
        />
        <h4>结算信息</h4>
        <div v-if="resData.isSyncMechtSettle">
          同步所属商户结算信息
        </div>
        <AuditWrapTable v-else :table-data="shopData.settlementInfo" :show-change="false" />
      </div>
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
import { merchantAuditService } from '@api/audit.service.js'
import auditService from '@api/audit.service.js'
import auditMixin from '@mixin/audit-mixin.js'
import AuditWrap from '@com/audit/AuditWrap.vue'
import AuditWrapTable from '@com/audit/AuditWrapTable.vue'
export default {
  filters: {
  },
  components: { AuditWrap, AuditWrapTable },
  mixins: [auditMixin],
  data() {
    return {
      resData: [],
      shopData: {
        baseShopinfo: '',
        shopManager: '',
        settlementInfo: ''

      },

      // 结算信息
      settlementInfo: [
        { label: '结算账号', key: 'acctNo', template: 'text' },
        { label: '账户类型', key: 'acctType', template: 'acctType' },
        { label: '开户名', key: 'acctName', template: 'text' },
        { label: '开户银行', key: 'bankId', template: 'text' },
        { label: '开户网点', key: 'openNetworkId', template: 'text' }
      ],
      // 新增门店信息
      baseShopInfo: [
        { label: '门店名称', key: 'shopName', template: 'text' },
        { label: '门店编号', key: 'shopId', template: 'text' },
        { label: '所属商户编号', key: 'merchantId', template: 'text' },
        { label: '门店状态', key: 'shopStatus', template: 'shopStatus' },
        { label: '门店logo', key: 'shopLogoPath', template: 'image' },
        { label: '门店类别', keyList: ['firstCatId', 'secondCatId'], template: 'shopTypeTree' },
        { label: '门店地区', keyObj: ['provinceId', 'cityId', 'areaId'], template: 'area' },
        { label: '门店地址', key: 'detailAddr', template: 'text' },
        { label: '门店商圈', key: 'bizAreaId', template: 'text' },
        { label: '营业时间', keyObj: ['bussinessWeeks', 'bussiStartTime', 'bussiEndTime'], template: 'workingTime' },
        { label: '门店服务电话', key: 'shopServicePhone', template: 'text' },
        { label: '门店联系人姓名', key: 'shopContactName', template: 'text' },
        { label: '门店联系人手机号', key: 'shopServicePhone', template: 'text' },
        { label: '是否开通网发', keyBool: 'isOpenOnline', template: 'text' },
        { label: '网发门店编号', key: 'onlineShopCode', template: 'text' }

      ],
      shopManager: [{ label: '自定义登录账号', key: 'shopManagerLoginNum', template: 'text' }],
      formModel: {
        auditResult: '',
        auditOpinion: ''
      },
      formRule: {
        auditResult: [{ required: true, trigger: 'blur', message: '请选择审核结果' }],
        auditOpinion: [{ required: true, trigger: 'blur', message: '请输入审核意见' }]

      }

    }
  },
  mounted() {
  },
  async created() {
    await this.getData()
    this.processShopData()
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
        let res = await merchantAuditService.getShopApplyInfo({ applyId: this.$route.query.applyId })
        if (res.resultCode === '000000') {
          this.resData = res.data
        } else {
          throw new Error('查询门店详情失败')
        }
      } catch (err) {
        console.log(err)
        console.log('this.resData', this.resData)
        this.$message.error({ message: '查询门店详情失败' })
      }
    },

    // 处理门店数据
    processShopData() {
      this.shopData.sourceData = this.resData
      this.shopData.baseShopinfo = this.filterData(this.baseShopInfo, this.resData)
      this.shopData.shopManager = this.filterData(this.shopManager, this.resData)
      this.shopData.settlementInfo = this.filterData(this.settlementInfo, this.resData)
    },
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

