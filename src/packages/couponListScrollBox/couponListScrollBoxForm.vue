<template>
  <el-form :moedel="componentForm" :rule="componentRule" label-width="98px" label-position="left">
    <el-form-item label="展示数量" style="margin-top:24px;">
      <el-select v-model="componentForm.num" @change="couponNumChange">
        <el-option v-for="item in couponNumList" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item v-for="(item,index) in couponIds" :key="index" :label="`票券${index+1}批次号`">
      <el-input v-model="item.value" />
    </el-form-item>
    <el-form-item>
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
        sourceType: '',
        num: 1,
        couponIds: []
      },
      couponIds: [],
      couponNumList: [3, 4, 5, 6, 7, 8, 9, 10],
      componentRule: {}
    }
  },
  created() {
    if (this.componentForm.couponIds.length > 0) {
      this.couponIds = this.componentForm.couponIds
    }
  },
  methods: {
    couponNumChange(value) {
      this.couponIds = []
      for (let i = 0; i < value; i++) {
        this.couponIds.push({
          value: ''
        })
      }
    },
    submitComponentForm() {
      this.componentForm.couponIds = this.couponIds
      this.$emit('on-submit', this.componentForm)
    }
  }
}
</script>
<style lang="scss">

</style>
