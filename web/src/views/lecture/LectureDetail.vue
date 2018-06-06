<template>
<div>
  <div class="breadcrumb" v-if="fromPathStatus==='normalPath'">
    <span class="linksty link"@click="gohome">开讲</span>
    <i class="el-icon-arrow-right linksty"></i>
    <span class="linksty link" @click="goBack">{{pathName}}</span>
    <i class="el-icon-arrow-right linksty"></i>
    <span class="linksty currentPage">{{itemObj.title}}</span>
  </div>
  <div v-else  class="breadcrumb">
    <!--<i class="el-icon-arrow-right linksty"></i>-->
    <span class="linksty link" @click="goBack">我的开讲</span>
    <i class="el-icon-arrow-right linksty"></i>
    <span class="linksty currentPage">{{itemObj.title}}</span>
  </div>
  <div class="box-top">
   <div class="player" v-if="movieFlag">
     <video-player  class="video-player vjs-custom-skin controlVideo"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
     >

     </video-player>
     <img v-if="voiceFlag" class="voice" src="/static/images/public/video.png" alt="">
   </div>
  </div>
  <div class="box-title">
    <div class="box-title-content">
      <p class="title0">
        <img src="/static/images/public/tag1.svg" alt="" width="10px" height="12px" style="position: relative;top: 1px;">
        <span class="title-info">{{itemObj.author}} | {{itemObj.short_introduce}}</span>
      </p>
      <p class="title1"><span >{{itemObj.title}}</span></p>
      <p>
        <span class="title2">{{itemObj.describe}}</span>
        <img :src="itemObj.pic" alt="" width="180px"height="135px">
      </p>
      <!--<div class="title3">
        <span style="position: relative;top:-10px">分享：</span>
        <p class="title3_img1"><img  src="/static/images/public/blog_hover.svg" alt="" width="23px"height="18px"></p>
        <p class="title3_img2"> <img  src="/static/images/public/friends_hover.svg" alt="" width="23px"height="18px"></p>
      </div>-->
    </div>
  </div>
  <div class="box-content">
   <!-- -->
    <div class="box-content-left">
      <div class="left-title">
        <img class="box-content-image" :src="itemObj.author_logo" alt="">
        <div class="left-title-content">
          <p class="author-top">讲者介绍</p>
          <p class="authorName">
            <span>{{itemObj.author}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{itemObj.short_introduce}}</span> <br><br>
            <span>{{itemObj.introduce}}</span>
          </p>
          <!--<p class="author-bottom" >
            2011年本科毕业于北京大学，2015年在德克萨斯大学西南医学中心获得博士学位，因突出的学术成就，博士毕业后直接被聘为助理教授。目前担任西南医学中心的肾癌卓越研究专门项目。
          </p>-->
        </div>
      </div>
      <div class="left-middle">
        <p class="info-title">简 介</p>
        <p class="line-Down">——</p>
        <!--<p class="small-title">为什么你需要了解CAR-T现状与未来</p>
        <p class="answer">
          细胞免疫治疗的初衷是采用患者自己的免疫细胞杀死该患者体内的肿瘤细胞，这是个非常诱人的想法。随后科学家们将这一设想得以实现，并成功治疗了终末期血液系统恶性肿瘤患者。
        </p>
        <p class="answer">
          最近几个月在这一设想实现的过程中，一种被称作CAR-T的免疫治疗方法发生了几件令人震惊的事件。
        </p>
        <p class="answer">
          最初由该领域的权威Juno Therapeutics公司宣布称，在临床试验过程中，曾经有4名患者因该治疗方法导致死亡。就在本周，一家一直以来致力于CAR-T的免疫治疗商业化的制药公司—诺华制药公司，宣布裁员120人，该团队一直在研发细胞及基因治疗。虽然诺华公司宣称，它们的团队仍然致力于CAR-T的免疫治疗的研发。然而，业内人士认为，诺华的此种举措实属为缓慢的撤退。与此同时，公司竞争将会给CAR-T市场带来极为严峻的挑战，他们试图提高肿瘤患者个体化治疗的比例，并扩大CAR-T的适用瘤种。他们还将CAR-T的应用扩大到实体瘤的研究中，不仅仅是血液系统的恶性肿瘤。这样可以扩大CAR-T的市场范围。然而在实验性治疗过程中发现这样可能导致患者昏迷，甚至是脑疝。
        </p>-->
        <div v-html="itemObj.content">
        </div>
        <div class="tag-text">
          <span v-for="(item,index) in itemObj.lottery_tag_name">{{item}}</span>

        </div>
      </div>
      <!--<div class="left-bottom">
        <div>
          <p class="p1"> <embed src="/static/images/public/addTalk.svg" type="image/svg+xml"  style="width: 16px;height: 16px"/> <span>参与讨论</span></p>
          <div class="inputBox">
            <textArea placeholder="欢迎参与讨论…" cols="2" rows="10"></textArea>
            <div class="submitBox">
              <p v-if="islogin">hi, {{userName}}}</p>
              <p v-else>
                <router-link :to="{name:'Home'}" > <span style="color: #669934">登录</span></router-link>
                <span style="color:#615e5d">后即可参与讨论</span>
              </p>
              <p>提交</p>
            </div>
          </div>
          <div class="comment">
            <p><embed src="/static/images/public/talk.svg" type="image/svg+xml"  style="width: 16px;height: 16px"/> <span>评论</span></p>
          </div>
        </div>
        <div class="talkList">
          <div>
            <div class="talkTitle">
              <p>猪毛处在你身上</p>
              <p>2018-3-15</p>
            </div>
            <div class="talkContent">
              有点难懂，还希望有机会能喝作者当面交流这个话题。
            </div>
          </div>
        </div>
      </div>-->
    </div>
    <div class="box-content-right">

      <p class="box-content-right-title">专辑内还包括：</p>
      <ul>
        <li v-for="(item,index) in correlationList" @click="toLectureDetail(item)" style="cursor: pointer">
          <p><img :src="item.pic" alt="" width="140px"height="100"></p>
          <p>{{item.title}}</p>
          <p>{{item.author}}|{{item.short_introduce}} </p>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>

  </div>

