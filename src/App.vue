<template>
  <b-container fluid id="app" class="p-0">
    <NotificationContainer />
    <router-view />
  </b-container>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  components: {
    NotificationContainer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
}
</style>
