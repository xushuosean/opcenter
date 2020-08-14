<template>
  <div>
    {{ content }}

  </div>

</template>

<script>
import auditDetailEnum from '@enum/auditDetail-enum.js'
export default {
  props: {
    args: {}
  },
  data() {
    return {
      content: ''
    }
  },
  created() {
    console.log(this.args)
    if (this.args.enumValue !== undefined) {
      this.content = auditDetailEnum[this.args.enumName][this.args.enumValue]
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
