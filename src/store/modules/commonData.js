import * as types from '../mutation-types'
import merchantManageService from '@api/merchantManage.service.js'
import permissionService from '@api/permission.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
const state = {
  // 站点数据
  siteData: [],
  // 省市区数据
  regionData: [],
  // 商户机构数据
  orgData: [],
  // 门店所属分类数据
  shopClassifyData: [],
  // 用户权限列表
  permissionList: []
}
const mutations = {
  // 设置站点数据
  [types.SET_SITE_DATA](state, siteData) {
    state.siteData = siteData
  },
  // 设置省市区数据
  [types.SET_REGION_DATA](state, regionData) {
    state.regionData = regionData
  },
  // 设置商户所在机构数据
  [types.SET_ORG_DATA](state, orgData) {
    state.orgData = orgData
  },
  // 设置门店门类数据
  [types.SET_SHOP_CLASSIFY_DATA](state, shopClassifyData) {
    state.shopClassifyData = shopClassifyData
  },
  // 设置用户权限列表
  [types.SET_PERMISSION_LIST](state, permissionList) {
    state.permissionList = permissionList
  }
}
const actions = {
  // 请求站点数据
  async getSiteData({ commit }) {
    try {
      const responseData = await merchantManageService.querySiteTree()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit(types.SET_SITE_DATA, responseData.data)
      } else {
        this.$message.error(responseData.resultMsg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 请求地区数据
  async getRegionData({ commit }) {
    try {
      const responseData = await merchantManageService.queryRegionTree()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit(types.SET_REGION_DATA, responseData.data)
      } else {
        this.$message.error(responseData.resultMsg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 请求商户机构数据
  async getOrgData({ commit }) {
    try {
      const responseData = await merchantManageService.queryOrgTree()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit(types.SET_ORG_DATA, responseData.data)
      } else {
        this.$message.error(responseData.resultMsg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 请求门店分类数据
  async getShopClassifyData({ commit }) {
    try {
      const responseData = await merchantManageService.queryShopClassifyTree()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit(types.SET_SHOP_CLASSIFY_DATA, responseData.data)
      } else {
        this.$message.error(responseData.resultMsg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 请求用户权限列表
  async getUserPermissionList({ commit }) {
    try {
      const responseData = await permissionService.queryPermissionList()
      if (responseData.resultCode === AjaxReturnType.SUCCESS) {
        commit(types.SET_PERMISSION_LIST, responseData.data)
      } else {
        commit(types.SET_PERMISSION_LIST, [])
        this.$message.error(responseData.resultMsg)
      }
    } catch (e) {
      commit(types.SET_PERMISSION_LIST, [])
      console.log(e)
    }
  }
}
const getters = {
  regionData(state) { return state.regionData },
  siteData(state) { return state.siteData },
  orgData(state) { return state.orgData },
  shopClassifyData(state) { return state.shopClassifyData },
  permissionList(state) { return state.permissionList }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
