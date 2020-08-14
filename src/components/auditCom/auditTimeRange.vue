<template>
  <div>
    {{ content }}

  </div>

</template>

<script>
export default {
  props: {
    args: {}
  },
  data() {
    return { content: '' }
  },
  created() {
    if (!!this.args[0] && !!this.args[1]) {
      this.content = `自 ${this.args[0]} 至  ${this.args[1]}`
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
