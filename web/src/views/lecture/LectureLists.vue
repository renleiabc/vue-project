<template>
  <div>
    <!--吸顶购买栏-->
    <!--<div class="fixTop"  v-if="searchBarFixed">
      <div class="fixTopCont">
        <span>{{dataLists.title}}</span>
        <p>
          &lt;!&ndash;<s class="oldPrice">￥ 1800.00</s>&ndash;&gt;
          <span class="newPrice">￥{{newPrice}} </span>
          &lt;!&ndash;收费或者未支付&ndash;&gt;
          <span v-if="!(isFree||pay_status)" class="buyBtn" @click="showOR(dataLists)">在线购买</span>
          <span v-else>
            <span v-if="isFree" class="buyBtn" @click="toLectureDetail(dataLists)">免费观看</span>
             <span v-else-if="pay_status" class="buyBtn"  @click="toLectureDetail(dataLists)">已支付|立即观看</span>
          </span>

        </p>
      </div>
    </div>-->
    <!--标题-->
    <div class="LectureLists-title">
      <div class="LectureLists-title-center">
        <img src="../../assets/images/public/name.png" width="480px" height="360px"
             style="position: relative;top: 20px;">
        <div class="LectureLists-title-right">
          <p class="title-text">{{dataLists.title}}</p>
          <p class="titleNum">[ 第 1 辑 ] &nbsp;&nbsp; <img src="/static/images/public/tag.svg" alt="" width="10px"
                                                          height="12px"> &nbsp;肿瘤免疫疗法</p>
          <p class="price">&yen; {{dataLists.newPrice}}</p>
          <span class="span_btn" @click="showOR()" ref="fixTop">免费收听</span>
          <!--<span v-else>
            <span v-if="isFree" class="span_btn" ref="fixTop" @click="toLectureDetail(dataLists)">免费观看</span>
          &lt;!&ndash;  <span v-else-if="pay_status" class="span_btn"  ref="fixTop" @click="toLectureDetail(dataLists)">已支付|立即观看</span>&ndash;&gt;
          </span>-->
          <span class="vip_link">升级成为VIP会员获得更多免费资格</span>
        </div>
      </div>
    </div>
    <!--简介-->
    <div class="LectureLists-info">
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
      <div class="lectrue-describe" v-for=" (el,index) in dataLists.describe" :key="index">
        {{el}}
      </div>
    </div>
    <!--列表-->
    <div class="LectureLists-List">
      <p class="info-title">列 表</p>
      <p class="line-Down">——</p>
      <div class="reqList">
        <div class="item" v-for="(item,index) in lotteryTagList" :key="index">
            <span class="playerBox">
              <img :src="item.pic" alt="" width="280px" height="210px">
              <!--<img src="/static/images/public/play.svg" alt="" class="playBtn">-->
            </span>
          <div class="itemRight">
            <p class="item-title"><span @click="gotoLectureLists(item)">{{item.title}}</span></p>
            <p class="item-content">{{item.describe}}</p>
            <p class="item-author">
              <img :src="item.author_logo" alt="" />
              <span>{{item.author}} · {{item.short_introduce}}</span>
            </p>
          </div>
          <div style="clear: both"></div>
        </div>
        <!--<div class="item" >
          <span class="playerBox">
            <img src="/static/images/public/two.jpg" alt="" width="280px" height="210px" >
            <img src="/static/images/public/listen.svg" alt="" class="playBtn">
          </span>
          <div class="itemRight">
            <p class="item-title"><span>肿瘤治疗100年：历程经验和前景展望</span></p>
            <p class="item-content">今天我们请到了休斯顿卫理公会医院研究所炎症和表观遗传学中心主任 、康奈尔大学威尔医学院微生物学和免疫学教授，王荣福教授。王教授是肿瘤免疫学领域国际公认的专家。今天我们请他来讲一讲肿瘤免疫的故事。</p>
            <p class="item-author">
              <img src="/static/images/public/pic3.jpg" alt="">
              <span>王福荣· 斯坦福大学教授</span>
            </p>
          </div>
          <div style="clear: both"></div>
        </div>-->
      </div>
    </div>
    <!--大纲-->
    <!-- <div class="LectureLists-outline">
       <p class="info-title">大 纲</p>
       <p class="line-Down">——</p>
       <p class="arrow" v-if ='carouselArr.length>3'>
         <img :src="leftArrow" @mouseenter="leftArrowEnter"  @mouseleave="leftArrowLeave" alt="" class="left-arrow"  id=LeftArr>
         <img :src="rightArrow" @mouseenter="rightArrowEnter" @mouseleave="rightArrowLeave" alt="" class="right-arrow" id="RightArr">
       </p>
       <div class="content">
         <div id=ISL_Cont_1 >
           <div class="content-carousel" v-for="(obj,index) in carouselArr">
             <p class="No">{{obj.No}}</p>
             <p class="carousel-title">{{obj.title}}</p>
             <ul class="content-list">
               <li>肿瘤治疗的历史发展</li>
               <li>肿瘤治疗的历史发展</li>
               <li>肿瘤治疗的历史发展</li>
               <li>肿瘤治疗的历史发展</li>
               <li>肿瘤治疗的历史发展</li>
               <li>肿瘤治疗的历史发展</li>
             </ul>
           </div>
         </div>
       </div>
     </div>-->
    <!--评论-->
    <!-- <div class="LectureLists-talk">
       <p class="info-title">讨 论</p>
       <p class="line-Down">——</p>
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
         <p><embed src="/static/images/public/talk.svg" type="image/svg+xml" style="width: 16px;height: 16px"/> <span>评论</span></p>
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
       <div style="clear: both"></div>
     </div>-->
    <el-dialog :visible.sync="centerDialogVisible" :before-close="handleClose" :close-on-click-modal='false'
               width="400px" top="15vh" center custom-class="dialog">
        <span slot="title">
          <span class="QR_titleSTY" style="">微信扫码支付</span>
        </span>
      <div class="QR_centerSTY">
        <span>￥ {{priceOR}}</span>
        <p><img :src="OR_img" alt="" width="250px" height="250px"></p>
      </div>
      <span slot="footer">
          <p class="QR_footerSTY">请在微信客户端上完成付款流程</p>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "LectureLists",
    data() {
      return {
        islogin: false,
        userName: '',
        centerDialogVisible: false,
        leftArrow: '/static/images/public/left-normal.svg',
        rightArrow: '/static/images/public/right-normal.svg',
        carouselArr: [
          {
            No: '第一集',
            title: '肿瘤治疗100年：历程经验和前景展望'

          },
          {
            No: '第二集',
            title: '肿瘤治疗200年：历程经验和前景展望'
          },
          {
            No: '第三集',
            title: '肿瘤治疗300年：历程经验和前景展望'
          },
          {
            No: '第四是集',
            title: '肿瘤治疗400年：历程经验和前景展望'
          }
        ],
        searchBarFixed: false,
        dataLists: {//当前请求回数据集合
          pic: "../../assets/images/public/name.jpg",
          title: "海外大咖讲医健投资前沿",
          newPrice: "0.00",
          describe:["肿瘤免疫疗法是当前肿瘤治疗领域最具前景的研究方向之一，" +
          "通过调动机体的免疫系统，增强肿瘤微环境抗肿瘤免疫力，从而控制和杀伤肿瘤细胞。" +
          "由于其卓越的疗效和创新性，在2013年被《科学》杂志评为年度最重要的科学突破。" +
          "肿瘤免疫治疗正在全球范围内如火如荼地开展，多个肿瘤免疫治疗药物已经获得美国FDA批准临床应用。",
            "美柏开讲，邀请海外科学大咖，围绕重点前沿领域，为中国投资者讲解创新突破及投资机会。",
            "《肿瘤免疫》专辑一，聚焦热得发烫的肿瘤免疫疗法，深度解读全球创新前沿与投资热点。由顶尖华人科学家为您提炼肿瘤免疫领域的知识精华，理清肿瘤免疫疗法的来龙去脉，助您克服领域高门槛，" +
            "及时掌握科技前沿，洞察海外投资机会。"
          ]
        },
        oldPrice: '',//就价格
        newPrice: '',//新价格
        lotteryTagList: [],//关联开讲列表
        priceOR: '', //二维码价格
        OR_img: '',//二维码图片
        setInterValFlag: '',//定时器ID
        isFree: false, //默认收费
        pay_status: false, //未支付
        getId: "",
      }

    },
    created: function () {
      var _t = this
      _t.relevanceList()
    },

    mounted: function () {
      /*var scrollPic_02 = new ScrollPic ()
      scrollPic_02.scrollContId   = "ISL_Cont_1"; //内容容器ID
      scrollPic_02.arrLeftId      = "LeftArr";//左箭头ID
      scrollPic_02.arrRightId     = "RightArr"; //右箭头ID
      scrollPic_02.frameWidth     = (document.getElementsByClassName('content-carousel')[0].clientWidth+20)*3;//显示框宽度
      scrollPic_02.pageWidth      = document.getElementsByClassName('content-carousel')[0].clientWidth+20; //翻页宽度 dcument.getElementsByClassName('content-carousel')[0].clienWidth
      scrollPic_02.speed          = 10; //移动速度(单位毫秒，越小越快)
      scrollPic_02.space          = 10; //每次移动像素(单位px，越大越快)
      scrollPic_02.autoPlay       = false; //自动播放
      scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)
      scrollPic_02.initialize(); //初始化*/
      window.addEventListener('scroll', this.handleScroll)

    },
    methods: {
      isLogn: function () {
        var _t = this
        return _t.getCookie('meibo')
      },
      showOR: function () { //点击免费观看，显示第一个开讲列表详情；
        var _t = this;
        var first = _t.lotteryTagList[0].id;
        this.$router.push({name: 'LectureDetails', params: {id:first}},);//动态路由传参；
        /*  _t.$post('/lottery/wxpay', { //二维码
            id: item.id
          }).then(function (res) {
            if (res.status === 'success') {
              _t.OR_img = res.data.code_url
              _t.priceOR = _t.outputmoney(item.price) //价格
              _t.centerDialogVisible = true
              clearTimeout(_t.setInterValFlag)
              _t.setInterValFlag = setTimeout(function () {
                _t.orderStatus(res.data.order_num)
              }, 3000)
            } else {
              _t.$message.error(res.message || res.status || res);
            }

          }, function (err) {
            _t.$message.error(err.message || '网络错误，请稍后再试');
          });*/
      },
      orderStatus: function (order_num) { //查询订单是否支付成功
        var _t = this
        _t.$post('/order/status', {
          order_num: order_num,
          type: 'lottery'
        }).then(function (res) {
          if (res.status === 'success') { //刷新页面
            _t.$router.go(0)
          } else {
            clearTimeout(_t.setInterValFlag)
            _t.setInterValFlag = setTimeout(function () {
              _t.orderStatus(order_num)
            }, 3000)
          }
        }, function (err) {
          _t.$message.error('查询订单是否支付成功出错');
        })
      },
      handleClose: function (done) { //点击关闭按钮回调
        var _t = this
        clearTimeout(_t.setInterValFlag)
        done()
      },
      leftArrowEnter: function () {
        this.leftArrow = '/static/images/public/left-hover.svg'
      },
      leftArrowLeave: function () {
        this.leftArrow = '/static/images/public/left-normal.svg'
      },
      rightArrowEnter: function () {
        this.rightArrow = '/static/images/public/right-hover.svg'
      },
      rightArrowLeave: function () {
        this.rightArrow = '/static/images/public/right-normal.svg'
      },
      handleScroll: function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = this.$refs.fixTop.offsetTop
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }
      },
      toLectureDetail: function (itemObj) {
        var _t = this
        var storage = window.localStorage
        storage.removeItem('normalPath')
        storage.setItem('normalPath', 'normalPath')
        _t.$router.push({name: 'LectureDetail', params: {id: itemObj.id}})
      },
      videoList: function () { //开讲详情集合
        /*
         var _t = this
         _t.getId = _t.$route.params.id;
         _t.$post('/lottery/detail',{
           id:_t.getId
         }).then(function (res) {
           if(res.status==='success'){
               _t.dataLists = res.data
             console.log(JSON.stringify(res.data));
               _t.oldPrice = _t.outputmoney(String(parseFloat(_t.dataLists.price)+1000))
               _t.newPrice = _t.outputmoney(_t.dataLists.price)
             if( _t.dataLists.free===0){ //免费
               _t.isFree = true
             }else{ //收费
               _t.isFree = false
             }
             if(_t.dataLists.pay_status===0){ //未支付
               _t.pay_status= false
             }else{ //已支付
               _t.pay_status= true
             }
               _t.relevanceList(itemObj.lottery_tag_id) //调开讲详情底部视频列表
           }else{
             _t.$message.error(res.message||res.status||res);
           }
         },function (err) {
           _t.$message.error(err.message||'网络错误，请稍后再试');
         })*/
      },
      relevanceList: function (lotteryTagId) { //底部关联列表
        var _t = this
        _t.$get('/lottery').then(function (res) {
          if (res.status === 'success') {
            for(var i=0;i<res.data;i++){
              if(res.data[i].author_logo=="" ||  res.data[i].author_logo== false){
                res.data[i].author_logo = "/static/images/public/pic3.jpg";
              }else{
                res.data[i].author_logo =  res.data[i].author_logo;
              }
            }
            _t.lotteryTagList = res.data
          } else {
            _t.$message.error(res.message || res.status || res);
          }
        }, function (err) {
          _t.$message.error((err&&err.data.message) || '网络错误，请稍后再试');
        })
      },
      gotoLectureLists: function (item) {
        let lectrueId = parseInt(item.id);
        this.$router.push({name: 'LectureDetails', params: {id:lectrueId}},);//动态路由传参；
      }
    },
    destroyed: function () { //删除window绑定的监听函数
      window.removeEventListener('scroll', this.handleScroll);//监听页面滚动事件
    }
  }
</script>

<style scoped>
  @import "../../assets/css/lecture/LectureLists.css";
</style>
