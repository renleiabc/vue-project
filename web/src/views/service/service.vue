<template>
<div class="main overseas-img">
  <img src="../../assets/images/public/overseas-1.jpg" alt="">
  <img src="../../assets/images/public/overseas-2.png" alt="">
  <img src="../../assets/images/public/overseas-3.jpg" alt="">
  <!--<div class="breadcrumb">
   &lt;!&ndash; <span class="linksty link">路演</span>
    <i class="el-icon-arrow-right linksty"></i>&ndash;&gt;
   &lt;!&ndash; <span class="linksty currentPage">{{item.title}}}</span>&ndash;&gt;
  </div>
  <div class="service-content">
    <div class="service-content-left">
      <div class="service-content-left-title">海外项目</div>
      <ul v-if="projectList.length!==0" v-cloak>
        <li v-for="(item,index) in projectList">
          <div class="project-context">
            <p class="project-context-title" @click="toSeversDetail(item)">{{item.title}}</p>
            <p class="project-context-Tag-new">
              领域：<span >{{item.domain_name}}</span>
            </p>
            <p >
              <span>项目所属阶段：{{item.project_stage_name}}</span>
            </p>
            &lt;!&ndash;<p  class="project-context-Tag" style="display: none">
              <span >行业：医疗器械</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/static/images/public/tag.svg" alt="" >&nbsp;新药研发</span>
              <span><i class="el-icon-location-outline"></i> 美国</span>
            </p>
            <p  class="project-context-money" style="display: none">
              <span>交易规模&nbsp;&nbsp;&nbsp;<img src="/static/images/public/gold_green.svg" alt="" width="18px" height="18px">&nbsp;&nbsp;10,000,000</span>
            </p>&ndash;&gt;
          </div>
          <div class="project-image">
            <img :src="item.pic" alt="" width="140px" height="105px">
          </div>
        </li>
      </ul>
      <div v-else v-cloak>
        <span>暂无数据~~~</span>
      </div>
    </div>
    <div class="service-content-right">
      <div class="area-choose">
        <p class="area-choose-name">领域筛选</p>
        <div class="area-choose-btn">
          <span :class="{'bg-active':item.activeSty}"  v-for="(item,index) in areaList" @click="areaChooseFn(item)">{{item.name}}</span>
        </div>
        <p class="show-all" v-if="area_showAll"><span @click="area_showAll_fn">展开全部 <img src="/static/images/public/loadMore.svg" alt="" width="10px" height="10px"></span></p>
      </div>
      <div class="keywords-choose">
        <p class="area-keywords-name">项目所属阶段筛选</p>
        <div class="area-keywords-btn">
          <span :class="{'bg-active':item.activeSty}" v-for="(item,index) in keyWords" @click="keyWordChooseFn(item)">{{item.name}}</span>
        </div>
        <p class="show-all" v-if="keyWord_showAll"><span @click="keyWord_showAll_fn">展开全部 <img src="/static/images/public/loadMore.svg" alt="" width="10px" height="10px"></span></p>
      </div>
      <div></div>
    </div>
  </div>
  <div class="research-content-bottom">
    <el-pagination
      background
      layout="prev, pager, next"
      :total='dataTotal'
      prev-text="上一页"
      next-text="下一页"
      :page-size="10"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>-->
</div>
</template>

