<template>
  <div>
    {{ shopCat }}

  </div>

</template>

<script>
import auditService from '@api/audit.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
// import objectTool from '../../tool/objectTool.js'
import { echoShopCat } from '@tool/echoTree.js'
export default {
  props: {
    args: {}
  },
  data() {
    return {
      shopCat: '',
      shopCatOptions: []

    }
  },
  async created() {
    console.log(this.shopCatOptions, this.args)
    if (this.$shopCatTree) {
      this.shopCatOptions = this.$shopCatTree
    } else {
      await this.getShopCateTree()
    }

    this.shopCat = echoShopCat(this.shopCatOptions, [this.args[0], this.args[1]])
  },
  methods: {
    // 查询门店类目
    async getShopCateTree() {
      try {
        let res = await auditService.getShopCateTree()
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.shopCatOptions = res.data
        } else {
          throw new Error('查询门店类目失败')
        }
      } catch (err) {
        this.$notify.error({ message: '门店类目查询失败' })
        console.log(err)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
