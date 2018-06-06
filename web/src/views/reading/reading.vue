<template>
  <div class="main">
    <read-com :id="itemId"  @getTagId="get_tagId" @getTagName="get_tagName"></read-com>
   <div class="reading-newListBox">
      <div class="reading-newListBox-title" v-cloak>{{totalTitle}}</div>
      <div class="reading-newList" v-for="(val,idx) in listArr" :key="idx">
        <div @click="currentNewsDetail(val)" class="reading-newList-title"><span>{{val.title}}</span></div>
        <div class="reading-newList-content">
          {{val.describe}}
        </div>
        <img class="reading-newList-image" :src="val.pic" alt="">
        <div class="reading-writerMess">
          <ul>
            <li>
            </li>
            <li><img :src="val.author_pic?val.author_pic:'/static/images/icon/author.svg'" alt=""  style="width: 36px;height: 36px;border-radius: 20px;cursor: pointer" @click="toAuthorPage(val.author_id)"> <span>{{val.author}} · {{val.release_at}}</span></li>
            <li>
              <embed src="/static/images/public/tag.svg" type="image/svg+xml"  />
            </li>
            <li>
              <span>{{val.class_name_text}}</span>
            </li>
          </ul>
          <ul>
            <li>
              <embed src="/static/images/public/readNums.svg" type="image/svg+xml"  />
            </li>
            <li class="readingNum">&nbsp;<span>{{val.views}}</span></li>
            <li>
              <embed src="/static/images/public/clickGoodNum.svg" type="image/svg+xml"  />
            </li>
            <li class="readingNum">&nbsp;<span>{{val.link_num}}</span></li>
            <li>
              <embed src="/static/images/public/collectNum.svg" type="image/svg+xml"  />
            </li>
            <li class="readingNum">&nbsp;<span>{{val.collection_num}}</span></li>
          </ul>
        </div>
      </div>
      <div class="reading-loadingMore">
        <span @click="loadingMore" v-if="isShowMore">加载更多<br><i class="el-icon-arrow-down"></i></span>
        <div v-else class="noMore">已经没有更多啦~~~ </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ReadCom from "../../components/reading/readingCom"

  export default {
    data() {
      return {
        listArr:[],
        currentPage:1,
        isShowMore:true,
        itemId:'', //导航分类ID
        totalTitle:'' //导航分类名

      }
    },
    created:function(){
      var _t =this
      _t.itemId = _t.$route.params.id
      // _t.totalTitle = _t.$route.params.name
    },
    methods:{
      get_tagId:function () { //初始化开始数据
        var _t = this;
        _t.itemId = _t.$route.params.id
        // _t.totalTitle = _t.$route.params.name
        _t.currentPage = 1
        _t.listArr = []
        _t.isShowMore=true
        _t.requestData()
      },
      get_tagName:function (data) {
        var _t = this;
        _t.totalTitle = data.name
      },
      requestData:function () {
        var _t = this
        var extend =_t.$extend({
          api_token:'cf8b309d967d374ee131029020d012a1',
          time:'1523411374'
        },{
          tag_id:  _t.itemId,
          page:_t.currentPage
        })

        var req = _t.$get("/aritcle", extend); //资讯列表接口
        req.then((value) => {
          if(value.data.length!==0){
            _t.isShowMore = true
            _t.listArr = _t.listArr.concat(value.data)
            for(var i = 0;i<_t.listArr.length;i++){
              _t.listArr[i].class_name_text = _t.listArr[i].class_name[_t.itemId]
            }

          }else{
            _t.isShowMore = false
          }

        }, err => {
          console.log(err);
        })
      },
      loadingMore:function () { //点击加载更多
        var _t = this
        _t.currentPage++
        _t.requestData()
      },
      currentNewsDetail:function (obj) { //点击当前新闻列表
        var _t  =this
        _t.$router.push({name:'Article',params:{id:obj.id}})

      },
      toAuthorPage:function (authorId) { //跳转作者详情页
       var _t =this
        _t.$router.push({name:'Author',params:{authorId:authorId}})
      }
    },
    components: {ReadCom},
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": function () {
        var _t = this
        _t.itemId = _t.$route.params.id
        // _t.totalTitle = _t.$route.params.name;
        _t.get_tagId() //初始化数据
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/css/reading/reading.css";
</style>
