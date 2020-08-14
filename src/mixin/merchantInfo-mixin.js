export default {
  props: {
    // 组件用途：入驻(ADD)与变更(UPDATE)
    type: {
      type: String,
      default: 'ADD'
    },
    formItemType: {
      type: String,
      default: 'ADD'
    },
    // 是否显示编辑商户按钮
    isShowEditButton: {
      type: Boolean,
      default: false
    },
    // 用于控制整个表单是否编辑
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDisabledCopy: this.isDisabled,
      saveStatus: false, // 点了保存，点击下一步不需要再次保存
      activeName: ['merchantInfo'] // 折叠组件的绑定值
    }
  },
  methods: {
    editShopInfo() {
      // 跳商户入驻时的审核结果页
      this.$router.push({
        name: 'merchantDetailAudit',
        query: {
          type: 'UPDATE'
        }
      })
    }
  }
}

