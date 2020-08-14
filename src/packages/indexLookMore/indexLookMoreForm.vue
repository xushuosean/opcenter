<template>
  <el-form :moedel="componentForm" :rule="componentRule" label-width="98px" label-position="left">
    <el-form-item label="主标题" style="margin-top:24px;">
      <el-input v-model="componentForm.mainTitle" />
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="componentForm.subTitle" />
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary">取消</el-button> -->
      <el-button type="primary" @click="submitComponentForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import mobileComponentMixin from '@mixin/mobileComponent-mixin.js'
export default {
  name: 'IndexBannerForm',
  mixins: [mobileComponentMixin],
  data() {
    return {
      componentForm: {
        mainTitle: '',
        subTitle: ''
      },
      componentRule: {}
    }
  },
  methods: {
    submitComponentForm() {
      this.$emit('on-submit', this.componentForm)
    }
  }
}
</script>
<style lang="scss">

</style>
