<template>
  <el-form :moedel="componentForm" :rule="componentRule" label-width="98px" label-position="left">
    <el-form-item label="门店编号" style="margin-top:24px;">
      <el-input v-model="componentForm.showNumber" />
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
        showNumber: ''
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
