let auditEnum = {
  // 法人证件类型
  juriPersonCertType: {
    ID_CARD: '中国居民身份证',
    HAM_RETURN_PASS: '港澳居民来往内地通行证',
    TAIWAN_RETURN_PASS: '台湾居民来往大陆通行证',
    HMT_RESIDENTS_CARD: '港澳台居民居住证',
    PASSPORT: '护照',
    OTHER: '其他'
  },
  // 账户类型
  acctType: { COMPANY: '企业', PERSON: '个人' },
  // 门店状态
  shopStatus: {
    NORMAL: '正常',
    HIDE: '隐藏',
    FREEZE: '冻结',
    EXPIRE: '过期'
  },
  // 商户类型
  merchantType: { 'INDIVID': '个体工商户', LTD: '有限责任公司', SOLEENTER: '个人独资企业' },
  bussLicenseType: { UNITE_THREE_CARD: '三证合一', DIFF_THREE_CARD: '非三证合一' },
  coopType: { INNER: '内部商户', OUTER: '外部合作商户' },
  subsidySettleWay: { BEFOR: '见票前结算', AFTER: '见票后结算' },
  settleWay: { BUY: '按购买结算', VERIFY: '按核销结算' }
}

export default auditEnum
