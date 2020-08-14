
const AUDIT_STATUS = {}

AUDIT_STATUS.obj = {
  EDIT: '编辑',
  FIRSTAUDIT: '新增待初审',
  FINALAUDIT: '新增待终审',
  PASS: '新增审核通过',
  NOTPASS: '新增审核不通过',
  U_FIRSTAUDIT: '变更待初审',
  U_FINALAUDIT: '变更待终审',
  U_PASS: '变更审核通过',
  U_NOTPASS: '变更审核不通过'
}
AUDIT_STATUS.list = [
  { key: 'EDIT', value: '编辑' },
  { key: 'FIRSTAUDIT', value: '新增待初审' },
  { key: 'FINALAUDIT', value: '新增待终审' },
  { key: 'PASS', value: '新增审核通过' },
  { key: 'NOTPASS', value: '新增审核不通过' },
  { key: 'U_FIRSTAUDIT', value: '变更待初审' },
  { key: 'U_FINALAUDIT', value: '变更待终审' },
  { key: 'U_PASS', value: '变更审核通过' },
  { key: 'U_NOTPASS', value: '变更审核不通过' }
]

AUDIT_STATUS.options = [
  { key: '', value: '全部' }, // 此项非标准项 为匹配el-select组件的el-option而增加的
  { key: 'EDIT', value: '编辑' },
  { key: 'FIRSTAUDIT', value: '新增待初审' },
  { key: 'FINALAUDIT', value: '新增待终审' },
  { key: 'PASS', value: '新增审核通过' },
  { key: 'NOTPASS', value: '新增审核不通过' },
  { key: 'U_FIRSTAUDIT', value: '变更待初审' },
  { key: 'U_FINALAUDIT', value: '变更待终审' },
  { key: 'U_PASS', value: '变更审核通过' },
  { key: 'U_NOTPASS', value: '变更审核不通过' }
]
AUDIT_STATUS.add = [
  { key: '', value: '全部' }, // 此项非标准项 为匹配el-select组件的el-option而增加的
  { key: 'EDIT', value: '编辑' },
  { key: 'FIRSTAUDIT', value: '新增待初审' },
  { key: 'FINALAUDIT', value: '新增待终审' },
  { key: 'PASS', value: '新增审核通过' },
  { key: 'NOTPASS', value: '新增审核不通过' }
]

AUDIT_STATUS.update = [
  { key: '', value: '全部' }, // 此项非标准项 为匹配el-select组件的el-option而增加的
  { key: 'EDIT', value: '编辑' },
  { key: 'U_FIRSTAUDIT', value: '变更待初审' },
  { key: 'U_FINALAUDIT', value: '变更待终审' },
  { key: 'U_PASS', value: '变更审核通过' },
  { key: 'U_NOTPASS', value: '变更审核不通过' }
]
// 初审审核可识别的状态
AUDIT_STATUS.first = [
  'FIRSTAUDIT',
  'U_FIRSTAUDIT'
]
// 终审审核可识别的状态
AUDIT_STATUS.final = [
  'FINALAUDIT',
  'U_FINALAUDIT'
]

export default AUDIT_STATUS

