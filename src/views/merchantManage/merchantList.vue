<template>
  <el-container class="container-box">
    <el-main>
      <el-card class="el-card-mt20" shadow="hover">
        <div class="page-title">
          <h3>商户列表</h3>
          <el-button size="medium" plain icon="el-icon-plus" @click="jumpToMerchantEnter">商户入驻</el-button>
        </div>
        <el-form ref="componentForm" class="component-form" :model="componentForm" label-width="96px">
          <el-row :gutter="10" class="el-row-mt20">
            <el-col :span="8">
              <el-form-item label="商户名称">
                <el-input v-model="componentForm.merchantName" :clearable="true" size="medium" placeholder="请输入商户名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户编号">
                <el-input v-model="componentForm.merchantId" :clearable="true" size="medium" placeholder="请输入商户编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务员编号">
                <el-input v-model="componentForm.clerkCode" :clearable="true" size="medium" placeholder="请输入业务员编号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="经营类别">
                <el-select v-model="componentForm.bizClassesId" :clearable="true" size="medium" placeholder="请选择经营类别">
                  <el-option label="全部" value="all" />
                  <el-option label="餐饮类" value="catering" />
                  <el-option label="非餐饮类" value="notCatering" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进件类别">
                <el-select v-model="componentForm.settleType" :clearable="true" size="medium" placeholder="请选择进件类别">
                  <el-option label="全部" value="all" />
                  <el-option label="普通进件" value="normal" />
                  <el-option label="快速进件" value="quick" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户状态">
                <el-select v-model="componentForm.merchtStatus" :clearable="true" size="medium" placeholder="请选择商户状态">
                  <el-option label="全部" value="all" />
                  <el-option label="正常" value="normal" />
                  <el-option label="过期" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="变更状态">
                <el-select v-model="componentForm.settleStatus" :clearable="true" size="medium" placeholder="请选择变更状态">
                  <el-option label="全部" value="all" />
                  <el-option label="未变更" value="normal" />
                  <el-option label="变更待初审" value="outofdate" />
                  <el-option label="变更待终审" value="outofdate" />
                  <el-option label="变更审核通过" value="outofdate" />
                  <el-option label="变更审核不通过" value="outofdate" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合作属性">
                <el-select v-model="componentForm.merchtCooperType" :clearable="true" size="medium" placeholder="请选择合作属性">
                  <el-option label="全部" value="all" />
                  <el-option label="内部客户" value="innerCunstom" />
                  <el-option label="外部合作客户" value="outerCunstom" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户地区">
                <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.merchantArea" :multilevel-selection-options="siteData" @on-select="handleAreaSelect" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属分行机构" class="el-form-item-flex">
                <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.metchantOrg" :multilevel-selection-options="siteData" @on-select="handleOrgCodeSelect" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建开始时间">
                <el-date-picker
                  v-model="componentForm.createStartTime"
                  type="date"
                  placeholder="选择创建开始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建结束时间">
                <el-date-picker
                  v-model="componentForm.createEndTime"
                  type="date"
                  placeholder="选择创建结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同开始时间">
                <el-date-picker
                  v-model="componentForm.contractStartDate"
                  type="date"
                  placeholder="合同有效期开始时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同结束时间">
                <el-date-picker
                  v-model="componentForm.contractEndDate"
                  type="date"
                  placeholder="合同有效期结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" style="margin-left:96px;" @click="queryTableData(1);currentPage=1;">查询</el-button>
              <el-button type="primary" @click="download">导出表格</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="el-card-mt20" shadow="hover">
        <merOrShopListTable
          type="MERLIST"
          :table-data="componentTableData"
          @handleDetail="queryMerchantDetail"
          @handlepState="handleMerState"
          @handleAudit="handleMerAudit"
        >
          <el-table-column
            prop="merchantName"
            label="商户名称"
            fixed
          />
          <el-table-column
            prop="merchantId"
            label="商户编号"
            fixed
          />
          <el-table-column
            prop="shopNum"
            label="门店数量"
          />
          <el-table-column
            prop="areaAddrStr"
            label="商户地区"
          />
          <el-table-column
            prop="classesName"
            label="经营类别"
          />
          <el-table-column
            prop="coopTypeShow"
            label="合作属性"
          />
          <el-table-column
            prop="incomingType"
            label="进件类别"
          />
          <el-table-column
            prop="orgStr"
            label="所属分行机构"
          />
          <el-table-column
            prop="clerkNo"
            label="业务员编号"
          />
          <el-table-column
            prop="contractEndDate"
            label="合同有效期"
          />
          <el-table-column
            prop="merchantStatus"
            label="商户状态"
          />
          <el-table-column
            prop="auditStatus"
            label="变更状态"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
          />
        </merOrShopListTable>
        <el-pagination
          :page-size="pageSize"
          layout="sizes, prev, pager, next, total,jumper"
          :page-sizes="pageSizes"
          :current-page.sync="currentPage"
          :total="total"
          @size-change="pageSizeChange"
        />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import merOrShopListTable from '@com/merOrShopListTable/merOrShopListTable.vue'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@store/mutation-types.js'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import { merchantCooperType, auditStatus, merchantIncomingType, merchantStatus } from '@enum/merchantManage-enum.js'
