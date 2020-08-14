<template>
  <el-form :moedel="componentForm" :rule="componentRule" label-width="98px" label-position="left">
    <el-form-item label="显示文字" style="margin-top:24px;">
      <el-input v-model="componentForm.placeHolderText" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitComponentForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import mobileComponentMixin from '@mixin/mobileComponent-mixin.js'
export default {
  name: 'IndexSearchForm',
  mixins: [mobileComponentMixin],
  data() {
    return {
      componentForm: {
        placeHolderText: ''
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
