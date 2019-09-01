let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
let numberReg = /^\d+$|^\d+[.]?\d+$/
let passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
let emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
let FormValidate = (function () {
  function FormValidate () {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 只能数字的验证
      validateNumber (rule, value, callback) {
        if (value !== '' && !numberReg.test(value)) {
          callback(new Error('该值只能包含数字'))
        } else {
          callback()
        }
      },

      // 密码的验证
      validatePsd (rule, value, callback) {
        if (value !== '' && !passwordReg.test(value)) {
          callback(new Error('密码必须包含数字，大写字母，小写字母，特殊字符"@$!%*?&",且长度介于8-16位'))
        } else {
          callback()
        }
      },

      // 邮箱的验证规则
      validateEmail (rule, value, callback) {
        if (value !== '' && !emailReg.test(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone (rule, value, callback) {
        if (value !== '' && !phoneReg.test(value)) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
    }
  }
  return FormValidate
}())

exports.FormValidate = FormValidate
