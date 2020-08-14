<template>

  <el-card>
    <h3>审核日志</h3>
    <div v-for="(item,index) in auditLog" :key="index">
      <el-divider />
      <h4>{{ item.auditType |auditTypeFormat }}</h4>
      <div class="row">
        <div class="label">审核时间</div>
        <div class="coontent">{{ item.auditTime }}</div>
      </div>
      <div class="row">
        <div class="label">审核状态</div>
        <div class="coontent">{{ item.auditResult |auditResultFormat }}</div>
      </div>
      <div v-if="item.auditResult ==='NOTPASS' " class="row">
        <div class="label">审核意见</div>
        <div class="coontent">{{ item.auditOpinion }}</div>
      </div>
      <div class="row">
        <div class="label">审核人编号</div>
        <div class="coontent">{{ item.auditPersonId }}</div>
      </div>
      <div class="row">
        <div class="label">审核人姓名</div>
        <div class="coontent">{{ item.auditPersonName }}</div>
      </div>
    </div>

  </el-card>
</template>

<script>
import auditService from '@api/audit.service.js'
const auditTypeEnum = { 'FIRST': '初审', 'FINAL': '终审' }

export default {
  filters: {
    auditTypeFormat(str) {
      if (str === 'FIRST') { return '初审' } else if (str === 'FINAL') { return '终审' } else {
        throw new Error('审核日志审核类型未识别')
      }we
    },
    auditResultFormat(str) {
      if (str === 'PASS') { return '审核通过' } else if (str === 'NOTPASS') { return '审核不通过' } else {
        throw new Error('审核日志审核结果未识别')
      }
    }

  },

  props: {

  },

  data() {
    return {
      auditLog: []
    }
  },
  async created() {
    try {
      let res = await auditService.showAuditLog({ auditJnlNo: this.$route.query.auditJnlNo })
      if (res.resultCode === '000000') {
        this.auditLog = res.data.auditJounalList
      } else { throw new Error('查询审核日志失败') }
    } catch (err) {
      this.$notify.error({ message: '查询审核日志失败' })
      console.error(err)
    }
  }

}

</script>

<style lang="scss" scoped>
.row{
  display: flex;
  padding:10px;
  .label{
    width: 180px;
  }
}

h3{
    font-size: 18px;
    font-weight:bold;
    margin-bottom:15px;
    &.secondH3{
        margin-bottom:25px;
        margin-top:40px;
    }
}

h4{
  // color:#606266
  font-weight:bold;
  margin:10px 0;}
</style>
