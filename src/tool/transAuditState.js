
export var transToEng = word => {
  switch (word) {
    case '待初审':
      return 'beforeFirstAudit'
      break
    case '待终审':
      return 'beforeLastAudit'
      break
    default:
      return 'error auditSate'
  }
}
export var transToChinese = word => {
  switch (word) {
    case 'beforeFirstAudit':
      return '待初审'
      break
    case 'beforeLastAudit':
      return '待终审'
      break
    default:
      return 'error auditSate'
  }
}
