<template>
    <div>
      <transition name="fade" mode="out-in">
      <!--吸顶购买栏-->
        <div class="fixTop"  v-if="searchBarFixed">
          <div class="roadshowFixedBox">
            <div class="roadshow-bottom-itemModel" >
              <span class="itemModel-date"><i class="el-icon-date"></i>{{dateInfoLists[0].dateText}}</span>
              <span class="itemModel-btn">立即报名</span>
            </div>
          </div>
        </div>
      </transition>
      <div class="roadshow-top">
      <div class="roadshow-content">
        <div class="roadshow-top-left">
            <p class="weekText">每周三，3个项目，配备中英文交传</p>
            <p class="roadshow-top-left-title">
              海外医健项目网络路演
            </p>
          <p class="roadshow-top-left-content">
            路演项目是经过严格筛选，有意进入中国市场，在寻求中国投资或战略合作的优质海外项目，涵盖医疗器械、数字医疗、诊断技术、创新药物、精准医疗、基因检测、医疗AR/VR等领域。投资人在线“申请参加路演”后，会收到系统发送的路演链接，可以通过链接在自己的电脑和移动设备上参与。
          </p>
          <p class="roadshow-top-left-button">
            <span @click="toSeverce()">查看更多「 海外项目 」&nbsp;<img src="/static/images/public/right_arrow_double_wright.svg" alt="" width="24px" height="12px" style="vertical-align: middle"  ></span>
          </p>
        </div>
        <div class="roadshow-top-right">
          <img src="/static/images/public/roadshow.png" alt="" style="margin-left: 20px" >
        </div>
        <div style="clear: both"></div>
      </div>
      </div>
      <div class="roadshow-bottom">
        <div v-for="(item,index) in dateInfoLists">
          <div class="roadshow-bottom-itemModel" :ref="item.id" v-show="index===0">
          <span class="itemModel-date" v-show="index===0">
            <i class="el-icon-date" style="margin-right: 10px;" ></i>
            {{item.dateText}}</span>
          <a class="itemModel-btn" v-show="index===0" href="https://zoom.us/webinar/register/5915246718632/WN_K0aTht74QrSJSZXbbfg6fg" target="_blank">立即报名</a>
         </div>
          <div class="roadshow-bottom-itemLists">
            <div class="roadshow-bottom-item-left">
              <img :src="item.pic" alt="">
            </div>
            <div class="roadshow-bottom-item-right">
              <p class="roadshow-bottom-item-right-title">
                {{item.title}}
              </p>
              <p class="roadshow-bottom-item-right-content">
                {{item.describe}}
              </p>
             <!-- <p class="roadshow-bottom-item-right-detail">
                了解详情&nbsp;<img src="/static/images/public/right_arrow_double.svg" alt="" width="24px" height="12px" style="vertical-align: middle">
              </p>-->
            </div>
          </div>
          <div style="clear: both"></div>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
           dateInfoLists:[

           ],
            searchBarFixed:false,
            scollIndex:0,
            date:'', //日期
            time:'' //时间
          }
        },
      created:function(){
          var _t = this
        _t.$post('/show/list',{}).then(function (res) {
          if(res.status==='success'){
            for(var i = 0;i<res.data.length;i++){

              var arrStart_time = res.data[i].start_time.split(/[- : \/]/)
              var arrEnd_time = res.data[i].end_time.split(/[- : \/]/)
             // console.log( new Date(arrStart_time[0], arrStart_time[1]-1, arrStart_time[2], arrStart_time[3], arrStart_time[4], arrStart_time[5]))

              var statrtTime = new Date(arrStart_time[0], arrStart_time[1]-1, arrStart_time[2], arrStart_time[3], arrStart_time[4], arrStart_time[5])
              var endTime = new Date(arrEnd_time[0], arrEnd_time[1]-1, arrEnd_time[2], arrEnd_time[3], arrEnd_time[4], arrEnd_time[5])
              var amORpm = statrtTime.toLocaleTimeString().slice(0,2)==='上午'?"AM":"PM" //上午或下午
              res.data[i].dateText = _t.dateFtt('hh:mm',statrtTime)+'-'+_t.dateFtt('hh:mm',endTime)+' '+amORpm+','+' '+_t.dateFtt('yyyy年MM月dd日',statrtTime) //日期

            }
            _t.dateInfoLists = res.data

          }else{
            _t.$message.error(res.message||res.status||res);
          }
        },function (err) {
          _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
        })
      },
      mounted:function(){
        window.addEventListener('scroll', this.handleScroll)
      },
      destroyed :function(){ //删除window绑定的监听函数
        window.removeEventListener('scroll', this.handleScroll);//监听页面滚动事件
      },
      methods:{
        handleScroll:function () {
         var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          for(var i = 0;i<this.dateInfoLists.length;i++){
            var offsetTop= this.$refs[this.dateInfoLists[i].id][0].offsetTop
            if (scrollTop > offsetTop) {
              this.searchBarFixed = true
              this.scollIndex = i
            }
          }
          if(scrollTop<this.$refs[this.dateInfoLists[0].id][0].offsetTop){
            this.searchBarFixed = false
            this.scollIndex =0
          }
        },
        toSeverce:function () {
          var _t = this
          _t.$router.push({name:'Service'})
        }
     }
    }
</script>

<style scoped>
  @import '../../assets/css/roadshow/roadshow.css';
</style>
