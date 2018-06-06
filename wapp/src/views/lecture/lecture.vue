<template>
  <div class="content">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from '../../components/main/header'

  export default {
    name: "lecture",
    components: {AppHeader}
  }
</script>

<style scoped>

</style>
