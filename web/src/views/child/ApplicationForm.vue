<template>
  <div>
    <div class="form_container" >
         <p class="form_container_title">
           <span>填写申请表</span>
         </p>
        <p class="base_info">
          <span>
            基本信息
          </span>
        </p>
        <div class="base_info_inputs">
          <p class="input_title">真实姓名</p>
          <div class="itemBox">
            <div class="inputSty" :class="{redLine:checkSty}">
              <input type="text" placeholder="必填" maxlength="60" v-model="selfName" @blur="checkNames()">
            </div>
            <p v-if="checkSty" style="margin-top: 5px">
              <span style="color:#E73140">{{checkName}}</span>
            </p>
          </div>
          <p class="input_title">笔名</p>
          <div class="itemBox">
            <div class="inputSty" :class="{redLine:checkPenNameSty}" style="position: relative;padding-right: 40px">
              <input type="text" maxlength="60" v-model="penName" placeholder="必填" @blur="checkPenName">
              <img src="../../assets/images/application/loading.svg" alt="" v-if="penLoading" class="penLoading1">
              <img src="../../assets/images/application/correct.svg" alt="" v-if="penSuccess"  class="penLoading">
            </div>
            <p v-if="checkPenNameSty" style="margin-top: 5px">
              <span style="color:#E73140">{{checkPenNameText}}</span>
            </p>
          </div>
          <p class="input_title">邮箱</p>
          <div class="itemBox">
            <div class="inputSty" :class="{redLine:mailSty}">
              <input type="text" v-model="email" placeholder="必填，申请进度会优先通过邮件反馈给您" @blur="checkMail">
            </div>
            <p v-if="mailSty" style="margin-top: 5px">
              <span style="color:#E73140">{{mailText}}</span>
            </p>
          </div>
          <p class="input_title">手机号</p>
          <div style="margin-top: 7px; margin-bottom: 20px;">
            <div class="register-phone" :class="{redLine:phoneNumSty}">
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
              <input type="text" class="phone-text" placeholder="必填" v-model="phoneNum" @blur="checkPhone">
            </div>
            <p v-if="phoneNumSty" style="margin-top: 5px">
              <span style="color:#E73140">{{phoneNumText}}</span>
            </p>
          </div>
          <p class="input_title">微信号</p>
          <div class="itemBox">
            <div class="inputSty" :class="{redLine:weixinSty}">
              <input type="text" v-model="weixinNum" maxlength="60" placeholder="微信是我们与您取得联系的重要方式之一" @blur="weixinCheck">
            </div>
            <p v-if="weixinSty" style="margin-top: 5px">
              <span style="color:#E73140">{{weixinText}}</span>
            </p>
          </div>
        </div>
      <p class="base_info">
          <span>
            专业信息
          </span>
      </p>
      <div class="base_info_inputs">
        <p class="input_title">所在学校或机构</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:schoolSty}">
            <input type="text" placeholder="必填" v-model="schoolName" maxlength="60" @blur="checkSchool">
          </div>
          <p v-if="schoolSty" style="margin-top: 5px">
            <span style="color:#E73140">{{schoolText}}</span>
          </p>
        </div>
        <p class="input_title">最高学历</p>
        <div  style="margin-top: 7px;margin-bottom: 20px;">
          <el-select v-model="value" placeholder="必选" :class="{education:educationSty}" style="width: 100%" @visible-change="checkEducation"@change="educationChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="educationSty" style="margin-top: 5px">
            <span style="color:#E73140">{{educationText}}</span>
          </p>
        </div>

        <p class="input_title">专业</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:professSty}">
            <input type="text" placeholder="必填" v-model="professText" maxlength="60" @blur="checkProfess">
          </div>
          <p v-if="professSty" style="margin-top: 5px">
            <span style="color:#E73140">{{professStyText}}</span>
          </p>
        </div>
        <p class="input_title">研究领域</p>
        <div style="margin-top: 7px;margin-bottom: 20px">
          <el-select v-model="areaValue" multiple placeholder="必选" :class="{education:areaSty}" @visible-change="checkArea" @change="areaChange">
            <el-option
              v-for="item in params"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="areaSty" style="margin-top: 5px">
            <span style="color:#E73140">{{areaStyText}}</span>
          </p>
        </div>

      </div>
      <p class="base_info">
          <span>
            作者信息
          </span>
      </p>
      <div  class="base_info_inputs">
        <p class="input_title"><span>个人简介</span> <span style="float: right;font-size:12px;
