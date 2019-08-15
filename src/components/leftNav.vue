<template>
  <div class="leaf_nav">
    <div class="avatar">
      <img :src="require('../assets/avatar.png')" alt="avatar">
    </div>
    <ul class="menu">
      <li v-for="(item, index) of menuList" :key="index" @click="changeRouter(item,index)" :class="{'active': activeIndex === index}">
        <img :src="item.url">
        <span>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
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
          text: '日记',
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
      this.$router.push(`${menuItem.routerPath}/${this.id}`)
      this.activeIndex = index
    }
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
