<template>
  <div>
    {{ content }}

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import echoTree from '@tool/echoTree.js'
export default {
  props: {
    args: {}
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters({ areaTree: ['systerm/areaTree'] })

  },
  created() {
    console.log(this.areaTree)
    this.argsList = [this.args.provinceId, this.args.cityId, this.args.areaId]
    this.nodeList = echoTree(this.areaTree, this.argsList, { value: 'id', label: 'name', children: 'children' })

    this.content = this.nodeList.map(item => { return item.name }).join('-')
  }
}

</script>

<style lang="scss" scoped>

</style>
