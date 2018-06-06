<template>
<div class="main research-img">
  <img src="../../assets/images/public/pic01.png" alt="">
  <img src="../../assets/images/public/pic02.png" alt="">
  <img src="../../assets/images/public/pic03.png" alt="">
  <img src="../../assets/images/public/pic04.png" alt="">
  <img src="../../assets/images/public/pic05.png" alt="">
  <!--<div class="research-top">
    <el-carousel  :interval="4000" type="card" height="400px" :autoplay="false" indicator-position="none">
      <el-carousel-item v-for="(obj,index) in researchList" :key="index" label="">
        <div class="itemLeft">
          <p>
            <img :src="obj.pic" alt="" >
          </p>
        </div>
        <div class="itemRight" @click="toResearchDetail(obj)">
          <p class="research-title">{{obj.title}}</p>
          <p class="research-title-bottom">
            <span>出版时间：{{obj.publish_at}}</span>
            <span>
              <img src="/static/images/public/tag.svg" alt="" >
            </span>
            <span>{{obj.class_name}}</span>
          </p>
          <p class="research-content">
          {{obj.summary}}
          </p>
          <p class="research-bottom">
            <span class="knowMore">了解更多</span>
            <span class="itemPrice">￥{{obj.price}}</span>
          </p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="research-content">
    <div class="research-content-top">
      <p class="research-content-top-title">
        <span>美柏行研</span>
      </p>
      <p class="research-content-top-title_bottom">
        最专业的医健领域中文行研库
      </p>
      <div class="research-content-top-search">
        <ul>
          <li>
            <p class="wordMask">关键词</p>
            <el-input v-model="keyWord"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              >
            </el-input>
          </li>
          <li>
            <p class="wordMask">类别</p>
            <el-select  v-model="value_type" placeholder="请选择" >
              <el-option
                v-for="(item,index) in type_lists"
                :key="item.id"
                :value="item.id"
                :label="item.class_name"
              >
                <span style="float: left">{{ item.class_name }}</span>
              </el-option>
            </el-select>
          </li>
          <li style="width: 32.2%">
            <p class="wordMask">价格区间</p>
            <el-select  placeholder="请选择" v-model="value_price" >
              <el-option
                v-for="(item,index) in price_lists"
                :key="item.label"
                :value="item.value" >
                <span style="float: left">{{ item.value }}</span>
              </el-option>
            </el-select>
            <span class="searchBtn" @click="searchBtn">
              搜索
            </span>
          </li>

        </ul>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="research-content-cont">
      <ul class="research-content-cont-listBox">
        <li class="research-content-cont-list" v-for=" (item,index) in industryList">
          <div class="item-img">
            <img :src="item.pic" alt="" width="120px" height="160px">
          </div>
          <div class="item-info" @click="toResearchDetail(item)">
            <p class="item-info-top">{{item.title}}</p>
            <p class="item-info-center">{{item.summary}}</p>
            <p class="item-info-bottom">
              <span class="item-info-bottom-time">出版时间：{{item.publish_at}}</span>
              <img src="/static/images/public/tag.svg" alt="" style="vertical-align: middle;margin-left: 30px">
              <span class="item-info-bottom-model">{{item.class_name}}</span>
            </p>
          </div>
          <div class="item-price">
            <span class="toLine"></span>
            <span class="free">
              <img class="logoIco" src="/static/images/public/logo.ico" alt="" width="12px" height="12px">
              <span class="free-child1" v-if="item.free===0">
                    限时免费<br>
                  <s class="free-price">¥{{item.itemPriceNew}}</s>
                  <span class="vip">
                  升级成为VIP会员免费下载行研资料
                  </span>
              </span>
               <span class="free-child1" v-else>
                 {{item.itemPriceNew}}<br>
                  <s class="free-price">¥{{item.itemPriceOld}}</s>
                  <span class="vip">
                  升级成为VIP会员免费下载行研资料
                  </span>
               </span>
            </span>
            <span class="bottomLine"></span>
          </div>
        </li>
      </ul>
      <div style="clear: both"></div>
    </div>
    <div class="research-content-bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :total='dataTotal'
        prev-text="上一页"
        next-text="下一页"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>-->