</div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';
    export default {
      data(){
          return {
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
                src: "" //你的m3u8地址（必填）
              }],
              poster: "", //你的封面地址
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            islogin:false,
            userName:'',
            itemObj:{}, //当前数据对象
            pathName:'',
            fromPathStatus:'',
            lectrueId:"",
            voiceFlag:false,
            correlationList:[],
            movieFlag:false
          }
      },
      created:function(){
        var _t=this
        _t.lectrueId = _t.$route.params.id;
        _t.$get('/lottery/detail',{id:_t.lectrueId}).then(function (res) {
          if (res.status === 'success') {
            if(res.data.length===0){
              _t.$message.error('此请求无数据响应');
              _t.itemObj = {}
              _t.playerOptions.sources[0].src= ''
              _t.pathName = ''
              _t.fromPathStatus = ''
            }else {
              _t.itemObj = res.data
              _t.playerOptions.sources[0].src = _t.itemObj.movie
              if (_t.itemObj.movie_type === 'mp3') {
                _t.voiceFlag = true
              }else{
                _t.voiceFlag = false
              }
            }
            _t.movieFlag = true
            _t.getLotteryList(parseFloat(_t.lectrueId))
          } else {
            _t.$message.error(res.message || res.status || res);
          }
        }, function (err) {
          _t.$message.error((err&&err.data.message) || '网络错误，请稍后再试');
        })
      },
      methods: {
        onPlayerPlay(player) {
         // alert("play");
        },
        onPlayerPause(player){
         // alert("pause");
        },
        goBack:function () {
          var _t = this
          _t.$router.go(-1)
        },
        gohome:function () {
          var _t = this
          var storage = window.localStorage
          _t.fromPathStatus = storage.getItem('normalPath')
          if(_t.fromPathStatus==='normalPath'){ //正常进入
            _t.$router.go(-2)
          }else{
            _t.$router.go(-1)
          }

        },
        getLotteryList:function (itemID) { //获取相关专辑列表
          var _t = this
          _t.$get('/lottery').then(function (res) {

            if (res.status === 'success') {
              _t.correlationList = res.data
              for(var i =0;i<_t.correlationList.length;i++){

                if(_t.correlationList[i].id===itemID){
                  _t.correlationList.splice(i,1)
                  //console.log(_t.correlationList)
                }
              }
            } else {
              _t.$message.error(res.message || res.status || res);
            }
          }, function (err) {
            _t.$message.error((err&&err.data.message) || '网络错误，请稍后再试');
          })
        },
        toLectureDetail:function (item) {
          var _t = this
          _t.$router.push({name:'LectureDetails', params: {id: item.id}})
          _t.$router.go(0);
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
@import "../../assets/css/lecture/LectureDetail.css";

</style>
