import { transformEnumDepTypes } from '@utils/helper.js'
// 商户类型
export const merchantType = {
  INDIVID: '个体工商户',
  LTD: '有限责任公司',
  SOLEENTER: '个人独资企业',
  transformEnumDepTypes
}
// 经营者证件类型
export const juriPersonCertType = {
  ID_CARD: '中国居民身份证',
  HAM_RETURN_PASS: '港澳居民来往内地通行证',
  TAIWAN_RETURN_PASS: '台湾居民大陆通行证',
  HMT_RESIDENTS_CARD: '港澳台居民居住证',
  PASSPORT: '护照',
  OTHER: '其他',
  transformEnumDepTypes
}
// 工商执照类型
export const bussLicenseType = {
  UNITE_THREE_CARD: '三证合一(有统一社会信用码)',
  DIFF_THREE_CARD: '非三证合一(无统一社会信用代码)',
  transformEnumDepTypes
}
// 商户合作属性
export const merchantCooperType = {
  INNER: '内部商户',
  OUTER: '外部合作商户',
  transformEnumDepTypes
}
// 账户类型
export const accountType = {
  COMPANY: '企业',
  PERSON: '个人',
  transformEnumDepTypes
}
// 开户银行
export const acctBankNameType = {
  0: '兴业银行',
  1: '中国银行',
  2: '建设银行',
  transformEnumDepTypes
}
// 交易类型
export const signTransType = {
  checkOnline: '在线买单',
  checkCoupon: '优惠券'
}
// 优惠券兑换类型
export const couponExcType = {
  checkPurchase: '本金购买',
  checkExchange: '积分兑换'
}
// 门店联系人姓名
export const shopContactType = {
  true: '与商户联系人相同',
  false: '自定义',
  transformEnumDepTypes
}
// 是否开通网发 通用于选择是否的下拉框
export const isBooleanType = {
  true: '是',
  false: '否',
  transformEnumDepTypes
}

// 门店营业时间
export const shopBussinessWeeks = ['全部', '周一', '周二', '周三', '周四', '周五', '周六', '周日']

// 商户审核状态
export const auditStatus = {
  EDIT: '编辑',
  PASS: '新增审核通过',
  FIRSTAUDIT: '新增待初审',
  FINALAUDIT: '新增待终审',
  NOTPASS: '新增审核不通过',
  U_EDIT: '变更编辑',
  U_FIRSTAUDIT: '变更待初审',
  U_FINALAUDIT: '变更待终审',
  U_PASS: '变更审核通过',
  U_NOTPASS: '变更审核不通过',
  transformEnumDepTypes
}

// 进件类型
export const merchantIncomingType = {
  NORMAL: '普通进件'
}
// 商户状态
export const merchantStatus = {
  NORMAL: '正常',
  FREEZE: '冻结',
  EXPIRE: '过期',
  transformEnumDepTypes
}
// 门店状态
export const shopStatus = {
  NORMAL: '正常',
  HIDE: '隐藏',
  FREEZE: '冻结',
  EXPIRE: '过期',
  transformEnumDepTypes
}
