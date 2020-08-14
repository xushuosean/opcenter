<template>
  <div class="container-box">
    <merchantBaseInfo ref="merchantBaseInfo" type="UPDATE" :is-show-edit-button="true" :is-disabled="true" />
    <merchantSettleAccount ref="merchantSettleAccount" type="UPDATE" :is-show-edit-button="true" :is-disabled="true" />
    <merchantPictureResource ref="merchantPictureResource" type="UPDATE" :is-show-edit-button="true" :is-disabled="true" />
    <merchantRelation type="SHOW" :mer-relation-tree="merRelationTree" :merchant-id="merchantId" />
    <el-card class="el-card-mt20" shadow="hover">
      <h3>商户下属门店</h3>
      <p class="store-num el-card-mt20">该商户共有{{ shopLength }}家门店</p>
      <el-row class="el-card-mt20">
        <el-button size="medium" plain icon="el-icon-plus" @click="singleAddShop">新增一家门店</el-button>
        <el-button size="medium" plain icon="el-icon-plus" @click="batchAddShop">批量新增门店</el-button>
        <el-button size="medium" plain icon="el-icon-edit" @click="batchUpdateLogo">批量更该门店logo</el-button>
      </el-row>
      <merOrShopListTable
        class="el-card-mt20"
        type="SHOPLIST"
        :table-data="merShopList"
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
          prop="areaStr"
          label="门店地区"
        />
        <el-table-column
          prop="shopStatus"
          label="门店状态"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
      </merOrShopListTable>
    </el-card>
  </div>
</template>
<script>
import merchantBaseInfo from './enter/merchantBaseInfo.vue'
import merchantSettleAccount from './enter/merchantSettleAccount.vue'
import merchantPictureResource from './enter/merchantPictureResource.vue'
import merOrShopListTable from '@com/merOrShopListTable/merOrShopListTable.vue'
import merchantRelation from './enter/merchantRelation.vue'
import MerchantManageService from '@api/merchantManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import { mapMutations } from 'vuex'
import * as types from '@store/mutation-types'
import { shopStatus } from '@enum/merchantManage-enum.js'
export default {
  // 商户详情
  name: 'MerchantListDetail',
  components: { merchantBaseInfo, merchantSettleAccount, merchantPictureResource, merOrShopListTable, merchantRelation },
  data() {
    return {
      // 商户id
      merchantId: '',
      // 商户数据
      merchantInfoData: {},
      // 商户关联关系数据
      merRelationTree: {},
      // 门店列表
      merShopList: []
    }
  },
  computed: {
    // 商户下门店数量
    shopLength() {
      return this.merShopList.length
    }
  },
  created() {
    this.merchantId = this.$route.query.merchantId
    this.queryMerFormalInfo()
    this.queryMerFormalShop()
    this.queryMerRelationTree()
  },
  // 切换路由时 清空vuex数据
  beforeRouteLeave(to, form, next) {
    // 不修改商户信息，清空vuex数据
    if (to.name !== 'merchantDetailAudit') {
      this[`${types.CLEAR_STORE_DATA}`]()
      next()
    } else {
      next()
    }
  },
  methods: {
    ...mapMutations('merchantManage', [types.CLEAR_STORE_DATA]),
    // 查询商户详情
    async queryMerFormalInfo() {
      try {
        let res = await MerchantManageService.queryMerFormalInfo({
          merchantId: this.merchantId
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
    // 查询商户关联关系
    async queryMerRelationTree() {
      try {
        let res = await MerchantManageService.merRelationTree({
          merchantId: this.merchantId
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          if (res.data != null) {
            this.merRelationTree = res.data
            // 为根节点指定标识
            this.$set(this.merRelationTree, 'root', true)
          } else {
            this.$message.error('暂无数据')
          }
        } else {
          this.$message.error('查询门店列表失败')
        }
      } catch (e) {
        this.$message.error('查询门店列表发生错误')
        console.log(e)
      }
    },
    // 查询商户下属门店
    async queryMerFormalShop() {
      try {
        let res = await MerchantManageService.queryMerFormalShop({
          merchantId: this.merchantId
        })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          if (res.data != null) {
            this.merShopList = res.data.shopList
            this.merShopList.forEach(item => {
              // merOrShopStatus字段，用于控制操作按钮的显示
              item.merOrShopStatus = shopStatus[item.shopStatus]
              item.shopStatus = shopStatus[item.shopStatus]
            })
          } else {
            this.$message.error('暂无数据')
          }
        } else {
          this.$message.error('查询商户关联关系失败')
        }
      } catch (e) {
        this.$message.error('查询门店商户关联关系发生错误')
        console.log(e)
      }
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
        let res = await MerchantManageService.shopStatusUp(requestData)
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
    // 新增一家门店
    singleAddShop() {
      this.$router.push({
        name: 'merchantStoreAdd',
        query: {
          mode: 'single',
          merchantId: this.merchantId
        }
      })
    },
    // 批量新增门店
    batchAddShop() {

    },
    // 批量更改门店logo
    batchUpdateLogo() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .container-box{
      margin:20px;
      overflow:hidden;
  }
</style>
