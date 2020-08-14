<template>
  <div
    :class="{
      'black': dark
    }"
  >
    <div v-loading="loading" class="viewWrap globalBg">
      <DeepItem
        :list="config"
        :edit="edit"
        :active-key="activeKey"
        :select="handleSelectToChangeProps"
        :init-key="handleInitKey"
      />
    </div>
  </div>
</template>
<script>
import DeepItem from './deep-item'
export default {
  name: 'DeepWrap',
  components: {
    DeepItem
  },
  data() {
    return {
      drag: false,
      config: [],
      activeKey: '',
      dark: false,
      edit: true,
      mode: '',
      loading: true
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.edit,
        ghostClass: 'ghost'
      }
    }
  },
  created() {
    this.mode = this.$route.query.mode
  },
  mounted() {
    window.addEventListener('message', this.onMsg)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMsg)
  },
  methods: {
    onMsg({ data }) {
      const { type } = data
      switch (type) {
        /**
         * 添加组件
         */
        case 'addCpt':
          this.handleAddCpt(data.data)
          break
        case 'getConfig':
          this.handleGetConfig()
          break
        case 'changeProps':
          this.handleChangeProps(data.data)
          break
        case 'delCpt':
          this.handleDelCpt()
          break
        case 'changeTheme':
          this.handleChangeTheme(data.data)
          break
        case 'changeEditStatus':
          this.handleChangeEditStatus(data.data)
          break
        case 'renderConfig':
          console.log(data.data)
          this.handlePageConfig(data.data)
          break
        default:
          break
      }
    },

    /**
     * 初始化 key
     */
    handleInitKey() {
      this.activeKey = ''
      this.pushMsg({
        type: 'initKey'
      })
    },

    /**
     * 向父级发送消息
     */
    pushMsg(data) {
      top.postMessage(data, location.href)
    },

    /**
     * 选择组件修改 props
     */
    handleSelectToChangeProps(key, props, component, uuid) {
      if (!this.edit) return
      this.activeKey = key
      this.pushMsg({
        type: 'changeProps',
        data: {
          key,
          props,
          component,
          uuid
        }
      })
    },

    /**
     * 添加组件
     */
    handleAddCpt(cpt) {
      this.config.push(cpt)
    },
    /**
     * 获取传入的配置
     */
    handlePageConfig(data) {
      this.loading = false
      this.config = data.config
    },
    /**
     * 获取配置
     */
    handleGetConfig() {
      this.pushMsg({
        type: 'getConfig',
        data: {
          config: this.config
        }
      })
    },

    /**
     * 修改配置项
     */
    handleChangeProps({ key, props }) {
      this.config = this.changeDeepIndex(this.config, key, props)
    },

    /**
     * 切换主题
     */
    handleChangeTheme({ dark }) {
      this.dark = dark
    },

    /**
     * 切换编辑状态
     */
    handleChangeEditStatus({ edit }) {
      this.edit = edit
      if (!edit) {
        this.handleInitKey()
        this.pushMsg({
          type: 'handleCloseEdit'
        })
      }
    },

    /**
     * 删除组件
     */
    handleDelCpt() {
      if (this.activeKey) {
        this.config = this.delDeepIndex(this.config, this.activeKey)
        this.handleInitKey()
        this.pushMsg({
          type: 'handleDelCpt'
        })
      }
    },

    /**
   * 删除多维数组中指定 index 数组的项
   */
    delDeepIndex(arr, key, prevKey = '') {
      return arr.filter((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) return false
        if (item.child && item.child.length > 0) item.child = this.delDeepIndex(item.child, key, currentKey)
        return true
      })
    },

    /**
     * 修改多维数组中指定 index 的值
     */
    changeDeepIndex(arr, key, res, prevKey = '') {
      return arr.map((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) {
          item.props = res
        }
        if (item.child) item.child = this.changeDeepIndex(item.child, key, res, currentKey)
        return item
      })
    }
  }
}
</script>

<style lang="scss">
.viewWrap > .dragArea {
  &:after {
    visibility: hidden;
  }
}
</style>

