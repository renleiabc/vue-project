<template>
<div>
  <!--吸顶购买栏-->
  <div class="fixTop"  v-show="searchBarFixed">
    <div class="fixTopCont">
      <span class="tooltips">{{topTitle}}...
        <span>{{itemData.title}}</span>
      </span>
      <!--收费或者未支付-->
      <p v-if="!(isFree||pay_status)">
        <s class="oldPrice">￥ {{oldPrice}}</s>
        <span class="newPrice">￥{{price}} </span>
        <span class="buyBtn" @click="showOR(itemData)">在线购买</span>
      </p>
     <p v-else style="line-height: 60px">
        <s class="oldPrice">￥ {{oldPrice}}</s>
        <span class="newPrice">￥{{price}} </span>
       <span v-if="isFree" class="buyBtn" >免费阅读</span>
       <span v-else-if="pay_status" class="buyBtn" >已支付</span>
      </p>
    </div>
  </div>
  <div class="researchDetail-top">
    <div class="researchDetail-top-auto">
      <div class="researchDetail-top-auto-left">
        <div class="left-img-left">
          <img :src="itemData.pic" alt="" width="240px" height="321px">
        </div>
        <div class="left-text-right">
          <p>
           <span class="title-type">类别</span> <br>
           <span class="content-text">{{itemData.class_name}}</span>
         </p>
          <p>
            <span class="title-type">出版时间</span> <br>
            <span class="content-text">{{itemData.created_at}}</span>
          </p>
          <p>
            <span class="title-type">下载次数</span> <br>
            <span class="content-text">{{itemData.download_nums}}次</span>
          </p>
          <div v-if="isFree||pay_status" class="download-directory"  @click="downLoadDirectory(itemData.dir_file)">
            <img src="/static/images/public/directory.png" alt="" width="30px" height="30px" style="vertical-align: middle">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span >下载目录</span>
          </div>
          <div v-if="isFree||pay_status" class="download-report" @click="downLoadReport(itemData.report_file)">
            <img src="/static/images/public/directory.png" alt="" width="30px" height="30px" style="vertical-align: middle">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>下载报告</span>
          </div>
        </div>
      </div>
      <div class="researchDetail-top-auto-right">
        <p class="researchDetail-top-auto-rightp1">{{itemData.title}}</p>
        <p class="researchDetail-top-auto-rightp2">{{itemData.summary}}</p>
        <div > <!--v-if="itemData.free===1"-->
          <p class="researchDetail-top-auto-rightp3">
          <s>¥{{oldPrice}}</s> <br>
          <span>¥{{price}}</span>
          </p>
          <p v-if="!(isFree||pay_status)" class="researchDetail-top-auto-rightp4">
            <span class="btn-buy" @click="showOR(itemData)" ref="fixTop">在线购买</span>
            <span class="UP">升级成为VIP会员免费下载行研资料</span>
          </p>
          <p v-else class="researchDetail-top-auto-rightp4">
            <span class="btn-buy" v-if="isFree" ref="fixTop">免费阅读</span>
            <span class="btn-buy" v-else-if="pay_status" ref="fixTop">已支付</span>
            <span class="UP">升级成为VIP会员免费下载行研资料</span>
          </p>
        </div>
       <!-- <div v-else style="margin-top: 50px">
          <span class="buyBtn" ref="fixTop">免费观看</span>
        </div>-->

      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
  <div class="left-middle">
    <div  v-html="itemData.content" style="width: 100%;word-break: break-word">

<!--      <p class="small-title">为什么你需要了解CAR-T现状与未来</p>
      <p class="answer">
        细胞免疫治疗的初衷是采用患者自己的免疫细胞杀死该患者体内的肿瘤细胞，这是个非常诱人的想法。随后科学家们将这一设想得以实现，并成功治疗了终末期血液系统恶性肿瘤患者。
      </p>
      <p class="answer">
        最近几个月在这一设想实现的过程中，一种被称作CAR-T的免疫治疗方法发生了几件令人震惊的事件。
      </p>
      <p class="answer">
        最初由该领域的权威Juno Therapeutics公司宣布称，在临床试验过程中，曾经有4名患者因该治疗方法导致死亡。就在本周，一家一直以来致力于CAR-T的免疫治疗商业化的制药公司—诺华制药公司，宣布裁员120人，该团队一直在研发细胞及基因治疗。虽然诺华公司宣称，它们的团队仍然致力于CAR-T的免疫治疗的研发。然而，业内人士认为，诺华的此种举措实属为缓慢的撤退。与此同时，公司竞争将会给CAR-T市场带来极为严峻的挑战，他们试图提高肿瘤患者个体化治疗的比例，并扩大CAR-T的适用瘤种。他们还将CAR-T的应用扩大到实体瘤的研究中，不仅仅是血液系统的恶性肿瘤。这样可以扩大CAR-T的市场范围。然而在实验性治疗过程中发现这样可能导致患者昏迷，甚至是脑疝。
      </p>
      <div class="tag-text">
        <span>新药研发</span>
        <span>肿瘤免疫</span>
        <span>FDA</span>
      </div>-->
    </div>
    <div class="tag-text">
      <span v-for="(item,index) in itemData.industry_tags">{{item}}</span>
    </div>
  </div>
  <div class="researchDetail-bottom">
    <div>
     <p>相关报告</p>
      <div>
        <ul>
          <li v-for="(item ,index) in relevantList">
            <div class="list-left">
              <img :src="item.pic" alt="" width="120px" height="160px">
            </div>
            <div  class="list-right">
              <p @click="gotoResearchDetail(item)">{{item.title}}</p>
              <p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{item.class_name}}</p>
              <p>出版时间：{{item.publish_at}}</p>
              <p>
                <span @click="gotoResearchDetail(item)">在线购买</span>
              </p>
            </div>
          </li>
        </ul>

      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
  <el-dialog    :visible.sync="centerDialogVisible" :close-on-click-modal ='false'  :before-close="handleClose"  width="400px" top="15vh"  center custom-class="dialog"  style="z-index: 10000000">
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
 <!-- <el-button :plain="true">错误</el-button>-->
