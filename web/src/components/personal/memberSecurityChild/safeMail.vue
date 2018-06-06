<template>
    <div class="safeMailBox" v-if="isbindMail!==''">
      <div class="safeMailBox_img">
        <div class="one_img">
          <img src="../../../assets/images/memberSecurity/accountSafe_one.svg" alt="">
        </div>
        <div style="text-align: center">
          <span class="line_dash1"></span>
        </div>
        <div class="two_img">
          <img src="../../../assets/images/memberSecurity/accountSafe_two.svg" alt="">
        </div>
        <div style="text-align: center">
          <span class="line_dash2"></span>
        </div>

        <div class="three_img">
          <img src="../../../assets/images/memberSecurity/accountSafe_check.svg" alt="">
        </div>
      </div>
      <div class="safeMailBox_content">
       <p class="safeMailBox_content_title1"><span>验证当前邮箱账号</span></p>
       <p class="safeMailBox_content_title2"><span>为保障您的账户安全，我们需要先验证您的当前邮箱：</span></p>
       <div class="testCode" >
          <input type="text" class="phone-code" :class="{redLine:startCode}" placeholder="验证码" v-model="testCode">
          <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCodeOld()" >
          <input v-else type="button" class="code-btn1" value="" v-model="countdownText">

         <p style="text-align: right;width: 185px" v-if="startCode">
           <span style="color: #E73140;font-size: 12px">{{startCodeTip}}</span>
         </p>
        </div>

        <p class="safeMailBox_content_title3"><span>设置新邮箱账号</span></p>
        <div class="register-phone" :class="{redLine:setAccount}" v-show="normalInput">
          <input type="text" class="phone-text" placeholder="新邮箱账号" v-model="mailNum">
        </div>
        <div class="register-phone"  v-show="!normalInput" style="background-color: #FCFCFC">
          <input type="text" class="phone-text" placeholder="新邮箱账号" v-model="mailNum"  disabled style="background-color: #FCFCFC">
        </div>
        <p style="text-align: right" v-if="setAccount">
          <span style="color: #E73140;font-size: 12px">{{setAccountTip}}</span>
        </p>
        <div class="testCode" style="margin-top: 10px;margin-bottom: 30px">
          <input type="text" class="phone-code" :class="{redLine:endCode}" placeholder="验证码" v-model="testCode1">
          <input v-if="testCodeBtn1" type="button" class="code-btn"  v-model="countdownAginText1" @click="sendTestCodeNew('alter')" >
          <input v-else type="button" class="code-btn1" value="" v-model="countdownText1">
          <p style="text-align: right;width: 185px" v-if="endCode">
            <span style="color: #E73140;font-size: 12px">{{endCodeTip}}</span>
          </p>
        </div>
        <div>
          <span  class="register_login_btn" @click="changeMail">确 定</span>
        </div>
        <div class="btn-box"><span @click="cancer">取 消</span></div>

      </div>
      <div class="right_tip">
       <!--<transition name="el-fade-in-linear">
          <div  v-if="reqStatus" class="reqErrBox" style="position: relative ;margin-top: 43px;display: inline-block">
                 <span>
                   {{reqText}}
                 </span>
            <i class="el-icon-close" @click="clossLoginErr" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
          </div>
        </transition>-->
        <!--<transition name="el-fade-in-linear">
          <div  v-if="true" class="reqErrBox" style="position: relative ;margin-top: 43px;display: inline-block">
                 <span>
                   {{reqText1}}
                 </span>
            <i class="el-icon-close" @click="clossLoginErr1" style="position: absolute;right: 15px;top: 50%;margin-top: -6.5px"></i>
          </div>
        </transition>-->
      </div>
    </div>
  <div class="safeMailBox elseClass" style="height: 287px" v-else >
    <div class="safeMailBox_img">
    </div>
    <div class="safeMailBox_content">
      <div class="register-phone" style="margin-top: 0" :class="{redLine:setAccount}" v-show="normalInput">
        <input type="text" class="phone-text" placeholder="邮箱" v-model="mailNum">
      </div>
      <div class="register-phone"  v-show="!normalInput" style="background-color: #FCFCFC">
        <input type="text" class="phone-text" placeholder="邮箱" v-model="mailNum" disabled style="background-color: #FCFCFC">
      </div>
      <p style="text-align: right" v-if="setAccount">
        <span style="color: #E73140;font-size: 12px">{{setAccountTip}}</span>
      </p>
      <div class="testCode" style="margin-top: 10px;margin-bottom: 30px">
        <input type="text" class="phone-code" :class="{redLine:endCode}" placeholder="验证码" v-model="testCode1">
        <input v-if="testCodeBtn1" type="button" class="code-btn"  v-model="countdownAginText1" @click="sendTestCodeNew('bind')" >
        <input v-else type="button" class="code-btn1" value="" v-model="countdownText1">
        <p style="text-align: right;width: 185px" v-if="endCode">
          <span style="color: #E73140;font-size: 12px">{{endCodeTip}}</span>
        </p>
      </div>
      <div>
        <span  class="register_login_btn" @click="mailBind">确 定</span>
      </div>
      <div class="btn-box"><span @click="cancer">取 消</span></div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            testCodeBtn:true,
            startCode:false,
            startCodeTip:'',
            testCode:'',
            testCode1:'',
            countdownAginText:'发 送 验 证 码',
            countdownText:'',
            countdown : 60,
            countdown1 : 60,
            setAccount:false,
            setAccountTip:'',
            mailNum:'',
            endCode:false,
            endCodeTip:'',
            testCodeBtn1:true,
            countdownAginText1:'发 送 验 证 码',
            countdownText1:'',
            reqStatus:false,
            reqText:'',
            reqStatus1:false,
            reqText1:'',
            normalInput:true
          }
        },
      props:['isbindMail'],
      methods:{
        clossLoginErr:function(){
          var _t= this
          _t.reqStatus=false
          _t.reqText=''
        },
        clossLoginErr1:function(){
          var _t= this
          _t.reqStatus1=false
          _t.reqText1=''
        },
        cancer:function () {
          var _t = this
          _t.$emit('closeMail')
        },
        sendTestCodeOld:function () { //旧邮箱发送验证码
          var _t= this
          _t.reqStatus = false
          _t.reqText = ''
          _t.$post('/message/code',{
          name:_t.isbindMail,
          type:'edit_user',
          mobile_prefix:'0'
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.reqStatus = false
              _t.reqText = ''
              _t.testCode =''
              _t.settime()
            }else{
             /* _t.reqStatus = true
              _t.reqText = res.message*/
              _t.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        sendTestCodeNew:function (flag) { //新邮箱发送验证码
          var _t= this
          //初始化邮箱账户错误提示信息
          _t.setAccount=false
          _t.setAccountTip=''
          _t.reqStatus1 = false
          _t.reqText1 = ''
          if(_t.mailNum){
            var mailRes = mailbox(_t.mailNum)
            if(!mailRes){
              _t.setAccount=true
              _t.setAccountTip='请检查您输入的账号格式'
              return;
            }
          }else{
            _t.setAccount=true
            _t.setAccountTip='必填!'
            return;
          }
          var params = {
            name:_t.mailNum,
            mobile_prefix:'0'
          }
          if(flag==='alter'){ //修改邮箱
            params.type = 'edit_user'

          }else{ //绑定邮箱
            params.type = 'reg_bind'
          }
          _t.$post('/message/code',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              /*_t.reqStatus1 = false
              _t.reqText1 = ''*/
              _t.testCode1 =''
              _t.settime1()
            }else{
              /* _t.reqStatus1 = true
               _t.reqText1 = res.message*/
              _t.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })

        },
        settime: function() {
          var _t =this
          if (_t.countdown === 0) {
            _t.countdown = 60;
            _t.testCodeBtn = true
            _t.countdownText = ''
            _t.countdownAginText ='重 新 发 送'
            return;
          } else {
            _t.countdown--;
            _t.testCodeBtn = false
            _t.countdownText = _t.countdown + "s";

          }
          setTimeout(function () {
            _t.settime()
          }, 1000)
        },
        settime1:function () {
          var _t =this
          if (_t.countdown1 === 0) {
            _t.countdown1 = 60;
            _t.testCodeBtn1 = true
            _t.countdownText1 = ''
            _t.normalInput = true
            _t.countdownAginText1 ='重 新 发 送'
            return;
          } else {
            _t.countdown1--;
            _t.testCodeBtn1 = false
            _t.normalInput = false
            _t.countdownText1 = _t.countdown1 + "s";

          }
          setTimeout(function () {
            _t.settime1()
          }, 1000)
        },
        changeMail:function () { //点击确定按钮修改绑定邮箱
          var _t = this
          //初始化验证码或邮箱校验信息
          _t.startCode = false
          _t.startCodeTip =''
          _t.setAccount = false
          _t.setAccountTip =''
          _t.endCode =false
          _t.endCodeTip =''
          _t.reqStatus = false
          _t.reqText = ''
          if(_t.testCode===''){ //先验证旧邮箱验证码
            _t.startCode = true
            _t.startCodeTip ='必填!'
            return;
          }/*else{
            var reg=/^\d{6}$/
            if(!reg.test(_t.testCode)){
              _t.startCode = true
              _t.startCodeTip = '请输入六位数字验证码'
              return;
            }
          }*/
         if(_t.mailNum===''){ //新邮箱账户
           _t.setAccount = true
           _t.setAccountTip ='必填!'
           return;
          }else{
           var mailRes = mailbox(_t.mailNum)
           if(!mailRes){
             _t.setAccount=true
             _t.setAccountTip='请检查您输入的账号格式'
             return;
           }
         }
         if(_t.testCode1===''){ //新邮箱验证码
           _t.endCode =true
           _t.endCodeTip ='必填!'
           return;
         }/*else{
           var reg1=/^\d{6}$/
           if(!reg1.test(_t.testCode1)){
             _t.endCode = true
             _t.endCodeTip = '请输入六位数字验证码'
             return;
           }
         }*/
         _t.$post('user/info',{
           old_name:_t.isbindMail,
           old_code:_t.testCode,
           name:_t.mailNum,
           code:_t.testCode1
         }).then(function (res) {
           if (res.status === "success" && res.code === 200) {
            /* _t.reqStatus = false
             _t.reqText = ''*/
             _t.$message({
               message: res.message,
               type: 'success',
               showClose: true,
             });


             setTimeout(function () {
              _t.$emit('reload')
             },3000)
           }else{
            /* _t.reqStatus = true
             _t.reqText = res.message*/
             _t.$message({
               showClose: true,
               message: res.message,
               type: 'error'
             });
           }
         },function (err) {
           _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
         })
        },
        mailBind:function () { //邮箱绑定
         var _t = this
          _t.setAccount = false
          _t.setAccountTip = ''
          _t.endCode = false
          _t.endCodeTip = ''
          if(_t.mailNum===''){ //新邮箱账户
            _t.setAccount = true
            _t.setAccountTip ='必填!'
            return;
          }else{
            var mailRes = mailbox(_t.mailNum)
            if(!mailRes){
              _t.setAccount=true
              _t.setAccountTip='请检查您输入的账号格式'
              return;
            }
          }
          if(_t.testCode1===''){ //新邮箱验证码
            _t.endCode =true
            _t.endCodeTip ='必填!'
            return;
          }
          _t.$post('/reg/bind',{
            name:_t.mailNum,
            code:_t.testCode1
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.$message({
                message: res.message,
                type: 'success',
                showClose: true,
              });
              setTimeout(function () {
                _t.$emit('reload')
              },3000)
            }else{
              _t.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })

        },
        /*checkName:function(){
          var _t =this
          var params={
            type:'reg_bind',
            name:_t.mailNum
          }
          _t.$post('/reg/checkName',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {

            }else{
              _t.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },*/
      }
    }
</script>

<style scoped>
  .safeMailBox{
    height: 326px;
    background-color: #EFF0F2;
    padding-left: 67px;
    padding-top: 40px;
    padding-bottom: 47px;
  }
  .safeMailBox_img{
    width: 40px;
    float: left;
    height: 100%;
    margin-right: 37px;
  }
  .line_dash1{
    display: inline-block;
    height: 59px;
    border-right:1px dashed #979797 ;
  }
  .line_dash2{
    display: inline-block;
    height: 122px;
    border-right:1px dashed #979797 ;
  }
  .three_img{
    text-align: center;
  }
  .safeMailBox_content{
    float: left;
  }
  .safeMailBox_content_title1{
    color: #383838;
    font-size: 12px;
    line-height: 19px;
  }
  .safeMailBox_content_title2{
    color: #383838;
    font-size: 12px;
    opacity: .5;
    line-height: 19px;
  }
  .safeMailBox_content_title3{
    color: #383838;
    font-size: 12px;
    margin-top: 10px;
  }
  .testCode{
    margin-top: 5px;
  }
  .phone-code {
    padding: 0 13px;
    width: 157px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border: 1px solid #C7C7C7;
    border-radius: 2px;
  }
  .code-btn {

    width: 120px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    background-color: #383838;
    border-radius: 2px;
    color: #ffffff;

  }
  .code-btn1{
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    color: #ffffff!important;
    background-color: #C7C7C7;
  }
  .register-phone{
    border: 1px solid #C7C7C7;
    height: 42px;
    margin-top: 10px;
    background-color: #ffffff;
    padding: 0 13px;
  }

  .phone-text{
    float: left;
    display: block;
    line-height: 42px;
    height: 42px;

    width: 100%;
  }
  .register_login_btn{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #383838;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }
  .btn-box{
    text-align: center;
    font-size: 14px;
    color: #383838;
    margin-top: 20px;
  }
  .btn-box>span{
    cursor: pointer;

  }
  .btn-box>span:hover{
    color:#669934 ;
  }
  .redLine{
    border-color: #E73140;
  }
  .reqErrBox{
    height: 40px;
    border: 1px solid #FF9797;
    background-color: #FFE2E2;
    border-radius: 2px;
  }
  .reqErrBox>span{
    line-height: 40px;
    font-size: 12px;
    color: #FF5656;
    display: inline-block;
    margin-left: 15px;
    margin-right: 30px;
  }
  .el-icon-close{
    font-size: 12px;
    color: #FF5656;
    cursor: pointer;
    display: inline-block;
    margin-left: 30px;
  }
  .right_tip{
    float: left;
    margin-left: 15px;
  }
  .elseClass{
    height: 206px
  }
</style>
