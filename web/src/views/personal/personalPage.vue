<template>
    <div class="authorBox">
      <div class="authorBox_top">
        <div class="authorBox_top_left">
          <p class="introduce">
            {{authorData.introduce}}
          </p>
          <p class="name">
            {{authorData.pseudonym}}
          </p>
          <p class="introduction">
            {{authorData.introduction}}
          </p>
          <div v-if="!is_self">
            <p class="attention_item" v-if="is_follow">
              <span @click="attentionTA">关注TA</span>
            </p>
            <p class="attention_item1" v-else>
              <span @click="attentioned">已关注</span>
            </p>
          </div>
        </div>
        <div class="authorBox_top_right">
         <div class="img_box">
           <img :src="authorData.photo" alt="">
         </div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="authorBox_article_list">
        <p class="article_title">
          共{{articleNum}}篇文章
        </p>
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
              <li><span>{{val.release_at}}</span></li>
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
        <div style="clear: both"></div>
      </div>
      <register-from v-if="registerVisible" :register="registerVisible" @registerValue="register($event)"></register-from>
    </div>
</template>

<script>
  import RegisterFrom from "../../components/mian/register"
    export default {
       data(){
         return{
           authorId:this.$route.params.authorId,
           authorData:{},
           listArr:[],
           currentPage:1,
           isShowMore:true,
           articleNum:0,
           registerVisible:false,
           is_follow:true, //默认未关注
           is_self:false //默认非自己
         }
       },
      components: {RegisterFrom},
      created:function () {
       var _t= this
        _t.is_follow=true //默认未关注
       _t.$post('/author/info',{
         user_id:parseFloat(_t.authorId)
       }).then(function (res) {
         if(res.status === "success" && res.code === 200){
            _t.authorData = res.data
           if(_t.isLogn()){ //已登录
             if(JSON.parse(window.sessionStorage.getItem('userInfo')).id===parseFloat(_t.authorId)){
               //自己id不让显示
               _t.is_self = true
             }else{
               //非自己id让显示
               _t.is_self = false
             }
             if(_t.authorData.is_follow===0){ //未关注
               _t.is_follow=true //默认未关注
             }else{
               _t.is_follow=false //默认未关注
             }
           }else{ //未登录
             _t.is_follow=true //默认未关注
             _t.is_self=false //默认非自己
           }
           _t.requestData()
         }else{
           _t.$message.error(res.message)
         }
       },function (err) {
         _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
       })
      },
      methods:{
        requestData:function () {
          var _t = this
          var req = _t.$post("/author/article", {user_id:parseFloat(_t.authorId),page:_t.currentPage}); //资讯列表接口
          req.then((value) => {
            if(value.status === "success" && value.code === 200){
              if(value.data.length!==0){
                _t.isShowMore = true
                _t.listArr = _t.listArr.concat(value.data)
                _t.articleNum = value.meta.total
                for(var i = 0;i<_t.listArr.length;i++){
                  var obj = _t.listArr[i].class_name
                  var arr = []
                  for(var key in obj){
                    arr.push(obj[key])
                  }
                  _t.listArr[i].class_name_text = arr[0]
                }
              }else{
                _t.isShowMore = false
              }
            }else{
              _t.$message.error(value.message);
            }
          }, err => {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        },
        currentNewsDetail:function (obj) { //点击当前新闻列表
          var _t  =this
          _t.$router.push({name:'Article',params:{id:obj.id}})

        },
        loadingMore:function () { //点击加载更多
          var _t = this
          _t.currentPage++
          _t.requestData()
        },
        attentionTA:function () { //关注作者
          var _t =this
          _t.registerVisible = false
          if(_t.isLogn()){ //已登录
            _t.$post('/author/attentionAuthor',{
              user_id:parseFloat(_t.authorId)
            }).then(function (res) {
              if(res.status === "success" && res.code === 200){
                  _t.is_follow = false //已关注
              }else{
                _t.$message.error(res.message)
              }
            },function (err) {
              _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
            })
          }else{ //未登录
          _t.registerVisible = true
          }

        },
        isLogn: function () { //是否登录
          var _t = this
          return _t.getCookie('meibo')
        },
        register(val) {
          this.registerVisible = false;
        },
        attentioned:function () { //取消关注
          var _t =this
          _t.$post('/author/cancleAttentionAuthor',{
            user_id:parseFloat(_t.authorId)
          }).then(function (res) {
            if(res.status === "success" && res.code === 200){
              _t.is_follow = true //未关注
            }else{
              _t.$message.error(res.message)
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }
      }
        /*components: {TopNav,BrighterFooter}*/
    }
</script>

<style scoped>
.authorBox{
  width: 1180px;
  margin: 80px auto 0;
}
  .introduce{
    color: #383838;
    font-size: 16px;
    opacity: .5;
  }
  .authorBox_top_left{
    float: left;
    width: 59%;
  }
  .authorBox_top_right{
    float: left;
    width: 41%;
  }
  .name{
    color: #383838;
    font-size: 48px;
    margin-top: 29px;
  }
  .introduction{
    font-size: 16px;
    color: #383838;
    line-height: 28px;
    text-align: justify;
    word-break: break-word;
    margin-top: 28px;
  }
.attention_item,.attention_item1{
  margin-top: 60px;
}
  .attention_item>span{
    width: 200px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    background: #383838;
    cursor: pointer;
    font-size: 16px;
  }
  .attention_item1>span{
    width: 200px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    color: #383838;
    background: #ffffff;
    cursor: pointer;
    border: 1px solid #383838;
  }
  .img_box{
    width: 380px;
    height: 380px;
    border: 5px solid #ABCA11;
    float: right;

  }
  .img_box>img{
    width: 380px;
    height: 380px;
    position: relative;
    top: -25px;
    right: 25px;
  }
  .article_title{
   border-left: 6px solid #AAD164;
    height: 25px;
    line-height: 25px;
    padding-left: 20px;
    color: #383838;
    font-size: 24px;
    margin-bottom: 54px;

  }
  .authorBox_article_list{
    margin-top: 150px;
  }
.reading-newList{
  float: left;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(199,199,199,0.5);
  position: relative;
}
.reading-newList:hover >.reading-newList-title>span{
  color: #669934;
}
.reading-newList-title{
  width: 695px;
  margin-bottom: 24px;
  float: left;
}
.reading-newList-title>span{
  font-family: MicrosoftYaHei;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 34px;
  letter-spacing: 0px;
  color: #383838;
  cursor: pointer;
}
.reading-newList-content{
  width: 695px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #615e5d;
  float: left;
  margin-bottom: 24px;
}
.reading-newList-image{
  margin-left: 27px;
  position: absolute;
  bottom: 25px;
  right: 0;
  width: 140px;
  height: 105px;
}
.reading-writerMess{
  width: 695px;
  float: left;
}
.reading-writerMess>ul:first-child,.reading-writerMess>ul:first-child>li{
  float: left;
}
.reading-writerMess>ul:last-child{
  float: right;
}
.reading-writerMess>ul:last-child>li{
  float: left;
}
.reading-writerMess>ul:first-child>li:first-child{
  margin-right: 10px;
}
.reading-writerMess>ul:first-child>li:nth-child(2){
  height: 36px;
  line-height: 36px;
  margin-right: 20px;
}
.reading-writerMess>ul:first-child>li:nth-child(3){
  height: 36px;
  margin-right: 5px;
}
.reading-writerMess>ul:first-child>li:nth-child(4){
  height: 36px;
  line-height: 36px;
}
.reading-writerMess>ul:first-child>li:nth-child(2)>span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #615e5d;

}
.reading-writerMess>ul:first-child>li:nth-child(4)>span{
  font-family: MicrosoftYaHei;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #615e5d;
}
embed{
  width: 14px;
  height:16px;
  margin-top: 10px;
}
.readingNum{
  height: 36px;
  line-height: 36px;
  margin-right: 10px;
  font-size: 12px;
  color: #615e5d;
}
.reading-loadingMore{
  padding: 15px 0;
  float: left;
  width: 100%;
  text-align: center;
}
.reading-loadingMore>span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #615e5d;
  cursor: pointer;
}
.reading-loadingMore>span:hover{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #669934;
  cursor: pointer;
}
.reading-loadingMore>span>i{
  font-size: 24px;
}
</style>
