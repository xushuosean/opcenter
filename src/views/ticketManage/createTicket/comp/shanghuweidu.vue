<!-- 适用门店维度-商户范围 -->
<template>
  <div class="shiyongmendian">
    <el-form>
      <!-- 手动输入方式 -->
      <template v-if="formData.importShopStyle==='manualInput'">
        <div class="manualInput">
          <!-- 按照名字或者编号搜索 -->
          <template v-if="formData.searchMethod==='byNameOrCode'">
            <el-form-item style="margin:20px 0 0">
              <el-input v-model="formData.searchNameOrCode" style="width:250px" placeholder="请输入商户名称或商户编号" />
              <el-button type="primary" style="margin:20px 0 0 20px" @click="searchShopbyKey">搜索</el-button>
            </el-form-item>
          </template>
          <!-- 搜索结果，待选择的门店列表 -->
          <el-table
            ref="searchedShopList"
            max-height="300"
            highlight-current-row
            :data="searchedShopList"
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="shopName" />
          </el-table>
          <h5 v-if="Boolean(currentRow)" style="display:inline">已选择商户 </h5><span v-if="Boolean(currentRow)">{{ currentRow.merchantName }}(商户编号{{ currentRow.merchantId }})</span>
          <el-form style="margin-top:20px">
            <el-form-item label="用户端票券适用门店展示规则">
              <el-select v-model="merShopRuleType" :clearable="true">
                <el-option label="不展示" value="NODISPALY" />
                <el-option label="批量导入门店名单" value="IMPORT" />
                <el-option label="跳转指定url" value="URL" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-top:20px">
              <el-input v-if="merShopRuleType == 'URL'" v-model="merShopUrl" style="margin-left:195px;width:370px;" placeholder="请输入票券详情页“适用门店”点击跳转的url" />
            </el-form-item>
          </el-form>

        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import TicketsManage from '@api/ticketsManage.service.js'
import objectTool from '@tool/objectTool.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {

  components: {},
  data() {
    return {
      options: [],
      formData: {
        discountTemplate: '',
        importShopStyle: 'manualInput',
        searchMethod: 'byNameOrCode',
        searchArea: [],
        searchNameOrCode: '',
        searchShopCat: [],
        discountsRule: '',
        TOTAL_sum: '',
        TOTAL_reduce: '',
        LADDER_sum1: '',
        LADDER_reduce1: '',
        LADDER_sum2: '',
        LADDER_reduce2: '',
        LADDER_sum3: '',
        LADDER_reduce3: '',
        FULL_sum: '',
        FULL_reduce: '',
        setFullReduceLimit: '',
        fullReduceLimit: '',
        REBATE_sum: '',
        REBATE_disc: '',
        setFullDiscLimit: '',
        fullDiscLimit: '',
        discountsPayName: '',
        setInventoryLimit: '',
        totalInventory: '',
        setLimitNum: '',
        maxDiscountsNum: '',
        payWay: []

      },
      formRule: {},
      searchedShopList: [
      ],
      // 已选出的商户
      shopList: [
      ],
      // 被选中行
      currentRow: null,
      merShopRuleType: 'NODISPALY',
      merShopUrl: ''
    }
  },
  computed: {},
  watch: {
    currentRow() {
      this.$emit('getMerchant', this.currentRow, this.merShopRuleType, this.merShopUrl)
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 按照名称或者商户名搜索
    async searchShopbyKey() {
      let data = {
        keyWord: this.formData.searchNameOrCode
      }
      data = objectTool.addValidPropertyToTarget(data)
      try {
        let res = await TicketsManage.searchMerchant(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('商户搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '商户搜索失败' })
      }
    },

    // 获取选中行数据
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
