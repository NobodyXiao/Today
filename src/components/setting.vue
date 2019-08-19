<template>
  <div class="setting">
    Set up your personal information
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
export default {
  name: 'Setting',
  data () {
    return {
    }
  },
  mounted () {
    eventBus.$emit('leafNavChange', 3)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .setting {
    background:paleturquoise;
    height: 100%;
  }
</style>
