import Service from '../config/service.config'
class DiscountPaymentManageService {
  // 保存基本信息
  saveBaseInfo(data) {
    return Service({
      url: '/discount/pay/saveBaseInfo.json',
      method: 'post',
      data: data
    })
  }
  // 修改基本信息
  updateBaseInfo(data) {
    return Service({
      url: '/discount/pay/updateBaseInfo.json',
      method: 'post',
      data: data
    })
  }
  shopInfoByCondition(data) {
    return Service({
      url: '/shopApply/shopInfoByCondition.json',
      method: 'get',
      data: data
    })
  }
  // 查询优惠买单详情
  queryDiscountPayDetail(data) {
    return Service({
      url: '/discount/pay/detail.json',
      method: 'get',
      params: data
    })
  }
  // 保存规则
  saveRule(data) {
    return Service({
      url: '/discount/pay/saveRule.json',
      method: 'post',
      data: data
    })
  }
  // 提交审核
  submitAudit(data) {
    return Service({
      url: '/audit/auditSubmit.json',
      method: 'post',
      data: data
    })
  }
  // 获取优惠买单列表
  getDiscountList(data) {
    return Service({
      url: '/discount/pay/list.json',
      method: 'post',
      data: data
    })
  }
  // 优惠买单新增审核列表
  getAddAuditList(data) {
    return Service({
      url: '/discount/pay/addAuditList.json',
      method: 'post',
      data: data
    })
  }
  // 获取优惠买单新增审核详情
  getAddAuditDetail(data) {
    return Service({
      url: '/discount/pay/addAuditDetail.json',
      method: 'get',
      params: data
    })
  }
  // 上架下架
  updateDisplaystate(data) {
    return Service({
      url: '/discount/pay/updateDisplaystate.json',
      method: 'post',
      data: data
    })
  }
  // 修改优惠买单
  updateDiscountPayment(data) {
    return Service({
      url: '/discount/pay/update.json',
      method: 'post',
      data: data
    })
  }
  // 优惠买单更改审核列表
  queryUpdAuditList(data) {
    return Service({
      url: '/discount/pay/updAuditList.json',
      method: 'post',
      data: data
    })
  }

  // 优惠买单模板导入
  getDetailByDisId(data) {
    return Service({
      url: '/discount/pay/importModel.json',
      method: 'get',
      params: data
    })
  }
}

export default new DiscountPaymentManageService()
