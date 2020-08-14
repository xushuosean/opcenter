import Service from '../config/service.config'

class TicketsManage {
  // 新增票券
  createNewTicket(data) {
    return Service({
      url: '/coupon/submit',
      method: 'post',
      data: data
    })
  }
  getTicketList(data) {
    return Service({
      url: '/coupon/list.json',
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
      url: '/coupon/auditList',
      method: 'post',
      data: data
    })
  }

}
export default new TicketsManage()
