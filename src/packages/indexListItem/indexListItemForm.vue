<template>
  <el-form :model="componentForm" :rule="componentRule" label-width="98px">
    <el-form-item prop="title" label="入口名称">
      <el-input v-model="componentForm.title" placeholder="请输入入口名称" />
    </el-form-item>
    <el-form-item prop="src" label="入口图片">
      <imgUpload tips="上传图片规范：  图片尺寸 100*100px ，图片格式 jpg" :file-list="fileList" @upload-success="uploadPictureSuccess" />
    </el-form-item>
    <el-form-item label="跳转类型" prop="linkType">
      <el-select v-model="componentForm.linkType">
        <el-option label="指定url" value="url" />
        <el-option label="票券详情页" value="ticketDetail" />
        <el-option label="门店详情页" value="shopDetail" />
        <el-option label="指定类别门店列表" value="specifiedShopList" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="componentForm.linkType==&quot;url&quot;" label="跳转url" prop="url">
      <el-input v-model="componentForm.href" placeholder="请输入该区域点击后跳转的url" />
    </el-form-item>
    <el-form-item v-if="componentForm.linkType==&quot;ticketDetail&quot;" label="票券批次号" prop="couponId">
      <el-input v-model="componentForm.couponId" placeholder="请输入该区域跳转票券的批次号" />
    </el-form-item>
    <el-form-item v-if="componentForm.linkType==&quot;shopDetail&quot;" label="门店编号" prop="shopId">
      <el-input v-model="componentForm.shopId" placeholder="请输入该区域跳转门店的编号" />
    </el-form-item>
    <el-form-item v-if="componentForm.linkType==&quot;specifiedShopList&quot;" label="门店类别" prop="shopType">
      <el-cascader v-model="componentForm.shopType" :options="shopTypeOptions" />
    </el-form-item>
    <el-form-item>
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
      componentForm: {
        title: '',
        src: '',
        linkType: '',
        href: '',
        couponId: '',
        shopId: '',
        shopType: ''
      },
      fileList: [],
      componentRule: {},
      shopTypeOptions: [{ value: 'xxxx', label: '福xxx', children: [{ value: 'fxxx', label: 'xxxx' }, { value: 'xxxxxxx', label: 'dddd' }] },
        { value: 'fffff', label: 'aaaaaa', children: [{ value: 'vvvvv', label: 'yyyyy' }] }
      ]
    }
  },
  created() {
    if (this.componentForm.src) {
      this.fileList.push({ url: this.componentForm.src })
    }
  },
  methods: {
    uploadPictureSuccess(fileList) {
      if (fileList && fileList.length > 0) {
        fileList.map(e => {
          if (e.response) {
            this.componentForm.src = 'https://file.test.cibfintech.com/' + e.response.data
          }
        })
      }
    },
    submitComponentForm() {
      this.$emit('on-submit', this.componentForm)
    }
  }
}
</script>
<style lang="scss">

</style>