color:rgba(56,56,56,0.5)">200个字符以内</span></p>
        <div  style="margin-top: 7px;margin-bottom: 20px;">
          <el-input
            type="textarea"
            v-model="selfInfo"
            placeholder="必填"
            :class="{selfInfoClass:selfInfoSty}"
            maxlength="200"
            @blur="checkSelfInfo"
          >
          </el-input>
          <p v-if="selfInfoSty" style="margin-top: 5px">
            <span style="color:#E73140">{{selfInfoStyText}}</span>
          </p>
        </div>
        <p class="input_title"><span>一句话简介</span> <span style="float: right;font-size:12px;
color:rgba(56,56,56,0.5)">如：专注抗衰领域的医学博士。不多于12个字符</span></p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:introSmallSty}">
            <input type="text" v-model="introSmall" maxlength="12" placeholder="必填" @blur="checkIntroSmall">
          </div>
          <p v-if="introSmallSty" style="margin-top: 5px">
            <span style="color:#E73140">{{introSmallStyText}}</span>
          </p>
        </div>
      </div>
      <div>
        <span class="form_btn" @click="submitFormInfo">提交</span>
      </div>
    </div>
    <!--<div class="form_container" v-else>
      <p class="form_container_title">
        <span>填写申请表</span>
      </p>
      <p class="base_info">
          <span>
            基本信息
          </span>
      </p>
      <div class="base_info_inputs">
        <p class="input_title">真实姓名</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.checkSty}">
            <input type="text" placeholder="必填" maxlength="60" v-model="$store.state.applicationFormRecord.selfName" @blur="checkNames()">
          </div>
          <p v-if="$store.state.applicationFormRecord.checkSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.checkName}}</span>
          </p>
        </div>
        <p class="input_title">笔名</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.checkPenNameSty}" style="position: relative;padding-right: 40px">
            <input type="text" maxlength="60" v-model="$store.state.applicationFormRecord.penName" placeholder="必填" @blur="checkPenName">
            <img src="../../assets/images/application/loading.svg" alt="" v-if="$store.state.applicationFormRecord.penLoading" class="penLoading1">
            <img src="../../assets/images/application/correct.svg" alt="" v-if="$store.state.applicationFormRecord.penSuccess"  class="penLoading">
          </div>
          <p v-if="$store.state.applicationFormRecord.checkPenNameSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.checkPenNameText}}</span>
          </p>
        </div>
        <p class="input_title">邮箱</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.mailSty}">
            <input type="text" v-model="$store.state.applicationFormRecord.email" placeholder="必填，申请进度会优先通过邮件反馈给您" @blur="checkMail">
          </div>
          <p v-if="$store.state.applicationFormRecord.mailSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.mailText}}</span>
          </p>
        </div>
        <p class="input_title">手机号</p>
        <div style="margin-top: 7px; margin-bottom: 20px;">
          <div class="register-phone" :class="{redLine:$store.state.applicationFormRecord.phoneNumSty}">
            <div class="register-select" @mouseenter="phoneAppear()" @mouseleave="phoneHidden()">
              <span class="register-select-box">
                <span v-model="$store.state.applicationFormRecord.interCode">{{$store.state.applicationFormRecord.interCode}}</span>
                <i class="el-icon-caret-bottom" style="color: #D8D8D8"></i>
                <ul class="international-Code" v-show="$store.state.applicationFormRecord.interPhone" ref="interLi">
                  <li v-for="(value,index) in $store.state.applicationFormRecord.phoneCode" @click="international(index)">
                    <span>{{value.country}}</span>
                    <span>+{{value.mobile_prefix}}</span>
                  </li>
                </ul>
            </span>
            </div>
            <input type="text" class="phone-text" placeholder="必填" v-model="$store.state.applicationFormRecord.phoneNum" @blur="checkPhone">
          </div>
          <p v-if="$store.state.applicationFormRecord.phoneNumSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.phoneNumText}}</span>
          </p>
        </div>


        <p class="input_title">微信号</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.weixinSty}">
            <input type="text" v-model="$store.state.applicationFormRecord.weixinNum" maxlength="60" placeholder="微信是我们与您取得联系的重要方式之一" @blur="weixinCheck">
          </div>
          <p v-if="$store.state.applicationFormRecord.weixinSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.weixinText}}</span>
          </p>
        </div>
      </div>
      <p class="base_info">
          <span>
            专业信息
          </span>
      </p>
      <div class="base_info_inputs">
        <p class="input_title">所在学校或机构</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.schoolSty}">
            <input type="text" placeholder="必填" v-model="$store.state.applicationFormRecord.schoolName" maxlength="60" @blur="checkSchool">
          </div>
          <p v-if="$store.state.applicationFormRecord.schoolSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.schoolText}}</span>
          </p>
        </div>
        <p class="input_title">最高学历</p>
        <div  style="margin-top: 7px;margin-bottom: 20px;">
          <el-select v-model="$store.state.applicationFormRecord.value" placeholder="必选" :class="{education:$store.state.applicationFormRecord.educationSty}" style="width: 100%" @visible-change="checkEducation"@change="educationChange">
            <el-option
              v-for="item in $store.state.applicationFormRecord.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="$store.state.applicationFormRecord.educationSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.educationText}}</span>
          </p>
        </div>

        <p class="input_title">专业</p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.professSty}">
            <input type="text" placeholder="必填" v-model="$store.state.applicationFormRecord.professText" maxlength="60" @blur="checkProfess">
          </div>
          <p v-if="$store.state.applicationFormRecord.professSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.professStyText}}</span>
          </p>
        </div>
        <p class="input_title">研究领域</p>
        <div style="margin-top: 7px;margin-bottom: 20px">
          <el-select v-model="$store.state.applicationFormRecord.areaValue" multiple placeholder="必选" :class="{education:$store.state.applicationFormRecord.areaSty}" @visible-change="checkArea" @change="areaChange">
            <el-option
              v-for="item in $store.state.applicationFormRecord.params"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="$store.state.applicationFormRecord.areaSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.areaStyText}}</span>
          </p>
        </div>

      </div>
      <p class="base_info">
          <span>
            作者信息
          </span>
      </p>
      <div  class="base_info_inputs">
        <p class="input_title"><span>个人简介</span> <span style="float: right;font-size:12px;
