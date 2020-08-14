<template>
  <el-form :model="componentForm" :rule="componentRule" label-width="98px" label-position="left">
    <el-form-item prop="bannerImg" label="banner图片" style="margin-top:24px;">
      <imgUpload tips="上传图片规范：  图片尺寸 100*100px ，图片格式 jpg" :limit="10" :file-list="fileList" @upload-success="uploadPictureSuccess" />
    </el-form-item>
    <el-tabs v-model="editableTabsValue" type="card">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <el-form-item label="跳转类型" prop="linkType">
          <el-select v-model="item.content.linkType">
            <el-option label="指定url" value="url" />
            <el-option label="票券详情页" value="ticketDetail" />
            <el-option label="门店详情页" value="shopDetail" />
            <el-option label="指定类别门店列表" value="specifiedShopList" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.content.linkType==&quot;url&quot;" label="跳转url" prop="href">
          <el-input v-model="item.content.href" placeholder="请输入该区域点击后跳转的url" />
        </el-form-item>
        <el-form-item v-if="item.content.linkType==&quot;ticketDetail&quot;" label="票券批次号" prop="ticketCode">
          <el-input v-model="item.content.ticketCode" placeholder="请输入该区域跳转票券的批次号" />
        </el-form-item>
        <el-form-item v-if="item.content.linkType==&quot;shopDetail&quot;" label="门店编号" prop="shopCode">
          <el-input v-model="item.content.shopCode" placeholder="请输入该区域跳转门店的编号" />
        </el-form-item>
        <el-form-item v-if="item.content.linkType==&quot;specifiedShopList&quot;" label="门店类别" prop="shopType">
          <el-cascader v-model="item.content.shopType" :options="shopTypeOptions" />
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
      <!-- <el-button type="primary">取消</el-button> -->
      <el-button type="primary" @click="submitComponentForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import imgUpload from '@com/imgUpload/imgUpload.vue'
import mobileComponentMixin from '@mixin/mobileComponent-mixin.js'
export default {
  name: 'IndexBannerForm',
  components: { imgUpload },
  mixins: [mobileComponentMixin],
  data() {
    return {
      swiperList: [],
      componentForm: {
        linkType: '',
        href: '',
        ticketCode: '',
        shopCode: ''
      },
      editableTabsValue: '1',
      editableTabs: [],
      componentRule: {},
      shopTypeOptions: [{ value: 'xxxx', label: '福xxx', children: [{ value: 'fxxx', label: 'xxxx' }, { value: 'xxxxxxx', label: 'dddd' }] },
        { value: 'fffff', label: 'aaaaaa', children: [{ value: 'vvvvv', label: 'yyyyy' }] }
      ]
    }
  },
  created() {
    if (this.componentForm.swiperList.length > 0) {
      this.editableTabs = this.componentForm.swiperList
      this.fileList = this.swiperList.map(e => ({ url: e.src }))
    }
  },
  methods: {
    uploadPictureSuccess(fileList) {
      let emptyTabs = []
      this.swiperList = []
      if (fileList && fileList.length > 0) {
        fileList.map((e, i) => {
          if (e.response) {
            this.swiperList.push({ src: 'https://file.test.cibfintech.com/' + e.response.data })
            emptyTabs.push({
              title: `banner-${i + 1}链接`,
              name: `banner${i + 1}`,
              content: {
                linkType: '',
                href: '',
                ticketCode: '',
                shopCode: '',
                shopType: ''
              }
            })
          }
        })
      }
      this.editableTabs = emptyTabs
    },
    submitComponentForm() {
      this.editableTabs.map((e, i) => {
        for (let key in e) {
          this.swiperList[i][key] = e[key]
        }
      })
      this.componentForm.swiperList = this.swiperList
      this.$emit('on-submit', this.componentForm)
    }
  }
}
</script>
<style lang="scss">

</style>
