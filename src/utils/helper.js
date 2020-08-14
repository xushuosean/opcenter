// 处理enum的各种格式
export function transformEnumDepTypes(types, keyValue) {
  let selectOptions = []
  let optionsItem = {}
  switch (types) {
    // 将key,value格式转换为{label,value}格式
    case 'options':
      for (let key in this) {
        if (key !== 'transformEnumDepTypes') {
          optionsItem = {
            label: this[key],
            value: key
          }
          selectOptions.push(optionsItem)
        }
      }
      return selectOptions
      // 根据value得到对应的key值
    case 'keys':
      for (let key in this) {
        if (this[key] === keyValue) {
          return key
        }
      }
      break
    default:
      break
  }
}

/**
 * 去深层键值
 * @param {*} arr key 值数组
 * @param {*} obj 目标对象
 */
export const getDeepObj = (arr, obj) => arr.reduce((p, t) => (p && p[t]) || undefined, obj)

/**
 * 删除多维数组中指定key值的数据
 * @param {*} arr 目标数组
 * @param {*} key 要删除的 key 值
 */
export const delDeepKey = (arr, key) => {
  return arr.filter((item) => {
    if (item.key === key) return false
    if (item.child) return delDeepKey(item.child, key)
  })
}
/** uuid生成器 */
export const generateUUID = () => {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/** 转换时间格式 */
export const transformTime = (date, type) => {
  // ios转换显示NaN
  // date = date.replace(/-/g, '/')
  let newDate = new Date(date)
  let Year = newDate.getFullYear()
  let Month = newDate.getMonth() + 1
  let Day = newDate.getDate()
  let Hours = newDate.getHours()
  let Minutes = newDate.getMinutes()
  let Seconds = newDate.getSeconds()
  let callbackValue = null
  if (Month < 10) {
    Month = `0${Month}`
  }
  if (Day < 10) {
    Day = `0${Day}`
  }
  if (Hours < 10) {
    Hours = `0${Hours}`
  }
  if (Minutes < 10) {
    Minutes = `0${Minutes}`
  }
  if (Seconds < 10) {
    Seconds = `0${Seconds}`
  }
  switch (type) {
    case 'ymdhms':
      callbackValue = `${Year}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`
      break
    case 'hms':
      callbackValue = `${Hours}:${Minutes}:${Seconds}`
      break
    case 'ymd':
      callbackValue = `${Year}-${Month}-${Day}`
      break
    default:
      callbackValue = {
        Year,
        Month,
        Day,
        Hours,
        Minutes,
        Seconds
      }
      break
  }
  return callbackValue
}

/** 生成下载表格的链接 */
export const generateDownUrl = (componentForm, apiUrl) => {
  let paramList = []
  let params = ''
  for (let k in componentForm) {
    // 剔除空值
    if (componentForm[k] == '' || componentForm[k] == undefined || componentForm[k] == null) {
      delete componentForm[k]
    } else {
      paramList.push(`${k}=${componentForm[k]}`)
    }
  }
  params = paramList.join('&')
  let { origin, pathname } = window.location
  return origin + '/' + pathname.split('/')[1] + apiUrl + '?' + params
}
