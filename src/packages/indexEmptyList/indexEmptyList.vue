<template>
  <div class="empty-box-wrap">
    <slot>
      <indexListItem />
      <indexListItem />
      <indexListItem />
      <indexListItem />
    </slot>
  </div>
</template>
<script>
import indexListItem from '../indexListItem/indexListItem.vue'
export default {
  name: 'IndexEmptyList',
  components: { indexListItem },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {}
    }
  }
}
</script>
<style lang="scss" scoped>
.empty-box-wrap{
    position:relative;
    width:335px;
    display:flex;
    align-items:center;
    flex-wrap: wrap;
    background: #FFFFFF;
    // box-shadow: 0 3px 6px 0 rgba(255,229,214,0.50);
    // border-radius: 4px;
    margin:0 auto;
    // margin-top:-60px;
    z-index:99;
    min-height:100px;
}
</style>
