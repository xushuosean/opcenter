<!-- 适用门店维度-门店范围 -->
<template>
  <div class="shiyongmendian">
    <el-form>
      <el-form-item label="接收者范围" prop="importShopStyle" style="margin:20px 0">
        <el-select v-model="formData.importShopStyle">
          <el-option label="手动输入" value="manualInput" />
          <el-option label="批量导入" value="batchImport" />
        </el-select>
      </el-form-item>
      <!-- 批量导入方式 -->
      <template v-if="formData.importShopStyle==='batchImport'">
        <el-button type="primary" class="batchImportButton">
          下载Excel模板
        </el-button>
        <el-button type="primary" class="batchImportButton">
          上传门店名单
        </el-button>
      </template>
      <!-- 手动输入方式 -->
      <template v-if="formData.importShopStyle==='manualInput'">
        <div class="manualInput">
          <el-form-item prop="searchMethod" style="margin:20px 0">
            <el-select v-model="formData.searchMethod">
              <el-option label="按门店名或编号搜索" value="byNameOrCode" />
              <el-option label="按门店地区及类别筛选" value="byArea" />
            </el-select>
          </el-form-item>
          <!-- 按照名字或者编号搜索 -->
          <template v-if="formData.searchMethod==='byNameOrCode'">
            <el-form-item prop="searchNameOrCode">
              <el-input v-model="formData.searchNameOrCode" placeholder="请输入门店名称或门店编号" style="width:250px" />
              <el-button type="primary" style="margin:20px 0 0 20px" @click="searchShopbyKey">搜索</el-button>
            </el-form-item>

          </template>
          <!-- 按照地区搜索 -->
          <div v-if="formData.searchMethod==='byArea'" class="shopArea">
            <span>门店地区</span>
            <el-form-item prop="searchArea">
              <el-cascader
                v-model="formData.searchArea"
                :props="{ checkStrictly: true,value:'id',label:'name' }"
                :options="regionData"
              />
            </el-form-item>
            <span>门店类别</span>
            <el-form-item prop="searchArea">
              <el-cascader
                v-model="formData.searchShopCat"
                :props="{ checkStrictly: true ,value:'catId',label:'catName'}"
                :options="shopClassifyData"
              />
            </el-form-item>
            <el-button style="margin:20px 0 0 0" type="primary" @click="searchShopbyAreaCat">筛选</el-button>
          </div>
          <!-- 搜索结果，待选择的门店列表 -->
          <el-table
            ref="searchedShopList"
            max-height="300"
            :data="searchedShopList"
            @select-all="handleSelectionChange"
            @select="handleSelectionChange"
          >
            <el-table-column type="selection" />
            <el-table-column prop="shopName" label="全选" />
          </el-table>
          <h5>已选择门店</h5>
          <el-table ref="shopList" class="selectedShopList" max-height="300" :data="shopList">
            <el-table-column width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="shopName" />
            <el-table-column prop="shopCode" />
          </el-table>
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
      // 已选出的门店
      shopList: [
      ]
    }
  },
  computed: {},
  watch: {
    shopList() {
      this.$emit('getShopList', this.shopList)
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
      console.log(1)
      try {
        let res = await TicketsManage.searchShop(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('门店搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '门店搜索失败' })
      }
    },

    // 按照地区或者类别筛选
    async searchShopbyAreaCat() {
      let data = {
        provinceId: this.formData.searchArea[0],
        cityId: this.formData.searchArea[1],
        areaId: this.formData.searchArea[2],
        firstCatId: this.formData.searchShopCat[0],
        secondCatId: this.formData.searchShopCat[1]
      }
      data = objectTool.addValidPropertyToTarget(data)
      try {
        let res = await TicketsManage.searchShop(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('门店搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '门店搜索失败' })
      }
    },

    // 待选表格的变化
    handleSelectionChange(selection) {
      // shoplist加入选择项
      selection.forEach(item => {
        let check = this.shopList.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) {
          this.shopList.unshift(item)
        }
      })
      // 获取未选项
      let unselectedList = this.searchedShopList.filter(item => {
        let check = selection.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) { return true }
      })

      console.log('unselectedList', unselectedList)
      // 滤除未选项
      this.shopList = this.shopList.filter(item => {
        let check = unselectedList.find(j => {
          if (j.shopId === item.shopId) { return true }
        })
        if (!check) { return true }
      })
    },

    // 删除某行
    deleteRow(index, row) {
      this.shopList.splice(index, 1)
      this.$nextTick(this.echoSearchList)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
