<template>
<div class="lecture-box" >
  <div >
    <!--大banner-->
    <div class="lecture-banner">
      <img src="/static/images/public/lecture_banner.png" alt="" width="100%">
    </div>
    <!--信息内容-->
    <div class="lecture-iconIntro">
      <div class="title">
        <p class="title-top">信 息 吵 杂</p>
        <p class="title-bottom"> 你 该〈 开 氪 〉</p>
      </div>
      <ul class="lecture-intro">
        <li>
          <img src="/static/images/public/lecture_icon1.png" alt="" width="100px">
          <p class="detail-top">为好内容付费</p>
          <p class="detail-bottom">内容精准、价值饱满、解决痛点</p>
        </li>
        <li>
          <img src="/static/images/public/lecture_icon2.png" alt="" width="100px">
          <p class="detail-top">知名大咖 多样专栏</p>
          <p class="detail-bottom">精细化设计内容，为互联网人量身打造</p>
        </li>
        <li>
          <img src="/static/images/public/lecture_icon3.png" alt="" width="100px">
          <p class="detail-top">社群活动、读者福利</p>
          <p class="detail-bottom">学习之余，认识大咖、结交同好</p>
        </li>
      </ul>
    </div>
    <!--开讲精品-->
    <div class="lecture-well">
      <div class="lecture-BG-top">
        <div class="title-tab">
          <p>开讲精品</p>
          <div class="tab-tag">
            <p>
              <span @click="tab('all')">全部课程</span>
            </p>
            <p>
              <span @click="tab('dna')">基因检测</span>
            </p>
            <p>
              <span @click="tab('medical')">精准医疗</span><br>
            </p>
          </div>
          <div class="tab-tag1">
            <p>
              <span class="hide" :class="{display:all}">—</span>
            </p>
            <p>
              <span class="hide" :class="{display:dna}">—</span>
            </p>
            <p>
              <span class="hide" :class="{display:medical}">—</span><br>
            </p>
          </div>
        </div>
      </div>
      <div class="lecture-BG-center" >
        <div class="tab-list">
          <div class="sale-info" v-for="(val,index) in dataList">
            <p class="sale-info-title" @click="toLectureList(val)"><span>{{val.title}}</span></p>
            <p class="sale-info-content">{{val.short_introduce}}</p>
            <p class="sale-info-money">￥{{val.oldPrice}}</p>
            <p class="sale-info-money1">￥{{val.newPrice}}</p>
            <p class="sale-info-btn" @click="toLectureList(val)"><span>在线购买</span></p>
            <p class="sale-info-img"><img :src="val.pic" alt=""></p>
          </div>
          <div class="noData" v-if="isData">暂无数据</div>
        </div>
      </div>
      <div class="lecture-BG-bottom">
        <!--<p @click="loadMore">
          <span>加载更多</span> <br>
          <img src="/static/images/public/loadMore.svg" style=" width: 16px;height: 18px;cursor: pointer" />
        </p>-->
      </div>
    </div>
  </div>
</div>

</template>

<script>
    export default {
        name: "lecture",
      data(){
          return {
            all:true,
            allKind:'0',//全部课程上送参数
            dna:false,
            dnaKind:'1',//基因检测上送参数
            medical:false,
            medicalKind:'2',//精准医疗上送参数
            dataList:[], //开讲列表
            isData:false
          }
      },
      created:function(){
       var _t = this
        _t.lotteryList(_t.allKind) //默认上送全部

      },
      mounted:function(){

      },
      methods:{
          tab:function (flag) {
            var _t = this
            switch (flag){
              case 'all' : _t.allFn(); break;
              case 'dna' : _t.dnaFn(); break;
              case 'medical' :_t.medicalFn(); break;
            }
          },
        loadMore:function () {

        },
        allFn:function () { //全部课程list列表
          var _t = this
          _t.all =true;
          _t.dna=false;
          _t.medical=false;
          _t.lotteryList(_t.allKind)

        },
        dnaFn:function () { //基因检测list列表
          var _t = this
          _t.all =false;
          _t.dna=true;
          _t.medical=false;
          _t.lotteryList(_t.dnaKind)
        },
        medicalFn:function () { //精准医疗list列表
          var _t = this
          _t.all =false;
          _t.dna=false;
          _t.medical=true;
          _t.lotteryList(_t.medicalKind)
        },
        toLectureList:function (itemObj) { //跳转视频专辑列表页
          var _t = this
          _t.$router.push({name:'LectureLists',params:{id:itemObj.id}})
        },
        lotteryList :function (kind) { //开讲列表接口调用
            var _t =this
          _t.$get('/lottery' ,{lottery_cate_id:kind}).then(function (res) {
               if(res.status==='success'){
                 _t.dataList = res.data
                 if(_t.dataList.length!==0){
                   _t.isData = false
                   for(var i = 0;i<_t.dataList.length;i++){
                     _t.dataList[i].oldPrice =_t.outputmoney( String(parseFloat(_t.dataList[i].price)+1000))
                     _t.dataList[i].newPrice = _t.outputmoney(_t.dataList[i].price)
                   }
                 }else{
                   _t.isData = true
                 }

               }else{
                 _t.$message.error(res.message||res.status||res);
               }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })

        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/lecture/lecture.css";
</style>
