<template>
  <div class="member">
    <h1>基本信息</h1>
    <div class="author-basic">
      <div class="author-inf">
        <div class="personal-input">
          <div class="personal-mark">
       <span class="personal-span">
         昵称：
       </span>
            <div class="inputSty-text" :class="{redLine:checkSty}">
              <input type="text" placeholder="必填" maxlength="60" v-model="selfName" @blur="checkName">
            </div>
            <p style="margin-top: 5px">
              <span style="color:#E73140">{{inputName}}</span>
            </p>
          </div>
        </div>
        <div class="personal-input">
          <span class="personal-span">关注领域：</span>
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
          <el-row class="activity-reprot">
            <el-button type="info" @click="submitFormInfo">保存修改</el-button>
          </el-row>
        </div>
      </div>
      <div class="author-pic" style="height: 700px;">
        <img :src="headPhoto" alt="头像" class="author-pic-img">
        <div class="author-modify" @click="uploadClick">修改头像</div>
        <div class="upload" v-if="upload">
          <div style="width:280px;height: 280px;margin-left: 7px;">
            <vue-cropper
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
    name: "member-basic",
    data() {
      return {
        input: "asdad",
        word: "dadads",
        checkSty: false,
        inputName: "",
        selfName: "",
        areaSty: false,
        upload:false,
        placeholder: '研究领域..',
        headPhoto: '/static/images/icon/investor.svg',
        areaValue: [],
        option: {
          size: 1,
          full: true,//输出原图比例截图 props名full
          outputType: 'jpeg || png',
          autoCrop: true,
          canMove: true,
          canMoveBox: true,
          autoCropWidth: 100,
          autoCropHeight: 100,
          fixedBox: false,
          original:true,
        },
        previews: {},
        inputVisible: false,
        inputValue: '',
        newTags: [],
      }
    },
    methods: {
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
            _t.penName = _t.selfName;
          }
        } else {//为空提示
          _t.checkSty = true
          _t.inputName = '必填'
          return;
        }
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
            data = e.target.result;
          }
          if (num === 1) {
            this.headPhoto = data
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
      submitFormInfo: function () { //提交申请作者信息
        var _t = this
        var reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/
        //校验输入框
        _t.checkSty = false //真实姓名
        _t.inputName = ''
        //研究领域
        _t.areaSty = false
        _t.areaStyText = ''
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

        //检验领域
        if (!_t.areaValue.length) {
          _t.areaSty = true
          _t.areaStyText = '必填'
          return;
        }
        console.log(_t.headPhoto);
        var photo = "";
        if(_t.headPhoto == '/static/images/icon/investor.svg'){
          photo= "";
        }else{
          photo= _t.headPhoto;
        }
        var params = {
          photo:photo,
          nickname:_t.selfName, //真实姓名
          industry:_t.areaValue.join(),//研究领域集合
        };
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
      getMemberInf(){
        let that = this;
        this.$post("/user").then(function (res) {
          if (res.status === "success" && res.code === 200) {
            console.log(JSON.stringify(res));
            console.log(res.data.photo);
            if (res.data.photo == "") {
              res.data.photo = "/static/images/icon/investor.svg"
            }
            that.headPhoto = res.data.photo;//头像
            //名称
            if(res.data.nickname){
              that.selfName = res.data.nickname;
            } else if(res.data.nickname == null && res.data.nickname == ""){
              that.selfName = res.data.phone;
            }else if(res.data.phone == null && res.data.phone == ""){
              that.selfName = res.data.emali;
            }else if(res.data.emali == null && res.data.emali == ""){
              that.selfName = res.data.wechat;
            }
            if(res.data.industry == null || res.data.industry == ""){
              that.areaValue = [];
            }else{
              let industry = res.data.industry.split(',');
              for(var i=0; i< industry.length;i++){
                that.areaValue.push(parseInt(industry[i]));
              }
            }

            console.log(that.areaValue);
          } else {
            that.$message.error(res.message);
          }
        }, function (err) {
          that.$message.error((err && err.data.message) || '网络错误，请稍后再试');
        })
      }
    },
    created() {
      this.getMemberInf();
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
  @import "../../../assets/css/personal/member/memberBasic.css";
</style>
