<template>
  <div class="personal-top">
    <div class="personal-middle">
      <div class="personal-back">
        <router-link :to="{name:'Home'}" tag='a'>
          <img src="/static/images/icon/back.svg" alt="图表">
          <span>返回美柏中文网站</span>
        </router-link>
      </div>
      <div class="personal-seas">
        <a  href="http://en.mybiogate.com/" target="_blank">
          <span>English Site</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "top-nav",
      data(){
          return{

          }
      },
      created(){

      }
    }
</script>

<style scoped>

</style>
