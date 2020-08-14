<template>
  <el-container class="box">
    <el-header class="content-header" height="165px">
      <h3>用户端页面管理</h3>
      <el-form :model="componentForm" :rule="rules" label-width="98px">
        <el-form-item label="用户端站点" prop="siteCode">
          <multilevelSelection type="siteCode" :multilevel-selection-value="componentForm.siteCode" :multilevel-selection-options="siteData" @on-select="handleAreaSelect" />
        </el-form-item>
        <el-form-item label="编辑页面">
          <el-select v-model="componentForm.pageType" :disabled="!componentForm.siteCode.length>0" @change="pageTypeChange">
            <el-option label="本地优惠首页" value="HOMEPAGE" />
            <el-option label="优惠券展示页" value="COUPONLISTPAGE" />
            <el-option label="附近商家展示页" value="AROUNDFOODPAGE" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container class="content">
      <mobileClientMain mode="content" :config="config" :city-code="componentForm.cityCode" :page-type="componentForm.pageType" @renderPage="queryRenderConfig" />
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import mobileClientMain from '@com/mobileClientPages/mobileClientMain/mobileClientMain.vue'
import multilevelSelection from '@com/multilevelSelection/multilevelSelection.vue'
import contentService from '@api/contentManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
export default {
  components: {
    mobileClientMain, multilevelSelection
  },
  data() {
    return {
      componentForm: {
        // 所属站点
        siteCode: [],
        // siteCode[siteCode.length-1]
        cityCode: null,
        // 页面类型
        pageType: ''
      },
      // 页面配置数据
      config: [],
      // 页面内容是否配置
      pageStatus: null,
      rules: {}
    }
  },
  computed: {
    ...mapGetters('commonData', ['shopClassifyData', 'siteData'])
  },
  methods: {
    /**
     * 选择站点时触发
     * 不同站点的初始化数据一致，但配置数据不一致
     */
    handleAreaSelect(siteCode) {
      let lastIndex = siteCode.length - 1
      this.componentForm.siteCode = siteCode
      this.componentForm.cityCode = siteCode[lastIndex]
      this.componentForm.pageType = ''
    },
    // 页面类型切换
    pageTypeChange() {
      this.queryRenderConfig()
    },
    // 查询初始化页面数据
    async queryPageStructure() {
      let requestData = {
        pageType: this.componentForm.pageType
      }
      try {
        let res = await contentService.queryPageStructure(requestData)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          if (res.data.structureJson != null) {
            this.config = res.data.structureJson.structrue
          } else {
            this.config = []
          }
        } else {
          this.$message.error('查询页面结构发生错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 查询已配置的页面数据
    async queryPageContent() {
      return new Promise(async(resolve, reject) => {
        let { pageType, cityCode } = this.componentForm
        let requestData = {
          pageType,
          cityCode
        }
        try {
          let res = await contentService.queryPageContent(requestData)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.config = res.data.pageContentJson.structrue
            if (res.data.pageContentJson.structrue.length > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          } else {
            // this.$message.error('查询页面结构发生错误')
            resolve(false)
          }
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    },
    async queryRenderConfig() {
      // 先查已配置的数据，若无数据，则去查初始化数据
      if (this.componentForm.siteCode && this.componentForm.pageType) {
        this.pageStatus = await this.queryPageContent()
        if (!this.pageStatus) {
          this.queryPageStructure()
        }
      } else {
        // this.$message.warning('页面站点与页面类型不能为空')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content-header{
  width:fit-content;
}
.box{
    margin:40px 20px 0 20px;
    background-color: #fff;
    padding:20px;

    h3{
        margin-bottom: 20px;
    }
}
.content{
    min-height:500px;
}
.el-aside{
    padding-left: 20px;
}
.editArea{
  h4{
      color:#707070;
      margin-bottom:20px;
      margin-top:10px;
  }
}
</style>
