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
              <el-menu-item index="1-1" style="display: none">会员权限</el-menu-item>
              <el-menu-item index="1">基本信息</el-menu-item>
              <el-menu-item index="2">账户安全</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>内容管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3">我的评论</el-menu-item>
              <el-menu-item index="4">关注的作者</el-menu-item>
              <el-menu-item index="2-3" style="display: none">我的问答</el-menu-item>
              <el-menu-item index="5">我的收藏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>增值服务</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6">我的开讲</el-menu-item>
              <el-menu-item index="3-1" style="display: none">我的活动</el-menu-item>
              <el-menu-item index="7">我的行研</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="18" :offset="2">
      <ul class="personal-base" ref="personalBase">
        <li>
          <!--会员基本信息-->
          <member-basic></member-basic>
        </li>
        <li>
          <!--账户安全-->
          <div v-if="accountSafe">
            <common-security v-if="userInfoData"
                             :isShowSetPass="userInfoData.phone==='' && userInfoData.email===''?false:true"
                             :passSeted="userInfoData.isset_password===1?true:false" :userInfo="userInfoData"
                             @reload="reloadPage"></common-security>
          </div>

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
  /*普通用户专有组件*/
  import MemberBasic from "./memberBasic"//普通会员基本信息
  import MemberGrade from "./memberGrade"//普通会员权限
  /*普通用户公用组件*/
  import CommonCollection from "../common/commonCollection"//我的收藏
  import CommonLecture from "../common/commonLecture"//我的开讲
  import CommonActivity from "../common/commonActivity"//我的活动
  import CommonResearch from "../common/commonResearch"//我的行研
  import CommonSecurity from "../common/commonSecurity"//账户安全
  import CommonFollow from "../common/commonFollow"//我的关注
  import CommonComment from "../common/commonComment"//我的评论
    export default {
        name: "member-nav",
        data(){
          return {
            openeds: ['1', '2', '3'],
            defaultCount:"1",
            accountSafe:true
          }
        },
      methods:{
        reloadPage: function () {
          this.$router.go(0);
        },
        handleOpen(key, keyPath) {
          //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          //console.log(key, keyPath);
        },
        handleSelect(key, keyPath){
          this.keyPath = key;
          window.localStorage.removeItem("menberKey");
          let saveIndex = {};
          saveIndex.index = key;
          let save = encodeURIComponent(JSON.stringify(saveIndex));
          window.localStorage.setItem("menberKey", save);
          var personalBase = this.$refs.personalBase;
          var personalChild = personalBase.children;
          for (var i = 0; i < personalChild.length; i++) {
            personalChild[i].style.display = "none";
          }
          personalChild[key - 1].style.display = "block";
          this.accountSafe = false;
          if (key === '2') {
            if (this.userInfoData) {
              this.accountSafe = true
            } else {
              this.accountSafe = false
            }
          }
        },
      },
      mounted() {
        let count = this.$store.state.memberNav.defaultActive;
        var personalBase = this.$refs.personalBase;
        var personalChild = personalBase.children;
        for (var i = 0; i < personalChild.length; i++) {
          personalChild[i].style.display = "none";
        }
        personalChild[count - 1].style.display = "block";
      },
      created(){
        let saveStr = window.localStorage.getItem("menberKey");
        if (saveStr) {
          let saveObj = JSON.parse(decodeURIComponent(saveStr));
          let index = saveObj.index;
          this.$store.dispatch('getMemberIndex', index);//获取索引
        }
      },
      computed:{
        defaultActive() {
          return this.$store.getters.defaultActive;
        },
        userInfoData() {
          return this.$store.getters.getuserInfo;
        }
      },
      components: {
        CommonSecurity,
        MemberBasic,
        MemberGrade,
        CommonCollection,
        CommonLecture,
        CommonActivity,
        CommonResearch,
        CommonFollow,
        CommonComment
      },
    }
</script>

<style scoped>
  @import "../../../assets/css/personal/personal.css";
</style>