</div>
</template>
<script>
    export default {
        data(){
          return{
            researchList :[
              {
                itemTitle:'清科数据：1月VC/PE市场募资规模下降环比减少79.2%',
                itemTime:'2018-3-15',
                itemModel:'AI人工智能',
                itemInfo:'据清科私募通统计，2018年1月中外创业投资及私募股权投资机构新募集130支基金，披露募资金额106支基金，共募集金额64.78亿美元；',
                price:'600.00',
                itemImg:'/static/images/public/search-img.png'
              },
              {
                itemTitle:'清科数据：1月VC/PE市场募资规模下降环比减少79.2%',
                itemTime:'2018-3-15',
                itemModel:'AI人工智能',
                itemInfo:'据清科私募通统计，2018年1月中外创业投资及私募股权投资机构新募集130支基金，披露募资金额106支基金，共募集金额64.78亿美元；',
                price:'600.00',
                itemImg:'/static/images/public/search-img.png'
              },
              {
                itemTitle:'清科数据：1月VC/PE市场募资规模下降环比减少79.2%',
                itemTime:'2018-3-15',
                itemModel:'AI人工智能',
                itemInfo:'据清科私募通统计，2018年1月中外创业投资及私募股权投资机构新募集130支基金，披露募资金额106支基金，共募集金额64.78亿美元；',
                price:'600.00',
                itemImg:'/static/images/public/search-img.png'
              }
            ], //行研推荐数组
            type_lists:[
              {
                value:'一类',
                label:1
              },{
                value:'二类',
                label:2
              },{
                value:'三类',
                label:3
              }
            ], //类型选择框
            price_lists:[
              {
                value:'100-200',
                label:1
              },{
                value:'300-400',
                label:2
              },{
                value:'500-600',
                label:3
              }
            ],//价格选择框
            value_type:'', //类别
            value_price:'',//价格区间
            keyWord:'',//关键字
            defaultPageNum:1,
            industryList:[], // 行研列表
            dataTotal:0, //数据总个数
            loading:'',


          }
        },
      created:function () { //请求接口
        var _t = this
        /*_t.queryObj = {
          class_id:_t.value_type, // 类别
          price: _t.value_price, // 价格区间
          keywords:_t.keyWord //关键字
        }*/

        _t.researchListData();

      },
      methods:{
        // 查询行研推荐列表
        researchListData:function(){
          var obj = this;
          var req = obj.$post("/industry/recommend",{});
          req.then((value) => {
            if(value.code===200 && value.status==='success'){
              obj.researchList = value.data;
              obj.typeListsData();
            }else{
              obj.$message.error(value.status);
            }

          }, err => {
            obj.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        //查询行研分类列表
        typeListsData:function(){
          var obj = this;
          var req = obj.$post("/industry_class",{});
          req.then((value) => {
            if( value.code===200 && value.status==='success'){
              obj.type_lists = value.data;
              obj.requestIndustryList(obj.defaultPageNum)
            }else{
              obj.$message.error(value.status);
            }

          }, err => {
            obj.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        //底部查询行研列表
        requestIndustryList:function(pageNum){
          var _t = this
          var params={
            page:pageNum //当前页面数
          }
          var obj={
            class_id:_t.value_type, // 类别
            price: _t.value_price, // 价格区间
            keywords:_t.keyWord //关键字
          }
          _t.$extend(params,obj)
          _t.$get('/industry',params).then(function (res) {
            if(res.code===200 && res.status==='success'){
               for(var i = 0;i< res.data.length;i++){
                 res.data[i].itemPriceNew = _t.outputmoney(res.data[i].price)
                 res.data[i].itemPriceOld =  _t.outputmoney(String(parseFloat(res.data[i].price)+1000))
               }
              _t.industryList = res.data
              _t.dataTotal =res.meta.total
            }else{
              _t.$message.error(res.status);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        pageChange:function(currentPage){ //分页切换时回调
          var _t = this
          _t.requestIndustryList(currentPage)
        },
        toResearchDetail:function (item) { //进入行研详情
          this.$router.push({name:'ResearchDetail',params:{id:item.id}})
        },
        searchBtn:function () { // 点击搜索
          var _t = this
          _t.clickSearchQuery()
        },
        clickSearchQuery:function () { //点击搜索查询
          var _t = this
          _t.requestIndustryList(1)

        }
      }
    }
</script>

<style scoped>
  @import '../../assets/css/research/research.css';
</style>
