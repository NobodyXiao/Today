<template>
  <section class="content_wrapper">
    <my-header></my-header>
    <router-view />
  </section>
</template>

<script>
import MyHeader from '@/components/myHeader'
export default {
  name: 'RightPage',
  data () {
    return {}
  },
  components: {
    'my-header': MyHeader
  }
}
</script>
