<template>
  <div class="container-box">
    <createCustomAggregationBaseInfo />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@store/mutation-types.js'
import createCustomAggregationBaseInfo from './createCustomAggregationBaseInfo.vue'
export default {
  components: { createCustomAggregationBaseInfo },
  data() {
    return {
      currentStep: 1
    }
  },
  computed: {
    ...mapGetters(['customAggregationStep'])
  },
  methods: {
    ...mapMutations([types.SET_CUSTOMAGGREGATION_STEP])
  },
  created() {
    if (this.customAggregationStep <= this.currentStep) {
      this.SET_CUSTOMAGGREGATION_STEP(this.currentStep)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
