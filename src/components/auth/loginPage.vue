<template>
  <div class="login_wrapper">
    <div class="login_pic">
      <span style="align-self: flex-start;color: blueviolet;">计划</span>
      <span style="color: cornflowerblue;">记录</span>
      <span style="align-self: flex-start;color: darkorange;">总结</span>
    </div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login_form">
      <el-form-item prop="account">
        <el-input v-model="loginForm.account" type="text" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="text" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
    </el-form>
    <span class="forget_pass_tip" @click="open">忘记密码?</span>
    <el-button type="primary" size="medium" @click="login('loginForm')">登陆</el-button>
    <span class="signup_tip" @click="goToSignUp()">未注册，请点击此处进行注册</span>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      userEmail: '',
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          {required: true, message: '请输入账号'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ]
      }
    }
  },
  methods: {
    login: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('可以登陆')
        }
      })
    },
    open: function () {
      this.$prompt('请输入注册时的邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        closeOnClickModal: false,
        inputPattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        console.log(value)
      }).catch(() => {
      })
    },
    goToSignUp: function () {
      this.$router.push('/sign_up')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_form {
  position: relative;
}
.forget_pass_tip {
  display: block;
  position: absolute;
  bottom: 95px;
  width: calc(100% - 40px);
  text-align: right;
  font-size: 13px;
  padding-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.login_wrapper {
  height: 420px;
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
.login_pic {
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-style: italic;
  font-family: serif;
  background: bisque;
  padding-top: 30px;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.login_pic span {
  flex: 1;
  text-align: center;
}
.signup_tip {
  display: block;
  font-size: 13px;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
  background: gainsboro;
  color: blue;
  cursor: pointer;
}
</style>
