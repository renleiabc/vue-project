<template>
    <div>
      <transition :name="transitionName">
        <div v-if="showStart" key="one" class="startBox">
          <div class="startBox_container">
            <div class="startBox_container_logo">
              <img src="../../assets/images/application/logo.png" alt="">
            </div>
            <p class="startBox_container_title">
              欢 迎 成 为 认 证 作 者
            </p>
            <p class="startBox_container_intro1">
            <span>
              美柏医健致力于创建一个全球医健行业知识分享社区，包括精准医疗、医疗器械、生物信息等多个领域的技术、产品、公司、投资等研究，助力中国企业洞察海外投资机会。我们能帮助你树立个人品牌，积累行业资源，熟悉行业研究，成为跨境投资经理…
            </span>

            </p>
            <p class="startBox_container_intro2">
            <span>
              还有更多可能，等你和我们一起来策划
            </span>
            </p>
            <p class="startBox_container_more">
              <span @click="knowMore">了解更多</span>
            </p>
            <div class="startBox_container_btn">
              <span @click="toggle">填表申请</span>
            </div>
          </div>
        </div>
        <router-view  v-else  key="two" name="ApplicationForm" class="child-view" :record="recordParams" @scollHanle="scollHanle"></router-view>
      </transition>
      <!--登录和注册对话框 v-if="registerVisible"-->
      <register-from v-if="registerVisible" :register="registerVisible" @registerValue="register($event)"></register-from>
    </div>
</template>

<script>
    import RegisterFrom from "../../components/mian/register"
    export default {
       data(){
         return{
           transitionName: 'slide-top',
           showStart:true,
           registerVisible: false,
           recordParams:{
             selfName:'', //真实姓名
             penName:'', //笔名
             email:'', //邮箱
             phoneCode :[], //电话号码集合
             interCode: "+86",
             interPhone:false,
             phoneNum:'', //电话号码
             weixinNum:'',//微信号
             schoolName:'', //学校名称
             professText:'', //专业名称
             options: [{
               value: 1,
               label: '本科'
             }, {
               value: 2,
               label: '硕士研究生'
             }, {
               value: 3,
               label: '博士研究生'
             }],
             value: '', //最高学历
             params:[
               {
                 value: '选项1',
                 label: '黄金糕'
               }, {
                 value: '选项2',
                 label: '双皮奶'
               }, {
                 value: '选项3',
                 label: '蚵仔煎'
               }, {
                 value: '选项4',
                 label: '龙须面'
               }, {
                 value: '选项5',
                 label: '北京烤鸭'
               }
             ],
             areaValue:[], //研究领域集合
             selfInfo:'', //个人简介
             introSmall:'',//一句话简介
             //校验输入框
             checkSty:false, //真实姓名
             checkName:'',
             //笔名
             checkPenNameSty:false,
             checkPenNameText:'',
             penLoading:false,
             penSuccess:false,
             //邮箱
             mailSty:false,
             mailText:'',
             //手机号
             phoneNumSty:false,
             phoneNumText:'',
             //学校
             schoolSty:false,
             schoolText:'',
             //学历
             educationSty:false,
             educationText:'',
             //微信号
             weixinSty:false,
             weixinText:'',
             //专业
             professSty:false,
             professStyText:'',
             //研究领域
             areaSty:false,
             areaStyText:'',
             //个人简介
             selfInfoSty:false,
             selfInfoStyText:'',
             //一句话简介
             introSmallSty:false,
             introSmallStyText:''
           }
         }
       },
      created:function(){
         var _t =this
        //刷新保持在当前路由上
        if(_t.$route.name==='Application'){ //父级路由名
          _t.showStart = true
          _t.transitionName = 'slide-top';
        }else{//子路由页面
          _t.showStart = false
          _t.transitionName = 'slide-bottom';
        }
      },
      methods:{
         knowMore:function(){
           window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzIwNTY2NzQxMQ==&mid=2247484967&idx=1&sn=fbb231c357aa37acf753b6ded346fca6&chksm=972c2b1ba05ba20d186f7f56928695a650556fb393b52b24bc9b4d68c45dd9de6e82b691f759&mpshare=1&scene=23&srcid=0602ZqnOHypwz3fN8BNM0kgR#rd'
         },
        isLogn: function () { //是否登录
          var _t = this
          return _t.getCookie('meibo')
        },
        toggle:function () {
          var _t = this
          var isLogin = _t.isLogn();
          _t.registerVisible = false
          if(isLogin){ //已登录
            _t.$post('/user').then(function (res) {
              if(res.status === "success" && res.code === 200){
                if(res.data.user_type===0){ //会员非作者
                 if(res.data.status===0||res.data.status===3){ // 会员未申请 或作者审核失败
                   _t.$router.push({name:'ApplicationForm'})
                 }else{ //作者申请中未审核，还未正式成为作者
                   _t.$router.push({name:'checkPage'})
                 }
                }else{ //作者 跳转到推荐朋友页面
                  _t.$router.push({name:'recommend'})
                }
              }else{
                _t.$message.error(res.message || res.status || res);
              }
            },function (err) {
              _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
            })
          }else{ //未登录
            _t.registerVisible = true;
          }
        },
        scollHanle:function (record) { //子组件响应事件
           var _t = this
          _t.recordParams = record
          _t.$router.go(-1)
        },
        register(val) {
          this.registerVisible = false;
        }
      },
      watch: {
        '$route' (to, from) {
          if(to.path === '/application/applicationForm'){ //监听路由变化 子路由
            this.transitionName = 'slide-bottom';
            this.showStart = false
          }else{ //父路由
            this.transitionName = 'slide-top';
            this.showStart = true
          }
        }
      },
      components: {RegisterFrom}
    }
