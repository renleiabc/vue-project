<template>
  <div class="registerPage" >
    <div class="register-left-img">
      <img src="../../assets/images/register/fogetPassword.png" alt="">
    </div>
    <div class="register-right">
      <div class="register-right-content" v-if="isforgetPage">
        <p style="margin-bottom: 39px"><i class="el-icon-back" style="font-size: 10px"></i> <span class="linkLogin" @click="goBackLogin()"><!--<img src="../../assets/images/register/back.png" alt="logo"  >&nbsp;-->登&nbsp;录</span></p>
        <div style="text-align: center;font-size: 26px;color: #383838">忘 记 密 码</div>
        <div class="register-phone" :class="{redLine:forgetAccount}" v-show="normal_input_inphone">
          <input type="text" class="phone-text" placeholder="邮箱/手机号" v-model="phoneNum" @blur="checkName_blur">
        </div>
        <div class="register-phone" v-show="!normal_input_inphone" style="background-color: #FCFCFC">
          <input type="text" class="phone-text" placeholder="邮箱/手机号" v-model="phoneNum" disabled style="background-color: #FCFCFC">
        </div>
        <p style="text-align: right" v-if="forgetAccount">
          <span style="color: #E73140;font-size: 12px">{{forgetAccountTip}}</span>
        </p>
        <el-collapse-transition>
          <div class="testCode" v-if="testCodeShow">
            <p ><span style="font-size: 12px;color: #383838">{{testCodeText}}</span></p>
            <input type="text" class="phone-code" :class="{redLine:forgetCodeSty}" placeholder="验证码" v-model="testCode">
            <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCode()" >
            <input v-else type="button" class="code-btn1" value="" v-model="countdownText">
            <p style="text-align: right;width: 185px" v-if="forgetCodeSty">
              <span style="color: #E73140;font-size: 12px">{{forgetCodeTip}}</span>
            </p>
          </div>
        </el-collapse-transition>
        <div class="btn-box" >
          <span v-if="nextFlag" class="register_login_btn" @click="next()">下 一 步</span>
          <span v-else  class="register_login_btn" @click="next1()">下 一 步</span>
        </div>
        <!--请求状态-->
        <el-collapse-transition>

          <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}
                 </span>
            <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px;"></i>
          </div>
        </el-collapse-transition>
        <el-collapse-transition >
          <div  v-if="reqError" class="reqErrBox" style="margin-top: 10px">
           <span>
             这个账号还没有注册过美柏，前往 <span  style="cursor: pointer;text-decoration:underline" @click="toegister()">注册</span>
           </span>
            <i class="el-icon-close" @click="closeReqErr" style="margin-left: 0"></i>
          </div>
        </el-collapse-transition>
      </div>
      <div v-else class="register-right-content">
        <p style="margin-bottom: 39px"><i class="el-icon-back" style="font-size: 10px"></i> <span style="cursor: pointer;font-size: 12px;color: #383838" @click="goBackLogin()"><!--<img src="../../assets/images/register/back.png" alt="logo"  >-->&nbsp;登&nbsp;录</span></p>
        <div style="text-align: center;font-size: 26px;color: #383838">重 置 密 码</div>
        <div class="register-account" :class="{redLine:forgetPassSty}">
          <img src="../../assets/images/register/key.svg" alt="密码">
          <input :type="passwordType1"  class="account-text"  placeholder="请重新设置密码" v-model="resetPassword"  >
          <span v-if="resetPassword!==''">
                <img v-if="eyeStatus1" src="../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" @click="eyeToggle1()">
                <img v-else src="../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open"  @click="eyeToggle1()">
             </span>
        </div>
        <p style="text-align: right" v-if="forgetPassSty">
          <span style="color: #E73140;font-size: 12px">{{forgetPassTip}}</span>
        </p>
        <div class="btn-box" >
          <span class="register_login_btn" @click="finshed()">完成</span>
        </div>
        <el-collapse-transition>

          <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}
                 </span>
            <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
          </div>
        </el-collapse-transition>
        <el-collapse-transition >
          <div  v-if="reqError" class="reqErrBox" style="margin-top: 10px">
           <span>
             这个账号还没有注册过美柏，前往 <span  style="cursor: pointer;text-decoration:underline" @click="toegister()">注册</span>
           </span>
            <i class="el-icon-close" @click="closeReqErr"></i>
          </div>
        </el-collapse-transition>
        <el-collapse-transition >
          <div  v-if="jump" class="reqJumpBox" style="margin-top: 10px">
           <span>
            重置密码成功！{{resetTime}}s后前往登录  <span  style="cursor: pointer;text-decoration:underline" @click="promptlyLogin()">立即登录</span>
           </span>

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
            phoneNum:'',
            reqStatus:false,//初始化错误提示
            reqText:'',//初始化错误提示信息
            normal_input_inphone:true, //初始化输入框
            testCodeShow:false, //初始化短信验证码
            testCodeText:'', //发送信息提示
            testCode:'',//短信验证码初始化
            testCodeBtn:false,//短信验证码按钮初始化
            countdownAginText:'重 新 发 送',//短信验证码六十秒后字体初始化
            countdownText:'',//短信验证码默认字体初始化
            reqError:false,
            countdown:60,
            interCode: "+86",
            sendType:'',
            nextFlag:true,
            isforgetPage:true, //默认忘记密码页面
            passwordType1:'password',
            resetPassword:'',
            eyeStatus1:true,
            jump:false,
            resetTime:6,
            forgetAccount:false,
            forgetAccountTip:'',
            forgetCodeSty:false,
            forgetCodeTip:'',
            forgetPassSty:false,
            forgetPassTip:''
          }
        },
      methods:{
        checkName_blur:function(){ //input失去焦点校验
          var _t =this
          _t.forgetAccount=false
          _t.forgetAccountTip=''
          _t.forgetCodeSty=false
          _t.forgetCodeTip=''
          var mailRes = mailbox(_t.phoneNum)
          var phoneRes = mobileNumber(_t.phoneNum)
          _t.reqError = false
          if(_t.phoneNum===''){
            _t.forgetAccount = true
            _t.forgetAccountTip = '必填!'
            return;
          }else{
            if(mailRes){ //邮箱验证通过
              _t.checkName11()
              _t.sendType = 'inputMail'
            }else if(phoneRes){ //电话验证通过
              _t.checkName11()
              _t.sendType = 'inputTel'
            }else {
              _t.forgetAccount = true
              _t.forgetAccountTip = '请检查您输入的账号格式'
              return;
            }
          }
        },
        clossLoginErr:function () { //错误提示关闭
          var _t= this
          _t.reqStatus=false
          _t.reqText=''
        },
        promptlyLogin:function(){
          var _t =this
          _t.$emit('gobackForget','normal')
        },
        goBackLogin:function () {
          var _t =this
          _t.$emit('gobackForget','normal')
        },
        next:function () { //点击下一步
          var _t =this
          _t.forgetAccount=false
          _t.forgetAccountTip=''
          _t.forgetCodeSty=false
          _t.forgetCodeTip=''
          var mailRes = mailbox(_t.phoneNum)
          var phoneRes = mobileNumber(_t.phoneNum)
          _t.reqError = false
          if(_t.phoneNum===''){
            _t.forgetAccount = true
            _t.forgetAccountTip = '必填!'
            return;
          }else{
            if(mailRes){ //邮箱验证通过
              _t.checkName()
              _t.sendType = 'inputMail'
            }else if(phoneRes){ //电话验证通过
              _t.checkName()
              _t.sendType = 'inputTel'
            }else {
              _t.forgetAccount = true
              _t.forgetAccountTip = '请检查您输入的账号格式'
              return;
            }
          }
        },
        next1:function(){
          var _t =this
          _t.forgetAccount=false
          _t.forgetAccountTip=''
          _t.forgetCodeSty=false
          _t.forgetCodeTip=''
          var mailRes = mailbox(_t.phoneNum)
          var phoneRes = mobileNumber(_t.phoneNum)
          if(_t.phoneNum===''){
            _t.forgetAccount = true
            _t.forgetAccountTip = '必填!'
            return;
          }else{
            if(mailRes){ //邮箱验证通过
              _t.sendType = 'inputMail'
            }else if(phoneRes){ //电话验证通过
              _t.sendType = 'inputTel'
            }else {
              _t.forgetAccount = true
              _t.forgetAccountTip = '请检查您输入的账号格式'
              return;
            }

            if(_t.testCode){
              /*var reg=/^\d{6}$/
              if(!reg.test(_t.testCode)){
                _t.forgetCodeSty = true
                _t.forgetCodeTip = '请输入六位数字验证码'
                return;
              }*/
              _t.forgetCodeSty = false
              _t.forgetCodeTip = ''
            }else{
              _t.forgetCodeSty = true
              _t.forgetCodeTip = '必填!'
              return;
            }
            /*if(_t.phoneNum!==window.localStorage.getItem('accountNum')){
              _t.reqStatus = true
              _t.reqText = '您输入的账号与上次输入的不一致，请重新获取验证码'
              return;
            }*/
            _t.$post('/fogot/password',{
             name:_t.phoneNum,
             code:_t.testCode
            }).then(function (res) {
              if (res.status === "success" && res.code === 200) {
                _t.reqStatus = false
                _t.reqText = ''
                _t.isforgetPage = false //开启重置密码
              }else{
                _t.reqStatus = true
                _t.reqText = res.message
              }
            },function (err) {
              _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
            })
          }
        },
        checkName11:function(){ //检查用户名是否存在
          var _t =this
          _t.$post('/reg/checkName',{
            name:_t.phoneNum,
            type:'forgot_password'
          }).then(function (res) {
            _t.reqStatus = false
            _t.reqText = ''
            if (res.status === "success" && res.code === 200) {
              _t.reqError = false
            }else{// 用户名不存在
              _t.reqError = true
              return false;
            }

          }).catch(function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        checkName:function(){ //检查用户名是否存在
          var _t =this
          _t.$post('/reg/checkName',{
            name:_t.phoneNum,
            type:'forgot_password'
          }).then(function (res) {
            _t.reqStatus = false
            _t.reqText = ''
            if (res.status === "success" && res.code === 200) {
              _t.reqError = false
              _t.sendTestCode()
            }else{// 用户名不存在
              _t.reqError = true
              return false;
            }

          }).catch(function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        closeReqErr:function () {
          var _t= this
          _t.reqError = false
        },
        toegister:function () {
          var _t =this
          _t.$emit('gobackForget','toegister')
        },
        sendTestCode:function(){ //注册发送验证码
          var _t =this
          _t.forgetAccount=false
          _t.forgetAccountTip=''
          _t.forgetCodeSty=false
          _t.forgetCodeTip=''
          var mailRes = mailbox(_t.phoneNum)
          var phoneRes = mobileNumber(_t.phoneNum)
          if(_t.phoneNum===''){
            _t.forgetAccount = true
            _t.forgetAccountTip = '请输入的邮箱或手机号！'
            return;
          }else{
            if(mailRes){ //邮箱验证通过
              _t.sendType = 'inputMail'
            }else if(phoneRes){ //电话验证通过
              _t.sendType = 'inputTel'
            }else {
              _t.forgetAccount = true
              _t.forgetAccountTip = '请检查您输入的账号格式'
              return;
            }
          }
          var perfix =''
          if(_t.sendType==='inputMail'){
            perfix = '0'
          }else{
            perfix = _t.interCode.slice(1);
          }
          var phoneLogin = {
            name: _t.phoneNum,
            type: "find_password",
            mobile_prefix: perfix,
          }
          _t.$post("/message/code", phoneLogin).then(res => {
            if (res.status === "success" && res.code === 200) {
              //倒计时六十秒函数调用；
              _t.settime();
              _t.testCodeShow =true
              window.localStorage.removeItem('accountNum')
              window.localStorage.setItem('accountNum',_t.phoneNum)
              if(_t.sendType==='inputMail'){
                _t.testCodeText = '一封包含有验证码的邮件已发送至您的注册邮箱：'
              }else{
                _t.testCodeText ='短信验证码已发至您的手机：'
              }
              _t.testCode = "";
              _t.reqStatus = false
              _t.reqText = ''
              _t.nextFlag = false //换下一步按钮
            } else {//发送次数过多
              /*_t.testCodeShow =false*/
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
            _t.countdownText = ''
            _t.normal_input_inphone = true
            return;
          } else {
            _t.countdownText = _t.countdown + "s";
            _t.countdown--;
            _t.testCodeBtn = false
            _t.normal_input_inphone = false
          }
          setTimeout(function () {
            _t.settime()
          }, 1000)
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
        finshed:function () { //完成
          var _t = this
          var regs =  /^\w{8,}$/
          _t.forgetPassSty=false
          _t.forgetPassTip=''
          if(_t.resetPassword===''){
            _t.forgetPassSty = true
            _t.forgetPassTip = '必填!'
            return;
          }
          if(_t.resetPassword.length<8){
            _t.forgetPassSty = true
            _t.forgetPassTip ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
          _t.$post('/reset/password',{
            name:window.localStorage.getItem('accountNum'),
            password:_t.resetPassword
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.reqStatus = false
              _t.reqText = ''
              _t.jump = true //立即登录提示
              _t.finshSetTime()
            }else{
              _t.reqStatus = true
              _t.reqText = res.message
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        finshSetTime:function () {
          var _t =this
          if(_t.resetTime===0){ // 定时器结束
            _t.resetTime =6
            _t.jump = false
            _t.promptlyLogin()
            return;
          }else{
            _t.resetTime--
            _t.jump = true
          }
          setTimeout(function () {
            _t.finshSetTime()
          }, 1000)
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/mian/register.css";
</style>
