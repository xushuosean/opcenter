<!--5.确认提交审核-->
<template>
  <div class="container-box">
    <createTicketBaseInfo />
    <createTicketShow />
    <createTicketRules />
    <el-card class="el-card-mt20" shadow="hover">
      <createTicketActivityMessage />
    </el-card>
  </div>
</template>
<script>
import createTicketBaseInfo from './createTicketBaseInfo.vue'
import createTicketShow from './createTicketShow.vue'
import createTicketRules from './createTicketRules.vue'
import createTicketActivityMessage from './createTicketActivityMessage.vue'
export default {
  components: { createTicketBaseInfo, createTicketShow, createTicketRules, createTicketActivityMessage },
  data() {
    return {
      currentStep: 4
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }

}
</script>
<style lang="scss" scoped>

</style>
