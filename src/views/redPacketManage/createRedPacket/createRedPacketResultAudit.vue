<!--5.红包详情页-->
<template>
  <div class="container-box">
    <createRedPacketBaseInfo />
    <createRedPacketShow />
    <createRedPacketRules />
    <el-card class="el-card-mt20" shadow="hover">
      <createRedPacketActivityMessage />
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import createRedPacketBaseInfo from './createRedPacketBaseInfo.vue'
import createRedPacketShow from './createRedPacketShow.vue'
import createRedPacketRules from './createRedPacketRules.vue'
import createRedPacketActivityMessage from './createRedPacketActivityMessage.vue'
export default {
  components: { createRedPacketBaseInfo, createRedPacketShow, createRedPacketRules, createRedPacketActivityMessage },
  data() {
    return {
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
