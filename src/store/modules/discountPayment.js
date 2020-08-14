import * as types from '../mutation-types'

const state = {
  discountPaymentStep: 0,
  applyId: '',
  modelId: ''
}

const getters = {

  discountPaymentStep: state => { return state.discountPaymentStep },
  applyId: state => { return state.applyId },
  modelId: state => { return state.modelId }
}

const mutations = {
  [types.ADD_DISCOUNTPAYMENT_STEP](state, add) {
    state.discountPaymentStep = state.discountPaymentStep + add
  },
  [types.SET_DISCOUNTPAYMENT_STEP](state, set) {
    state.discountPaymentStep = set
  },

  [types.CLEAR_DISCOUNTPAYMENT_DATA](state) {
    state.discountPaymentStep = 0
    state.applyId = ''
    state.modelId = ''
  },
  [types.SET_DISCOUNTPAYMENT_APPLYID](state, id) {
    state.applyId = id
  },
  // 设置导入模板的Id
  setModelId(state, id) {
    state.modelId = id
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters

}
