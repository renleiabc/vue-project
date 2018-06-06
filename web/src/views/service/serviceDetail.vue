<template>
    <div>
      <div class="breadcrumb">
        <span class="linksty link" @click="goBack">{{formPathName}}</span>
        <i class="el-icon-arrow-right linksty"></i>
        <span class="linksty currentPage">{{detailData.title}}</span>
      </div>
      <div class="box-top-title">
        <div class="box-top-title-right">
          <p class="box-top-title-right-name">{{detailData.title}}</p>
          <p class="box-top-title-right-describe">
            正在寻求：{{detailData.project_seeking_name}}
          </p>
        </div>
        <div class="box-top-title-left">
          <ul>
            <li>
              <span  class="title-name">项 目 领 域：</span>
              <span>{{detailData.domain_name?detailData.domain_name:''}}</span>
            </li>
            <li>
              <span  class="title-name">产 品 类 型：</span>
              <span>{{detailData.product_type_name?detailData.product_type_name:''}}</span>
            </li>
            <li>
              <span  class="title-name">所 属 阶 段：</span>
              <span>{{detailData.project_stage_name?detailData.project_stage_name:''}}</span>
            </li>
            <li>
              <span  class="title-name">科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span>
              <span>{{detailData.specialty_name?detailData.specialty_name:''}}</span>
            </li>
            <li>
              <span  class="title-name">适   应   症 ：</span>
              <span>{{detailData.immune_disease_name?detailData.immune_disease_name:''}}</span>
            </li>
          </ul>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="box-top">
        <div class="player">
          <video-player  class="video-player vjs-custom-skin controlVideo"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
                         @play="onPlayerPlay($event)"
                         @pause="onPlayerPause($event)"
          >
          </video-player>
          <div class="company_info">
            <p class="info1">公司信息</p>
            <p class="info2">{{detailData.company_name}}</p>
            <p class="info3">{{detailData.company_website}}</p>
            <p class="info4">{{detailData.city}}，{{detailData.country}}</p>
            <p class="info5">
              <img :src="detailData.pic" alt="" width="178px" height="133px">

            </p>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
      <!--<div class="project-intro ">
        <div class="project-intro-box">
          <div class="project-intro-box-left">
            <p class="project-intro-box-left-title">{{detailData.title}}</p>
            <p class="project-intro-box-left-context">{{detailData.describe}}</p>
          </div>
          <div class="project-intro-box-right">
            <img :src="detailData.pic" alt="" width="180px" height="135px">
          </div>
          <div style="clear: both"></div>
        </div>
      </div>-->
      <div class="tableInfo">
        <p >项目简介</p>
        <div class="project-info">
          <span>
            {{detailData.describe}}
          </span>
          <br>
          <br>
          <span>{{detailData.pain_point}}</span>
        </div>
        <div class="tableInfo-download">
          <p><span @click="downLoadFile(detailData.file)"> <i class="el-icon-download"></i> 下载项目文档</span></p>
          <p> <span @click="downLoadBP(detailData.bp)"> <i class="el-icon-download"></i> 下载BP资料</span></p>

        </div>
        <div style="clear: both"></div>
        <!--<div class="tableInfo-left">
          <p>领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域: <span class="tableInfo-answer"> {{detailData.domain_name_add}}</span></p>
          <p>成立年份: <span class="tableInfo-answer">{{dateFtt('yyyy年',new Date(detailData.establish_at))}}</span></p>
        </div>
        <div class="tableInfo-right">
          <p>关&nbsp;&nbsp;&nbsp;键&nbsp;&nbsp;&nbsp;词: <span class="tableInfo-answer">{{detailData.keywords_name_add}}</span></p>
          <p>联 系 信 息：<span class="tableInfo-answer">{{detailData.contact}}</span></p>
        </div>
        <div style="clear: both"></div>
        <div class="tableInfo-download">
          <span @click="downLoadFile(detailData.file)"> <i class="el-icon-download"></i> 下载项目文档</span>
          <span @click="downLoadBP(detailData.bp)"> <i class="el-icon-download"></i> 下载BP资料</span>
        </div>-->
      </div>
      <div class="bottom_bg">
      <div class="bottom_bg_left">
        <p>
          <span class="bottom_title">现阶段估值</span> <br>
          <span class="bottom_content"> {{detailData.current_valuation}}</span>
        </p>
      </div>
      <div class="bottom_bg_right">
        <p>
          <span class="bottom_title">融资需求</span><br>
          <span class="bottom_content">{{detailData.funding_needs}}</span>
        </p>
      </div>
        <div style="clear:both;"></div>
      </div>
      <div class="serviceDetail-bottom">
        <p>核心成员</p>
        <div class="serviceDetail-scrollPic"   v-if="isHasSimilarProjectData">
          <div id="serviceDetail-scrollPic-box">
              <div class="content"   v-for="(item,index) in similarProjectDataObj.similarProjectData" >
                <div class="content-carousel" >
                  <p class="witer_name">
                    {{item.name}}
                  </p>
                  <p class="witer_info">
                    {{item.company_position}},{{item.highest_education}}
                  </p>
                  <p class="witer_info_content">
                    {{item.personal_background}}
                  </p>
                </div>
              </div>
              <div style="clear: both"></div>
          </div>
          <p class="arrow_left " >
            <img :class="{'bg_arrow':default0,'bg_arrowActive':arrowActive}"  @mouseenter="leftArrowEnter"  @mouseleave="leftArrowLeave"  :src="leftArrow" alt="" class="left-arrow"  id=LeftArr>
            <img :class="{'bg_arrow':default1,'bg_arrowActive':arrowActive1}"  @mouseenter="rightArrowEnter" @mouseleave="rightArrowLeave" :src="rightArrow" alt="" class="right-arrow" id="RightArr">
          </p>
          <div style="clear: both"></div>
        </div>

        <div class="serviceDetail-scrollPic_right">
          <p class="tel_person">联络人</p>
           <p class="tel_name">{{detailData.contact}} </p>
          <p  class="tel_type"><span>电    话：</span>{{detailData.phone}}</p>
          <p class="tel_type"><span>邮    箱：</span>{{detailData.email}}</p>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
