<template>
  <div class="item-box">
    <!-- 有变更的情况 -->
    <div v-if="changeFlag && showChange">
      <div class="item-row head-line" v-text="label" />
      <div class="item-row">
        <div class="row-label current ">变更前</div>
        <div class="row-content">
          <component :is="comp" :args="historyData" />
        </div>
      </div>
      <div class="item-row">
        <div class="row-label history">变更后</div>
        <div class="row-content">
          <component :is="comp" :args="currentData" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="item-row">
        <div class="row-label title">{{ label }}</div>
        <div class="row-content">
          <component :is="comp" :args="currentData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    label: {
      type: String
    },
    template: {
      default: 'text'
    },
    currentData: {},
    historyData: {},
    showChange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    changeFlag() {
      return this.historyData !== undefined
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.comp = () => import(`@com/auditCom/${this.template}.vue`)
    }
  }

}
</script>

<style lang="scss" scoped>
.item-box{padding-top:5px;padding-bottom: 5px}

.item-row{
  padding:10px;
  display: flex;
  .row-label{ width: 180px;margin-right:10px;}
  .row-content{ flex:1}
  &:hover{
    background-color: rgba(200, 216, 240, 0.6);
  }
  // &.head-line:hover{
  //   background: none;
  // }
  .row-label{
    &.current,&.history{
      padding-left:50px;
    }

    }
}

</style>
