<!-- 票券查询 -->
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
        <el-button type="primary" class="batchImportButton" @click="downloadCoupon">
          下载Excel模板
        </el-button>
        <el-upload
          class="upload-demo"
          action="/custom/poly/coupon/upload.json"
          multiple
          :limit="1"
          :file-list="fileList"
        >
          <el-button type="primary" class="batchImportButton">
            上传票券名单
          </el-button>

        </el-upload>

      </template>
      <!-- 手动输入方式 -->
      <template v-if="formData.importShopStyle==='manualInput'">
        <div class="manualInput">
          <el-form-item prop="searchMethod" style="margin:20px 0">
            <el-select v-model="formData.searchMethod">
              <el-option label="搜索单张票券" value="COUPON" />
              <el-option label="按使用门店筛选" value="SHOP" />
            </el-select>
          </el-form-item>
          <!-- 按照名字或者编号搜索 -->
          <template>
            <el-form-item prop="searchNameOrCode">
              <el-input v-model="formData.searchNameOrCode" :placeholder="[formData.searchMethod == 'SHOP'?'请输入门店名称或门店编号':'请输入票券名称或票券批次号']" style="width:250px" />
              <el-button type="primary" style="margin:20px 0 0 20px" @click="searchShopbyKey">搜索</el-button>
            </el-form-item>

          </template>

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
import CustomAggregation from '@api/customAggregation.service.js'
import objectTool from '@tool/objectTool.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import TicketsManage from '@api/ticketsManage.service.js'
export default {

  components: {},
  data() {
    return {
      fileList: [],
      options: [],
      formData: {
        discountTemplate: '',
        importShopStyle: 'manualInput',
        searchMethod: 'COUPON',
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
  computed: {
    dealedList() {
      var _shopList = []
      this.shopList.forEach(e => {
        var _e = {
          ...e,
          polyObjType: 'COUPON'
        }
        _shopList.push(_e)
      })
    }
  },
  watch: {
    shopList() {
      this.$emit('getShopList', this.dealedList)
    },
    'formData.searchMethod'() {
      this.searchedShopList = []
      this.shopList = []
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 自定义聚合票券红包模板下载
    async downloadCoupon() {
      let { origin, pathname } = window.location
      window.location.href = origin + '/' + pathname.split('/')[1] + '/custom/poly/coupon/templateDownload.json'
    },
    // 按照名称或者商户名搜索
    async searchShopbyKey() {
      let data = {
        content: this.formData.searchNameOrCode,
        type: this.formData.searchMethod
      }
      data = objectTool.addValidPropertyToTarget(data)
      try {
        let res = await CustomAggregation.searchCoupon(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.searchedShopList = res.data
          this.$nextTick(this.echoSearchList)
        } else { throw new Error('搜索失败') }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '搜索失败' })
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
    },

    // 文件提交成功
    handlePreview(file) {
      this.$message.success({ message: `${file.name}上传成功` })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
