<template>
  <!--已设置-->
  <!--未设置-->
  <div class="safeMailBox" v-if="isPassSeted">
    <div class="safeMailBox_img">
      <div class="one_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_one.svg" alt="">
      </div>
      <div style="text-align: center">
        <span class="line_dash1 short_dash"></span>
      </div>
      <div class="two_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_two.svg" alt="">
      </div>
      <div style="text-align: center">
        <span class="line_dash2 short_dash2"></span>
      </div>

      <div class="three_img">
        <img src="../../../assets/images/memberSecurity/accountSafe_check.svg" alt="">
      </div>
    </div>
    <div class="safeMailBox_content">
      <p class="safeMailBox_content_title3 margin0"><span>旧密码</span></p>
      <div class="register-account" :class="{redLine:setAccount}">
        <img src="../../../assets/images/register/key.svg" alt="密码">
        <input :type="passwordType1"  class="account-text"  placeholder="请输入旧密码" v-model="setPassword"  >
        <span v-if="setPassword!==''" class="eyeBox">
                <img v-if="eyeStatus1" src="../../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" @click="eyeToggle1()">
                <img v-else src="../../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open"  @click="eyeToggle1()">
             </span>
      </div>
      <p style="text-align: right" v-if="setAccount">
        <span style="color: #E73140;font-size: 12px">{{setAccountTip}}</span>
      </p>
      <p class="safeMailBox_content_title3"><span>新密码</span></p>
      <div class="register-account" :class="{redLine:setAccount1}">
        <img src="../../../assets/images/register/key.svg" alt="密码">
        <input :type="passwordType11"  class="account-text"  placeholder="请设置新密码" v-model="setPassword1"  >
        <span v-if="setPassword1!==''" class="eyeBox">
                <img v-if="eyeStatus11" src="../../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" @click="eyeToggle11()">
                <img v-else src="../../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open"  @click="eyeToggle11()">
             </span>
      </div>
      <p style="text-align: right" v-if="setAccount1">
        <span style="color: #E73140;font-size: 12px">{{setAccountTip1}}</span>
      </p>
      <div>
        <span  class="register_login_btn" @click="setPassSure1">确 定</span>
      </div>
      <div class="btn-box"><span @click="cancer">取 消</span></div>
    </div>
  </div>
<div class="safeMailBox heightSty" v-else >
  <div class="safeMailBox_img">
  </div>
  <div class="safeMailBox_content">
    <p class="safeMailBox_content_title3" style="margin-top: 40px"><span>设置密码</span></p>
    <div class="register-account" :class="{redLine:setAccount}">
      <img src="../../../assets/images/register/key.svg" alt="密码">
      <input :type="passwordType1"  class="account-text"  placeholder="请设置密码" v-model="setPassword"  >
      <span v-if="setPassword!==''" class="eyeBox">
                <img v-if="eyeStatus1" src="../../../assets/images/register/eye-close.svg" alt="" class="eye-icon-close" @click="eyeToggle1()">
                <img v-else src="../../../assets/images/register/eye-open.svg" alt="" class="eye-icon-open"  @click="eyeToggle1()">
             </span>
    </div>
    <p style="text-align: right" v-if="setAccount">
      <span style="color: #E73140;font-size: 12px">{{setAccountTip}}</span>
    </p>

    <div>
      <span  class="register_login_btn" @click="setPassSure">确 定</span>
    </div>
    <div class="btn-box"><span @click="cancer">取 消</span></div>
  </div>
</div>
</template>

<script>
    export default {
        data(){
          return{
            setPassword:'',
            eyeStatus1:true,
            setAccount:false,
            setAccountTip:'',
            passwordType1:'password',
            setAccount1:false,
            setAccountTip1:'',
            passwordType11:'password',
            setPassword1:'',
            eyeStatus11:true
          }
        },
      props:['isPassSeted'],
      methods:{
        setPassSure:function () {
          var _t =this
          var regs =  /^\w{8,}$/
          _t.setAccount=false
          _t.setAccountTip=''
          if(_t.setPassword===''){
            _t.setAccount = true
            _t.setAccountTip = '必填!'
            return;
          }
          if(_t.setPassword.length<8){
            _t.setAccount = true
            _t.setAccountTip ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
          _t.$post('/user/password',{
            new_password:_t.setPassword,
            type:2
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.$message({
                message: res.data.message,
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
        setPassSure1:function(){
          var _t =this
          var regs =  /^\w{8,}$/
          _t.setAccount=false
          _t.setAccountTip=''
          _t.setAccount1=false
          _t.setAccountTip1=''
          if(_t.setPassword===''){
            _t.setAccount = true
            _t.setAccountTip = '必填!'
            return;
          }
          if(_t.setPassword.length<8){
            _t.setAccount = true
            _t.setAccountTip ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
          if(_t.setPassword1===''){
            _t.setAccount1 = true
            _t.setAccountTip1 = '必填!'
            return;
          }
          if(_t.setPassword1.length<8){
            _t.setAccount1 = true
            _t.setAccountTip1 ='密码请设置为至少8位的字母、数字或标点符号'
            return;
          }
          if(_t.setPassword1===_t.setPassword){
            _t.setAccount1 = true
            _t.setAccountTip1 ='新旧密码不能保持一致'
            return;
          }
          _t.$post('/user/password',{
            old_password:_t.setPassword,
            new_password:_t.setPassword1,
            type:1
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              _t.$message({
                message: res.data.message,
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
        cancer:function () {
          var _t = this
          _t.$emit('closePass')
        },
        eyeToggle1:function () {
          var _t =this
          if(_t.eyeStatus1){ //睁眼
            _t.eyeStatus1 = false
            _t.passwordType1 = 'text'
          }else{ //闭眼
            _t.eyeStatus1 = true
            _t.passwordType1 = 'password'
          }
        },
        eyeToggle11:function () {
          var _t =this
          if(_t.eyeStatus11){ //睁眼
            _t.eyeStatus11 = false
            _t.passwordType11 = 'text'
          }else{ //闭眼
            _t.eyeStatus11 = true
            _t.passwordType11 = 'password'
          }
        }
      }
    }
</script>

<style scoped>
  .safeMailBox{
    height: 253px;
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
  .short_dash{
    height: 39px;
  }
  .line_dash2{
    display: inline-block;
    height: 122px;
    border-right:1px dashed #979797 ;
  }
  .short_dash2{
    height: 70px;
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
    margin-top: 20px;
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
    margin-top: 30px;
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
  .register-account {
    border: 1px solid #e1e3e6;
    position: relative;
    height: 35px;
    margin-top: 10px;
    width: 310px;
  }
  .redLine{
    border-color: #E73140;
  }
  .register-account>img {

    width: 12px;
    height: 14px;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -7px;
  }
  .account-text {
    padding-left: 30px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    padding-right: 26px;
    width: 81.9%;
  }

  .heightSty{
    height: 278px;
  }
  .eye-icon-close{
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -3px;
    cursor: pointer;
  }
  .eye-icon-open{
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -5px;
    cursor: pointer;
  }
  .margin0{
    margin-top: 0;
  }
</style>
