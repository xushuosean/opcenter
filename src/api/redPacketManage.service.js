import Service from '../config/service.config'

class RedPacketManage {
  // 新增红包
  createNewRedPacket(data) {
    return Service({
      url: '/rpk/submit',
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
}
export default new RedPacketManage()