</template>
<script>
  import { videoPlayer } from 'vue-video-player';
    export default {
        data(){
          return{
            playerOptions: {
              autoplay: false, //如果true,浏览器准备好时开始回放。
              controls:true,
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                type: "video/mp4",
                src: '' //你的m3u8地址（必填）
              }],
              /*poster: "http://covteam.u.qiniudn.com/poster.png", //你的封面地址*/
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            leftArrow:'/static/images/public/left-normal.svg',
            rightArrow:'/static/images/public/right-normal.svg',
            default0:true,
            arrowActive:false,
            default1:true,
            arrowActive1:false,
            detailData:{},
            domain_name:'',
            keywords_name:'',
            keyWordsJoin:'',
            similarProjectDataObj:{
              similarProjectData:[]
            },

            formPathName:'海外路演项目',
            seeking:'',
            isHasSimilarProjectData: false

          }
        },
      created:function(){
        var _t = this
        var storage = window.localStorage
        _t.detailId = _t.$route.params.id
        if(storage.getItem('formServicePath')==='normalPath'){
          _t.formPathName = '海外路演项目'
        }else{
          _t.formPathName = '首页'
        }
        _t.toSeversDetail(_t.detailId)
      },
      methods: {
        goBack:function(){
          this.$router.go(-1)
        },
        onPlayerPlay(player) {
         // alert("play");
        },
        onPlayerPause(player){
          //alert("pause");
        },
        leftArrowEnter:function () {
          this.leftArrow = '/static/images/public/left-hover.svg'
          this.arrowActive = true;
          this.default = false
        },
        leftArrowLeave:function () {
          this.leftArrow = '/static/images/public/left-normal.svg'
          this.arrowActive = false;
          this.default = true
        },
        rightArrowEnter:function () {
          this.rightArrow = '/static/images/public/right-hover.svg'
          this.arrowActive1 = true;
          this.default1 = false
        },
        rightArrowLeave:function () {
          this.rightArrow = '/static/images/public/right-normal.svg'
          this.arrowActive1 = false;
          this.default1 = true
        },
        downLoadFile:function (url) {
          window.open(url);
        },
        downLoadBP:function (url) {
          window.open(url)
        },
        toSeversDetail:function (itemID) {
          var _t = this
          _t.$post('/project/detail',{
            id:itemID
          }).then(function (res) {
            if(res.code === 200){
              _t.detailData = res.data
              _t.playerOptions.sources[0].src = _t.detailData.movie
              var project_seeking = ''
              var project_seeking_arr = []
              for(var key in _t.detailData.project_seeking){
                var obj = {}
                obj.id = key
                obj.name =  _t.detailData.project_seeking[key]
                project_seeking_arr.push(obj)
              }
              for(var i = 0;i<project_seeking_arr.length;i++){
                if(i===project_seeking_arr.length-1){
                  project_seeking+=project_seeking_arr[i].name
                }else{
                  project_seeking+=project_seeking_arr[i].name+','
                }
              }
              _t.seeking = project_seeking
              _t.$set(_t.similarProjectDataObj,'similarProjectData',_t.detailData.core_team)
              _t.isHasSimilarProjectData = true
              if(_t.isHasSimilarProjectData){
                setTimeout(function () {
                  _t.scollPicCom()
                },10)
              }
            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },

        scollPicCom:function () {
          var scrollPic_02 = new ScrollPic ()
          scrollPic_02.scrollContId   = "serviceDetail-scrollPic-box"; //内容容器ID
          scrollPic_02.arrLeftId      = "LeftArr";//左箭头ID
          scrollPic_02.arrRightId     = "RightArr"; //右箭头ID
          scrollPic_02.frameWidth     =679 ;//显示框宽度
          scrollPic_02.pageWidth      = 679; //翻页宽度 dcument.getElementsByClassName('content-carousel')[0].clienWidth
          scrollPic_02.speed          = 10; //移动速度(单位毫秒，越小越快)
          scrollPic_02.space          = 10; //每次移动像素(单位px，越大越快)
          scrollPic_02.autoPlay       = false; //自动播放
          scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)
          scrollPic_02.circularly     = false;
          scrollPic_02.initialize(); //初始化
        }
      },
      components: {
        videoPlayer
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      }
    }
</script>

<style scoped>
@import "../../assets/css/roadshow/serviceDetail.css";
[v-cloak] {
  display: none;
}
</style>
