<template>
  <el-form autocomplete="off" :model="passwordChangeForm" :rules="rules" ref="passwordChangeForm" label-width="80px" class="passwordChangeForm">
    <el-form-item label="旧密码" prop="oldPassword" >
      <el-input type="password" autocomplete='new-password' placeholder="请输入旧密码" v-model="passwordChangeForm.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" autocomplete='new-password' placeholder="请输入新密码" v-model="passwordChangeForm.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" autocomplete='new-password' placeholder="请输入确认密码" v-model="passwordChangeForm.confirmPassword"></el-input>
    </el-form-item>
    <el-row>
      <el-button size='small' @click="resetPassword('passwordChangeForm')">重置</el-button>
      <el-button size='small' type="primary" @click="changePassword('passwordChangeForm')">保存</el-button>
    </el-row>
  </el-form>
</template>

<script>
import validatorService from '@/rules.js'
export default {
  name: 'PasswordChange',
  props: ['currentTabIndex'],
  data () {
    let newEqualToOldErrCheck = (rule, value, callback) => {
      if (value !== '' && value === this.passwordChangeForm.oldPassword) {
        callback(new Error('新密码不能跟旧密码相同'))
      } else {
        callback()
      }
    }
    let confirmNotEqualToNewErrCheck = (rule, value, callback) => {
      if (value !== '' && value !== this.passwordChangeForm.newPassword) {
        callback(new Error('确认密码要跟新密码相同'))
      } else {
        callback()
      }
    }
    return {
      requiredErrInforList: {
        oldPassword: '请输入旧密码',
        newPassword: '请输入新密码',
        confirmPassword: '请输入确认密码'
      },
      passwordChangeForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入旧密码'},
          { validator: validatorService.FormValidate.Form().validatePsd }
        ],
        newPassword: [
          {required: true, message: '请输入新密码'},
          { validator: validatorService.FormValidate.Form().validatePsd },
          { validator: newEqualToOldErrCheck }
        ],
        confirmPassword: [
          {required: true, message: '请输入确认密码'},
          { validator: validatorService.FormValidate.Form().validatePsd },
          { validator: confirmNotEqualToNewErrCheck }
        ]
      }
    }
  },
  methods: {
    changePassword: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
        }
      })
    },
    resetPassword: function (formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {
    'currentTabIndex': function () {
      if (this.currentTabIndex === 2) {
        this.resetPassword('passwordChangeForm')
      }
    }
  }
}
</script>

<style scoped>
  .passwordChangeForm {
    display: inline-block;
    width: 400px;
  }
  .el-form-item {
    margin-bottom: 32px !important;
  }
  .el-row {
    margin-left: 80px;
    padding-top: 10px;
  }
</style>
