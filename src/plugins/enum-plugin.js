
import AUDIT_STATUS from '@enum/auditStatus-enum.js'

class EnumPlugin {
  install(Vue) {
    // 审核的进件状态
    Vue.prototype.$AUDIT_STATUS_LIST = AUDIT_STATUS.list
    Vue.prototype.$AUDIT_STATUS = AUDIT_STATUS
    Vue.prototype.$AUDIT_STATUS_OBJ = AUDIT_STATUS.obj
    Vue.prototype.$AUDIT_STATUS_OPTIONS = AUDIT_STATUS.options
    // 新增类的审核
    Vue.prototype.$AUDIT_STATUS_ADD = AUDIT_STATUS.add
    // 变更类的审核
    Vue.prototype.$AUDIT_STATUS_UPDATE = AUDIT_STATUS.update

    Vue.prototype.$AUDIT_STATUS_FIRST = AUDIT_STATUS.first

    Vue.prototype.$AUDIT_STATUS_FINAL = AUDIT_STATUS.final
  }
}

export default new EnumPlugin()