<script>
    export default {
    data(){
      return{
       projectList :[],
       dataTotal:0, //初始化总数
       defaultPageNum:1,  //初始化页面个数
       areaChoose:'', //领域筛选 上送参数
       keyWord:'', //关键词筛选 上送参数
       areaList:[
         {
           id:'',
           name:'全部',
           activeSty:true,// 背景色
           isClickAll:true, //是否点击全部
           isClickStatus:true //点击状态
         }
       ],//领域列表
       keyWords:[ //关键词列表
         {
           id:'',
           name:'全部',
           activeSty:true, //背景色
           isClickAll:true, //是否点击全部
           isClickStatus:true //点击状态
         }
       ], //关键词列表
        reqRightStatus:true, //默认右边按钮集合只请求一次
        keyWord_showAll:false,
        reqKeyWords:[], //存储关键词请求回来的数据
        area_showAll:false,
        reqAreaList:[], //存储区域请求回来的数据
      }
    },
      created:function(){
      var _t = this
        _t.reqProjectList(_t.defaultPageNum)
      },
      methods:{
        toSeversDetail:function (item) {
          var _t = this
          var storage = window.localStorage
          storage.removeItem('formServicePath')
          storage.setItem('formServicePath','normalPath')
          _t.$router.push({name:'serviceDetail',params:{id:item.id}})
        },

        pageChange:function (currentPage) { //分页切换时回调
          var _t = this
          _t.reqProjectList(currentPage)
        },
        reqProjectList:function (pageNum) { //请求海外项目列表
          var _t = this
          var domain_id_Join = _t.areaChoose.split('').join() //处理关键词上送参数 默认上送空
          var keywords_id = _t.keyWord.split('').join() //处理关键词上送参数 默认上送空
          _t.$get('/project/list',{
            page:pageNum,
            domain_id:domain_id_Join,
            project_stage_id:keywords_id
          }).then(function (res) {
            if(res.code===200 && res.status==='success'){

              _t.projectList = res.data
              _t.dataTotal = res.meta.total
              for(var i = 0 ;i<_t.projectList.length;i++ ){
                var domain = ''
                var keyWords = ''//项目所属阶段project_stage
                var domainObj = _t.projectList[i].domain
                var domainArr = []
                var project_stage = _t.projectList[i].project_stage //项目所属阶段
                var projectStageArr =[]
                for(var key in domainObj){ //处理领域
                  var obj = {}
                  obj.id = key
                  obj.value = domainObj[key]
                  domainArr.push(obj)
                }
                for(var key1 in project_stage){//处理项目所属阶段
                  var obj = {}
                  obj.id = key1
                  obj.value = project_stage[key1]
                  projectStageArr.push(obj)
                }
                for(var n = 0;n<domainArr.length;n++){// 拼接领域
                  if(n===domainArr.length-1){
                    domain+=domainArr[n].value
                  }else{
                    domain+=domainArr[n].value+','
                  }
                }

                for(var k = 0;k<projectStageArr.length;k++){// 拼接项目所属阶段
                  if(k===projectStageArr.length-1){
                    keyWords+=projectStageArr[k].value
                  }else{
                    keyWords+=projectStageArr[k].value+','
                  }
                }
                _t.projectList[i].domain_name_join =domain
                _t.projectList[i].keyWords_name_join = keyWords
              }
              if(_t.reqRightStatus){
                _t.reqRightStatus = false //进入此页面进行一次右侧领域与关键词调用
                _t.reqareaList()//领域接口调用
              }

            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        //领域选择点击事件
        areaChooseFn:function (itemObj) {
          var _t = this
          if(itemObj.id===''){
            itemObj.isClickStatus = true  //改变点击状态
            itemObj.activeSty = true //改变样式
            itemObj.isClickAll = true //改变是否点击全部状态
            _t.areaChoose = String(itemObj.id) //添加上送参数
            for(var i = 0;i<_t.areaList.length;i++){
              if(i!==0){
                _t.areaList[i].isClickStatus = false
                _t.areaList[i].activeSty = false
              }
            }
          }else{
            var reg = new RegExp(String(itemObj.id),'g')
              _t.areaList[0].isClickStatus = false //全部按钮改变点击状态
              _t.areaList[0].activeSty = false //全部按钮改变样式
              _t.areaList[0].isClickAll = false//全部按钮改变是否点击全部状态
            if(itemObj.isClickStatus){ //其他按钮点击取消
               itemObj.isClickStatus = false //其他按钮状态置为false
               itemObj.activeSty = false //样式跟着改变
              _t.areaChoose= _t.areaChoose.replace(reg,'') //上送数据删除点击取消的那个按钮的id
              if(_t.areaChoose===''){//判断取消完后 默认全部选项
                _t.areaList[0].isClickStatus = true //全部选项的点击状态置为true
                _t.areaList[0].activeSty = true //激活样式也置为true
                _t.areaList[0].isClickAll = true //是否点击全部置为true
              }
            }else{
               itemObj.isClickStatus = true
               itemObj.activeSty = true
              _t.areaChoose+=itemObj.id
            }
          }
          console.log(_t.areaChoose)
          _t.reqProjectList(_t.defaultPageNum)
        },
        //关键词点击事件
        keyWordChooseFn:function (itemObj) {
          var _t = this
          if(itemObj.id===''){
            itemObj.isClickStatus = true  //改变点击状态
            itemObj.activeSty = true //改变样式
            itemObj.isClickAll = true //改变是否点击全部状态
            _t.keyWord = String(itemObj.id) //添加上送参数
            for(var i = 0;i<_t.keyWords.length;i++){
              if(i!==0){
                _t.keyWords[i].isClickStatus = false
                _t.keyWords[i].activeSty = false
              }
            }
          }else{
            var reg = new RegExp(String(itemObj.id),'g')
            _t.keyWords[0].isClickStatus = false //全部按钮改变点击状态
            _t.keyWords[0].activeSty = false //全部按钮改变样式
            _t.keyWords[0].isClickAll = false//全部按钮改变是否点击全部状态
            if(itemObj.isClickStatus){ //其他按钮点击取消
              itemObj.isClickStatus = false //其他按钮状态置为false
              itemObj.activeSty = false //样式跟着改变
              _t.keyWord= _t.keyWord.replace(reg,'') //上送数据删除点击取消的那个按钮的id
              if(_t.keyWord===''){//判断取消完后 默认全部选项
                _t.keyWords[0].isClickStatus = true //全部选项的点击状态置为true
                _t.keyWords[0].activeSty = true //激活样式也置为true
                _t.keyWords[0].isClickAll = true //是否点击全部置为true
              }
            }else{
              itemObj.isClickStatus = true
              itemObj.activeSty = true
              _t.keyWord+=itemObj.id
            }
          }
          console.log(_t.keyWord)
          _t.reqProjectList(_t.defaultPageNum)
        },
        // 领域请求
        reqareaList:function () {
          var _t = this
          _t.$post('/project/domain',{}).then(function (res) {
            if(res.status==='success'){
              var areaDealToArr = [] //领域列表转换成数组
               for(var key in res.data){
                   var obj = {}
                   obj.id = key
                   obj.name = res.data[key]
                   obj.activeSty = false
                   obj.isClickStatus = false
                   areaDealToArr.push(obj)
               }
              _t.areaList =_t.areaList.concat(areaDealToArr)
              _t.reqAreaList = _t.areaList //总集合存储进去
              if(_t.areaList.length>9){
                _t.area_showAll = true //领域展开全部
                _t.areaList =  _t.areaList.slice(0,9)
              }else{
                _t.area_showAll = false
              }
              _t.reqKeyWordsList ()//关键词接口调用
            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        //关键词请求
        reqKeyWordsList:function () {
          var _t = this
          _t.$post('/project/stage',{}).then(function (res) {
            if(res.status==='success'){
              var stageDealToArr = [] //海外项目列表转换成数组
              for(var key in res.data){
                var obj ={}
                obj.id = key
                obj.name = res.data[key]
                obj.activeSty = false
                obj.isClickStatus = false
                stageDealToArr.push(obj)
              }
              _t.keyWords =_t.keyWords.concat(stageDealToArr)
              _t.reqKeyWords = _t.keyWords //将总数据存储在全局变量中
              if(_t.keyWords.length>9){//如果超出九个
                _t.keyWord_showAll =true
                _t.keyWords = _t.keyWords.slice(0,9)
              }else{
                _t.keyWord_showAll =false
              }
            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        keyWord_showAll_fn:function () { //关键词点击展开全部
          _t.keyWords =  _t.reqKeyWords //恢复总数据
          _t.keyWord_showAll =false
        },
        area_showAll_fn:function () { //领域点击展开全部
          _t.areaList = _t.reqAreaList //恢复总数据
          _t.area_showAll = false
        }
      }
    }
</script>

<style scoped>
@import "../../assets/css/roadshow/service.css";
[v-cloak] {
  display: none;
}
</style>
