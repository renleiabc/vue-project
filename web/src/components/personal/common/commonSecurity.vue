<template>
<div>
  <div class="account-safe-title">
    <span>账户安全</span>
  </div>
  <!--安全邮箱-->
  <div>
    <div class="account-safe-mail">
      <div class="left_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_mail.svg" alt="">
      </div>
      <div class="center_content">
        <div style="margin: 32.5px 0">
          <p class="center_content_title">安 全 邮 箱：</p>
          <p class="center_content_mail unbindTel" v-if="!userInfo.email">未绑定</p>
          <p class="center_content_mail" v-else>{{userInfo.email}}</p>
        </div>
      </div>
      <div class="right_recompose">
        <span @click="setMail">修改 <img src="../../../assets/images/memberSecurity/accountSafe_open.svg" alt=""></span>
      </div>
      <div style="clear: both"></div>
    </div>
    <el-collapse-transition>
      <safeMail v-if="safeMailShow" @reload="reloadPage" @closeMail="closeMail" :isbindMail="userInfo.email"></safeMail>
    </el-collapse-transition>
  </div>
  <!--安全手机-->
  <div>
    <div class="account-safe-phone">
      <div class="left_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_phone.svg" alt="">
      </div>
      <div class="center_content">
        <div style="margin: 31px 0">
          <p class="center_content_title">安 全 手 机：</p>
          <p class="center_content_mail unbindTel" v-if="!userInfo.phone">未绑定</p>
          <p class="center_content_mail " v-else>{{userInfo.phone}}</p>
        </div>
      </div>
      <div class="right_recompose">
        <span @click="setPhone">修改 <img src="../../../assets/images/memberSecurity/accountSafe_open.svg" alt=""></span>
      </div>
      <div style="clear: both"></div>
    </div>
    <el-collapse-transition>
      <safePhone v-if="safePhoneShow"  @closeTel="closeTel" :isbindPhone ='userInfo.phone'></safePhone>
    </el-collapse-transition>
  </div>
  <!--密码-->
  <div v-if="isShowSetPass">
    <div class="account-safe-password">
      <div class="left_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_pass.svg" alt="" style="margin: 38px 0">
      </div>
      <div class="center_content" style="margin-left: 62px">
        <div style="margin: 31px 0">
          <p class="center_content_title">密 码：</p>
          <p class="center_content_mail setedPass" v-if="passSeted">已设置</p>
          <p class="center_content_mail setedPass1" v-else>未设置</p>
        </div>
      </div>
      <div class="right_recompose">
        <span @click="setPassWord">修改 <img src="../../../assets/images/memberSecurity/accountSafe_open.svg" alt=""></span>
      </div>
      <div style="clear: both"></div>
    </div>
    <el-collapse-transition>
      <setPass v-if="safePassShow"  @closePass="closePass" :isPassSeted="passSeted"></setPass>
    </el-collapse-transition>
  </div>
  <!--微信-->
  <div>
    <div class="account-safe-mail" style="margin-top: 20px">
      <div class="left_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_weixin.svg" alt="">
      </div>
      <div class="center_content" style="margin-left: 43px">
        <div style="margin: 32.5px 0">
          <p class="center_content_title"> 微 信：</p>
          <p class="center_content_mail unbindTel" v-if="!userInfo.openid">未绑定</p><!--!userInfo.openid-->
          <p class="center_content_mail setedPass" v-else>已绑定</p>
        </div>
      </div>
      <div class="right_recompose" v-if="!userInfo.openid"><!--!userInfo.openid-->
        <span @click="toWeixin">修改 <img src="../../../assets/images/memberSecurity/accountSafe_open.svg" alt=""></span>
      </div>
      <div class="right_recompose" v-else>
        <img :src="userInfo.photo" alt="" style="width: 50px;height: 50px;border-radius: 50px;margin-top:33px">
      </div>
      <div style="clear: both"></div>
    </div>
    <div id="login_container"></div>
    <!--<el-collapse-transition>
      <safeMail v-if="safeMailShow" @reload="reloadPage" @closeMail="closeMail" :isbindMail="userInfo.email"></safeMail>
    </el-collapse-transition>-->
  </div>
</div>
</template>

<script>
  import safeMail from "../memberSecurityChild/safeMail"
  import safePhone from "../memberSecurityChild/safePhone"
  import setPass from "../memberSecurityChild/setPass"
    export default {
        data(){
          return{
            safeMailShow:false,
            safePhoneShow:false,
            safePassShow:false,
            redirect_uri:'https://www.mybiogate.com/Member',
            weixinState:'a_safe'
          }
        },
      props:['isShowSetPass','passSeted','userInfo'],
      created:function(){
        var _t =this
        var weixinCode = _t.getUrlKey('code')
        var weixinState = _t.getUrlKey('state')
        if(weixinCode && weixinState){
          if(weixinState===window.localStorage.getItem('weixinState_safe')){
            _t.$post('/user/wechat',{
              code:weixinCode
            }).then(function (res) {
              if (res.status === "success" && res.code === 200) {
                window.location.replace('https://www.mybiogate.com/Member')
              }else{
                _t.$message.error(res.message||'微信无法绑定');
                //window.location.replace('https://www.mybiogate.com/Member')
              }
            },function (err) {
              _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
              //window.location.replace('https://www.mybiogate.com/Member')
            })
          }
        }
      },
      methods:{
        setMail:function () {//修改邮箱
          var _t =this
        if(_t.safeMailShow){
          _t.safeMailShow = false
        }else{
          _t.safeMailShow = true
        }
        },
        toWeixin:function(){
          this.weixinShow()
        },
        weixinShow() {
          var that = this;
          that.$post("/wechat/scan", {}).then(res => {
            if (res.status === "success" && res.code === 200) {
              that.weixinCode = res.data;
              that.appid = that.weixinCode.appid
              that.getCodeUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid='+that.appid + '&redirect_uri='+ escape(that.redirect_uri) +'&response_type=code&scope=snsapi_login&state='+that.weixinState+'#wechat_redirect'
              var obj = new WxLogin({
                id: "login_container",
                appid: that.weixinCode.appid,
                scope: 'snsapi_login',
                redirect_uri: escape(that.redirect_uri),
                state: that.weixinState,
                style: 'black'
              });
              window.localStorage.removeItem('weixinState_safe')
              window.localStorage.setItem('weixinState_safe',that.weixinState)
              window.location.href= that.getCodeUrl
            } else {
              that.$message.error(res.message||'微信无法登录');
            }
          },err=>{
            that.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          });

        },
        reloadPage:function(){
          var _t = this
          _t.$emit('reload')
        },
        setPhone:function(){ //修改电话
          var _t =this
          if(_t.safePhoneShow){
            _t.safePhoneShow = false
          }else{
            _t.safePhoneShow = true
          }
        },
        setPassWord:function () { //设置密码
          var _t =this
          if(_t.safePassShow){
            _t.safePassShow = false
          }else{
            _t.safePassShow = true
          }
        },
        closeMail:function () { //邮箱取消按钮事件
          var _t =this
          _t.safeMailShow = false
        },
        closeTel:function () { //电话取消按钮事件
          var _t =this
          _t.safePhoneShow = false
        },
        closePass:function () { //关闭设置密码
          var _t =this
          _t.safePassShow = false
        }
      },

      components:{safeMail,safePhone,setPass}
    }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberSecurity.css";
</style>
