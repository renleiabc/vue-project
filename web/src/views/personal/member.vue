<template>
  <div>
    <top-nav></top-nav>
    <div class="personal-middle">
      <div class="personal-logo">
        <router-link :to="{name:'Home'}" tag='a'>
          <img src="/static/images/public/logo.svg" alt="logo">
        </router-link>
      </div>
      <el-row :gutter="24">
        <!--普通用户组件-->
        <member-general v-if="userType.member"></member-general>
        <!--作者专栏组件-->
        <member-author v-if="userType.author"></member-author>
      </el-row>
    </div>
  </div>
</template>
<script>
  /*公用组件*/
  import TopNav from "../../components/personal/common/topNav"//头部
  /*普通用户组件*/
  import MemberGeneral from "../../components/personal/member/memberGeneral"//普通会员
  /*普通用户组件*/
  import MemberAuthor from "../../components/personal/author/memberAuthor"//作者会员
  export default {
    name: "personal",
    data() {
      return {
        key: "",
        keyPath: "true",
        index: "true",
        num: "1",
        accountSafe: true,
        user_type:true
      }
    },
    methods: {
      reloadPage: function () {
        this.$router.go(0)
      },
    },
    components: {
      TopNav,
      MemberGeneral,
      MemberAuthor
    },
    created() {

      this.$store.dispatch('getJurisdiction');//调用基本信息
      this.$store.dispatch('getToken');//调用我的cookie;
      var token = getCookie("meibo");
      if (!token) {
        this.$router.push({name: 'Home'})
        return;
      }
    },
    mounted(){
    },
    computed:{
      userType() {
        return this.$store.getters.userType;
      },
    }
  }
</script>

<style scoped>
  @import "../../assets/css/personal/personal.css";
</style>
