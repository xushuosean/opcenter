<template>
  <div>
    <AuditWrap
      v-for="(item,index) in tableData"
      :key="index"
      :show-change="showChange"
      :label="item.label"
      :current-data="item.currentData"
      :history-data="item.historyData"
      :template="item.template"
    />
  </div>

</template>

<script>
import AuditWrap from './AuditWrap'

export default {
  components: { AuditWrap },
  props: {
    tableData: {},
    showChange: {
      default: false
    }
  },
  data() {
    return {}
  }
}

</script>

<style lang="scss" scoped>

</style>
