<template>
  <div class="whole">
    <!--导航区域-->
    <home-navs></home-navs>
    <!-- 用router-view渲染视图 -->
    <!--===内容区域 ===-->
    <div class="whole-content">
      <router-view></router-view>
    </div>
    <!--底部区域-->
    <brighter-footer ref="footer" id="footer"></brighter-footer>
  </div>
</template>
<style>

</style>
<script>
  import HomeNavs from "../../components/mian/nav"
  import BrighterFooter from "../../components/mian/bottom"

  export default {
    data(){
      return{
        footer:""
      }
    },
    created:function(){
    },
    components: {HomeNavs, BrighterFooter}
  }

</script>
