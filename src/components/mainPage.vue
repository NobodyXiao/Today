<template>
  <div class="main_page">
    <left-nav></left-nav>
    <router-view />
  </div>
</template>

<script>
import LeafNav from '@/components/leftNav'
import MyHeader from '@/components/myHeader'
export default {
  name: 'MainPage',
  data () {
    return {
    }
  },
  components: {
    'left-nav': LeafNav,
    'my-header': MyHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main_page {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2C3E50;
  }
  .main_page .leaf_nav {
  background: #353D40;
  height: 100%;
  width: 120px;
  }
  .main_page .content_wrapper{
    height: 100%;
    width: calc(100% - 120px);
  }
  .main_page .header {
    background: #FFFFFF;
    height: 50px;
    border-bottom: 1px solid #D9D9D9;
  }
  .main_page .menu_container {
    background: #FFFFFF;
    height: calc(100% - 50px);
  }
</style>
