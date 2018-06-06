import {get,post} from "../../util/http";

export default {
  //vuex的配置
  state: {
    article: [],
    lableData:[],
    readData:[],
    readNext:"",
    readLoad: false,
    readFinish: true,
    readPage:"",
    tag_id:""
  },
  mutations: {
    articleData(state,res){
      if (res.status == "success" && res.code == 200) {
        state.article = res.data;
      }else{
        state.article = [];
      }
    },
   isLabel(state, {index}) {
      for (var i = 0; i < state.lableData.length; i++) {
        state.lableData[i].isActive = false;
      }
      state.lableData[index].isActive = true;
      state.tag_id = state.lableData[index].tag_id;
    },
    articleList(state,res){//点击导航栏获取分类标签获分类列表；
      if (res.status == "success" && res.code == 200) {
        state.readData = class_name(res.data);
        for(var i=0; i< res.data.length;i++){
          if(res.data[i].author_pic == "" || res.data[i].author_pic == false){
            res.data[i].author_pic = "/static/images/icon/author.svg"
          }else{
            res.data[i].author_pic = res.data[i].author_pic
          }
        }
        state.readNext = res.links.next;
        state.readPage = res.meta.current_page;
        if (state.tagNext == null) {
          state.readLoad = false;
          state.readFinish = true;
        } else {
          state.readLoad = true;
          state.readFinish = false;
        }
        if (state.readData.length == 0) {
          state.readFinish = true;
        }
      } else {
        state.readData = [];
      }
    },
    navLable(state,res){
      if (res.status == "success" && res.code == 200) {
        let data = res.data;
        for(var i=0;i<data.length;i++){
          data[i].sign = "abc";
          if(i==0){
            data[i].sign = "•";
            data[i].isActive = true;
          }else{
            data[i].sign = "/";
            data[i].isActive = false;
          }
        }
        state.lableData =data;
      }else{
        state.tabsData = [];
      }
    },
    moreList(state, {morePage, tag_id}) {//获取下一页的咨询列表
      var prams = {
        tag_id: tag_id,
        page: morePage
      };
      get("/aritcle", prams).then(res => {
        if (res.status == "success" && res.code == 200) {
          let moreData = class_name(res.data)
          for(var i=0; i< moreData.length;i++){
            if(res.data[i].author_pic == "" || moreData[i].author_pic == false){
              moreData[i].author_pic = "/static/images/icon/author.svg"
            }else{
              moreData[i].author_pic = res.data[i].author_pic
            }
            state.tagData.push(moreData[i]);
          }
          state.readNext = res.links.next;
          state.readPage = res.meta.current_page;
          if (state.tagNext == null) {
            state.readLoad = false;
            state.readFinish = true;
          } else {
            state.readLoad = true;
            state.readFinish = false;
          }
          if (state.readData.length == 0) {
            state.readFinish = false;
          }
        } else {
          state.readData = [];
        }
      }, err => {
        if (err == undefined) {
          console.log("获取咨询列表下一页的数据失败！");
        }
      })
    },
    lableColor(state,{id,scroll}){
      var index = "";
      for (var i = 0; i < state.lableData.length; i++) {
        state.lableData[i].isActive = false;
        if(state.lableData[i].id == id){
          state.lableData[i].isActive = true;
          state.tag_id = state.lableData[i].tag_id;
          index = i;
        }
      }
      if(index >=9){
        index = 9;
      }else{
        index = index;
      }
      scroll.scrollTo(-index*88,0,30,{})
    }
  },
  actions: {
    getList(context,{id,scroll}) {
      get("/aritcle", {tag_id: id}).then(res => {
        context.commit("articleList", res);
        context.commit("lableColor",{res,id,scroll});
      }, err => {
        if (err == undefined) {
          console.log("获取文章详情未连接！");
        }
      })
    },
    getArticle(context,{id}) {
      post("/aritcle/detail", {id:id}).then(res => {
        context.commit("articleData", res)
      }, err => {
        if (err == undefined) {
          console.log("获取文章详情未连接！");
        }
      })
    },
    getLabel({commit}) {
      post("/tags").then(res => {
        commit("navLable", res)
      }, err => {
        if (err == undefined) {
          console.log("获取分类标签未连接！");
        }
      })
    },
  },
  getters: {
    readData:
      (state) => {
        var readData = state.readData;//标签处理函数调用
        return readData;
      },
    articleData:
      (state) => {
        var data = class_tag(state.article);//标签处理函数调用
        return data;
      },
    lableData:
      (state) => {
        var data = state.lableData;//标签
        return data;
      },
    readLoad:
      (state) => {
        var readLoad = state.readLoad;
        return readLoad;
      },
    readFinish:
      (state) => {
        var readFinish = state.readFinish;
        return readFinish;
      },
    readNext:
      (state) => {//下一页；
        var readNext = state.readNext;
        return readNext;
      },
  }
}

