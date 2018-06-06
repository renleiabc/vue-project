import {post, get, patch, put, cut} from '../../util/http'

const home = {
  //vuex的配置
  state: {
    tagTitle: "",
    tagData: "",
    tagLinks: "",
    carousel: "",
    homeLoad: false,
    homeFinish: true,
    index: "",
    recommend: "",
    tagNext: "",
    currentPage: "",
    tag_id: "",
    tabs: [
      {sign: "•", title: "最新文章", isActive: true, tag_id: ""},
      {sign: "/", title: "创新药", isActive: false, tag_id: 8},
      {sign: "/", title: "精准医疗 ", isActive: false, tag_id: 9},
      {sign: "/", title: "区块链", isActive: false, tag_id: 4},
      {sign: "/", title: "肿瘤免疫", isActive: false, tag_id: 10},
      {sign: "/", title: "医疗器械", isActive: false, tag_id: 11},
      {sign: "/", title: "基因检测", isActive: false, tag_id: 12},
    ],
    author: []
  },
  mutations: {
    //点击文章标签改变数据，和颜色标签的颜色
    theLabel(state, {indexLable}) {
      for (var i = 0; i < state.tabs.length; i++) {
        state.tabs[i].isActive = false;
      }
      state.tabs[indexLable].isActive = true;
      var tag_id = state.tabs[indexLable].tag_id;
      state.tag_id = tag_id;
      get("/aritcle", {tag_id: tag_id}).then(res => {
        if (res.status == "success" && res.code == 200) {
          for(var i=0; i< res.data.length;i++){
            if(res.data[i].author_pic == "" || res.data[i].author_pic == false){
              res.data[i].author_pic = "/static/images/icon/author.svg"
            }else{
              res.data[i].author_pic = res.data[i].author_pic
            }
          }
          state.tagData = class_name(res.data);
          state.tagNext = res.links.next;
          state.currentPage = res.meta.current_page;
          if (state.tagNext == null) {
            state.homeLoad = false;
            state.homeFinish = true;
          } else {
            state.homeLoad = true;
            state.homeFinish = false;
          }
          if (state.tagData.length == 0) {
            state.homeFinish = false;
          }
        } else {
          state.tagData = [];
        }
      })
    },
    tagData(state, res) {//默认情况下获取文章列表
      if (res.status == "success" && res.code == 200) {
        state.tagData = class_name(res.data);
        for(var i=0; i< res.data.length;i++){
          if(res.data[i].author_pic == "" || res.data[i].author_pic == false){
            res.data[i].author_pic = "/static/images/icon/author.svg"
          }else{
            res.data[i].author_pic = res.data[i].author_pic
          }
        }
        state.tagNext = res.links.next;
        state.tag_id = state.tabs[0].tag_id;
        state.currentPage = res.meta.current_page;
        if (state.tagNext == null) {
          state.homeLoad = false;
          state.homeFinish = true;
        } else {
          state.homeLoad = true;
          state.homeFinish = false;
        }
        if (state.tagData.length == 0) {
          state.homeFinish = false;
        }
      } else {
        state.tagDate = [];
      }
    },
    homeCarousel(state, res) {//获取轮播图
      if (res.status == "success" && res.code == 200) {
        state.carousel = res.data;
        //console.log(JSON.stringify(state.carousel));
      } else {
        state.carousel = [];
      }
    },
    homeRecommend(state, res) {//改变海外创新推荐数据
      if (res.status == "success" && res.code == 200) {
        state.recommend = res.data;
      } else {
        state.recommend = [];
      }
    },
    recommend(state,{_t,index}){//点击海外创新推荐数据，获取详情内容；
      let id = state.recommend[index].id;
      window.localStorage.removeItem("serviceDetailItem");
      window.localStorage.removeItem('formServicePath')
      let serviceDetailItem =state.recommend[index];
      let itemStr = JSON.stringify(serviceDetailItem);
      window.localStorage.setItem('serviceDetailItem', itemStr);
      window.localStorage.setItem('formServicePath', 'homePath');
      _t.$router.push({name:'Service'});
    },
    moreData(state, {morePage, tag_id}) {//获取下一页的咨询列表
      var prams = {
        tag_id: tag_id,
        page: morePage
      };
      get("/aritcle", prams).then(res => {
        if (res.status == "success" && res.code == 200) {
          let data = class_name(res.data);
          for(var i=0; i<data.length;i++){
            if(data[i].author_pic == "" || data[i].author_pic == false){
              data[i].author_pic = "/static/images/icon/author.svg"
            }else{
              data[i].author_pic = data[i].author_pic
            }
            state.tagData.push(data[i]);
          }
          state.tagNext = res.links.next;
          state.currentPage = res.meta.current_page;
          if (state.tagNext == null) {
            console.log(state.tagNext)
            state.homeLoad = false;
            state.homeFinish = true;
          } else {
            state.homeLoad = true;
            state.homeFinish = false;
          }
          if (state.tagData.length == 0) {
            state.homeFinish = false;
          }
        } else {
          state.tagData = [];
        }
      }, err => {
        if (err == undefined) {
          console.log("获取咨询列表下一页的数据！");
        }
      })
    },
    homeAuthor(state, res) {
      if (res.status === "success" && res.code === 200) {
       let authorData = res.data;
       for(var i = 0; i < authorData.length; i++) {
         let authorObj = {};
         authorObj.id = authorData[i].aritcle[0].id;
         authorObj.name = authorData[i].name;
         authorObj.authorId = authorData[i].aritcle[0].author
         authorObj.title = authorData[i].aritcle[0].title;
         if(authorData[i].is_follow===0){ //未关注
           authorObj.isUnAttention = true
           authorObj.attentionText = '关注'
         }else{//已关注
           authorObj.isUnAttention = false
           authorObj.attentionText = '已关注'
         }

        authorObj.class_name_text = class_name(authorData[i].aritcle)[0].class_name;
         if (authorData[i].describe == null) {
           authorObj.describe = "";
         } else {
           authorObj.describe = authorData[i].describe;
         }
         if (authorData[i].pic == "" || authorData[i].pic == false) {
           authorObj.pic = "/static/images/icon/author.svg";
         } else {
           authorObj.pic = authorData[i].pic;
         }
          state.author.push(authorObj);
        }
      } else {
        state.author = [];
      }
    },
  },
  actions: {
    getHomeTitle(context) {
      var tagId = context.state.tabs[0].tag_id;
      get("/aritcle", {tag_id: tagId}).then(res => {
        context.commit("tagData", res)
      }, err => {
        if (err == undefined) {
          console.log("获取咨询列表未连接！");
        }
      })
    },
    getCarousel({commit}) {//请求轮播图数据
      post("/slide/list",{position:"index"}).then(res => {
        commit("homeCarousel", res)
      }, err => {
        if (err == undefined) {
          console.log("获取轮播图未连接！");
        }
      })
    }
    ,
    getRecommend({commit}) {//请求海外创新推荐
      post("/project/recommend").then(res => {
        commit("homeRecommend", res)
      }, err => {
        if (err == undefined) {
          console.log("获取热门推荐未连接！");
        }
      })
    },
    getAuthor({commit}) {//获取热门作者
      post("/author").then(res => {
        commit("homeAuthor", res);
      }, err => {
        if (err == undefined) {
          console.log("获取热门作者未连接！");
        }
      })
    }
  }
  ,
  getters: {
    homeTabs: (state) => {
      var tabs = state.tabs;
      return tabs;
    },
    tagData:
      (state) => {
        var tagData = state.tagData;//标签处理函数调用
        return tagData;
      },
    tagNext:
      (state) => {//下一页；
        var tagDate1 = state.tagNext;
        return tagDate1;
      },
    carousel:
      (state) => {
        var carousel = state.carousel;
        return carousel;
      },
    recommend:
      (state) => {
        var recommend = state.recommend;
        return recommend;
      },
    homeLoad:
      (state) => {
        var recommend = state.homeLoad;
        return recommend;
      },
    homeFinish:
      (state) => {
        var recommend = state.homeFinish;
        return recommend;
      },
    authorData:
      (state) => {
        var author = state.author;
        return author;
      }
  }
}
export default home
