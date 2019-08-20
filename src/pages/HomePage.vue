<template>
  <div>
    <nav-bar />
    <banner />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Banner from '@/components/Banner.vue'
export default {
  name: 'HomePage',
  components: {
    'nav-bar': NavBar,
    banner: Banner
  }
}
</script>

<style lang="scss" scoped></style>
