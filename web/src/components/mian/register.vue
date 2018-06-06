<template>
  <div>
    <el-dialog  :visible.sync="register"  width="960px" class="register" :before-close="registerClose" :close-on-click-modal="false" :close-on-press-escape	='false'>
      <div class="register-box" v-show="accountLogin" >
        <div class="register-left-img">
          <img src="../../assets/images/register/login_img.png" alt="">
        </div>
        <div class="register-right">
         <div class="register-right-content">
           <p style="margin-bottom: 39px"><img src="/static/images/public/logo.svg" alt="logo" width="80px" height="31px" ></p>
           <div class="register-account":class="{redLine:borderAccountStatus}" style="height: 40px">
             <img src="../../assets/images/register/account.svg" alt="账户">
             <input type="text" class="account-text" placeholder="邮箱/手机号" v-model="accountNum" style="height: 40px;line-height: 40px" >
           </div>
           <p style="text-align: right" v-if="borderAccountStatus">
             <span style="color: #E73140;font-size: 12px">{{accountTip1}}</span>
           </p>
           <div class="register-account" :class="{redLine:borderPasswordStatus}" style="height: 40px">
             <img src="../../assets/images/register/key.svg" alt="密码">
             <input :type="passwordType" class="account-text" placeholder="请输入密码" v-model="password"  style="height: 40px;line-height: 40px">
             <span v-if="password!==''">
                <img v-if="eyeStatus" src="../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" @click="eyeToggle()">
             <img v-else src="../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open" @click="eyeToggle()">
             </span>
           </div>
           <p style="text-align: right" v-if="borderPasswordStatus">
             <span style="color: #E73140;font-size: 12px">{{passwordTip1}}</span>
           </p>
           <div class="btn-box">
             <span class="login_btn" @click="accountSubmit()">登&nbsp;录</span>
             <span class="forget-password"><span @click="forgetPasswordPage()">忘记密码?</span></span>
           </div>

           <el-collapse-transition >
             <div  v-if="loginStatus" class="reqErrBox" style="position: relative;margin-top: 10px" >
                 <span>
                   {{loginErr}}
                 </span>
               <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
             </div>
           </el-collapse-transition>
           <p class="orLine">
             <span class="line"></span> <span class="orText">或</span> <span class="line"></span>
           </p>
           <p class="bottom_btn">
             <span class="toPhone-login" @click="messageLoginPage()">手 机 短 信 登 录</span>
             <span class="weCate-login" @click="weiCatLogin()">微 信 扫 码 登 录</span>
             <span style="font-size: 12px;color: #383838;opacity: .5">还没有账号?</span>
             <span class="toliji" style="" @click="toRegister()">立即注册</span>
           </p>
         </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="registerPage" v-show="accountRegister">
        <div class="register-left-img">
          <img src="../../assets/images/register/register_img.png" alt="">
        </div>
        <div class="register-right">
          <div class="register-right-content">
            <p style="margin-bottom: 39px"> <i class="el-icon-back" style="font-size: 10px"></i><span class="linkLogin" style="" @click="goBackLogin()"><!--<img src="../../assets/images/register/back.svg" alt="logo"  >-->&nbsp;登&nbsp;录</span></p>
            <div style="text-align: center;font-size: 26px;color: #383838">极&nbsp;速&nbsp;注&nbsp;册</div>
            <div class="register-account":class="{redLine:borderAccountStatus1}">
              <img src="../../assets/images/register/account.svg" alt="账户">
              <input type="text" :disabled="disabled" class="account-text" placeholder="邮箱/手机号" v-model="registerAccountNum"  >
            </div>
            <p style="text-align: right" v-if="borderAccountStatus1">
              <span style="color: #E73140;font-size: 12px">{{accountTip}}</span>
            </p>
            <div class="register-account" :class="{redLine:borderPasswordStatus1}">
              <img src="../../assets/images/register/key.svg" alt="密码">
              <input :type="passwordType1" :disabled="disabled" class="account-text" placeholder="请设置密码" v-model="registerPassword"  >
              <span v-if="registerPassword!==''">
                <img v-if="eyeStatus1" src="../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" :class="{'eye-icon-disable':disabled}" @click="!disabled&&eyeToggle1()">
                <img v-else src="../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open" :class="{'eye-icon-disable':disabled}" @click="!disabled&&eyeToggle1()">
             </span>
            </div>
            <p style="text-align: right" v-if="borderPasswordStatus1">
              <span style="color: #E73140;font-size: 12px">{{passwordTip}}</span>
            </p>
            <el-collapse-transition>
              <div class="testCode" v-if="testCodeShow">
                <p ><span style="font-size: 12px;color: #383838">{{testCodeText}}</span></p>
                <input type="text" class="phone-code" :class="{redLine:phoneCodeSty}" placeholder="验证码" v-model="testCode">
                <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCode()" >
                <input v-else type="button" class="code-btn1" value="" v-model="countdownText">
                <p style="text-align: right;width: 185px" v-if="phoneCodeSty">
                  <span style="color: #E73140;font-size: 12px">{{phoneCodeTip}}</span>
                </p>
              </div>
            </el-collapse-transition>
            <!--请求状态-->
            <div class="btn-box" v-if="btnFlag">
              <span class="register_login_btn" @click="registerSure()">确 认</span>
            </div>
            <div class="btn-box" v-else>
              <span class="register_login_btn" @click="reqRegister()">提 交</span>
            </div>
            <el-collapse-transition >
              <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}，前往<span style="text-decoration: underline;cursor: pointer" @click="goBackLogin">登录</span>
                 </span>
                <i class="el-icon-close" @click="clossLoginErr1" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
              </div>
            </el-collapse-transition>
            <el-collapse-transition >
              <div  v-if="reqStatus1" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText1}}
                 </span>
                <i class="el-icon-close" @click="clossLoginErr11" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
              </div>
            </el-collapse-transition>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!--registerSuccessVisible-->
      <RegisterSuccess v-if="registerSuccessVisible" :sendType="sendType" ></RegisterSuccess>
      <messageLogin v-if="messageLoginVisible" @goback="messageLoginPageBack"></messageLogin>
      <forgetPassword v-if="forgetPasswordVisible" @gobackForget="forgetPasswordPageBack"></forgetPassword>
      <div id="login_container"></div>
    </el-dialog>
  </div>