</div>
</template>

<script>
    export default {
      data(){
        return{
          centerDialogVisible: false,
          searchBarFixed:false,
          itemData:{},
          price:'',
          oldPrice:'',
          OR_img:'',
          relevantList:[],
          priceOR:'',
          topTitle:'',
          setInterValFlag:'', //定时器ID
          isFree:false, //默认收费
          pay_status:false //未支付

        }
      },
      created:function(){
        var _t = this
        _t.request()
      },
      mounted:function(){
        window.addEventListener('scroll', this.handleScroll)
      },
      destroyed :function(){ //删除window绑定的监听函数
        window.removeEventListener('scroll', this.handleScroll);//监听页面滚动事件
      },
      methods:{
        isLogn:function(){
          var _t = this
          return _t.getCookie('meibo')
        },
        showOR:function (item) {
          var _t = this
          var isLogn = _t.isLogn()
          if(isLogn){ //登录后
            _t.$post('/industry/wxpay',{
              id:item.id
            }).then(function (res) {
              if(res.status==='success'){
                _t.OR_img = res.data.code_url
                _t.priceOR = _t.outputmoney(item.price) //价格
                _t.centerDialogVisible = true
                clearTimeout(_t.setInterValFlag)
                _t.setInterValFlag = setTimeout(function () {
                  _t.orderStatus(res.data.order_num)
                },3000)
              }else{
                _t.$message.error(res.message||res.status||res);
              }

            },function (err) {
              _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
            })
          }else{ //未登录
            _t.$message.error('您未登录，请登录后购买');
          }
        },
        orderStatus:function(order_num){ //查询订单是否支付成功
          var _t = this
          _t.$post('/order/status',{
            order_num:order_num,
            type:'industry'
          }).then(function (res) {
            if(res.status==='success'){ //刷新页面
              _t.$router.go(0)
            }else{
              clearTimeout(_t.setInterValFlag)
              _t.setInterValFlag = setTimeout(function () {
                _t.orderStatus(order_num)
              },3000)
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'查询订单是否支付成功出错');
          })
        },
        handleClose:function(done){ //点击关闭按钮回调
          var _t= this
          clearTimeout(_t.setInterValFlag)
          done()
        },
        handleScroll :function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          var offsetTop = this.$refs.fixTop.offsetTop
          if (scrollTop > offsetTop) {
            this.searchBarFixed = true
          } else {
            this.searchBarFixed = false
          }


        },
        request:function () { //行研详情
          var _t = this
          var itemId = _t.$route.params.id
          _t.$post('/industry/detail',{
            id:itemId
          }).then(function(res){
            if(res.status==='success'){
              _t.itemData = res.data
              _t.topTitle = _t.itemData.title.slice(0,15)
              _t.price =  _t.outputmoney(_t.itemData.price) //价格
              _t.oldPrice =  _t.outputmoney(String(parseFloat(_t.itemData.price)+1000))
              if( _t.itemData.free===0){ //免费
                _t.isFree = true
              }else{ //收费
                _t.isFree = false
              }
              if(_t.itemData.pay_status===0){ //未支付
                _t.pay_status= false
              }else{ //已支付
                _t.pay_status= true
              }
              _t.relevant(_t.itemData.industry_tag_id)
            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        // 行研相关推荐
        relevant:function(industryTagid){
          var _t = this
          _t.$post('/industry',{
            tag_id:industryTagid
          }).then(function(res){
         if(res.status==='success'){
           _t.relevantList = res.data
         }else{
           _t.$message.error(res.message||res.status||res);
         }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        downLoadDirectory:function (path) { //下载目录
        window.location.href = path
        },
        downLoadReport:function (path) { //下载报告
        window.location.href = path
        },
        gotoResearchDetail:function (item) {
          this.$router.replace({name:'ResearchDetail',params:{id:item.id}})
          this.$router.go(0)
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          window.scrollTo(0, 0);
        }
      }
    }
</script>

<style scoped>
  @import '../../assets/css/research/researchDetail.css';
</style>
