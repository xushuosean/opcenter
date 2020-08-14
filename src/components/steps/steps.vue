<template>
  <el-steps :active="currentStep" space="400px">
    <el-step v-for="(item,index) in stepsData" :key="index" :title="item.name" />
  </el-steps>
</template>
<script>
export default {
  props: {
    stepsData: {
      type: Array,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 0
    },
    allStep: {
      type: Number,
      default: 0
    }
  },
  watch: {
    currentStep(value) {
      this.handleStepPath()
    }
  },
  methods: {
    handleStepPath() {
      this.$router.push(this.stepsData[this.currentStep].to)
    }
  }
}
</script>
