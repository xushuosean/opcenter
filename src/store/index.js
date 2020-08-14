import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'
import sessionStoragePlugin from './plugins/sessionStoragePlugin'
import discountPayment from './modules/discountPayment.js'

import audit from './modules/audit'
import merchantManage from './modules/merchantManage.js'
import systerm from './modules/systerm.js'
import commonData from './modules/commonData.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    commonData,
    audit,
    merchantManage,
    systerm,
    discountPayment },
  actions,
  state,
  mutations,
  getters,
  plugins: [sessionStoragePlugin]
})
