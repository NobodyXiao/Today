<template>
  <div class="reset_pass_wrapper">
    <div class="reset_pass_title">
      <span style="text-align:center;">Reset Password</span>
    </div>
    <el-form :model="resetPasswordForm" :rules="rules" ref="resetPasswordForm" label="30%" style="margin-bottom: 40px;">
      <el-form-item prop="newPassword">
        <el-input v-model="resetPasswordForm.newPassword" type="text" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input v-model="resetPasswordForm.confirmPassword" type="text" placeholder="请输入确认密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="medium" @click="resetPassword('resetPasswordForm')">保存</el-button>
  </div>
</template>

<script>
import validatorService from '@/rules.js'
export default {
  name: 'resetPassword',
  data () {
    let confirmNotEqualToNewErrCheck = (rule, value, callback) => {
      if (value !== '' && value !== this.passwordChangeForm.newPassword) {
        callback(new Error('确认密码要跟新密码相同'))
      } else {
        callback()
      }
    }
    return {
      resetPasswordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码' },
          { validator: validatorService.FormValidate.Form().validatePsd }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码' },
          { validator: validatorService.FormValidate.Form().validatePsd },
          { validator: confirmNotEqualToNewErrCheck }
        ]
      }
    }
  },
  methods: {
    resetPassword: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('可以重置密码')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reset_pass_wrapper {
  height: 320px;
  width: 480px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-240px, -210px);
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}
.reset_pass_title {
  height: 50px;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
