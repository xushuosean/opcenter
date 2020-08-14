<template>
  <el-container>
    <el-aside v-if="mode==='structure'" width="400px">
      <ComponentList @selectComponent="pushMsg" />
    </el-aside>
    <el-main class="main-box">
      <ViewPageWrap :mode="mode" :page-type="pageType" :config="config" @frameLoad="handleOnLoad" @getConfig="pushMsg" @changeTheme="pushMsg" @changeEditStatus="pushMsg" />
    </el-main>
    <el-aside class="aside-box">
      <ChangeProps v-if="edit" :city-code="cityCode" :page-type="pageType" :handle-change-props="handleChangeProps" :edit-props="editProps" :push-msg="pushMsg" :component-name="editComponentName" :component-data="componentData" :mode="mode" @renderPage="renderPage" />
      <el-button v-if="mode === 'structure'" type="primary" class="structure-btn">保存并提交审核</el-button>
    </el-aside>
    <el-dialog
      title="页面配置"
      :visible="configModal"
      @close="configModal = false"
    >
      <pre>{{ JSON.stringify(configRepeat, null, 2) }}</pre>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  components: {
    ComponentList: () => import('../componentList/componentList.vue'),
    ViewPageWrap: () => import('../mobileViewPageWrap/mobileViewPageWrap.vue'),
    ChangeProps: () => import('../changePropsWrap/changePropsWrap.vue')
  },
  props: {
    /**
     * 结构编辑情况下，点击时不需要弹出对应的参数配置
    */
    mode: {
      type: String,
      default: ''
    },
    /**
     * 页面结构+内容配置信息
     */
    config: {
      type: Array,
      default: () => ([])
    },
    /**
     * 页面所属站点
     */
    cityCode: {
      type: Number,
      default: null
    },
    /**
     * 页面类型
     */
    pageType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onload: false,
      viewFrame: null,
      edit: false,
      editKey: '',
      editProps: {},
      configRepeat: {},
      configModal: false,
      editComponentName: '',
      componentData: {}
    }
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        this.pushMsg({
          type: 'renderConfig',
          data: {
            config: this.config
          }
        })
      },
      immediate: true,
      deep: true
    },
    /**
     * 初次获取到config参数时,iframe还没有加载完成
     */
    viewFrame() {
      this.pushMsg({
        type: 'renderConfig',
        data: {
          config: this.config
        }
      })
    }
  },
  mounted: function() {
    window.addEventListener('message', this.receiveMsg)
  },
  beforeDestroy: function() {
    window.removeEventListener('message', this.receiveMsg)
  },
  methods: {
    /**
     * 发送消息
     */
    pushMsg: function(data) {
      if (!this.viewFrame) return
      this.viewFrame.contentWindow.postMessage(data, `${window.location.protocol}//${window.location.host + window.location.pathname}#/mobileView`)
    },
    /**
     * 接收消息
     */
    receiveMsg: function({ data }) {
      const { type } = data
      switch (type) {
        case 'getConfig':
          /**
           * 获取配置
           */
          this.configRepeat = data.data.config
          this.configModal = true
          break
        case 'changeProps':
          /**
           * 修改组件配置
           */
          this.editComponentName = ''
          this.edit = true
          this.editKey = data.data.key
          this.editProps = data.data.props
          this.$nextTick(() => {
            // 处理多个相同组件，其配置表单不重新更新dom
            if (this.mode == 'structure') {
              return
            }
            this.componentData = data.data
            this.editComponentName = data.data.component
          })
          break
        case 'handleDelCpt':
          /**
           * 删除了选中组件
           */
          this.edit = false
          this.editKey = ''
          this.editComponentName = ''
          break
        case 'handleCloseEdit':
          /**
           * 关闭了编辑模式
           */
          this.edit = false
          this.editKey = ''
          break
        case 'initKey':
        /**
         * 初始化 key 值
         */
          this.edit = false
          this.editKey = ''
          break
        default:
          break
      }
    },

    /**
     * iframe 加载完毕
     */
    handleOnLoad: function(frame) {
      this.onload = true
      this.viewFrame = frame
    },

    /**
     * 修改 props
     */
    handleChangeProps: function(cont) {
      this.pushMsg({
        type: 'changeProps',
        data: {
          key: this.editKey,
          props: cont
        }
      })
    },
    renderPage() {
      this.$emit('renderPage')
    }
  }
}
</script>

<style lang='scss' scoped>
.main-box {
  padding-left:80px;
  flex:32% 0 0;
  min-width: 500px;
}
.aside-box{
  display: flex;
  // align-items: center;
  flex:1;
}
.structure-btn{
  position:absolute;
  top:2px;
  right:0;
}
</style>
