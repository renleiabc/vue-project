<template>
  <div>
    <el-col :span="4">
      <div class="personal-nav">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#669934"
          text-color="#383838"
          :default-openeds="openeds">
          <el-submenu index="1">
            <template slot="title">
              <span>账户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1">基本信息</el-menu-item>
              <el-menu-item index="1-2" style="display: none">会员权限</el-menu-item>
              <el-menu-item index="2">我的收入</el-menu-item>
              <el-menu-item index="3">账户安全</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>内容管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4">我的文章</el-menu-item>
              <el-menu-item index="5">我的评论</el-menu-item>
              <el-menu-item index="6">关注的作者</el-menu-item>
              <el-menu-item index="7">我的收藏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>增值服务</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="8">我的开讲</el-menu-item>
              <el-menu-item index="3-1" style="display: none;">我的活动</el-menu-item>
              <el-menu-item index="9">我的行研</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="18" :offset="2">
      <ul class="personal-base" ref="authorBase">
        <li>
          <!--基本信息-->
          <basic-ifn></basic-ifn>
        </li>
        <li>
          <!--我的收入-->
          <author-income></author-income>
        </li>
        <li>
          <div v-if="accountSafe">
            <common-security v-if="userInfoData"
                             :isShowSetPass="userInfoData.phone==='' && userInfoData.email===''?false:true"
                             :passSeted="userInfoData.isset_password===1?true:false" :userInfo="userInfoData"
                             @reload="reloadPage"></common-security>
          </div>
        </li>
        <li>
          <!--我的文章-->
          <author-article></author-article>
        </li>
        <li>
          <!--我的评论-->
          <common-comment></common-comment>
        </li>
        <li>
          <!--关注的作者-->
          <common-follow></common-follow>
        </li>
        <li>
          <!--我的收藏-->
          <common-collection></common-collection>
        </li>
        <li>
          <!--我的开讲-->
          <common-lecture></common-lecture>
        </li>
        <li>
          <!--我的行研-->
          <common-research></common-research>
        </li>
      </ul>
    </el-col>
  </div>
</template>

<script>
  /*专栏作者个人中心组件*/
  import BasicIfn from "./authorBasic"//作者基本信息
  import AuthorIncome from "./authorIncome"//我的收入
  import AuthorArticle from "./authorArticle"//我的文章
  /*普通用户公用组件*/
  import CommonCollection from "../common/commonCollection"//我的收藏
  import CommonLecture from "../common/commonLecture"//我的开讲
  import CommonActivity from "../common/commonActivity"//我的活动
  import CommonResearch from "../common/commonResearch"//我的行研
  import CommonSecurity from "../common/commonSecurity"//账户安全
  import CommonFollow from "../common/commonFollow"//我的关注
  import CommonComment from "../common/commonComment"//我的评论
  export default {
    name: "personal",
    data() {
      return {
        openeds: ['1', '2', '3'],
        keyPath: "true",
        index: "true",
        accountSafe: true,
      }
    },
    methods: {
      reloadPage: function () {
        var _t = this
        _t.$router.go(0)
      },
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        this.keyPath = key;
        this.accountSafe = false;
        var personalBase = this.$refs.authorBase;
        var personalChild = personalBase.children;
        window.localStorage.removeItem("menberKey");
        let saveIndex = {};
        saveIndex.index = key;
        let save = encodeURIComponent(JSON.stringify(saveIndex));
        window.localStorage.setItem("menberKey", save);
        for (var i = 0; i < personalChild.length; i++) {
          personalChild[i].style.display = "none";
        }
        personalChild[key - 1].style.display = "block";
        if (key === '3') {
          if (this.userInfoData) {
            this.accountSafe = true
          } else {
            this.accountSafe = false
          }
        }
      }
    },
    computed: {
      defaultActive() {
        return this.$store.getters.defaultActive;
      },
      userInfoData() {
        return this.$store.getters.getuserInfo
      }
    },
    mounted() {
      let count = this.$store.state.memberNav.defaultActive;
      var personalBase = this.$refs.authorBase;
      var personalChild = personalBase.children;
      for (var i = 0; i < personalChild.length; i++) {
        personalChild[i].style.display = "none";
      }
      personalChild[count - 1].style.display = "block";
    },
    created() {
      this.$store.dispatch('getToken');//调用我的cookie;
      let saveStr = window.localStorage.getItem("menberKey");
      if (saveStr) {
        let saveObj = JSON.parse(decodeURIComponent(saveStr));
        let index = saveObj.index;
        this.$store.dispatch('getMemberIndex', index);//获取索引
      }
      var token = getCookie("meibo");
      if (!token) {
        this.$router.push({name: 'Home'})
        return;
      }
    },
    components: {
      BasicIfn,
      CommonCollection,
      CommonLecture,
      CommonActivity,
      CommonResearch,
      CommonSecurity,
      CommonFollow,
      CommonComment,
      AuthorIncome,
      AuthorArticle
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/personal.css";
</style>
