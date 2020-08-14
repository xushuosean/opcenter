<template>
  <div class="wrapper">
    <div v-for="(item,index) in discountStoreIds" :key="index">
      <discountStoreItem />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import discountStoreItem from '../discountStoreItem/discountStoreItem.vue'
export default {
  name: 'StoreListScrollBox',
  components: {
    discountStoreItem
  },
  props: {
    num: {
      type: Number,
      default: null
    },
    // 自定义批次号数目
    discountStoreIds: {
      type: Array,
      default: () => ['1', '1', '1']
    }
  },
  methods: {
    getConfig: function() {
      return {
        num: this.num,
        discountStoreIds: this.discountStoreIds
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .wrapper {
      width:100vw;
      overflow:auto;
      min-height:calc(100vh - 204px);
    }
</style>
