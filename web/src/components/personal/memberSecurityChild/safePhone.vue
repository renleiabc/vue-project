<template>
<div class="safeMailBox" v-if="isbindPhone!==''">
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
    <p class="safeMailBox_content_title1"><span>验证当前手机号</span></p>
    <p class="safeMailBox_content_title2"><span>为保障您的账户安全，我们需要先验证您的当前手机号：</span></p>
    <div class="testCode" >
      <input type="text" class="phone-code" :class="{redLine:startCode}" placeholder="验证码" v-model="testCode">
      <input v-if="testCodeBtn" type="button" class="code-btn"  v-model="countdownAginText" @click="sendTestCodeOld()" >
      <input v-else type="button" class="code-btn1" value="" v-model="countdownText">

      <p style="text-align: right;width: 185px" v-if="startCode">
        <span style="color: #E73140;font-size: 12px">{{startCodeTip}}</span>
      </p>
    </div>

    <p class="safeMailBox_content_title3"><span>设置新手机号</span></p>
    <div class="register-phone" v-show="normalInput" :class="{redLine:setAccount}">
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
    <div class="register-phone" style="background-color: #FCFCFC" v-show="!normalInput">
      <div class="register-select" style="cursor: auto">
              <span class="register-select-box">
                <span >{{interCode}}</span>
                <i class="el-icon-caret-bottom" style="color: #D8D8D8"></i>
            </span>
      </div>
      <input type="text" class="phone-text" placeholder="请输入手机号" v-model="phoneNum" disabled style="background-color: #FCFCFC">
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
      <span  class="register_login_btn" @click="changePhone">确 定</span>
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
<div class="safeMailBox elseClass" v-else  >
  <div class="safeMailBox_img">
  </div>
  <div class="safeMailBox_content">
    <div class="register-phone" style="margin-top: 0" v-show="normalInput" :class="{redLine:setAccount}">
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
    <div class="register-phone" style="background-color: #FCFCFC" v-show="!normalInput">
      <div class="register-select" style="cursor: auto">
              <span class="register-select-box">
                <span >{{interCode}}</span>
                <i class="el-icon-caret-bottom" style="color: #D8D8D8"></i>
            </span>
      </div>
      <input type="text" class="phone-text" placeholder="请输入手机号" v-model="phoneNum" disabled style="background-color: #FCFCFC">
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
      <span  class="register_login_btn" @click="phoneBind">确 定</span>
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
</template>

<script>
    export default {
       data(){
         return{
           startCode:false,
           startCodeTip:'',
           testCode:'',
           testCodeBtn:true,
           countdownAginText:'发 送 验 证 码',
           countdownText:'',
           phoneCode :[], //电话号码集合
           interCode: "+86",
           interPhone:false,
           phoneNum:'',
           endCode:false,
           endCodeTip:'',
           testCode1:'',
           testCodeBtn1:true,
           countdownAginText1:'发 送 验 证 码',
           countdownText1:'',
           countdown : 60,
           countdown1 : 60,
           normalInput:true,
           setAccount:false,
           setAccountTip:''
         }
       },
      created:function(){
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
        cancer:function () {
          var _t = this
          _t.$emit('closeTel')
        },
        changePhone:function () {
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
          if(_t.phoneNum===''){ //新邮箱账户
            _t.setAccount = true
            _t.setAccountTip ='必填!'
            return;
          }else{
            var mailRes = mobileNumber(_t.phoneNum)
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
            old_name:_t.isbindPhone,
            old_code:_t.testCode,
            name:_t.phoneNum,
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
                window.location.reload()
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
        sendTestCodeOld:function () {
          var _t= this
          _t.$post('/message/code',{
            name:_t.isbindPhone,
            type:'edit_user',
            mobile_prefix:_t.interCode.slice(1)
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.testCode =''
              _t.settime()
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
        sendTestCodeNew:function (flag) {
          var _t= this

          //初始化邮箱账户错误提示信息
          _t.setAccount=false
          _t.setAccountTip=''

          if(_t.phoneNum){
            var mailRes = mobileNumber(_t.phoneNum)
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
            name:_t.phoneNum,
            mobile_prefix:_t.interCode.slice(1)
          }
          if(flag==='alter'){ //修改手机
            params.type = 'edit_user'

          }else{ //绑定手机
            params.type = 'reg_bind'
          }
          _t.$post('/message/code',params).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.testCode1 =''
              _t.settime1()
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
        phoneBind:function () {
          var _t = this
          _t.setAccount = false
          _t.setAccountTip = ''
          _t.endCode = false
          _t.endCodeTip = ''
          if(_t.phoneNum===''){ //新邮箱账户
            _t.setAccount = true
            _t.setAccountTip ='必填!'
            return;
          }else{
            var mailRes = mobileNumber(_t.phoneNum)
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
            name:_t.phoneNum,
            code:_t.testCode1
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.$message({
                message: res.message,
                type: 'success',
                showClose: true,
              });

              setTimeout(function () {
               window.location.reload()
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
        }
      },
      props:['isbindPhone']
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
    margin-top: 17px;
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
    height: 45px;
    margin-top: 10px;
    border: 1px solid #C7C7C7;
    background-color: #ffffff;
    padding: 0 13px;
    border-radius: 2px;
  }

  .phone-text{
    float: left;
    display: inline-block;
    line-height: 45px;
    height: 45px;
    margin-left: 13px;
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

  .register-select {
    width: 28%;
    cursor: pointer;
    position: relative;
    text-align: center;
    height: 100%;
    float: left;
    display: block;
  }
  .register-select > span {

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

  }
  .register-select-box{
    display: inline-block;
    width: 100%;
    height: 27px ;
    line-height: 27px;
    border-right: 1px solid #C7C7C7;
    opacity: .8;
    margin: 9px 0;
  }
  .international-Code {
    position: absolute;
    width: 230px;
    height: 250px;
    z-index: 1000000;
    border: 1px solid #e1e3e6;
    background: #fff;
    overflow-y: auto;
    padding: 10px 0;
    font-size: 12px;
  }

  .international-Code li {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }

  .international-Code li:hover {
    color: #fff;
    background: #8fbf37;
  }

  .international-Code li span:first-child {
    float: left;
  }

  .international-Code li span:last-child {
    float: right;
  }
  .elseClass{
    height: 206px;
  }
</style>
