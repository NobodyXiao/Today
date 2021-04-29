<template>
  <div class="setting">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="el_tabs">
      <el-tab-pane label="密码管理" name="first">
        <password-change :currentTabIndex="currentTabIndex"></password-change>
      </el-tab-pane>
      <el-tab-pane label="个人信息管理" name="second">
        <personal-infor-change :currentTabIndex="currentTabIndex"></personal-infor-change>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
import PasswordChange from '@/components/auth/passwordChange'
import PersonalInforChange from '@/components/menu/personalInforChange'
export default {
  name: 'Setting',
  data () {
    return {
      currentTabIndex: 1,
      activeName: 'first'
    }
  },
  mounted () {
    eventBus.$emit('leafNavChange', 3)
  },
  methods: {
    handleClick: function (tab) {
      tab.paneName === 'first' && (this.currentTabIndex = 1)
      tab.paneName === 'second' && (this.currentTabIndex = 2)
    }
  },
  components: {
    'password-change': PasswordChange,
    'personal-infor-change': PersonalInforChange
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .setting {
    height: 100%;
    width: 100%;
    padding: 0 20px 20px;
  }
  .el_tabs {
    height:100%;
  }
  .el-tab-pane {
    padding: 20px 0;
    box-sizing: border-box;
    height: 100%;
  }
  .el-tabs__item {
    height: 50px !important;
    line-height: 50px !important;
    font-size: 16px !important;
  }
  .el-tabs__content {
    height: calc(100% - 60px);
  }
</style>
