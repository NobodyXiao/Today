<template>
  <div class="leaf_nav">
    <div class="avatar">
      <img :src="require('../assets/images/avatar.png')" alt="avatar">
    </div>
    <ul class="menu">
      <li v-for="(item, index) of menuList" :key="index" @click="changeRouter(item,index)" :class="{'active': activeIndex === index}">
        <img :src="item.url">
        <span>{{item.text}}</span>
      </li>
      <li :class="{'active': activeIndex === -1}" @click="logout()">
        <img src="@/assets/images/logout.png">
        <span>退出</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
export default {
  name: 'LeafNav',
  data () {
    return {
      id: '123456789',
      activeIndex: 0,
      menuList: [
        {
          text: '任务',
          url: '../static/images/task.png',
          routerPath: '/task'
        },
        {
          text: '日志',
          url: '../static/images/diary.png',
          routerPath: '/diary'
        },
        {
          text: '记账',
          url: '../static/images/account.png',
          routerPath: '/account'
        },
        {
          text: '设置',
          url: '../static/images/setting.png',
          routerPath: '/setting'
        }
      ]
    }
  },

  methods: {
    changeRouter: function (menuItem, index) {
      this.activeIndex = index
      if (index === this.menuList.length - 1) {
        this.$router.push(`${menuItem.routerPath}/${this.id}`)
      } else {
        this.$router.push(`/record${menuItem.routerPath}/${this.id}`)
      }
    },
    logout: function () {
      this.activeIndex = -1
      this.$confirm('请问您确认要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        closeOnClickModal: false
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {
      })
    }
  },
  mounted () {
    eventBus.$on('leafNavChange', (activeIndex) => {
      this.activeIndex = activeIndex
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar{
    height: 120px;
    width: 120px;
    padding: 20px;
    box-sizing: border-box;
  }
  .avatar img{
    width: 80px;
  }
  .menu{
    padding: 0;
    margin: 0;
    color:#FFF;
  }
  li{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    cursor: pointer;
  }
  li img{
    height: 30px;
    margin-right: 10px;
  }
  .active{
    background-color: #2C3032;
    color: #2BBFF3;
  }
</style>