</template>

<script>
  import RegisterSuccess from "./register_success"
  import messageLogin  from "./messageLogin"
  import forgetPassword from './forgetPassword'
  export default {
    name: "register",
    data() {
      return {
        accountTip1:'',
        passwordTip1:'',
        dialogVisible: false,
        loginVisible: false,
        prompt: "",
        loginData: "",
        accountLogin: true,
        accountRegister:false,
        phone: false,
        interPhone: false,
        emali: false,
        weixin: false,
        phoneCode: "",
        interCode: "+86",
        accountNum: "",//账户
        password: "",//密码
        phoneNum: "",//手机号码
        phoneTest: "",//手机验证码
        rightMail: "",//邮箱提示
        mailName: "",//邮箱名称
        mailCode: "",
        appid: "",
        scope: "",
        redirect_uri: "https://www.mybiogate.com/",
        state: "",
        style: "",
        href: "",
        weixinCode: "",
        getCodeUrl:'',
        /*登录数据*/
        borderAccountStatus:false,
        borderPasswordStatus:false,
        loginErr:'', //登录出错文本
        loginStatus:false, //登录提示状态
        eyeStatus:true,
        passwordType:'password',
        /*初始化注册数据*/
        registerAccountNum:'',
        registerPassword:'',
        accountTip:'', //注册账户错误时的提示信息
        passwordTip:'', //注册账户错误时的提示信息
        borderAccountStatus1:false,
        borderPasswordStatus1:false,
        passwordType1:'password',
        eyeStatus1:true,

        testCode:'', //邮箱验证码
        testCodeShow:false, //验证码邮箱显示
        testCodeText:'',
        testCodeBtn:false,
        countdown : 60,
        countdownText:'',
        countdownAginText:'重 新 发 送',
        sendType:'',//发送类型
        reqText:'',
        reqStatus:false,
        disabled:false, //默认非禁用
        btnFlag:true,//注册按钮(确认按钮)
        phoneCodeSty:false,
        phoneCodeTip:'',//邮箱验证码提示
        reqStatus1:false,
        reqText1:'',
        /*end*/
        registerSuccessVisible:false, //注册成功页面
        messageLoginVisible:false, //短信登录页面
        forgetPasswordVisible:false, //忘记密码
        weixinState:'a'

      }
    },
    components: {RegisterSuccess,messageLogin,forgetPassword},
    methods: {
      forgetPasswordPage:function(){ //忘记密码
        var _t =this
        _t.forgetPasswordVisible = true
        _t.accountLogin = false
      },
      forgetPasswordPageBack:function(flag){
        var _t= this
        if(flag==='normal'){
          _t.accountLogin = true
          _t.forgetPasswordVisible =false
        }else{
          _t.accountLogin = false
          _t.forgetPasswordVisible =false
          _t.accountRegister = true
        }

      },
      messageLoginPage:function(){ //短信登录
        var _t =this
        _t.messageLoginVisible = true
        _t.accountLogin = false
      },
      messageLoginPageBack:function(){
        var _t= this
        _t.accountLogin = true
        _t.messageLoginVisible = false
      },
      eyeToggle:function () { //眼睛切换
        var _t =this
        if(_t.eyeStatus){ //睁眼
          _t.eyeStatus = false
          _t.passwordType = 'text'
        }else{ //闭眼
          _t.eyeStatus = true
          _t.passwordType = 'password'
        }
      },
      eyeToggle1:function(){ //注册眼睛切换
        var _t =this
        if(_t.eyeStatus1){ //睁眼
          _t.eyeStatus1 = false
          _t.passwordType1 = 'text'
        }else{ //闭眼
          _t.eyeStatus1 = true
          _t.passwordType1 = 'password'
        }
      },
      clossLoginErr:function () { //错误提示关闭
        var _t= this
        _t.loginErr = ''
        _t.loginStatus = false
      },
      clossLoginErr1:function(){
        var _t =this
        _t.reqStatus =false
        _t.reqText =''
      },
      clossLoginErr11:function(){
        var _t =this
        _t.reqStatus1 =false
        _t.reqText1 =''
      },
      /*accountBlur:function(){//账户失去焦点
        var _t =this
        if (_t.accountNum === "") { //账号为空
          _t.borderAccountStatus = true
        }else{
          _t.borderAccountStatus = false
        }
      },
      passwordsBlur:function(){//密码失去焦点
        var _t =this
        if (_t.password === "") { //密码为空
          _t.borderPasswordStatus = true
        }else{
          _t.borderPasswordStatus = false
        }
      },*/

      registerClose() {
        this.$emit("registerValue", false)
      },
      weiCatLogin:function(){ //微信登录第一步 获取code
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
            that.$emit("registerValue", false);
            window.localStorage.removeItem('weixinState')
            window.localStorage.setItem('weixinState',that.weixinState)
            window.location.href= that.getCodeUrl
          } else {
            that.$message.error(res.message||'微信无法登录');
          }
        },err=>{
          that.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        });

      },


      international(index) {
        var interLi = this.$refs.interLi;
        this.interCode = interLi.children[index].children[1].innerHTML;
        this.interPhone = false;
      },

      accountSubmit() {
        //账号密码登录
        var that = this;
        that.loginErr = ''
        that.loginStatus = false
        var reg =  /^\w{8,}$/
        var mailRes = mailbox(that.accountNum)
        var phoneRes = mobileNumber(that.accountNum)
        if (that.accountNum === "") { //账号为空
          that.borderAccountStatus = true
          that.accountTip1 ='必填!'
          that.borderPasswordStatus = false
          that.passwordTip1 =''
          return;
        }
        if(mailRes){ //邮箱验证通过

        }else if(phoneRes){ //电话验证通过

        }else {
          that.borderAccountStatus = true
          that.accountTip1 = '请检查您输入的账号格式'
          that.borderPasswordStatus = false
          that.passwordTip1 =''
          return;
        }
        if(that.password === ""){//密码为空
          that.borderAccountStatus = false
          that.accountTip1 = ''
          that.borderPasswordStatus = true
          that.passwordTip1 ='必填!'
          return;
        }
        /*if(that.password.length<8){//密码长度不够
          that.borderAccountStatus = false
          that.accountTip1 = ''
          that.borderPasswordStatus = true
          that.passwordTip1 ='密码请设置为至少8位的字母、数字或标点符号'
          return;
        }*/
        that.borderAccountStatus = false
        that.accountTip1 = ''
        that.borderPasswordStatus = false
        that.passwordTip1 =''
        var accoutPost = {
          name: that.accountNum,
          password: that.password
        };
        //发送账户和密码；

        that.$post("/user/login", accoutPost).then(res => {
          if (res.status === "error") {
            that.loginErr = res.message
            that.loginStatus = true
          } else {
            that.loginErr = ''
            that.loginStatus = false
            //存储cookie；
            var saveToken = res.token_type + " " + res.access_token;
            setCookie("meibo", saveToken);
            that.$emit("registerValue", false);//隐藏弹出层
            window.location.reload();
          }
        }).catch(err => {
          that.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      toRegister:function(){ //去注册页面
        var _t =this
        _t.accountLogin= false
        _t.accountRegister=true
      },
      goBackLogin:function(){ //返回登录页面
        var _t =this
        _t.registerAccountNum=''
        _t.registerPassword=''
        _t.accountTip='' //注册账户错误时的提示信息
        _t.passwordTip='' //注册账户错误时的提示信息
        _t.borderAccountStatus1=false
        _t.borderPasswordStatus1=false
        _t.passwordType1='password'
        _t.eyeStatus1=true
        //显隐
        _t.accountLogin= true
        _t.accountRegister=false
        _t.testCode='' //邮箱验证码
        _t.testCodeShow=false //验证码邮箱显示
        _t.testCodeText=''
        _t.testCodeBtn=false
        _t.countdown = 60
        _t.countdownText=''
        _t.countdownAginText='重 新 发 送'
        _t.sendType=''//发送类型
        _t.reqText=''
        _t.reqStatus=false
        _t.reqText1 = ''
        _t.reqStatus1=false
        _t.disabled=false //默认非禁用
        _t.btnFlag=true
        _t.phoneCodeSty = false
      _t.phoneCodeTip =''
      },
      registerSure:function(){//注册确定

        var that = this
        //后台信息提示
        that.reqStatus = false
        that.reqText = ''
        that.reqStatus1 = false
        that.reqText1 = ''
        //账号样式提示
        that.borderAccountStatus1 = false
        that.accountTip = ''
        //密码样式提示
        that.borderPasswordStatus1 = false
        that.passwordTip =''
        //验证码样式提示
        that.phoneCodeSty =false
        that.phoneCodeTip =''
        if (that.registerAccountNum === "") { //账号为空
          that.borderAccountStatus1 = true
          that.accountTip = '必填!'
          return;
        }
       var mailRes = mailbox(that.registerAccountNum)
       var phoneRes = mobileNumber(that.registerAccountNum)

        that.isEamileOrTel = false
        that.testCodeShow = false
        that.testCodeBtn=false //验证码按钮初始化
        var reg =  /^\w{8,}$/
        if(mailRes){ //邮箱验证通过
          that.sendType = 'mail'
        }else if(phoneRes){ //电话验证通过
          that.sendType = 'tel'
        }else {
          that.sendType = ''
          that.borderAccountStatus1 = true
          that.accountTip = '请检查您输入的账号格式'
          return;
        }
        if(that.registerPassword === ""){
          that.borderPasswordStatus1 = true
          that.passwordTip ='必填!'
          return;
        }else{
          if(that.registerPassword.length>=8){
            that.borderPasswordStatus1 = false
            that.passwordTip =''
          }else{
            that.borderPasswordStatus1 = true
            that.passwordTip ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
        }
        that.checkName()

      },
      checkName:function(){ //检查用户名是否存在
        var _t =this
        _t.$post('/reg/checkName',{
          name:_t.registerAccountNum,
          type:'reg',
          password:_t.registerPassword
        }).then(function (res) {
          if (res.status === "success" && res.code === 200) {
            _t.borderPasswordStatus1 = false
            _t.passwordTip =''
            _t.reqStatus = false
            _t.reqText = ''
            _t.sendTestCode()
          }else{// 用户名不可用
            _t.reqStatus = true
            _t.reqText = res.message
            return false;
          }

        }).catch(function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      sendTestCode:function(){ //注册发送验证码
        var _t =this
        //后台信息提示
        _t.reqStatus = false
        _t.reqText = ''
        _t.reqStatus1 = false
        _t.reqText1 = ''
        //账号样式提示
        _t.borderAccountStatus1 = false
        _t.accountTip = ''
        //密码样式提示
        _t.borderPasswordStatus1 = false
        _t.passwordTip =''
        //验证码样式提示
        _t.phoneCodeSty =false
        _t.phoneCodeTip =''
        var perfix =''
        var mailRes = mailbox(_t.registerAccountNum)
        var phoneRes = mobileNumber(_t.registerAccountNum)
        if (_t.registerAccountNum === "") { //账号为空
          _t.borderAccountStatus1 = true
          _t.accountTip = '必填!'
          return;
        }else {
          _t.borderAccountStatus1 = false
          _t.accountTip = ''
        }
        if(mailRes){ //邮箱验证通过
          _t.sendType = 'mail'
        }else if(phoneRes){ //电话验证通过
          _t.sendType = 'tel'
        }else {
          _t.sendType = ''
          _t.borderAccountStatus1 = true
          _t.accountTip = '请检查您输入的账号格式'
          return;
        }
        if(_t.sendType==='mail'){ //邮箱
          perfix = '0'
        }else{ //电话
          perfix = _t.interCode.slice(1);
        }
        var phoneLogin = {
          name: _t.registerAccountNum,
          type: "reg",
          mobile_prefix: perfix,
        }
        _t.$post("/message/code", phoneLogin).then(res => {
          if (res.status === "success" && res.code === 200) {
            //倒计时六十秒函数调用；
            _t.settime();
            _t.testCodeShow =true
            window.localStorage.removeItem('accountNum')
            window.localStorage.setItem('accountNum',_t.registerAccountNum)
            if(_t.sendType==='mail'){
              _t.testCodeText = '一封包含有验证码的邮件已发送至您的注册邮箱：'
            }else{
              _t.testCodeText ='短信验证码已发至您的手机：'
            }
            _t.btnFlag = false
            _t.testCode = "";
            _t.reqStatus1 = false
            _t.reqText1 = ''
          } else {//发送次数过多
            //_t.testCodeShow =false
            _t.reqStatus1 = true
            _t.reqText1 = res.message

          }

        }).catch(err => {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      //倒计时60秒函数封装；


      settime: function() {
        var _t =this
        if (_t.countdown === 0) {
          _t.countdown = 60;
          _t.testCodeBtn = true
          _t.disabled = false
          return;
        } else {
          _t.countdownText = _t.countdown + "s";
          _t.countdown--;
          _t.testCodeBtn = false
          _t.disabled = true
        }
        setTimeout(function () {
          _t.settime()
        }, 1000)
      },
      reqRegister:function(){ //提交注册信息
      var _t = this
        //后台信息提示
        _t.reqStatus1 = false
        _t.reqText1 = ''
        _t.reqStatus = false
        _t.reqText = ''
        //账号样式提示
        _t.borderAccountStatus1 = false
        _t.accountTip = ''
        //密码样式提示
        _t.borderPasswordStatus1 = false
        _t.passwordTip =''
        //验证码样式提示
        _t.phoneCodeSty =false
        _t.phoneCodeTip =''
        if (_t.registerAccountNum === "") { //账号为空
          _t.borderAccountStatus1 = true
          _t.accountTip = '必填!'
          return;
        }
        var mailRes = mailbox(_t.registerAccountNum)
        var phoneRes = mobileNumber(_t.registerAccountNum)
        var regs =  /^\w{8,}$/
        if(mailRes){ //邮箱验证通过
          _t.sendType = 'mail'
        }else if(phoneRes){ //电话验证通过
          _t.sendType = 'tel'
        }else {
          _t.borderAccountStatus1 = true
          _t.accountTip = '请检查您输入的账号格式'
          return;
        }
        if(_t.registerPassword === ""){
          _t.borderPasswordStatus1 = true
          _t.passwordTip ='必填!'
          return;
        }else{
          if(_t.registerPassword.length>=8){
            _t.borderPasswordStatus1 = false
            _t.passwordTip =''
          }else{
            _t.borderPasswordStatus1 = true
            _t.passwordTip ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
        }

        if(_t.testCode){
         /*var reg=/^\d{6}$/
          if(!reg.test(_t.testCode)){
            _t.phoneCodeSty = true
            _t.phoneCodeTip = '请输入六位数字验证码'
            return;
          }else{
            _t.phoneCodeSty = false
            _t.phoneCodeTip = ''
          }*/
          _t.phoneCodeSty = false
          _t.phoneCodeTip = ''
        }else{
          _t.phoneCodeSty = true
          _t.phoneCodeTip = '必填!'
          return;
        }
        /*if(_t.registerAccountNum!==window.localStorage.getItem('accountNum')){
          _t.borderAccountStatus1 = true
          _t.accountTip = '您输入的账号与上次输入的不一致，请重新输入'
          return;
        }*/
        _t.$post('/reg',{
          name:_t.registerAccountNum,
          password:_t.registerPassword,
          code:_t.testCode
        }).then(function (res) {
         if(res.status === "error" && res.code === 200){
           //_t.$message.error(res.message||res.status||res);
           _t.reqStatus1 = true
           _t.reqText1 = res.message
         }else{
           var savePhone = res.token_type + " " + res.access_token;
           setCookie("meibo", savePhone);
           _t.accountRegister = false
           _t.registerSuccessVisible = true

         }

        },function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      }


    },
    props: ["register"]

  }
</script>

<style scoped>
  @import "../../assets/css/mian/register.css";
</style>
