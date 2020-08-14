<template>
  <el-container class="container-box">
    <el-main>
      <el-card class="el-card-mt20" shadow="hover">
        <div class="page-title">
          <h3>门店列表</h3>
          <el-button size="medium" plain icon="el-icon-plus" @click.native="addStore">新增一家门店</el-button>
        </div>
        <el-form ref="componentForm" class="component-form" :rules="rules" :model="componentForm" label-width="96px">
          <el-row :gutter="10" class="el-row-mt20">
            <el-col :span="8">
              <el-form-item label="门店名称">
                <el-input v-model="componentForm.shopName" :clearable="true" size="medium" placeholder="请输入门店名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店编号">
                <el-input v-model="componentForm.shopId" :clearable="true" size="medium" placeholder="请输入门店编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属商户名称">
                <el-input v-model="componentForm.merchantName" :clearable="true" size="medium" placeholder="请输入商户名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="所属商户编号">
                <el-input v-model="componentForm.merchantId" :clearable="true" size="medium" placeholder="请输入商户编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店类别">
                <multilevelSelection type="shopClassifyCode" :multilevel-selection-value="componentForm.shopClassify" :multilevel-selection-options="shopClassifyData" @on-select="handleShopClassifySelect" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店状态">
                <el-select v-model="componentForm.shopStatus" :clearable="true" size="medium" placeholder="请选择门店状态">
                  <el-option v-for="(item,index) in shopStatusList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="业务员编号">
                <el-input v-model="componentForm.clerkNo" :clearable="true" size="medium" placeholder="请输入业务员编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店地区" prop="shopArea">
                <multilevelSelection type="areaCode" :multilevel-selection-value="componentForm.shopArea" :multilevel-selection-options="regionData" @on-select="handleAreaSelect" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变更状态">
                <el-select v-model="componentForm.auditStatus" :clearable="true" size="medium" placeholder="请选择变更状态">
                  <el-option v-for="(item,index) in auditStatusList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属分行机构">
                <multilevelSelection :multilevel-selection-value="componentForm.shopOrg" type="orgCode" :multilevel-selection-options="orgData" @on-select="handleOrgCodeSelect" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建开始时间">
                <el-date-picker
                  v-model="componentForm.createStartTime"
                  type="date"
                  placeholder="选择门店创建开始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建结束时间">
                <el-date-picker
                  v-model="componentForm.createEndTime"
                  type="date"
                  placeholder="选择门店创建结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-button type="primary" style="margin-left:96px;" @click="queryTableData();currentPage=1">查询</el-button>
              <el-button type="primary" @click="download">导出表格</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="el-card-mt20" shadow="hover">
        <merOrShopListTable
          :table-data="componentTableData"
          type="SHOPLIST"
          @handleDetail="handleShopDetail"
          @handleState="handleShopState"
          @handleAudit="handleShopAudit"
        >
          <el-table-column
            prop="shopName"
            label="门店名称"
            fixed
          />
          <el-table-column
            prop="shopId"
            label="门店编号"
          />
          <el-table-column
            prop="addrStr"
            label="门店地区"
          />
          <el-table-column
            prop="catrStr"
            label="门店类别"
          />
          <el-table-column
            prop="merchantName"
            label="所属商户名称"
          />
          <el-table-column
            prop="merchantId"
            label="所属商户编号"
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
            prop="shopStatus"
            label="门店状态"
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
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30]"
          :total="rowTotal"
          @size-change="pageSizeChange"
        />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import { mapGetters } from 'vuex'
import merchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import { auditStatus, shopStatus } from '@enum/merchantManage-enum.js'
import merOrShopListTable from '@com/merOrShopListTable/merOrShopListTable.vue'
import { generateDownUrl } from '@/utils/helper.js'
export default {
  // 门店列表
  name: 'StoreList',
  components: {
    multilevelSelection, merOrShopListTable
  },
  data() {
    return {
      componentForm: {
        // 门店名称
        shopName: '',
        // 门店编号
        shopId: '',
        // 商户名称
        merchantName: '',
        // 商户编号
        merchantId: '',
        // 门店地区
        shopArea: [],
        // 门店地区-省
        provinceId: '',
        // 门店地区-市
        cityId: '',
        // 门店地区-区
        areaId: '',
        // 门店类别
        shopClassify: [],
        // 门店类别-一级
        firstCatId: '',
        // 门店类别-二级
        secondCatId: '',
        // 门店状态
        shopStatus: '',
        // 变更状态
        auditStatus: '',
        // 业务员编号
        clerkNo: '',
        // 分行机构
        shopOrg: [],
        // 分行机构-一级
        firstOrgId: '',
        // 分行机构-二级
        secondOrgId: '',
        // 分行机构-三级
        thirdOrgId: '',
        // 创建开始时间
        createStartTime: '',
        // 创建结束时间
        createEndTime: ''
      },
      rules: {},
      componentTableData: [],
      auditStatusList: auditStatus.transformEnumDepTypes('options'),
      shopStatusList: shopStatus.transformEnumDepTypes('options'),
      pageSize: 10,
      // 列表的页数
      currentPage: 1,
      // 总条数
      rowTotal: 0
    }
  },
  computed: {
    ...mapGetters('commonData', ['shopClassifyData', 'orgData', 'regionData'])
  },
  watch: {
    currentPage() {
      this.queryTableData()
    }
  },
  mounted() {
    this.queryTableData()
  },
  methods: {
    // 新增门店
    addStore() {
      this.$router.push({
        name: 'merchantStoreAdd',
        query: {
          mode: 'single'
        }
      })
    },
    // 选择门店分类
    handleShopClassifySelect(shopClassify) {
      this.componentForm.shopClassify = shopClassify
      this.componentForm.firstCatId = shopClassify[0]
      this.componentForm.secondCatId = shopClassify[1]
    },
    // 选择门店地区
    handleAreaSelect(area) {
      this.componentForm.shopArea = area
      this.componentForm.provinceId = area[0]
      this.componentForm.cityId = area[1]
      this.componentForm.areaId = area[2]
    },
    // 选择分行机构
    handleOrgCodeSelect(orgCode) {
      this.componentForm.shopOrg = orgCode
      this.componentForm.firstOrgId = orgCode[0]
      this.componentForm.secondOrgId = orgCode[1]
      this.componentForm.thirdOrgId = orgCode[2]
    },
    // 查询数据
    queryTableData() {
      this.$refs['componentForm'].validate(async value => {
        let requestData = {
          ...this.componentForm,
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
        // 删除空值以及不需要的字段
        delete requestData['shopArea']
        delete requestData['shopClassify']
        delete requestData['shopOrg']
        for (let key in requestData) {
          if (requestData[key] === '') {
            delete requestData[key]
          }
        }
        if (value) {
          try {
            let res = await merchantManageService.queryShopList(requestData)
            console.log(res)
            if (res.resultCode === AjaxReturnType.SUCCESS) {
              if (res.data.shopList !== null) {
                this.componentTableData = res.data.shopList
                this.componentTableData.forEach(item => {
                  // merOrShopStatus字段，用于控制操作按钮的显示
                  item.merOrShopStatus = shopStatus[item.shopStatus]
                  item.shopStatus = shopStatus[item.shopStatus]
                  item.auditStatus = auditStatus[item.auditStatus]
                })
              } else {
                this.componentTableData = []
                this.$message.info('暂无数据')
              }
              this.rowTotal = res.data.rowTotal
            }
          } catch (e) {
            this.$message.error('查询时发生错误')
            console.log(e)
          }
        }
      })
    },
    // 导出表格
    download() {
      let data = {
        ...this.componentForm
      }
      // 剔除不需要的字段
      delete data['shopArea']
      delete data['shopOrg']
      let downloadUrl = generateDownUrl(data, '/merApply/exportMerList')
      window.location.href = downloadUrl
    },
    // 门店详情
    handleShopDetail(index, row) {
      console.log(row)
      this.$router.push({
        name: 'storeListDetail',
        query: {
          shopId: row.shopId
        }
      })
    },
    // 门店状态变更
    async handleShopState(index, row, type) {
      let requestData = {
        shopId: row.shopId,
        shopStatus: type,
        auditObjType: 'SHOP',
        auditObjId: row.applyId,
        changeType: 'UPD_STATE'
      }
      try {
        let res = await merchantManageService.shopStatusUp(requestData)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.queryTableData()
        } else {
          this.$message.info(res.resultMsg)
        }
        console.log(res)
      } catch (e) {
        this.$message.error('门店状态变更时发生错误')
        console.log(e)
      }
    },
    // 门店变更日志
    handleShopAudit(index, row) {

    },
    // 每页条数改变
    pageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.queryTableData()
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