color:rgba(56,56,56,0.5)">200个字符以内</span></p>
        <div  style="margin-top: 7px;margin-bottom: 20px;">
          <el-input
            type="textarea"
            v-model="$store.state.applicationFormRecord.selfInfo"
            placeholder="必填"
            :class="{selfInfoClass:$store.state.applicationFormRecord.selfInfoSty}"
            maxlength="200"
            @blur="checkSelfInfo"
          >
          </el-input>
          <p v-if="$store.state.applicationFormRecord.selfInfoSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.selfInfoStyText}}</span>
          </p>
        </div>

        <p class="input_title"><span>一句话简介</span> <span style="float: right;font-size:12px;
color:rgba(56,56,56,0.5)">如：专注抗衰领域的医学博士。不多于12个字符</span></p>
        <div class="itemBox">
          <div class="inputSty" :class="{redLine:$store.state.applicationFormRecord.introSmallSty}">
            <input type="text" v-model="$store.state.applicationFormRecord.introSmall" maxlength="12" placeholder="必填" @blur="checkIntroSmall">
          </div>
          <p v-if="$store.state.applicationFormRecord.introSmallSty" style="margin-top: 5px">
            <span style="color:#E73140">{{$store.state.applicationFormRecord.introSmallStyText}}</span>
          </p>
        </div>
      </div>
      <div>
        <span class="form_btn" @click="submitFormInfo">提交</span>
      </div>
    </div>-->
    <!--底部区域-->
    <brighter-footer ref="footer" id="footer" ></brighter-footer>
  </div>

</template>

