<template>
  <div >
    <div class="register-left-img">
      <img src="../../assets/images/register/registerSuss_img.png" alt="">
    </div>
    <div class="register-right">
      <div class="register-right-content">
        <div style="text-align: center;font-size: 26px;color: #383838">注&nbsp;册 成 功</div>
        <div v-if="isTel"> <!--isTel-->
          <p class="bindPhone">推荐绑定手机号，下次登录更方便：</p>
          <div class="register-phone" v-show="normal_input_inphone" :class="{redLine:telOrMailAccount}">
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
          <div class="register-phone" style="background-color: #FCFCFC" v-show="!normal_input_inphone">
            <div class="register-select" style="cursor: auto">
              <span class="register-select-box">
                <span >{{interCode}}</span>
                <i class="el-icon-caret-bottom" style="color: #D8D8D8"></i>
            </span>
            </div>
            <input type="text" class="phone-text" placeholder="请输入手机号" v-model="phoneNum" disabled style="background-color: #FCFCFC">
          </div>
          <p style="text-align: right" v-if="telOrMailAccount">
            <span style="color: #E73140;font-size: 12px">{{telOrMailAccountTip}}</span>
          </p>
          <el-collapse-transition>
            <div class="testCode" v-if="testCodeShow">
              <p ><span style="font-size: 12px;color: #383838">{{testCodeText}}</span></p>
              <input type="text" class="phone-code" :class="{redLine:telOrMailCodeSty}" placeholder="验证码" v-model="testCode">
              <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCode(sendType)" >
              <input v-else type="button" class="code-btn1" value="" v-model="countdownText">
              <p style="text-align: right;width: 185px" v-if="telOrMailCodeSty">
                <span style="color: #E73140;font-size: 12px">{{telOrMailCodeTip}}</span>
              </p>
            </div>
          </el-collapse-transition>

          <div>
            <span class="bind_btn" @click="bindGetCode(behavior)">{{btnText}}</span>
          </div>
          <el-collapse-transition >
            <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}
                 </span>
              <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
            </div>
          </el-collapse-transition>
          <div class="skip">
              <span class="btn_skip"  @click="reloadPage()" @mouseenter="enterText" @mouseleave="leaveText">跳过</span>
             <br>
            <span v-show="showTexts">需要时，您也可以前往“个人中心”进行关联设置</span>
          </div>
        </div>
        <div v-else>
          <p class="bindPhone">推荐绑定邮箱，下次登录更方便：</p>
          <div class="register-phone" v-show="normal_input_mail" :class="{redLine:telOrMailAccount}">
            <input type="text" class="phone-text"  placeholder="请输入邮箱号" v-model="mailNum" style="margin-right: 13px;width: 90.5%">
          </div>
          <div class="register-phone"  v-show="!normal_input_mail" style="background-color: #FCFCFC">
            <input type="text" class="phone-text" placeholder="请输入邮箱号" v-model="mailNum" style="margin-right: 13px;width: 90.5%;background-color: #FCFCFC" disabled>
          </div>
          <p style="text-align: right" v-if="telOrMailAccount">
            <span style="color: #E73140;font-size: 12px">{{telOrMailAccountTip}}</span>
          </p>
          <el-collapse-transition>
            <div class="testCode" v-if="testCodeShow">
              <p ><span style="font-size: 12px;color: #383838">{{testCodeText}}</span></p>
              <input type="text" class="phone-code" :class="{redLine:telOrMailCodeSty}" placeholder="验证码" v-model="testCode">
              <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCode(sendType)" >
              <input v-else type="button" class="code-btn1" value="" v-model="countdownText">
              <p style="text-align: right;width: 185px" v-if="telOrMailCodeSty">
                <span style="color: #E73140;font-size: 12px">{{telOrMailCodeTip}}</span>
              </p>
            </div>
          </el-collapse-transition>
          <div>
            <span class="bind_btn" @click="bindGetMailCode(behavior)">{{btnTextMail}}</span>
          </div>
          <el-collapse-transition >
            <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 10px">
                 <span>
                   {{reqText}}
                 </span>
              <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
            </div>
          </el-collapse-transition>
          <div class="skip">
            <span class="btn_skip" @click="reloadPage()" @mouseenter="enterText" @mouseleave="leaveText">跳过</span> <br>
            <span v-show="showTexts">需要时，您也可以前往“个人中心”进行关联设置</span>
          </div>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            phoneCode :[], //电话号码集合
            interCode: "+86",
            interPhone:false,
            phoneNum:'',
            isTel:false,
            normal_input_inphone:true,
            normal_input_mail:true,
            btnText:'完 成',
            mailNum:'',
            btnTextMail:'完 成',
            testCodeShow:false, //验证码邮箱显示
            testCodeText:'',
            testCode:'',
            countdownAginText:'重 新 发 送',
            countdown : 60,
            countdownText:'',
            testCodeBtn:false,
            reqStatus:false,
            reqText:'',
            behavior:'before',
            telOrMailAccount:false, //账户校验
            telOrMailAccountTip:'', //账户校验信息
            telOrMailCodeSty:false, //验证码校验
            telOrMailCodeTip:'', //验证码校验信息
            showTexts:false
          }
        },
      props:['sendType'],
      created:function () {
          var that = this;
          if(that.sendType==='mail'){//绑定电话
            that.$get("/message/country/mobile").then(res => {
              if (res.status === "success" && res.code === 200) {
                that.phoneCode = res.data;
                that.isTel = true
              } else {
                that.phoneCode = [];
              }
            }).catch(err => {
              if (err === undefined) {
                console.log("获取国际手机区号未连接！");
              }

            });
          }else{ //绑定邮箱
            that.isTel = false
          }


      },
      methods:{
        enterText:function(){
          this.showTexts = true
        },
        leaveText:function(){
          this.showTexts = false
        },
        international(index) {
          var interLi = this.$refs.interLi;
          this.interCode = interLi.children[index].children[1].innerHTML;
          this.interPhone = false;
        },
        clossLoginErr:function () { //错误提示关闭
          var _t= this
          _t.reqStatus=false
          _t.reqText=''
        },
        phoneAppear() {
          this.interPhone = true
        },
        phoneHidden() {
          this.interPhone = false
        },
        sendTestCode:function(flag){ //注册发送验证码
          var _t =this
          var perfix =''
          var name = ''
          //账户验证码恢复初始化
          _t.telOrMailAccount=false
          _t.telOrMailAccountTip=''
          _t.telOrMailCodeSty =false
          _t.telOrMailCodeTip =''
          if(flag==='mail'){ //电话
            if(_t.phoneNum===''){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '必填!'
              return
            }
            var phoneRes = mobileNumber(_t.phoneNum)
            if(!phoneRes){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '请检查您输入的账号格式'
              return ;
            }
            perfix = _t.interCode.slice(1);
            name=_t.phoneNum
          }else{ //邮箱
            if(_t.mailNum===''){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '必填!'
              return
            }
            var mailRes = mailbox(_t.mailNum)
            if(!mailRes){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '请检查您输入的账号格式'
              return ;
            }
            perfix = '0'
            name=_t.mailNum
          }
          var phoneLogin = {
            name: name,
            type: "reg_bind",
            mobile_prefix: perfix,
          }
          _t.$post("/message/code", phoneLogin).then(res => {
            if (res.status === "success" && res.code === 200) {
              //倒计时六十秒函数调用；
              _t.settime();
              window.localStorage.removeItem('accountNum')
              if(flag==='mail'){//电话
                _t.testCodeText ='短信验证码已发至您的手机：'
                window.localStorage.setItem('accountNum',_t.phoneNum)
              }else{
                _t.testCodeText = '一封包含有验证码的邮件已发送至您的邮箱：'
                window.localStorage.setItem('accountNum',_t.mailNum)
              }
              _t.btnText ='完 成 绑 定，提 交'
              _t.btnTextMail ='完 成 绑 定，提 交'
              _t.testCodeShow =true
              _t.testCode = "";
              _t.reqStatus = false
              _t.reqText = ''
              _t.behavior = 'after'//此标识是为了检测前后输入的绑定号码是否一致
            } else {//发送次数过多
              //_t.testCodeShow =false
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
            _t.normal_input_mail =true
            return;
          } else {
            _t.countdownText = _t.countdown + "s";
            _t.countdown--;
            _t.testCodeBtn = false
            _t.normal_input_inphone =false
            _t.normal_input_mail =false
          }
          setTimeout(function () {
            _t.settime()
          }, 1000)
        },
        bindGetMailCode:function (falg) {
          var _t = this
          _t.telOrMailAccount=false
          _t.telOrMailAccountTip=''
          if(_t.mailNum===''){
            _t.telOrMailAccount = true
            _t.telOrMailAccountTip = '必填!'
            return;
          }
          if(!mailbox(_t.mailNum)){
            _t.telOrMailAccount = true
            _t.telOrMailAccountTip = '请检查您输入的账号格式'
            return;
          }

          if(falg==='before'){ //发送验证码之前
            _t.checkName(_t.sendType)
          }else{//发送验证码之后
            if(_t.mailNum!==window.localStorage.getItem('accountNum')){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '您输入的邮箱账号与上次输入的不一致，请重新输入'
              return;
            }
            _t.checkName1(_t.sendType)
          }
        },
        bindGetCode:function (falg) { //初始获取手机验证码/提交绑定
          var _t = this
          _t.telOrMailAccount=false
          _t.telOrMailAccountTip=''
          if(_t.phoneNum===''){
            _t.telOrMailAccount = true
            _t.telOrMailAccountTip = '必填!'
            return;
          }
          if(!mobileNumber(_t.phoneNum)){
            _t.telOrMailAccount = true
            _t.telOrMailAccountTip = '请检查您输入的账号格式'
            return;
          }

         if(falg==='before'){ //发送验证码之前
            _t.checkName(_t.sendType)
         }else{//发送验证码之后
            /*if(_t.phoneNum!==window.localStorage.getItem('accountNum')){
              _t.telOrMailAccount = true
              _t.telOrMailAccountTip = '您输入的账号与上次输入的不一致，请重新获取验证码'
              return;
            }*/
           _t.checkName1(_t.sendType)
         }
        },
        checkName1:function(sendType){ //提交检测用户名是否存在
          var _t =this
          var params={
            type:'reg_bind'
          }
          if(sendType==='mail'){ //上步类型是邮箱 此步骤是电话
            params.name= _t.phoneNum
          }else{//邮箱
            params.name=_t.mailNum
          }
          _t.$post('/reg/checkName',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.reqStatus = false//后端错误信息初始化
              _t.reqText = ''//后端错误文本初始化
              _t.telOrMailCodeSty=false //验证码校验样式初始化
              _t.telOrMailCodeTip='' //验证码提示信息初始化
             // 提交绑定手机
              if(sendType==='mail'){ //电话下面的验证码
                if(_t.testCode===''){
                  _t.telOrMailCodeSty = true
                  _t.telOrMailCodeTip = '必填!'
                  return;
                }else{
                  /*var reg=/^\d{6}$/
                  if(!reg.test(_t.testCode)){
                    _t.telOrMailCodeSty = true
                    _t.telOrMailCodeTip = '请输入六位数字验证码'
                    return;
                  }else{
                    _t.telOrMailCodeSty = false
                    _t.telOrMailCodeTip = ''
                  }*/
                  _t.telOrMailCodeSty = false
                  _t.telOrMailCodeTip = ''
                }
              }else{ //邮箱下面的验证码
                if(_t.testCode===''){
                  _t.telOrMailCodeSty = true
                  _t.telOrMailCodeTip = '必填!'
                  return;
                }else{
                  /*var reg=/^\d{6}$/
                  if(!reg.test(_t.testCode)){
                    _t.telOrMailCodeSty = true
                    _t.telOrMailCodeTip = '请输入六位数字验证码'
                    return;
                  }else{
                    _t.telOrMailCodeSty = false
                    _t.telOrMailCodeTip = ''
                  }*/
                  _t.telOrMailCodeSty = false
                  _t.telOrMailCodeTip = ''
                }
              }
              _t.endBind(sendType)
            }else{
              _t.reqStatus = true
              _t.reqText = res.message
              return false;
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        endBind:function(sendType){ //用户绑定操作
          var _t = this
          var params = {
            name:'',
            code:_t.testCode
          }
          if(sendType==='mail'){ //电话
            params.name=_t.phoneNum
          }else{
            params.name=_t.mailNum
          }
          _t.$post('/reg/bind',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.$message({
                message: res.message,
                type: 'success'
              });
              window.location.reload()
            }else{
              _t.reqStatus = true
              _t.reqText = res.message
              return false;
            }
          },function (err) {
            debugger
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        checkName:function(sendType){
          var _t =this
          var params={
            type:'reg_bind'
          }
          if(sendType==='mail'){ //上步类型是邮箱 此步骤是电话
            params.name= _t.phoneNum
          }else{//邮箱
            params.name=_t.mailNum
          }
          _t.$post('/reg/checkName',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.reqStatus = false
              _t.reqText = ''
              _t.sendTestCode(sendType)
            }else{
              _t.reqStatus = true
              _t.reqText = res.message
              return false;
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },

        reloadPage:function () {
          window.location.reload()
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/mian/register.css";
</style>
