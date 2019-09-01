<template>
  <div class="personal_infor">
    <el-form
      autocomplete="off"
      :model="personalInforForm"
      :rules="rules"
      ref="personalInforForm"
      label-width="80px"
      class="personal_infor_form"
    >
      <el-form-item label="头像" prop="avatar">
        <div class="avatar_wrapper">
          <input class="file_change_btn" accept="image/jpg, image/gif, image/png" type="file" @change="changeImg($event)">
          <img :src="personalInforForm.avatar" alt class="avatar" />
          <span class="text_tip">更改头像</span>
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          type="text"
          maxlength="30"
          placeholder="请输入昵称"
          v-model="personalInforForm.nickName"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="personalInforForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="personalInforForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" placeholder="请输入手机号" v-model="personalInforForm.phone"></el-input>
      </el-form-item>
      <el-row>
        <el-button size="small" type="primary" @click="changePassword('personalInforForm')">保存</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import validatorService from '@/rules.js'
export default {
  name: 'PersonalInforChange',
  props: ['currentTabIndex'],
  data () {
    return {
      personalInforForm: {
        avatar: '',
        nickName: '',
        sex: '',
        email: '',
        phone: ''
      },
      rules: {
        avatar: [{ required: true, message: '请上传头像' }],
        nickName: [{ required: true, message: '请填写昵称' }],
        sex: [{ required: true, message: '请选择性别' }],
        email: [
          { validator: validatorService.FormValidate.Form().validateEmail },
          { required: true, message: '请输入邮箱地址' }
        ],
        phone: [
          { validator: validatorService.FormValidate.Form().validatePhone }
        ]
      }
    }
  },
  methods: {
    changePassword: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 进行请求服务器的操作
        }
      })
    },
    changeImg: function (e) {
      let file = e.target.files[0]
      let that = this
      // 大小合格
      let reader = new FileReader()
      reader.readAsDataURL(file) // 读出 base64
      reader.onloadend = function () {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        let dataURL = reader.result
        that.personalInforForm.avatar = dataURL
      }
    }
  },
  watch: {
    'currentTabIndex': function () {
      if (this.currentTabIndex === 1) {
        this.$refs['personalInforForm'].resetFields()
      }
    }
  }
}
</script>

<style>
.personal_infor .personal_infor_form {
  display: inline-block;
  width: 400px;
}
.personal_infor .el-form-item {
  margin-bottom: 32px !important;
}
.personal_infor .el-row {
  margin-left: 80px;
  padding-top: 10px;
}
.personal_infor .avatar_wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
}
.personal_infor .avatar {
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px dashed gray;
  box-sizing: border-box;
  border-radius: 80px;
  z-index: 0;
}
.personal_infor .file_change_btn {
  position: absolute;
  left: 0px;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}
.personal_infor .text_tip {
  display: none;
  height: 20px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -10px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
.personal_infor .avatar_wrapper:hover .text_tip {
  display: block;
  z-index: 9;
}
</style>
