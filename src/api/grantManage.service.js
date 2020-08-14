import Service from '../config/service.config'

class GrantManageService {
  // 新增定向发放授权
  createGrantAuth(data) {
    return Service({
      url: '/grantAuth/submit',
      method: 'post',
      data: data
    })
  }
  // 定向发放列表查询
  queryGrantAuthList(data) {
    return Service({
      url: '/grantAuth/list',
      method: 'post',
      data: data
    })
  }
  // 定向发放授权修改
  updateGrantAuth(data) {
    return Service({
      url: '/grantAuth/update',
      method: 'post',
      data: data
    })
  }
  // 定向发放授权撤销
  cancelGrantAuth(data) {
    return Service({
      url: '/grantAuth/cancel',
      method: 'post',
      data: data
    })
  }
  // 搜索票券
  searchCoupon(data) {
    return Service({
      url: '/coupon/search',
      method: 'get',
      params: data
    })
  }
  // 搜索红包
  searchRpk(data) {
    return Service({
      url: '/rpk/search',
      method: 'get',
      params: data
    })
  }
}

export default new GrantManageService()
