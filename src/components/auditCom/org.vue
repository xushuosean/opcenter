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
    ...mapGetters({ orgData: ['merchantManage/orgData'] })

  },
  created() {
    this.argsList = [this.args.firstOrgId, this.args.secondOrgId, this.args.thirdOrgId]
    this.nodeList = echoTree(this.orgData, this.argsList, { value: 'orgId', label: 'orgName', children: 'children' })

    this.content = this.nodeList.map(item => { return item.name }).join('-')
  }
}

</script>

<style lang="scss" scoped>

</style>