import { generateDownUrl } from '@/utils/helper.js'
export default {
  // 商户列表
  name: 'MerchantList',
  components: { multilevelSelection, merOrShopListTable },
  data() {
    return {
      componentForm: {
        // 商户姓名
        merchantName: '',
        // 商户编号
        merchantId: '',
        // 经营类别
        bizClassesId: '',
        // 进件类别
        settleType: '',
        // 商户状态
        merchtStatus: '',
        // 变更状态
        settleStatus: '',
        // 合作属性
        merchtCooperType: '',
        // 业务员编号
        clerkCode: '',
        // 创建开始时间
        createStartTime: '',
        // 创建结束时间
        createEndTime: '',
        // 有效期开始时间
        contractStartDate: '',
        // 有效期结束时间
        contractEndDate: '',
        // 商户地区
        merchantArea: [],
        // 所属分行机构
        metchantOrg: []
      },
      componentTableData: [],
      pageSizes: [10, 20, 30],
      total: 0,
      pageSize: 10,
      currentPage: 1 // 当前列表的页数
    }
  },
  computed: {
    ...mapGetters('commonData', ['siteData']),
    provinceCode() {
      return this.componentForm.merchantArea[0]
    },
    cityCode() {
      return this.componentForm.merchantArea[1]
    },
    areaCode() {
      return this.componentForm.merchantArea[2]
    },
    headBank() {
      return this.componentForm.metchantOrg[0]
    },
    branchBank() {
      return this.componentForm.metchantOrg[1]
    },
    netBank() {
      return this.componentForm.metchantOrg[2]
    }
  },
  watch: {
    // 页码改变,重新查询
    currentPage() {
      this.queryTableData(this.currentPage)
    }
  },
  mounted() {
    this.queryTableData(1)
  },
  methods: {
    ...mapMutations('merchantManage', [`${types.SET_MERCHANT_ID}`, `${types.SET_APPLY_ID}`]),
    // 跳转商户入驻页面
    jumpToMerchantEnter() {
      this.$router.push('/merchantManage/enter')
    },
    // 选择商户地区等多级选择
    handleAreaSelect(areaCode) {
      this.componentForm.merchantArea = areaCode
    },
    // 选择分行机构时触发
    handleOrgCodeSelect(orgCode) {
      this.componentForm.metchantOrg = orgCode
    },
    // 每页条数改变
    pageSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    // 列表查询
    queryTableData(currentPage) {
      const params = {
        ...this.componentForm,
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
        areaCode: this.areaCode,
        headBank: this.headBank,
        branchBank: this.branchBank,
        netBank: this.netBank,
        createStartTime: this.createStartTime,
        createEndTime: this.createEndTime,
        contractStartDate: this.contractStartDate,
        contractEndDate: this.contractEndDate,
        pageSize: this.pageSize,
        pageNum: currentPage
      }
      this.$refs['componentForm'].validate(async(valid) => {
        if (valid) {
          try {
            const responseData = await merchantManageService.selectMerchantList(
              params
            )
            if (responseData.resultCode === AjaxReturnType.SUCCESS) {
              this.componentTableData = responseData.data.merInfoList
              this.componentTableData.forEach(item => {
                // merOrShopStatus字段，用于控制操作按钮的显示
                item.merOrShopStatus = merchantStatus[item.merchantStatus]
                item.coopTypeShow = merchantCooperType[item.coopType]
                item.auditStatus = auditStatus[item.auditStatus]
                item.incomingType = merchantIncomingType[item.incomingType]
                item.merchantStatus = merchantStatus[item.merchantStatus]
              })
              this.total = responseData.data.rowTotal
            } else {
              this.$message.error(responseData.resultMsg)
            }
          } catch (error) {
            this.$message.error('查询商户列表发生错误')
            console.log(error)
          }
        }
      })
    },
    // 列表下载
    download() {
      let data = {
        ...this.componentForm,
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
        areaCode: this.areaCode,
        headBank: this.headBank,
        branchBank: this.branchBank,
        netBank: this.netBank,
        createStartTime: this.createStartTime,
        createEndTime: this.createEndTime,
        contractStartDate: this.contractStartDate,
        contractEndDate: this.contractEndDate
      }
      // 剔除不需要的字段
      delete data['merchantArea']
      delete data['metchantOrg']
      let downloadUrl = generateDownUrl(data, '/merApply/exportMerList')
      window.location.href = downloadUrl
    },
    // 查看商户详情
    queryMerchantDetail(index, row) {
      // 商户id,申请id存入vuex
      this[types.SET_APPLY_ID](row.applyId)
      this[types.SET_MERCHANT_ID](row.merchantId)
      this.$nextTick(() => {
        this.$router.push({
          name: 'merchantListDetail',
          query: {
            merchantId: row.merchantId
          }
        })
      })
    },
    // 商户状态变更
    handleMerState() {

    },
    // 商户变更日志
    handleMerAudit() {

    }
  }
}
</script>
<style lang="scss" scoped>
.container-box{
    .page-title{
        display:flex;
        align-items:center;
        h3{
            margin-right:20px;
            line-height:40px;
        }
    }
    .el-form-item__content{
        flex:1;
        .el-date-editor{
            width:100% !important;
        }
    }
    /deep/.el-form-item__label{
        white-space: nowrap;
    }
    .el-pagination{
        text-align:center;
        margin-top:20px;
    }
}
</style>
