<template>
  <div class="registerPage" >
    <div class="register-left-img">
      <img src="../../assets/images/register/message_img.png" alt="">
    </div>
    <div class="register-right">
      <div class="register-right-content">
        <p style="margin-bottom: 39px"> <i class="el-icon-back" style="font-size: 10px"></i><span class="linkLogin" @click="goBackLogin()"><!--<img src="../../assets/images/register/back.png" alt="logo"  >-->&nbsp;登&nbsp;录</span></p>
        <div style="text-align: center;font-size: 26px;color: #383838">手 机 短 信 登 录</div>
        <div class="register-phone" v-show="normal_input_inphone" :class="{redLine:accountSty}">
          <div class="register-select" @mouseenter="phoneAppear()" @mouseleave="phoneHidden()">
              <span class="register-select-box">
                <span v-model="interCode">{{interCode}}</span>
                <i class="el-icon-caret-bottom" style="color: #D8D8D8"></i>
                <ul class="international-Code" v-show="interPhone" ref="interLi">
                  <li v-for="(value,index) in phoneCode" @click="international(index)">
                    <span>{{value.country}}</span>
                    <span>+{{value.mobile_prefix}}</span>
                  </li>
                </ul>
            </span>
          </div>
          <input type="text" class="phone-text" placeholder="请输入手机号" v-model="phoneNum">
        </div>
        <p style="text-align: right" v-if="accountSty">
          <span style="color: #E73140;font-size: 12px">{{accountStyTip}}</span>
        </p>
        <div class="register-phone" v-show="!normal_input_inphone" style="background-color: #FCFCFC">
          <div class="register-select" style="cursor: auto">
              <span class="register-select-box">
                <span v-model="interCode">{{interCode}}</span>
            </span>
          </div>
          <input type="text" class="phone-text" placeholder="请输入手机号" v-model="phoneNum" disabled style="background-color: #FCFCFC">

        </div>
        <!--<p style="text-align: right" v-if="reqStatus1">
          <span style="color: #E73140;font-size: 12px">{{reqText1}}</span>
        </p>-->
        <div class="testCode" >
          <input type="text" class="phone-code" :class="{redLine:messageCode}" placeholder="验证码" v-model="testCode">
          <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCode()" >
          <input v-else type="button" class="code-btn1" value="" v-model="countdownText">
        </div>
        <p style="text-align: right;width: 185px" v-if="messageCode">
          <span style="color: #E73140;font-size: 12px">{{messageCodeTip}}</span>
        </p>

        <div class="btn-box" >
          <span class="register_login_btn" @click="quickLogin()">登 录</span>
        </div>
        <!--请求状态-->
        <el-collapse-transition>
          <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}
                 </span>
            <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            reqStatus:false,
            reqText:'',
            testCodeText:'',
            testCode:'',
            testCodeBtn:true,
            countdownAginText:'发 送',
            countdownText:'',
            countdown : 60,
            phoneCode :[], //电话号码集合
            interCode: "+86",
            interPhone:false,
            phoneNum:'',
            reqStatus1:false,
            reqText1:'',
            normal_input_inphone:true,
            accountSty:false, //账户信息提示
            accountStyTip:'',
            messageCode:false, //短信验证码提示
            messageCodeTip:''
          }
        },
      created:function () {
        var that = this;
        that.$get("/message/country/mobile").then(res => {
          if (res.status === "success" && res.code === 200) {
            that.phoneCode = res.data;
          } else {
            that.phoneCode = [];
          }
        }).catch(err => {
          if (err === undefined) {
            console.log("获取国际手机区号未连接！");
          }
        });
      },
      methods:{
        clossLoginErr:function () { //错误提示关闭
          var _t= this
          _t.reqStatus=false
          _t.reqText=''
        },
        goBackLogin:function () {
          var _t= this
          _t.$emit('goback')
        },
        phoneAppear() {
          this.interPhone = true
        },
        phoneHidden() {
          this.interPhone = false
        },
        international(index) {
          var interLi = this.$refs.interLi;
          this.interCode = interLi.children[index].children[1].innerHTML;
          this.interPhone = false;
        },
        sendTestCode:function () {
          var _t =this
          _t.accountSty=false //账户信息提示
          _t.accountStyTip=''
          _t.messageCode=false //短信验证码提示
          _t.messageCodeTip=''
          _t.reqStatus = false //请求错误提示
          _t.reqText = ''
          if(_t.phoneNum===''){
            _t.accountSty = true
            _t.accountStyTip = '必填!'
            return;
          }
          if(!mobileNumber(_t.phoneNum)){
            _t.accountSty = true
            _t.accountStyTip = '请检查您输入的账号格式'
            return;
          }
          var perfix = _t.interCode.slice(1);
          var name=_t.phoneNum
          var phoneLogin = {
            name: name,
            type: "login",
            mobile_prefix: perfix,
          }
          _t.$post("/message/code", phoneLogin).then(res => {
            if (res.status === "success" && res.code === 200) {
              //倒计时六十秒函数调用；
              _t.settime();
              window.localStorage.removeItem('accountNum')
              window.localStorage.setItem('accountNum',_t.phoneNum)
              _t.testCode = "";
              _t.reqStatus = false
              _t.reqText = ''
            } else {//发送次数过多
              _t.reqStatus = true
              _t.reqText = res.message
            }

          }).catch(err => {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        settime: function() {
          var _t =this
          if (_t.countdown === 0) {
            _t.countdown = 60;
            _t.testCodeBtn = true
            _t.normal_input_inphone =true
            _t.countdownAginText='重 新 发 送'
            return;
          } else {
            _t.countdownAginText='发 送'
            _t.countdownText = _t.countdown + "s";
            _t.countdown--;
            _t.testCodeBtn = false
            _t.normal_input_inphone =false
          }
          setTimeout(function () {
            _t.settime()
          }, 1000)
        },
        quickLogin:function () {

          var _t = this
          _t.accountSty=false //账户信息提示
          _t.accountStyTip=''
          _t.messageCode=false //短信验证码提示
          _t.messageCodeTip=''
          _t.reqStatus = false //请求错误提示
          _t.reqText = ''
          if(_t.phoneNum===''){
            _t.accountSty = true
            _t.accountStyTip = '必填!'
            return;
          }
          if(!mobileNumber(_t.phoneNum)){
            _t.accountSty = true
            _t.accountStyTip = '请检查您输入的账号格式'
            return;
          }
          if(_t.testCode===''){
            _t.messageCode = true
            _t.messageCodeTip = '必填!'
            return;
          }else{
            /*var reg=/^\d{6}$/
            if(!reg.test(_t.testCode)){
              _t.messageCode = true
              _t.messageCodeTip = '请输入六位数字验证码'
              return;
            }else{
              _t.messageCode = false
              _t.messageCodeTip = ''
            }*/
            _t.messageCode = false
            _t.messageCodeTip = ''
          }
          /*if(_t.phoneNum!==window.localStorage.getItem('accountNum')){
            _t.accountSty = true
            _t.accountStyTip = '您输入的手机账号与上次输入的不一致，请重新输入'
            return;
          }*/
          _t.$post('/user/quickLogin',{
            name:_t.phoneNum,
            code:_t.testCode
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              var saveToken = res.data.token_type + " " + res.data.access_token;
              setCookie("meibo", saveToken);
              _t.$emit("registerValue", false);//隐藏弹出层
              window.location.reload();
            }else{
              _t.reqStatus = true
              _t.reqText = res.message
              return false;
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/mian/register.css";
</style>
