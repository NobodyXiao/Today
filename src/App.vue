<template>
  <div id="app">
    <left-Nav></left-Nav>
    <section class="content_wrapper">
      <Header></Header>
      <router-view />
    </section>
  </div>
</template>

<script>
import leftNav from '@/components/leftNav'
import Header from '@/components/header'
export default {
  name: 'App',
  components: {
    leftNav,
    Header
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
}
#app .leaf_nav {
  background: #353D40;
  height: 100%;
  width: 120px;
}
#app .content_wrapper{
  height: 100%;
  flex: 1;
}
#app .header {
  background: #FFFFFF;
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
}
#app .menu_container {
  background: #FFFFFF;
  height: calc(100% - 50px);
}
</style>