</script>

<style scoped>
  .child-view{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .7s cubic-bezier(.55,0,.1,1);


  }
.startBox{
  height:100%; width:100%;  position:absolute;
  min-height: 820px;
  background: url("../../assets/images/application/bg_start.jpg") no-repeat;
  background-size: 100% 100%;
  transition: all .7s cubic-bezier(.55,0,.1,1);
}
.startBox_container{
  width: 780px;
  height: 780px;
  background: rgba(255,255,255,.7);
  border-radius: 780px;
  margin: 19px auto 0;
}
  .startBox_container_logo{
    text-align: center;
   padding-top: 199px;
  }
.startBox_container_logo>img{
  width: 100px;
  height: 33px;
}
.startBox_container_title{
  text-align: center;
  margin-top: 50px;
  font-size: 60px;
  color: #383838;
  font-weight: bold;
}
.startBox_container_intro1{
  text-align: center;
  letter-spacing:2px;
  padding:0 15px ;
  margin-top: 42px;
  font-size: 14px;
  font-weight: lighter;
  line-height: 23px;
}
.startBox_container_intro2{
  text-align: center;
  font-size: 14px;
  font-weight: lighter;
  line-height: 23px;
  letter-spacing:2px;
  margin-top: 30px;
}
.startBox_container_more{
  letter-spacing:2px;
  margin-top: 40px;
  text-align: center;
  font-weight: lighter;
  font-size: 12px;
  text-decoration: underline;
}
  .startBox_container_more>span{
    cursor: pointer;
  }
  .startBox_container_btn{
    margin-top: 97px;
    text-align: center;
  }
  .startBox_container_btn>span{
    display: inline-block;
    width: 180px;
    height: 40px;
    background: #383838;
    border-radius: 2px;
    letter-spacing: 6px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;

  }
  .slide-top-enter{
    transform: translate( 0,-100%);
    -webkit-transform:translate( 0,-100%);/* for Chrome || Safari */
    -moz-transform:translate( 0,-100%);/* for Firefox */
    -ms-transform:translate( 0,-100%); /* for IE */
    -o-transform:translate( 0,-100%);  /* for Opera */
  }
  .slide-top-leave-active{
    transform: translate( 0,100%);
    -webkit-transform:translate( 0,100%);
    -moz-transform:translate( 0,100%);
    -ms-transform:translate( 0,100%);
    -o-transform:translate( 0,100%);

  }
   .slide-bottom-enter{
    transform: translate( 0,100%);
     -webkit-transform:translate( 0,100%);
     -moz-transform:translate( 0,100%);
     -ms-transform:translate( 0,100%);
     -o-transform:translate( 0,100%);
  }
  .slide-bottom-leave-active{
    transform: translate( 0,-100%);
    -webkit-transform:translate( 0,-100%);
    -moz-transform:translate( 0,-100%);
    -ms-transform:translate( 0,-100%);
    -o-transform:translate( 0,-100%);
  }
</style>
