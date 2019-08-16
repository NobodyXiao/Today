<template>
  <div class="error_page">
    <span>404</span>
    <span>页面不存在</span>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error_page {
    background:#F8F8FA;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 80px;
  }
  .error_page span:first-child{
    color: #060949;
    font-size: 200px;
    font-weight: bold;
  }
  .error_page span:last-child{
    font-weight: bold;
    font-size: 30px;
  }
</style>
