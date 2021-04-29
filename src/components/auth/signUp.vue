<template>
  <div class="signup_wrapper">
    <div class="signup_title">
      <span style="text-align:center;">请认真填写一下信息，进行注册</span>
    </div>
    <el-form :model="signUpForm" :rules="rules" ref="signUpForm">
      <el-form-item prop="username">
        <el-input v-model="signUpForm.username" type="text" placeholder="请填写账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="signUpForm.password" type="text" placeholder="请填写密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="signUpForm.nickname" type="text" maxlength="30" placeholder="请填写昵称"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="signUpForm.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="signUpForm.email" prefix-icon="el-icon-message"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="text" placeholder="请输入手机号" v-model="signUpForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="medium" @click="signUp('signUpForm')">注册</el-button>
    <span class="signup_tip" @click="goToLogIn()">已有账号，请点击此处进行登陆</span>
  </div>
</template>

<script>
import validatorService from '@/rules.js'
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'signUp',
  data () {
    return {
      signUpForm: {
        username: '',
        password: '',
        nickname: '',
        sex: null,
        email: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写账号' },
          { min: 8, max: 100, message: '名字长度在8-100的字符之间' }
        ],
        password: [
          { required: true, message: '请填写密码' },
          { validator: validatorService.FormValidate.Form().validatePsd }
        ],
        nickname: [
          { required: true, message: '请填写昵称' },
          { min: 8, max: 100, message: '昵称长度在8-100的字符之间' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ],
        email: [
          { required: true, message: '请填写邮箱' },
          { validator: validatorService.FormValidate.Form().validateEmail }
        ],
        phone: [
          { validator: validatorService.FormValidate.Form().validatePhone }
        ]
      }
    }
  },
  methods: {
    signUp: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData = {}
          for (let key in this.signUpForm) {
            postData[key] = this.signUpForm[key]
          }
          axios.post('http://127.0.0.1:3000/user/signup', Qs.stringify(postData),
          {
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(res => {
            console.log('请求成功', res)
          }, err => {
            console.log('请求失败', err)
          })
        }
      })
    },
    goToLogIn: function () {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup_wrapper {
  height: 600px;
  width: 480px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}
.signup_title {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  color: blue;
}
.signup_tip {
  display: block;
  font-size: 13px;
  margin-top: 30px;
  height: 30px;
  line-height: 30px;
  background: gainsboro;
  color: blue;
  cursor: pointer;
}
</style>
