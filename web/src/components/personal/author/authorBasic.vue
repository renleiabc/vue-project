<template>
  <div>
    <h1>基本信息</h1>
    <div class="author-basic">
      <div class="author-inf">
        <div class="personal-input">
          <div class="personal-edge">
         <span class="personal-span">
            真实姓名：
         </span>
            <div class="inputSty-text" :class="{redLine:checkSty}">
              <input type="text" placeholder="必填" maxlength="60" v-model="selfName" @blur="checkName">
            </div>
            <p style="margin-top: 5px">
              <span style="color:#E73140">{{inputName}}</span>
            </p>
          </div>
          <div class="personal-side">
         <span class="personal-span">
           笔名：
         </span>
            <div class="inputSty-text" :class="{redLine:checkPenNameSty}"
                 style="position: relative;padding-right: 40px">
              <input type="text" maxlength="60" v-model="penName" placeholder="必填" @blur="checkPenName">
              <img src="../../../assets/images/application/loading.svg" alt="" v-if="penLoading" class="penLoading1">
              <img src="../../../assets/images/application/correct.svg" alt="" v-if="penSuccess" class="penLoading">
            </div>
            <p v-if="checkPenNameSty" style="margin-top: 5px">
              <span style="color:#E73140">{{checkPenNameText}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
          <div class="personal-edge">
         <span class="personal-span">
            微信号：
         </span>
            <div class="inputSty-text" :class="{redLine:weixinSty}">
              <input type="text" v-model="weixinNum" maxlength="60" placeholder="微信是我们与您取得联系的重要方式之一"
                     @blur="weixinCheck">
            </div>
            <p v-if="weixinSty" style="margin-top: 5px">
              <span style="color:#E73140">{{weixinText}}</span>
            </p>
          </div>
          <div class="personal-side">
         <span class="personal-span">
           邮箱：
         </span>
            <div class="inputSty-text" :class="{redLine:mailSty}">
              <input type="text" v-model="email" placeholder="必填" @blur="checkMail">
            </div>
            <p v-if="mailSty" style="margin-top: 5px">
              <span style="color:#E73140">{{mailText}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
          <div class="personal-edge">
         <span class="personal-span">
           手机号：
         </span>
            <div class="inputSty-text" :class="{redLine:mailSty}">
              <input type="text" class="phone-text" placeholder="必填" v-model="phoneNum" @blur="checkPhone">
            </div>
            <p v-if="phoneNumSty" style="margin-top: 5px">
              <span style="color:#E73140">{{phoneNumText}}</span>
            </p>
          </div>
          <div class="personal-side">
         <span class="personal-span">
            最高学历：
         </span>
            <el-select v-model="edu" placeholder="必选" :class="{education:educationSty}" style="width: 100%"
                       @visible-change="checkEducation" @change="educationChange">
              <el-option
                v-for="item in education"
                :key="item.edu"
                :label="item.label"
                :value="item.edu">
              </el-option>
            </el-select>
            <p v-if="educationSty" style="margin-top: 5px">
              <span style="color:#E73140">{{educationText}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
          <div class="personal-edge">
         <span class="personal-span">
            所在学校或机构：
         </span>
            <div class="inputSty-text" :class="{redLine:schoolSty}">
              <input type="text" placeholder="必填" v-model="schoolName" maxlength="60" @blur="checkSchool">
            </div>
            <p v-if="schoolSty" style="margin-top: 5px">
              <span style="color:#E73140">{{schoolText}}</span>
            </p>
          </div>
          <div class="personal-side">
         <span class="personal-span">
            专业：
         </span>
            <div class="inputSty-text" :class="{redLine:professSty}">
              <input type="text" placeholder="必填" v-model="professText" maxlength="60" @blur="checkProfess">
            </div>
            <p v-if="professSty" style="margin-top: 5px">
              <span style="color:#E73140">{{professStyText}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
         <span class="personal-span">
            研究领域：
         </span>
          <div class="personal-mark">
            <el-select v-model="areaValue" multiple placeholder="必选" :class="{education:areaSty}"
                       @visible-change="checkArea" @change="areaChange">
              <el-option
                v-for="item in researchArea"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-if="areaSty" style="margin-top: 5px">
              <span style="color:#E73140">{{areaStyText}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
          <span class="personal-span">
              个人简介 :
          </span>
          <div style="margin-bottom: 5px;">
            <el-input
              type="textarea"
              v-model="selfInfo"
              placeholder="必填"
              :class="{selfInfoClass:selfInfoSty}"
              maxlength="200"
              @blur="checkSelfInfo"
            >
            </el-input>
          </div>
          <p v-if="selfInfoSty" style="margin-top: 5px">
            <span style="color:#E73140">{{selfInfoStyText}}</span>
          </p>
          <div class="personal-small">
            200个字符以内
          </div>
        </div>
        <div class="personal-introduce">
        <span class="personal-span">
             一句话介绍自己：
        </span>
          <div class="inputSty-text" :class="{redLine:introSmallSty}" style="margin-bottom:5px;">
            <input type="text" v-model="introSmall" maxlength="12" placeholder="必填" @blur="checkIntroSmall">
          </div>
          <p v-if="introSmallSty" style="margin-top: 5px">
            <span style="color:#E73140">{{introSmallStyText}}</span>
          </p>
          <span class="personal-small">
          不多于12个字符，如：专注抗衰领域的医学博士。
          </span>
        </div>
        <el-row class="personal-save">
          <el-button type="info" @click="submitFormInfo">保存修改</el-button>
        </el-row>
      </div>
      <div class="author-pic">
        <img :src="headPhoto" alt="头像" class="author-pic-img">
        <div class="author-modify" @click="uploadClick">修改头像</div>
        <div class="upload" v-if="upload">
          <div style="width:280px;height: 280px;margin-left: 7px;">
            <vue-cropper
              :width="300"
              :height="300"
              ref="cropper"
              :img="headPhoto"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vue-cropper>
          </div>
          <h4 class="upload-preview">预览截图</h4>
          <div class="show-preview"
               :style="{'width': previews.w + 'px', 'height': previews.h + 'px','overflow': 'hidden', 'margin': '0 auto'}">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
          <div class="author-btn">
            <div class="upload-btn">
              <label class="btn btn-lime" for="uploads">上传图片</label>
              <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
            </div>
            <div class="upload-btn">
              <input type="button" value="保存" class="btn btn-blue" @click="btnSave">
            </div>
            <div class="upload-btn">
              <input type="button" value="取消" class="btn btn-gray" @click="btnCancel">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'

  export default {
    name: "personal",
    data() {
      return {
        input: "",
        phone: "",//电话
        education1: "",//最高学历
        school: "",//学校
        major: "",//专业
        introduce: "",//介绍
        textareaLife: "",//个人简介
        selected: '',//研究领域
        index: "1-1",
        keyPath: "1-1",
        upload: false,
        headPhoto: '',
        value5: [1, 2, 3],
        value11: [],
        inputVisible: false,
        inputValue: '',
        placeholder: '研究领域..',
        students: [1],
        student_obj: [],
        option: {
          size: 1,
          full: true,//输出原图比例截图 props名full
          outputType: 'jpeg || png',
          autoCrop: true,
          canMove: true,
          canMoveBox: true,
          original: false,
          autoCropWidth: 100,
          autoCropHeight: 100,
          fixedBox: false,
          original:true,
        },
        previews: {},
        selfName: '', //真实姓名
        penName: '', //笔名
        email: '', //邮箱
        phoneCode: [], //电话号码集合
        interCode: "+86",
        interPhone: false,
        phoneNum: '', //电话号码
        weixinNum: '',//微信号
        schoolName: '', //学校名称
        professText: '', //专业名称
        education: [{
          edu: 1,
          label: '本科'
        }, {
          edu: 2,
          label: '硕士研究生'
        }, {
          edu: 3,
          label: '博士研究生'
        }],
        edu: 0, //最高学历
        areaValue: [], //研究领域集合
        selfInfo: '', //个人简介
        introSmall: '',//一句话简介
        //校验输入框
        checkSty: false, //真实姓名
        inputName: '',
        //笔名
        checkPenNameSty: false,
        checkPenNameText: '',
        penLoading: false,
        penSuccess: false,
        //邮箱
        mailSty: false,
        mailText: '',
        //手机号
        phoneNumSty: false,
        phoneNumText: '',
        //学校
        schoolSty: false,
        schoolText: '',
        //学历
        educationSty: false,
        educationText: '',
        //微信号
        weixinSty: false,
        weixinText: '',
        //专业
        professSty: false,
        professStyText: '',
        //研究领域
        areaSty: false,
        areaStyText: '',
        //个人简介
        selfInfoSty: false,
        selfInfoStyText: '',
        //一句话简介
        introSmallSty: false,
        introSmallStyText: ''
      }
    },
    methods: {
      //校验姓名
      checkName: function () {
        var _t = this
        _t.checkSty = false //初始化校验样式
        _t.inputName = ''//初始化真实姓名错误信息
        _t.penName = ''//初始化笔名
        var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
        if (_t.selfName) {
          if (_t.selfName.length<2) {
            _t.checkSty = true
            _t.inputName = '请输入正确的内容'
            return;
          } else {
            //如果通过真实姓名校验
            _t.penName = _t.selfName
            _t.checkPenName()
          }
        } else {//为空提示
          _t.checkSty = true
          _t.inputName = '必填'
          return;
        }
      },
      //校验笔名
      checkPenName: function () {
        var _t = this
        //初始化昵称校验字段
        _t.checkPenNameSty = false
        _t.checkPenNameText = ''
        _t.penLoading = false
        _t.penSuccess = false
        var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
        if (_t.penName) {
          if (_t.penName.length<2) {
            _t.checkPenNameSty = true
            _t.checkPenNameText = '请输入正确的内容'
            return;
          }
        } else {
          _t.checkPenNameSty = true
          _t.checkPenNameText = '必填'
          return;
        }
        _t.penLoading = true
        _t.$post('/user/checkpseudonym', {
          pseudonym: _t.penName
        }).then(function (res) {
          if (res.status === "success" && res.code === 200) {
            _t.penLoading = false
            _t.penSuccess = true
          } else {
            _t.penLoading = false
            _t.penSuccess = false
            _t.checkPenNameSty = true
            _t.checkPenNameText = res.message
          }
        }, function (err) {
          _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
        })
      },
      //校验微信
      weixinCheck: function () {
        var _t = this
        _t.weixinSty = false
        _t.weixinText = ''
        if (_t.weixinNum) {
          var reg = /^[a-zA-Z\d]{3,}$/
          if (!reg.test(_t.weixinNum)) {
            _t.weixinSty = true
            _t.weixinText = '请输入正确的内容'
            return;
          }
        }
        /*else{
                    _t.weixinSty=true
                    _t.weixinText='必填'
                    return;
                  }*/
      },
      //校验邮箱
      checkMail: function () {
        var _t = this
        _t.mailSty = false
        _t.mailText = ''
        if (_t.email) {
          var mailRes = mailbox(_t.email)
          if (!mailRes) {
            _t.mailSty = true
            _t.mailText = '请输入正确的内容'
            return;
          }
        } else {
          _t.mailSty = true
          _t.mailText = '必填'
          return;
        }
      },
      //校验电话
      checkPhone: function () {
        var _t = this
        _t.phoneNumSty = false
        _t.phoneNumText = ''
        if (_t.phoneNum) {
          var phoneRes = mobileNumber(_t.phoneNum)
          if (!phoneRes) {
            _t.phoneNumSty = true
            _t.phoneNumText = '请输入正确的内容'
            return;
          }
        } else {
          _t.phoneNumSty = true
          _t.phoneNumText = '必填'
          return;
        }
      },
      //校验最高学历
      checkEducation: function (value) {
        var _t = this
        _t.educationSty = false
        _t.educationText = ''
        if (!value) { //下拉框隐藏
          if (!_t.edu) {
            _t.educationSty = true
            _t.educationText = '必填'
            return;
          }
        }
      },
      //校验学校
      checkSchool: function () {
        var _t = this
        _t.schoolSty = false
        _t.schoolText = ''
        if (_t.schoolName) {
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          if (_t.schoolName.length<2) {
            _t.schoolSty = true
            _t.schoolText = '请输入正确的内容'
            return;
          }
        } else {
          _t.schoolSty = true
          _t.schoolText = '必填'
          return;
        }
      },
      //检验专业
      checkProfess: function () {
        var _t = this
        _t.professSty = false
        _t.professStyText = ''
        if (_t.professText) {
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          if (_t.professText.length<2) {
            _t.professSty = true
            _t.professStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.professSty = true
          _t.professStyText = '必填'
          return;
        }
      },
      //检验领域
      checkArea: function (value) {
        var _t = this
        _t.areaSty = false
        _t.areaStyText = ''
        if (!value) { //下拉框隐藏
          if (!_t.areaValue.length) {
            _t.areaSty = true
            _t.areaStyText = '必填'
            return;
          }
        }
      },
      areaChange: function (value) {
        var _t = this
        _t.areaSty = false
        _t.areaStyText = ''
        _t.areaValue = value
        console.log(value);
        if (!_t.areaValue.length) {
          _t.areaSty = true
          _t.areaStyText = '必填'
          return;
        }
      },
      //个人简介检验
      checkSelfInfo: function () {
        var _t = this
        _t.selfInfoSty = false
        _t.selfInfoStyText = ''
        if (_t.selfInfo) {
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          if (_t.selfInfo.length<2) {
            _t.selfInfoSty = true
            _t.selfInfoStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.selfInfoSty = true
          _t.selfInfoStyText = '必填'
          return;
        }
      },
      //一句话介绍检验
      checkIntroSmall: function () {
        var _t = this
        _t.introSmallSty = false
        _t.introSmallStyText = ''
        if (_t.introSmall) {
          var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
          if (_t.introSmall.length<2) {
            _t.introSmallSty = true
            _t.introSmallStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.introSmallSty = true
          _t.introSmallStyText = '必填'
          return;
        }
      },
      educationChange: function (value) {
        var _t = this
        _t.educationSty = false
        _t.educationText = ''
        _t.edu = value
        if (!_t.edu) {
          _t.educationSty = true
          _t.educationText = '必填'
          return;
        }
      },
      submitFormInfo: function () { //提交申请作者信息
        var _t = this
        var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
        //校验输入框
        _t.checkSty = false //真实姓名
        _t.inputName = ''
        //笔名
        _t.checkPenNameSty = false
        _t.checkPenNameText = ''
        //邮箱
        _t.mailSty = false
        _t.mailText = ''
        //手机号
        _t.phoneNumSty = false
        _t.phoneNumText = ''
        //学校
        _t.schoolSty = false
        _t.schoolText = ''
        //学历
        _t.educationSty = false
        _t.educationText = ''
        //微信号
        _t.weixinSty = false
        _t.weixinText = ''
        //专业
        _t.professSty = false
        _t.professStyText = ''
        //研究领域
        _t.areaSty = false
        _t.areaStyText = ''
        //个人简介
        _t.selfInfoSty = false
        _t.selfInfoStyText = ''
        //一句话简介
        _t.introSmallSty = false
        _t.introSmallStyText = ''
        //校验姓名
        if (_t.selfName) {
          if (_t.selfName.length<2) {
            _t.checkSty = true
            _t.inputName = '请输入正确的内容'
            return;
          }
        } else {
          _t.checkSty = true
          _t.inputName = '必填'
          return;
        }
        //检验笔名
        if (_t.penName) {
          if (_t.penName.length<2) {
            _t.checkPenNameSty = true
            _t.checkPenNameText = '请输入正确的内容'
            return;
          }
        } else {
          _t.checkPenNameSty = true
          _t.checkPenNameText = '必填'
          return;
        }
        //校验邮箱
        if (_t.email) {
          var mailRes = mailbox(_t.email)
          if (!mailRes) {
            _t.mailSty = true
            _t.mailText = '请输入正确的内容'
            return;
          }
        } else {
          _t.mailSty = true
          _t.mailText = '必填'
          return;
        }
        //校验电话
        if (_t.phoneNum) {
          var phoneRes = mobileNumber(_t.phoneNum)
          if (!phoneRes) {
            _t.phoneNumSty = true
            _t.phoneNumText = '请输入正确的内容'
            return;
          }
        } else {
          _t.phoneNumSty = true
          _t.phoneNumText = '必填'
          return;
        }
        //校验学校
        if (_t.schoolName) {

          if (_t.schoolName.length<2) {
            _t.schoolSty = true
            _t.schoolText = '请输入正确的内容'
            return;
          }
        } else {
          _t.schoolSty = true
          _t.schoolText = '必填'
          return;
        }
        //校验微信
        if (_t.weixinNum) {
          var reg1 = /^[a-zA-Z\d]{3,}$/
          if (!reg1.test(_t.weixinNum)) {
            _t.weixinSty = true
            _t.weixinText = '请输入正确的内容'
            return;
          }
        }
        /*else{
                    _t.weixinSty=true
                    _t.weixinText='必填'
                    return;
                  }*/
        //校验最高学历
        if (!_t.edu) {
          _t.educationSty = true
          _t.educationText = '必填'
          return;
        }
        //检验专业
        if (_t.professText) {
          if (_t.professText.length<2) {
            _t.professSty = true
            _t.professStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.professSty = true
          _t.professStyText = '必填'
          return;
        }
        //检验领域
        if (!_t.areaValue.length) {
          _t.areaSty = true
          _t.areaStyText = '必填'
          return;
        }
        //个人简介检验
        if (_t.selfInfo) {
          if (_t.selfInfo.length<2) {
            _t.selfInfoSty = true
            _t.selfInfoStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.selfInfoSty = true
          _t.selfInfoStyText = '必填'
          return;
        }
        //一句话介绍检验
        if (_t.introSmall) {
          if (_t.introSmall.length<2) {
            _t.introSmallSty = true
            _t.introSmallStyText = '请输入正确的内容'
            return;
          }
        } else {
          _t.introSmallSty = true
          _t.introSmallStyText = '必填'
          return;
        }
        var photo = ""
        if(_t.headPhoto == '/static/images/icon/author.svg'){
          photo= "";
        }else{
          photo= _t.headPhoto;
        }
        var params = {
          photo:photo,
          real_name:_t.selfName, //真实姓名
          pseudonym:_t.penName,//笔名
          email:_t.email,//邮箱
          phone:_t.phoneNum,//电话号码
          wechat:_t.weixinNum,//微信号
          institution:_t.schoolName,//学校名称
          education:_t.edu,//最高学历
          specialty:_t.professText, //专业名称
          industry:_t.areaValue.join(),//研究领域集合
          introduction:_t.selfInfo,//个人简介
          introduce:_t.introSmall//一句话简介
        };
        console.log(JSON.stringify(params));
        _t.$post('/user/basic/edit',params).then(function (res) {
          console.log(JSON.stringify(res));
          if(res.status === "success" && res.code === 200){

            _t.$message({
              showClose: true,
              message: '信息修改成功',
              type: 'success'
            });
          }else{
            _t.$message.error(res.message);
          }
        },function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      realTime(data) {
        console.log(JSON.stringify(data));
        this.previews = data;
      },
      imgLoad(data) {
        console.log(data);
      },
      btnSave() {//上传图片保存
        this.$refs.cropper.getCropData(((data) => {
          this.headPhoto = data;
        }));
        this.upload = false;
      },
      btnCancel() {//取消上传图片
        this.$refs.cropper.clearCrop();
        this.upload = false;
      },
      uploadImg(e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(jpg|jpeg|png)$/.test(e.target.value)) {
          alert('图片类型必须是jpeg,jpg,png中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.headPhoto = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      uploadClick() {
        this.upload = true;
      },
      newTagsClose(tag) {
        console.log(tag);
        var index = 0;
        var newTags = this.newTags;
        for (var i = 0; i < newTags.length; i++) {
          if (newTags[i].name == tag) {
            index = i;
          }
        }
        console.log(index)
        newTags.splice(index, 1);
      },
      tagClose(tag) {
        console.log(tag);
        var index = 0;
        var tags = this.tags;
        for (var i = 0; i < tags.length; i++) {
          if (tags[i].name == tag) {
            index = i;
          }
        }
        tags.splice(index, 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          var tag = {};
          tag.name = inputValue;
          tag.type = "info";
          this.newTags.push(tag);
          var hash = {};
          this.newTags = this.newTags.reduce(function (item, next) {
            hash[next.name] ? '' : hash[next.name] = true && item.push(next);
            return item
          }, []);
        }
        this.inputVisible = false;
        this.inputValue = '';
        var newTags = this.newTags;
      },
      tagsClick(tag) {
        var newTags = this.newTags;
        newTags.push(tag);
        var index = 0;
        var hash = {};
        this.newTags = newTags.reduce(function (item, next) {
          hash[next.name] ? '' : hash[next.name] = true && item.push(next);
          return item
        }, []);
      },
      getAuthorInf() {
        let that = this;
        this.$post("/user").then(function (res) {
          if (res.status === "success" && res.code === 200) {
            console.log(JSON.stringify(res));
            if (res.data.photo == "") {
              res.data.photo = "/static/images/icon/author.svg"
            }
            that.headPhoto = res.data.photo;//头像
            that.selfName = res.data.real_name;//真实姓名
            that.penName = res.data.pseudonym; //笔名
            that.email = res.data.author_email;//邮箱
            that.phoneNum = res.data.author_phone; //电话号码
            that.weixinNum = res.data.wechat;//微信号
            that.schoolName = res.data.institution; //学校名称
            that.professText = res.data.specialty;//专业名称
            that.edu = res.data.education;//学历
            if(res.data.industry == null || res.data.industry == ""){//研究领域
              that.areaValue = [];
            }else{
              let industry = res.data.industry.split(',');
              for(var i=0; i< industry.length;i++){
                that.areaValue.push(parseInt(industry[i]));
              }
            }
            that.selfInfo = res.data.introduction;//简介
            that.introSmall = res.data.introduce;//	一句话介绍
          } else {
            that.$message.error(res.message);
          }
        }, function (err) {
          that.$message.error((err && err.data.message) || '网络错误，请稍后再试');
        })
      }
    },
    mounted: function () {
      /*var student_filter = function (obj) {
        return this.students.indexOf(obj.student_id) > -1
      }
      this.student_obj = this.options.filter(student_filter, this);
      console.log(JSON.stringify(this.student_obj));*/
    },
    created() {
      this.getAuthorInf();//调用基本信息
      this.$store.dispatch('getResearchField');//调用研究领域
    },
    components: {VueCropper},
    computed: {
      researchArea() {
        return this.$store.getters.researchArea;
      },
    }
  }
</script>

<style scoped>

  @import "../../../assets/css/personal/author/personalBasic.css";
</style>
