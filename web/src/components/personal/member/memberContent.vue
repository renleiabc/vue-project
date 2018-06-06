<template>
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
      <!--我的活动-->
      <common-activity></common-activity>
    </li>
    <li>
      <!--我的行研-->
      <common-research></common-research>
    </li>
  </ul>
</template>

<script>
  /*普通用户专有组件*/
  import MemberContent from "../../components/personal/member/memberContent"//普通会员左侧导航
  import MemberBasic from "../../components/personal/member/memberBasic"//普通会员基本信息
  import MemberGrade from "../../components/personal/member/memberGrade"//普通会员权限
  /*普通用户公用组件*/
  import CommonCollection from "../../components/personal/common/commonCollection"//我的收藏
  import CommonLecture from "../../components/personal/common/commonLecture"//我的开讲
  import CommonActivity from "../../components/personal/common/commonActivity"//我的活动
  import CommonResearch from "../../components/personal/common/commonResearch"//我的行研
  import CommonSecurity from "../../components/personal/common/commonSecurity"//账户安全
  import CommonFollow from "../../components/personal/common/commonFollow"//我的关注
  import CommonComment from "../../components/personal/common/commonComment"//我的评论
  export default {
    name: "member-content",
    data() {
      return {
        accountSafe: true,
      }
    },
    methods: {
      childShow(key) {

      },
    },
    mounted() {
      var personalBase = this.$refs.personalBase;
      var personalChild = personalBase.children;
      let key =  this.$store.state.key;
      console.log(key);
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
    computed: {
      userInfoData() {
        return this.$store.getters.getuserInfo;
      }
    },
  }
</script>

<style scoped>

</style>
