import systemManageService from '@api/systemManage.service.js'

import { AjaxReturnType } from '@enum/service-enum.js'
const state = {
  areaTree: []
}
const mutations = {

  setAreaTree(state, areaData) {
    state.areaTree = areaData
  }

}
const actions = {
  /** 请求商户站点数据action */
  async getSiteData({ commit }) {
    try {
      const responseData = await systemManageService.systemManageService.getRegions()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit('setAreaTree', responseData.data)
      } else {
        this.$message.error(responseData.resultMsg)
      }
    } catch (error) {
      console.log(error)
    }
  }

}
const getters = {

  areaTree(state) { return state.areaTree }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
