import Service from '../config/service.config'
class CustomAggregation {
  // 自定义聚合票券红包模板下载
  downloadCouponTemplate(data) {
    return Service({
      url: '/custom/poly/coupon/templateDownload.json',
      method: 'get',
      params: data
    })
  }
  // 自定义聚合票券红包上传
  updataCouponTemplate(data) {
    return Service({
      url: '/custom/poly/coupon/upload.json',
      method: 'post',
      data
    })
  }
  // 票券自定义聚合搜索
  searchCoupon(data) {
    return Service({
      url: '/custom/poly/searchCoupon.json',
      method: 'post',
      data
    })
  }
  // 创建自定义聚合
  createAggregation(data) {
    return Service({
      url: '/custom/poly/add.json',
      method: 'post',
      data
    })
  }
  // 自定义聚合列表查询
  searchAggregationList(data) {
    return Service({
      url: '/costom/poly/list.json',
      method: 'post',
      data
    })
  }
  // 自定义聚合列表详情
  searchAggregationDetail(data) {
    return Service({
      url: '/custom/poly/detail.json',
      method: 'get',
      params: data
    })
  }
  // 自定义聚合列表导出
  outputAggregationList(data) {
    return Service({
      url: '/custom/poly/detail.json',
      method: 'get',
      params: data
    })
  }
  // 门店自定义聚合搜索
  searchShop(data) {
    return Service({
      url: '/shopApply/shopInfoByCondition.json',
      method: 'get',
      params: data
    })
  }
  // 自定义聚合删除
  deleteAggregation(data) {
    return Service({
      url: '/custom/poly/delete.json',
      method: 'get',
      params: data
    })
  }
  // 自定义聚合编辑
  editAggregation(data) {
    return Service({
      url: '/custom/poly/edit.json',
      method: 'post',
      data
    })
  }
}
export default new CustomAggregation()
