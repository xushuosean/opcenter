import Service from '../config/service.config'
//  #商户进件审核
// 商户进件审核列表查询
class MerchantAuditService {
  // 商户入驻审核列表查询
  merAddAuditList(data) {
    return Service({
      url: '/merApply/merAddAuditList.json',
      method: 'get',
      params: data
    })
  }

  // 商户变更审核列表查询
  merUpAuditList(data) {
    return Service({
      url: '/merApply/merUpAuditList.json',
      method: 'get',
      params: data
    })
  }
  // 门店类目列表查询
  getShopCateTree(data) {
    return Service({
      url: '/shopCate/getShopCateTree.json',
      method: 'get',
      params: data
    })
  }

  // 门店新增审核列表查询
  shopAddAuditList(data) {
    return Service({
      url: '/shopApply/shopAddAuditList.json',
      method: 'get',
      params: data
    })
  }t

  // 门店变更审核列表查询
  shopUpdateAuditList(data) {
    return Service({
      url: '/shopApply/shopUpdateAuditList.json',
      method: 'get',
      params: data
    })
  }

  // 商户申请基本信息查询
  getMerApplyInfo(data) {
    return Service({
      url: '/merApply/getMerApplyInfo.json',
      method: 'get',
      params: data
    })
  }

  // 门店申请信息查询
  getShopApplyInfo(data) {
    return Service({
      url: '/shopApply/getShopApplyInfo.json',
      method: 'get',
      params: data
    })
  }
  // 优惠买单变更审核列表查询
  discountPayUpdateAuditList(data) {
    return Service({
      url: '/shopApply/getShopApplyInfo.json',
      method: 'get',
      params: data
    })
  }

  // 门店关系变更审核列表
  shopStatusAuditList(data) {
    return Service({
      url: '/shopApply/shopStatusAuditList.json',
      method: 'get',
      params: data
    })
  }
  // 门店状态系变更审核列表
  shopRelationAuditList(data) {
    return Service({
      url: '/shopApply/shopStatusAuditList.json',
      method: 'get',
      params: data
    })
  }
  // 商户关系变更审核列表
  merchantRelationAuditList(data) {
    return Service({
      url: '/merApply/getMerReAuditList.json',
      method: 'post',
      data: data
    })
  }
}

class AuditService {
  // 审核列表审核权限查询
  getUserAuditTasks(data) {
    return Service({
      url: '/audit/getUserAuditTasks.json',
      method: 'post',
      data: data
    })
  }
  // 审核日志查询
  showAuditLog(data) {
    return Service({
      url: '/audit/showAuditLog.json',
      method: 'get',
      params: data
    })
  }
  // 提交审核结果
  completeAudit(data) {
    return Service({
      url: '/audit/completeAudit.json',
      method: 'post',
      data: data
    })
  }
}

// 票券审核
class CouponAuditService {
  // 审核列表审核权限查询
  getTicketAddAudit(data) {
    return Service({
      url: '/coupon/auditList',
      method: 'post',
      data: data
    })
  }
}

export default new AuditService()
export var merchantAuditService = new MerchantAuditService()
export var couponAuditService = new CouponAuditService()
