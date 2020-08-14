import * as Types from '../mutation-types'

const state = {
  merchantImportAuditMerchantId: '',
  merchantImportAuditAuditState: ''

}

const getters = {
  getMerchantImportAuditMerchantId: state => state.merchantImportAuditMerchantId,
  getMerchantImportAuditAuditOP: state => {}

}

const mutations = {
  // 设置商户进件-商户ID
  [Types.SET_MERCHANT_IMPORT_AUDIT_MERCHANT_ID](state, id) {
    state.merchantImportAuditMerchantId = id
  },
  // 设置商户进件商户审核状态
  [Types.SET_MERCHANT_IMPORT_AUDIT_AUDIT_STATE](state, auditState) {
    state.merchantImportAuditAuditState = auditState
  }
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}

