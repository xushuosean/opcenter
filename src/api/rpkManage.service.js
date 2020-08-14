import Service from '../config/service.config'

class RpkManage {
  // 新增票券
  createNewRpk(data) {
    return Service({
      url: '/rpk/submit',
      method: 'post',
      data: data
    })
  }
  getRpkList(data) {
    return Service({
      url: '/rpk/list.json',
      method: 'post',
      data: data
    })
  }
  getRpkAuditList(data) {
    return Service({
      url: '/rpk/auditList.json',
      method: 'post',
      data: data
    })
  }

  // 门店查询
  searchShop(data) {
    return Service({
      url: '/shopApply/shopInfoByCondition.json',
      method: 'get',
      params: data
    })
  }
  // 商户查询
  searchMerchant(data) {
    return Service({
      url: '/merApply/merByCondition.json',
      method: 'get',
      params: data
    })
  }
  // 新增审核列表
  getTicketAddAudit(data) {
    return Service({
      url: '/rpk/auditList',
      method: 'post',
      data: data
    })
  }

}
export default new RpkManage()
