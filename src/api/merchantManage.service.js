import Service from '../config/service.config'
class MerchantManageService {
  // 商户入驻/商户基本信息保存
  insertMerchantBaseInfo(data) {
    return Service({
      url: '/merApply/saveMerBaseInfo.json',
      method: 'post',
      data
    })
  }
  // 商户入驻/商户信息修改
  updateMerchantBaseInfo(data) {
    return Service({
      url: '/merApply/updateMerBase.json',
      method: 'post',
      data
    })
  }
  // 商户入驻/商户信息查询-通用接口
  queryMerchantInfo(data) {
    return Service({
      url: '/merApply/getMerApplyInfo.json',
      method: 'get',
      params: data
    })
  }
  // 商户入驻/商户结算信息保存
  insertMerchantSettlementInfo(data) {
    return Service({
      url: '/merApply/saveOrUpdateMerSettleInfo.json',
      method: 'post',
      data
    })
  }
  // 商户入驻/商户签约交易类型信息保存
  insertMerchantTransTypeInfo(data) {
    return Service({
      url: '/merApply/saveOrUpdateMerAgreeMtInfo.json',
      method: 'post',
      data
    })
  }
  // 商户入驻/商户图片资料信息保存
  saveOrUpdateMerAnnexs(data) {
    return Service({
      url: '/merApply/saveOrUpdateMerAnnexs.json',
      method: 'post',
      data: data
    })
  }
  // 查询门店所属商圈
  queryBizAreaList(data) {
    return Service({
      url: '/bizArea/qryOpenBizArea.json',
      method: 'get',
      params: data
    })
  }
  // 新增商户门店
  insertShopInfo(data) {
    return Service({
      url: '/shopApply/saveShopApply.json',
      method: 'post',
      data
    })
  }
  // 商户下属门店修改
  updateShopInfo(data) {
    return Service({
      url: '/shopApply/updateShopApply.json',
      method: 'post',
      data
    })
  }
  // 商户下属门店删除
  deleteShopInfo(data) {
    return Service({
      url: '/shopApply/deleteShopApply.json',
      method: 'post',
      data
    })
  }
  // 商户审核信息保存
  merchantSubmitExamine(data) {
    return Service({
      url: '/audit/auditSubmit.json',
      method: 'post',
      data
    })
  }
  // 省市区树结构查询
  queryRegionTree(data) {
    return Service({
      url: '/site/region.json',
      method: 'get',
      params: data
    })
  }
  // 站点树结构查询
  querySiteTree(data) {
    return Service({
      url: '/merApply/site/openSiteTree.json',
      method: 'get',
      params: data
    })
  }
  // 机构树查询
  queryOrgTree(data) {
    return Service({
      url: '/merApply/org/orgTree.json',
      method: 'get',
      params: data
    })
  }
  // 门店分类树结构查询
  queryShopClassifyTree(data) {
    return Service({
      url: '/shopCate/getShopCateTree.json',
      method: 'get',
      params: data
    })
  }
  // 商户经营类别查询
  queryBizClassList(data) {
    return Service({
      url: '/merApply/bizClassList.json',
      method: 'get',
      params: data
    })
  }
  // 商户列表查询
  selectMerchantList(data) {
    return Service({
      url: '/merApply/getMerList.json',
      method: 'post',
      data: data
    })
  }
  // 商户列表下载
  exportMerchantList(data) {
    return Service({
      url: '/systemMan/merchantList/exportMerchantList',
      method: 'get',
      params: data
    })
  }
  // 商户详情查询
  queryMerFormalInfo(data) {
    return Service({
      url: '/merApply/merFormalInfo.json',
      method: 'get',
      params: data
    })
  }
  // 商户详情下列表查询
  queryMerFormalShop(data) {
    return Service({
      url: '/merApply/mershopList.json',
      method: 'get',
      params: data
    })
  }
  // 商户关联关系查询
  merRelationTree(data) {
    return Service({
      url: '/merApply/merRelationTree.json',
      method: 'get',
      params: data
    })
  }
  // 商户下属关系变更提交审核接口
  merRelateAndSubAudit(data) {
    return Service({
      url: '/merApply/merRelateAndSubAudit.json',
      method: 'post',
      data: data
    })
  }
  // 根据商户名称或商户编号查询商户
  merByCondition(data) {
    return Service({
      url: '/merApply/merByCondition.json',
      method: 'get',
      params: data
    })
  }
  // 门店列表查询
  queryShopList(data) {
    return Service({
      url: '/shopApply/queryShopList.json',
      method: 'get',
      params: data
    })
  }
  // 门店详情查询
  queryShopDetailInfo(data) {
    return Service({
      url: '/shopApply/getShopInfo.json',
      method: 'get',
      params: data
    })
  }
  // 门店状态变更与提交审核
  shopStatusUp(data) {
    return Service({
      url: '/shopApply/shopStatusUp.json',
      method: 'post',
      data: data
    })
  }
  selectIncomingList(data) {
    return Service({
      url: '/merApply/incomingRecordList.json',
      method: 'post',
      data: data
    })
  }
}
export default new MerchantManageService()
