/* 表单自定义校验规则*/

// 校验手机号
export const validatePhoneNumber = (rule, value, callback) => {
  if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
