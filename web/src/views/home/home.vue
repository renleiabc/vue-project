<template>
  <div>
    <div class="carousel-back">
      <div class="main" style="background:transparent;">
        <div class="home-left">
          <div class="home-carousel">
            <el-carousel height="400px" :interval="3000">
              <el-carousel-item v-for="item in carousel" :key="item.id">
                <a :href="item.url">
                  <img :src="item.img_url" alt="">
                </a>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="home-right">
          <div class="home-report">
            <div class="home-report-top">
              <div class="report-top-left">
                <h2 class="home-web">[&nbsp;网络路演&nbsp;]</h2>
                <h1>每周三上午9：00</h1>
                <router-link :to="{name:'Roadshow'}" tag='a'>
                  申请参加
                </router-link>
              </div>
              <div class="report-top-right">
                <img src="/static/images/icon/pic.png" alt="图片">
              </div>
            </div>
            <div class="home-report-bottom">
              <h1 class="home-report-h1">[&nbsp;海外项目&nbsp;]</h1>
              <el-carousel height="75px" arrow="never">
                <el-carousel-item v-for="(item,index) in recommend" :key="item.describe">
                  <h1 @click="recommendClick(index)">{{ item.title }}</h1>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="home-free">
            <router-link :to="{name:'LectureLists'}" tag='a'>
              <img src="/static/images/icon/read.svg" alt="开讲">
              <h1 class="free-text">开讲</h1>
            </router-link>
            <router-link :to="{name:'Research'}" tag='a'>
              <img src="/static/images/icon/research.svg" alt="行研">
              <h1 class="free-text">行研</h1>
            </router-link>
            <router-link :to="{name:'MeiboVIP'}" tag='a'>
              <img src="/static/images/icon/server.svg" alt="投资服务">
              <h1 class="free-text">投资服务</h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="home-top">
        <div class="home-left">
          <div class="home-place">
            <div class="home-options" ref="homeOptions">
              <div>
                <div class="place-middle">
                  <a href="javascript:;" v-for="(tab,index) in homeTabs" @click="tabsSwitch(index)"
                     :class="{optionsActive:tab.isActive}" :key="tab.title">
                    <span>{{tab.sign}}</span>
                    <span>{{tab.title}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="options-content">
            <select-tabs :tabs="tagDate" @element="domValue($event)"></select-tabs>
          </div>
          <!--v-show="homeLoad"-->
          <div class="home-load" style="display: block" v-show="homeLoad">
            <div class="home-load-center" @click="enterNext">
              <h1>加载更多</h1>
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <!--v-show="homeFinish"-->
          <div class="home-finish" style="display: none" v-show="homeFinish">
            没有更多内容咯
          </div>
        </div>
        <div class="home-right">
          <div class="home-side">
            <div class="reading-add">
              <h1>现在加入</h1>
              <h2>投资人交流群</h2>
              <div class="reading-code">
                <img src="/static/images/public/code.jpg" alt="图片">
              </div>
              <h3>(扫码向客服提交入群申请)</h3>
              <div class="reading-side">
                <span>投 资 人 群</span>
                <span>+</span>
              </div>
              <div class="reading-side">
                <span>路演交流群</span>
                <span>+</span>
              </div>
              <div class="reading-side reading-side-bottom">
                <span>医健研究群 </span>
                <span>+</span>
              </div>
            </div>
            <div class="home-scroll">
              <h1>热门作者</h1>
              <happy-scroll resize hide-horizontal>
                <div class="home-wrapper" id="wrapper">
                  <div class="wrapper-side">
                    <div class="wrapper-box" v-for=" (item,index) in authorData" :key="index">
                      <div class="wrapper-top">
                        <img :src="item.pic" alt="人物" style="cursor: pointer" @click="toPersonalPage(item.authorId)">
                        <div class="wrapper-name">
                          <p class="wrapper-text">
                            <span>{{item.name}}</span>
                            <span class="span-title">{{item.describe}}</span>
                          </p>
                          <p class="wrapper-follow" v-if="item.isUnAttention" @click="attentionTAs(item)" >{{item.attentionText}}</p>
                          <p class="wrapper-follow1" v-else @mouseenter="attentionEnter(item)"  @click="unattentionTAs(item)" @mouseleave="attentionLeave(item)">{{item.attentionText}}</p>
                        </div>
                      </div>
                      <p class="wrapper-title">
                        <router-link :to="{name:'Article',params:{id:item.id}}">
                          {{item.title}}
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </happy-scroll>
            </div>
          </div>
        </div>
      </div>
    </div>
    <register-from v-if="registerVisible" :register="registerVisible" @registerValue="register($event)"></register-from>
  </div>
</template>

<script>
  import HomeArticle from "../../components/home/homeArticle"
  import BrighterTitle from "../../components/home/articleTitle"
  import SelectTabs from "../../components/home/selectTabs"
  import RegisterFrom from "../../components/mian/register"
  export default {
    name: "module",
    data() {
      return {
        login: false,
        isUnAttention:true,//未关注
        attentionText:'已关注',
        activeName: 'selection',
        registerVisible:false,
        tabs: '',
        tag_id: 4,
        myBarOption: {//滚动条参数配置
          barColor: "#959595",   //滚动条颜色
          barWidth: 6,           //滚动条宽度
          railColor: "#fff",     //导轨颜色
          barMarginRight: 0,     //垂直滚动条距离整个容器右侧距离单位（px）
          barMaginBottom: 0,     //水平滚动条距离底部距离单位（px)
          barOpacityMin: 0,      //滚动条非激活状态下的透明度
          zIndex: "auto",        //滚动条z-Index
          autohidemode: false,     //自动隐藏模式
          horizrailenabled: true,//是否显示水平滚动条
        },
        past: [
          {label: "Thread Bioscience 快速、可靠的尿道感染检测技术", num: 11000},
          {label: "医学影像技术、眼视光技术", num: 12000},
          {label: "呼吸治疗技术、医学生物技术", num: 13000},
          {label: "医疗美容技术、 卫生检验与检疫技术", num: 14000},
          {label: "食品营养与检测、 口腔修复工艺学", num: 15000},
        ],
        getValue: "",
      }
    },
    methods: {
      register(val) {
        this.registerVisible = false;
      },
      isLogn: function () { //是否登录
        var _t = this
        return _t.getCookie('meibo')
      },
      attentionTAs:function (item) { //已关注
           var _t =this
        if(_t.isLogn()){ //已登录
          _t.$post('/author/attentionAuthor',{
            user_id:parseFloat(item.authorId)
          }).then(function (res) {
            if(res.status === "success" && res.code === 200){
              item.isUnAttention = false //已关注
            }else{
              _t.$message.error(res.message)
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }else{
         _t.registerVisible=true
        }

      },
      unattentionTAs:function(item){ //取消关注
        var _t =this
        _t.$post('/author/cancleAttentionAuthor',{
          user_id:parseFloat(item.authorId)
        }).then(function (res) {
          if(res.status === "success" && res.code === 200){
            item.isUnAttention = true //未关注
          }else{
            _t.$message.error(res.message)
          }
        },function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      attentionEnter:function(item){
        item.attentionText = '取消关注'
      },
      attentionLeave:function(item){
        item.attentionText = '已关注'
      },
      toPersonalPage:function (authorId) {
        this.$router.push({name:'Author',params:{authorId:authorId}})
      },
      domValue(ele) {
        this.getValue = ele;
      },
      tabsSwitch: function (indexLable) {
        this.$store.commit('theLabel', {indexLable});
      },
      enterNext() {//点击加载获取下一页
        var nextPage = this.$store.state.home.tagNext;
        if (nextPage != null) {
          var currentPage = this.$store.state.home.currentPage;
          var tag_id = this.$store.state.home.tag_id;
          var morePage = currentPage + 1;
          this.$store.commit('moreData', {morePage, tag_id})
        }
      },
      recommendClick(index) {
        let _t = this;
        this.$store.commit('recommend', {_t, index});
      },
    },
    mounted() {
      var homeOptions = this.$refs.homeOptions;
      ceiling(homeOptions, "nav-fixed");

    },
    created() {
      var _t =this
      _t.$store.dispatch('getHomeTitle');//获取文章标题
      _t.$store.dispatch('getCarousel');//获取轮播图
      _t.$store.dispatch('getRecommend');//热门推荐
      _t.$store.dispatch('getAuthor');//获取热门作者
      var weixinCode = _t.getUrlKey('code')
      var weixinState = _t.getUrlKey('state')
      if(weixinCode && weixinState){
        if(weixinState===window.localStorage.getItem('weixinState')){
          _t.$post('/wechat/scan/login',{
            code:weixinCode
          }).then(function (res) {
            if (res.status === "success" && res.code === 200) {
              var saveToken = res.data.token_type + " " + res.data.access_token;
              setCookie("meibo", saveToken);
              window.location.replace('https://www.mybiogate.com/')
            }else{
              _t.$message.error(res.message||'微信无法登录');
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }
      }

    },
    components: {HomeArticle, BrighterTitle, SelectTabs,RegisterFrom},
    computed: {
      homeTabs() {
        return this.$store.getters.homeTabs
      },
      carousel() {
        return this.$store.getters.carousel
      },
      tagDate() {
        return this.$store.getters.tagData;
      },
      recommend() {
        return this.$store.getters.recommend;
      },
      homeLoad() {
        return this.$store.getters.homeLoad;
      },
      homeFinish() {
        return this.$store.getters.homeFinish;
      },
      authorData() {
        return this.$store.getters.authorData;
      },
    },
  }
</script>

<style>
  /* 在webkit内核下将滚动条隐藏，Firefox下采用容器覆盖的机制 */
  .happy-scroll-container::-webkit-scrollbar {
    display: none;
  }

  .happy-scroll-content {
    border-right: none !important;
  }

  .happy-scroll-container {
    overflow: auto;
  }

</style>
