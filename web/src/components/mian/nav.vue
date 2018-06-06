<template>
  <div class="tabs" ref="nav">
    <div class="tabs-top">
      <div class="tabs-English">
        <a href="http://en.mybiogate.com/" target="_blank">
          <div class="tabs-seas">
            <span>English Site</span>
          </div>
        </a>
      </div>
    </div>
    <div class="middle-nav nav-public">
      <div class="nav-left">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" style="padding: 0;">
          <router-link :to="{name:'Home'}" tag='a'>
            <div class="tabs-img">
              <img src="/static/images/public/logo.svg" alt="logo">
            </div>
          </router-link>
        </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name:'Home'}" tag='a' exact replace>
              <div class="tabs-text">首页</div>
            </router-link>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">分类阅读</template>
            <el-menu-item index="3-1" v-for="(item,key) in tags" :key="item.id" class="el-menu-reading">
              <div class="tabs-select" @click="toReading(item)">{{item.name}}</div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="4">
            <router-link :to="{name:'LectureLists'}" tag='a'>
              <div class="tabs-text">开讲</div>
            </router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link :to="{name:'Research'}" tag='a' >
              <div class="tabs-text">行研</div>
            </router-link>
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title">投资服务</template>
            <el-menu-item index="6-1" class="el-menu-reading">
              <router-link :to="{name:'Roadshow'}" tag='a'>
                <div class="tabs-text">网络路演</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="6-2" class="el-menu-reading">
              <router-link :to="{name:'Service'}" tag='a'>
                <div class="tabs-text">海外项目</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="6-2" class="el-menu-reading">
              <router-link :to="{name:'Activity'}" tag='a'>
                <div class="tabs-text">对接活动</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="6-2" class="el-menu-reading">
              <router-link :to="{name:'MeiboVIP'}" tag='a'>
                <div class="tabs-text">投资服务</div>
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="nav-right">
        <div class="tabs-research" @click="handleDisplay">
          <img src="/static/images/public/search.svg" alt="搜索">
        </div>
        <div class="register" @click="handleRegister" v-if="login">
          <div class="tabs-text tabs-login">登录&nbsp; /&nbsp; 注册</div>
        </div>
        <a class="login-personal" target="_blank" @mouseenter="loginAppear()" @mouseleave="loginHidden()"
           v-else>
          <div class="login-pictrue">
            <img :src="memberInf.photo" alt="图片">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <ul class="login-select" v-show="loginShow">
            <li v-for="(inf,index) in loginIfn" :key="inf" @click="signIn(index)">
              {{inf}}
            </li>
          </ul>
        </a>
          <div class="tabs-text tabs-author" @click="shenqing" style="cursor: pointer">申请为专栏作者</div>

      </div>
      <!--搜索对话框-->
      <search-from :value="dialogVisible" @changeValue="change($event)"></search-from>
      <!--登录和注册对话框 v-if="registerVisible"-->
      <register-from v-if="registerVisible" :register="registerVisible" @registerValue="register($event)"></register-from>

    </div>
  </div>
</template>

<style scoped>
  @import "../../assets/css/mian/nav.css";
</style>
<script>
  import SearchFrom from "./search"//搜索对话框
  import RegisterFrom from "./register"
  import {delCookie} from "../../util/util";
  //登录注册对话框
  export default {
    data() {
      return {
        login: true,
        dialogVisible: false,
        registerVisible: false,
        prompt: "",
        activeIndex: '1',
        activeIndex2: '1',
        tags: [],
        loginShow: false,
        imageSrc: "/static/images/public/tou.jpg",
        loginIfn: [
          "账户管理",
          "内容管理",
          "增值服务",
          "退出登录"
        ],
        weixin: "",
      }
    },
    created: function () {
      this.init();
      this.$store.dispatch('getJurisdiction');//调用基本信息

    },
    mounted() {},
    methods: {
      isLogn: function () { //是否登录
        var _t = this
        return _t.getCookie('meibo')
      },
      shenqing:function(){
        var _t = this
        var isLogin = _t.isLogn();
        if(isLogin){ //已登录
                var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
                if(userInfo.user_type===0){ //会员非作者
                  if(userInfo.status===0||userInfo.status===3){ // 会员未申请 或作者审核失败
                    _t.$router.push({name:'Application'})
                  }else{ //作者申请中未审核，还未正式成为作者
                    _t.$router.push({name:'checkPage'})
                  }
                }else{ //作者 跳转到推荐朋友页面
                  _t.$router.push({name:'recommend'})
                }
        }else{
          _t.$router.push({name:'Application'})
        }
      },
      init() {
        let nav = this.$refs.nav;
        var _t = this
        _t.tags = [{
          id:13,
          name:'投资研究'
        },{
          id:16,
          name:'深度解读'
        },{
          id:14,
          name:'CEO访谈'
        },{
          id:15,
          name:'企业分析'
        },{
          id:17,
          name:'报告精选'
        }]
        //获取cookie;
        let getToken = getCookie("meibo");
        let user_type = "";
        if (getToken) {
          this.login = false;
        } else {
          this.login = true;
        }
      },
      signIn(index) {
        var userType = this.$store.state.member.userType;
       if(userType.member){
         var arr = ["1","3","6"];
       }else if(userType.author){
         var arr = ["1","4","8"];
       }
        switch (index) {
          case 0:
            this.$store.commit('decrease', arr[0]);
            this.$router.push({name: "Member"})
            break;
          case 1:
            this.$store.commit('decrease', arr[1]);
            this.$router.push({name: "Member"})
            break;
          case 2:
            this.$store.commit('decrease', arr[2]);
            this.$router.push({name: "Member"});
            break;
          case 3:
            this.$post("/user/logout").then(res => {
              if (res.status == "success" && res.code == "200") {
                delCookie("meibo");
                this.$router.push({name: 'Home'});
                window.location.reload();
              } else {

              }
            }).catch(err => {
              if (err == undefined) {
                console.log("退出登录，接口未连接上！");
              }
            })
          default:
            return false;
        }
      },
      personalInf() {
        this.$router.push({name: 'Member'})
      },
      loginAppear() {//显示登录
        this.loginShow = true;
      },
      loginHidden() {//隐藏登录
        this.loginShow = false;
      },
      handleDisplay() {
        if (this.dialogVisible == false) {
          this.dialogVisible = true;
        } else {
          this.dialogVisible = false;
        }
      },
      handleRegister() {
        if (this.registerVisible == false) {
          this.registerVisible = true;

        } else {
          this.registerVisible = false;
        }
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      change(msg) {
        this.dialogVisible = msg;
      },
      register(val) {
        this.registerVisible = false;
      },
      toReading: function (item) {
        this.$router.push({name: 'reading', params: {id: item.id}})
      }
    },
    computed: {
      memberInf() {
        return this.$store.getters.memberInf;
      },
    },
    components: {SearchFrom, RegisterFrom}
  }
</script>
