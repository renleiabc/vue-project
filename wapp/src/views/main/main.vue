<template>
  <div class="content">
    <div class="content-box">
      <app-header></app-header>
      <router-view></router-view>
    </div>
    <app-footer></app-footer>

  </div>
</template>

<script>
  import AppHeader from '../../components/main/header'
  import AppFooter from '../../components/main/footer'
  export default {
    components: {AppHeader, AppFooter}
  }
</script>

<style scoped>

</style>
