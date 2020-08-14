import * as types from '../mutation-types'
const state = {
  /** 商户入驻总进度 */
  merchantStep: 0,
  /** 当前进度，用于上一步与下一步的操作,最大值为4，最小值为0*/
  currentStep: 0,
  /** 入驻时生成的商户id */
  merchantId: '',
  /** 入驻时生成的申请id */
  applyId: ''
}
const mutations = {
  /** 设置商户入驻总进度 */
  [types.SET_MERCHANT_STEP](state, currentStep) {
    state.merchantStep = currentStep
  },
  /** 上一步操作时 设置入驻当前进度 */
  [types.MIUNS_CURRENT_STEP](state) {
    if (state.currentStep > 0) {
      state.currentStep = state.currentStep - 1
    } else {
      state.currentStep = 0
    }
  },
  /** 下一步操作时 设置入驻当前进度 */
  [types.ADD_CURRENT_STEP](state) {
    if (state.currentStep < 4) {
      state.currentStep = state.currentStep + 1
    } else {
      state.currentStep = 4
    }
  },
  /** 设置申请id */
  [types.SET_APPLY_ID](state, applyId) {
    state.applyId = applyId
  },
  /** 设置商户id */
  [types.SET_MERCHANT_ID](state, merchantId) {
    state.merchantId = merchantId
  },
  /** 初始化vuex中数据 */
  [types.CLEAR_STORE_DATA](state) {
    state.merchantStep = 0
    state.applyId = ''
    state.currentStep = 0
    state.merchantId = ''
  }
}
const actions = {
}
const getters = {
  merchantStep(state) { return state.merchantStep },
  applyId(state) { return state.applyId },
  merchantId(state) { return state.merchantId },
  currentStep(state) { return state.currentStep }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