<script>
  import BrighterFooter from "../../components/mian/bottom"
    export default {
      data(){
          return{
            selfName:this.record.selfName, //真实姓名
            penName:this.record.penName, //笔名
            email:this.record.email, //邮箱
            phoneCode :this.record.phoneCode, //电话号码集合
            interCode: this.record.interCode,
            interPhone:this.record.interPhone,
            phoneNum:this.record.phoneNum, //电话号码
            weixinNum:this.record.weixinNum,//微信号
            schoolName:this.record.schoolName, //学校名称
            professText:this.record.professText, //专业名称
            options:this.record.options,
            value: this.record.value, //最高学历
            params:this.record.params,
            areaValue:this.record.areaValue, //研究领域集合
            selfInfo:this.record.selfInfo, //个人简介
            introSmall:this.record.introSmall,//一句话简介
            //校验输入框
            checkSty:this.record.checkSty, //真实姓名
            checkName:this.record.checkName,
            //笔名
            checkPenNameSty:this.record.checkPenNameSty,
            checkPenNameText:this.record.checkPenNameText,
            penLoading:this.record.penLoading,
            penSuccess:this.record.penSuccess,
            //邮箱
            mailSty:this.record.mailSty,
            mailText:this.record.mailText,
            //手机号
            phoneNumSty:this.record.phoneNumSty,
            phoneNumText:this.record.phoneNumText,
            //学校
            schoolSty:this.record.schoolSty,
            schoolText:this.record.schoolText,
            //学历
            educationSty:this.record.educationSty,
            educationText:this.record.educationText,
            //微信号
            weixinSty:this.record.weixinSty,
            weixinText:this.record.weixinText,
            //专业
            professSty:this.record.professSty,
            professStyText:this.record.professStyText,
            //研究领域
            areaSty:this.record.areaSty,
            areaStyText:this.record.areaStyText,
            //个人简介
            selfInfoSty:this.record.selfInfoSty,
            selfInfoStyText:this.record.selfInfoStyText,
            //一句话简介
            introSmallSty:this.record.introSmallSty,
            introSmallStyText:this.record.introSmallStyText
          }
        },
      props:['record'],
      created:function(){
        var _t = this
        var arr = []
        _t.$post('/user/research_areas').then(function (res) {
          if (res.status === "success" && res.code === 200) {
             for(var i = 0 ; i<res.data.length;i++){
               var obj = {value:res.data[i].id,label:res.data[i].name}
               arr.push(obj)
             }
             _t.params = arr
            _t.$get("/message/country/mobile").then(res => {
              if (res.status === "success" && res.code === 200) {
                _t.phoneCode = res.data;
              }else {
                _t.$message.error(res.message);
              }
            }).catch(err => {
              if (err === undefined) {
                console.log("获取国际手机区号未连接！");
              }
            });
          }else{
            _t.$message.error(res.message);
          }
        },function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      methods:{
          //校验姓名
        checkNames:function(){
          var _t = this
          _t.checkSty=false //初始化校验样式
          _t.checkName=''//初始化真实姓名错误信息
          //_t.penName=''//初始化笔名
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
         if(_t.selfName){
           if(_t.selfName.length<2){
             _t.checkSty=true
             _t.checkName='请输入正确的内容'
             return;
           }else{
             //如果通过真实姓名校验
             if(!_t.penName){
               _t.penName = _t.selfName
               _t.checkPenName()
             }
           }
         }else{//为空提示
           _t.checkSty=true
           _t.checkName='必填'
           return;
         }

        },
        //校验笔名
        checkPenName:function(){
          var _t = this
          //初始化昵称校验字段
          _t.checkPenNameSty=false
          _t.checkPenNameText=''
          _t.penLoading=false
          _t.penSuccess=false
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          if( _t.penName){
            if(_t.penName.length<2){
              _t.checkPenNameSty=true
              _t.checkPenNameText='请输入正确的内容'
              return;
            }
          }else{
            _t.checkPenNameSty=true
            _t.checkPenNameText='必填'
            return;
          }
          _t.penLoading=true
          _t.$post('/user/checkpseudonym',{
            pseudonym:_t.penName
          }).then(function (res) {
            if(res.status === "success" && res.code === 200){
              _t.penLoading=false
              _t.penSuccess=true
            }else{
              _t.penLoading=false
              _t.penSuccess=false
              _t.checkPenNameSty=true
              _t.checkPenNameText=res.message
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        //校验邮箱
        checkMail:function(){
          var _t = this
          _t.mailSty=false
          _t.mailText=''
          if(_t.email){
            var mailRes = mailbox(_t.email)
            if(!mailRes){
              _t.mailSty=true
              _t.mailText='请输入正确的内容'
              return;
            }
          }else{
            _t.mailSty=true
            _t.mailText='必填'
            return;
          }
        },
        //校验电话
        checkPhone:function(){
          var _t = this
          _t.phoneNumSty=false
          _t.phoneNumText=''
          if(_t.phoneNum){
            var phoneRes = mobileNumber(_t.phoneNum)
            if(!phoneRes){
              _t.phoneNumSty=true
              _t.phoneNumText='请输入正确的内容'
              return;
            }
          }else{
            _t.phoneNumSty=true
            _t.phoneNumText='必填'
            return;
          }
        },
        //校验学校
        checkSchool:function(){
          var _t =this
          _t.schoolSty=false
          _t.schoolText=''
          if(_t.schoolName){
            var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
            if(_t.schoolName.length<2){
              _t.schoolSty=true
              _t.schoolText='请输入正确的内容'
              return;
            }
          }else{
            _t.schoolSty=true
            _t.schoolText='必填'
            return;
          }
        },
        //校验微信
        weixinCheck:function(){
          var _t = this
          _t.weixinSty=false
          _t.weixinText=''
          if(_t.weixinNum){
            var reg =/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
            if(!reg.test(_t.weixinNum)){
              _t.weixinSty=true
              _t.weixinText='请输入正确的内容'
              return;
            }
          }/*else{
            _t.weixinSty=true
            _t.weixinText='必填'
            return;
          }*/
        },
        //校验最高学历
        checkEducation:function(value){
          var _t =this
          _t.educationSty=false
          _t.educationText=''
          if(!value){ //下拉框隐藏
            if(!_t.value){
              _t.educationSty=true
              _t.educationText='必填'
              return;
            }
          }
        },
        educationChange:function(value){
          var _t =this
          _t.educationSty=false
          _t.educationText=''
          _t.value =value
          if(!_t.value){
            _t.educationSty=true
            _t.educationText='必填'
            return;
          }
        },
        //检验专业
        checkProfess:function(){
          var _t= this
          _t.professSty=false
          _t.professStyText=''
          if(_t.professText){
            var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
            if(_t.professText.length<2){
              _t.professSty=true
              _t.professStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.professSty=true
            _t.professStyText='必填'
            return;
          }

        },
        //检验领域
        checkArea:function(value){
          var _t = this
          _t.areaSty=false
          _t.areaStyText=''
          if(!value){ //下拉框隐藏
            if(!_t.areaValue.length){
              _t.areaSty=true
              _t.areaStyText='必填'
              return;
            }
          }
        },
        areaChange:function(value){
          var _t = this
          _t.areaSty=false
          _t.areaStyText=''
          _t.areaValue = value
          if(!_t.areaValue.length){
            _t.areaSty=true
            _t.areaStyText='必填'
            return;
          }
        },
        //个人简介检验
        checkSelfInfo:function(){
          var _t =this
          _t.selfInfoSty=false
          _t.selfInfoStyText=''
          if(_t.selfInfo){
            var reg = /^[\u4e00-\u9fa5_a-zA-Z\d,\.，。 ]{2,}$/
            if(_t.selfInfo.length<2){
              _t.selfInfoSty=true
              _t.selfInfoStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.selfInfoSty=true
            _t.selfInfoStyText='必填'
            return;
          }
        },
        //一句话介绍检验
        checkIntroSmall:function(){
          var _t =this
          _t.introSmallSty=false
          _t.introSmallStyText=''
          if(_t.introSmall){
            var reg = /^[\u4e00-\u9fa5_a-zA-Z\d,\.，。 ]{2,}$/
            if(_t.introSmall.length<2){
              _t.introSmallSty=true
              _t.introSmallStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.introSmallSty=true
            _t.introSmallStyText='必填'
            return;
          }
        },
        handleScroll :function ()  {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(scrollTop===0){
            var _t =this
            var params = {
              selfName:_t.selfName, //真实姓名
              penName:_t.penName, //笔名
              email:_t.email, //邮箱
              phoneCode :[], //电话号码集合
              interCode: _t.interCode,
              interPhone:false,
              phoneNum:_t.phoneNum, //电话号码
              weixinNum:_t.weixinNum,//微信号
              schoolName:_t.schoolName, //学校名称
              professText:_t.professText, //专业名称
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
              value: _t.value, //最高学历
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
              areaValue:_t.areaValue, //研究领域集合
              selfInfo:_t.selfInfo, //个人简介
              introSmall:_t.introSmall,//一句话简介
              //校验输入框
              checkSty:_t.checkSty, //真实姓名
              checkName:_t.checkName,
              //笔名
              checkPenNameSty:_t.checkPenNameSty,
              checkPenNameText:_t.checkPenNameText,
              penLoading:_t.penLoading,
              penSuccess:_t.penSuccess,
              //邮箱
              mailSty:_t.mailSty,
              mailText:_t.mailText,
              //手机号
              phoneNumSty:_t.phoneNumSty,
              phoneNumText:_t.phoneNumText,
              //学校
              schoolSty:_t.schoolSty,
              schoolText:_t.schoolText,
              //学历
              educationSty:_t.educationSty,
              educationText:_t.educationText,
              //微信号
              weixinSty:_t.weixinSty,
              weixinText:_t.weixinText,
              //专业
              professSty:_t.professSty,
              professStyText:_t.professStyText,
              //研究领域
              areaSty:_t.areaSty,
              areaStyText:_t.areaStyText,
              //个人简介
              selfInfoSty:_t.selfInfoSty,
              selfInfoStyText:_t.selfInfoStyText,
              //一句话简介
              introSmallSty:_t.introSmallSty,
              introSmallStyText:_t.introSmallStyText
            }
            _t.$emit('scollHanle',params)
          }
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
        submitFormInfo:function () { //提交申请作者信息
          var _t = this
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          var reg2 = /^[\u4e00-\u9fa5_a-zA-Z\d,\.，。 ]{2,}$/
          //校验输入框
          _t.checkSty=false //真实姓名
          _t.checkName=''
            //笔名
          _t.checkPenNameSty=false
          _t.checkPenNameText=''
            //邮箱
          _t.mailSty=false
          _t.mailText=''
            //手机号
          _t.phoneNumSty=false
          _t.phoneNumText=''
            //学校
          _t.schoolSty=false
          _t.schoolText=''
            //学历
          _t.educationSty=false
          _t.educationText=''
            //微信号
          _t.weixinSty=false
          _t.weixinText=''
            //专业
          _t.professSty=false
          _t.professStyText=''
            //研究领域
          _t.areaSty=false
          _t.areaStyText=''
            //个人简介
          _t.selfInfoSty=false
          _t.selfInfoStyText=''
            //一句话简介
          _t.introSmallSty=false
          _t.introSmallStyText=''
          //校验姓名
          if(_t.selfName){
            if(_t.selfName.length<2){
              _t.checkSty=true
              _t.checkName='请输入正确的内容'
              return;
            }
          }else{
            _t.checkSty=true
            _t.checkName='必填'
            return;
          }
          //检验笔名
          if(_t.penName){
            if(_t.penName.length<2){
              _t.checkPenNameSty=true
              _t.checkPenNameText='请输入正确的内容'
              return;
            }
          }else{
            _t.checkPenNameSty=true
            _t.checkPenNameText='必填'
            return;
          }
          //校验邮箱
          if(_t.email){
            var mailRes = mailbox(_t.email)
            if(!mailRes){
              _t.mailSty=true
              _t.mailText='请输入正确的内容'
              return;
            }
          }else{
            _t.mailSty=true
            _t.mailText='必填'
            return;
          }
          //校验电话
          if(_t.phoneNum){
            var phoneRes = mobileNumber(_t.phoneNum)
            if(!phoneRes){
              _t.phoneNumSty=true
              _t.phoneNumText='请输入正确的内容'
              return;
            }
          }else{
            _t.phoneNumSty=true
            _t.phoneNumText='必填'
            return;
          }
          //校验学校
          if(_t.schoolName){

            if(_t.schoolName.length<2){
              _t.schoolSty=true
              _t.schoolText='请输入正确的内容'
              return;
            }
          }else{
            _t.schoolSty=true
            _t.schoolText='必填'
            return;
          }
          //校验微信
          if(_t.weixinNum){
            var reg1 =/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
            if(!reg1.test(_t.weixinNum)){
              _t.weixinSty=true
              _t.weixinText='请输入正确的内容'
              return;
            }
          }/*else{
            _t.weixinSty=true
            _t.weixinText='必填'
            return;
          }*/
          //校验最高学历
          if(!_t.value){
            _t.educationSty=true
            _t.educationText='必填'
            return;
          }
          //检验专业
          if(_t.professText){
            if(_t.professText.length<2){
              _t.professSty=true
              _t.professStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.professSty=true
            _t.professStyText='必填'
            return;
          }
          //检验领域
          if(!_t.areaValue.length){
            _t.areaSty=true
            _t.areaStyText='必填'
            return;
          }
          //个人简介检验
          if(_t.selfInfo){
            if(_t.selfInfo.length<2){
              _t.selfInfoSty=true
              _t.selfInfoStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.selfInfoSty=true
            _t.selfInfoStyText='必填'
            return;
          }
          //一句话介绍检验
          if(_t.introSmall){
            if(_t.introSmall.length<2){
              _t.introSmallSty=true
              _t.introSmallStyText='请输入正确的内容'
              return;
            }
          }else{
            _t.introSmallSty=true
            _t.introSmallStyText='必填'
            return;
          }
          /*
          * selfName:'', //真实姓名
            penName:'', //笔名
            email:'', //邮箱
            phoneNum:'', //电话号码
            weixinNum:'',//微信号
            schoolName:'', //学校名称
            professText:'', //专业名称
             value: '', //最高学历
            areaValue:[], //研究领域集合
            selfInfo:'', //个人简介
            introSmall:'',//一句话简介
          * */
          var params = {
            real_name:_t.selfName, //真实姓名
            pseudonym:_t.penName,//笔名
            email:_t.email,//邮箱
            phone:_t.phoneNum,//电话号码
            wechat:_t.weixinNum,//微信号
            institution:_t.schoolName,//学校名称
            education:_t.value,//最高学历
            specialty:_t.professText, //专业名称
            industry:_t.areaValue.join(),//研究领域集合
            introduction:_t.selfInfo,//个人简介
            introduce:_t.introSmall//一句话简介
          }
          _t.$post('/user/apply',params).then(function (res) {
             if(res.status === "success" && res.code === 200){
             _t.$router.push({name:'checkPage'})
             }else{
               _t.$message.error(res.message);
             }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }
      },
      mounted () {
        window.addEventListener('scroll', this.handleScroll)
      },
      components: { BrighterFooter}
    }
</script>

<style scoped>
.form_container{
  width: 380px;
  margin: 71px auto 100px;


}
.form_container_title{
   text-align: center;
  letter-spacing: 10px;
  font-size: 36px;
  color: #383838;
  }
  .base_info{
    text-align: center;
    letter-spacing: 9px;
    font-size: 18px;
    color: #383838;
    margin-top: 42px;
  }
  .input_title{
    color: #383838;
    font-size: 14px;
    letter-spacing: 1px;

  }
  .base_info_inputs{
    margin-top: 39px;
  }
  .inputSty{
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #C7C7C7;
    padding: 12px 15px;
  }
  .itemBox{
    margin-top: 7px;
    margin-bottom: 20px;
  }
  .inputSty>input{
    height: 19px;
    width: 100%;
  }
.register-select, .phone-text {
  float: left;
  display: block;
}

.register-select {
  width: 19.6%;
  cursor: pointer;
  position: relative;
  text-align: center;
  height: 100%;
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
.register-select > span {

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

}
.phone-text {
  width: 74%;
  line-height: 43px;
  height: 43px;
  margin-left: 13px;
}
  .register-phone{
    border: 1px solid #C7C7C7;
    height: 43px;


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
.home-footer{
  bottom: auto!important;
   left: auto!important;
}
  .form_btn{
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    width: 100%;
    background-color: #383838;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 6px;
    border-radius: 2px;
    cursor: pointer;
  }
  .redLine{
    border-color: #E73140;
  }
</style>
