<template>
  <el-card class="auditOP">
    审核阶段：{{ stage }}
    &nbsp;&nbsp;
    <el-button v-if="buttonShow" size="small" @click="goToModify">修改</el-button>
  </el-card>

</template>

<script>
export default {
  props: {
    state: {},
    url: {}
  },
  data() {
    return {
      stage: '',
      buttonShow: ''
    }
  },
  created() {
    if (!this.state) { this.auditStatus = this.$route.query.auditState }
    console.log(this.$route.query.auditState, this.$AUDIT_STATUS_FIRST)
    if (this.$AUDIT_STATUS_FIRST.indexOf(this.auditStatus) > -1) {
      this.stage = '初审'
      this.buttonShow = true
    } else if (this.$AUDIT_STATUS_FINAL.indexOf(this.auditStatus) > -1) {
      this.stage = '终审'
      this.buttonShow = false
    } else {
      this.$notify.error({ message: '未识别的审核状态' })
      throw new Error('未识别的审核状态')
    }
  },
  methods: {
    goToModify() {
      this.$emit('click')
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

