/*搜索界面*/
import {get} from "../../util/http";

const moduleSearch = {
  //vuex的配置
  state: {
    keyword: "",
    searchData: "",
    searchNext: "",
    searchPage: "",
    searchLoad: "",
    searchFinish: "",
    searchLenght: 0
  },
  mutations: {
    searchKey(state,res) {
        if (res.status == "success" && res.code == 200) {
          for(var i=0; i< res.data.length;i++){
            if(res.data[i].author_pic == "" || res.data[i].author_pic == false){
              res.data[i].author_pic = "/static/images/icon/author.svg"
            }else{
              res.data[i].author_pic = res.data[i].author_pic
            }
          };
          state.searchData =  class_name(res.data);
          state.searchLenght = res.meta.total;
          state.searchNext = res.links.next;
          state.searchPage = res.meta.current_page;
          if (state.searchNext == null) {
            state.searchLoad = false;
            state.searchFinish = true;
          } else {
            state.searchLoad = true;
            state.searchFinish = false;
          }
          if (state.searchData.length == 0) {
            state.searchFinish = true;
          }
        } else {
          state.searchData = [];
        }
    },
    searchData(state, getSearchData) {
      state.searchData = getSearchData.data.data;
      state.searchLenght = getSearchData.lenght;
    },
    searchNext(state, {page, kew}) {
      let parms = {
        keywords: kew,
        page: page
      }
      get("/aritcle", parms).then(res => {
        //console.log(JSON.stringify(res))
        if (res.status == "success" && res.code == 200) {
          state.searchLenght = res.meta.total;
          let data =  class_name(res.data);
          for(var i=0; i< data.length;i++){
            if(data[i].author_pic == "" || data[i].author_pic == false){
              data[i].author_pic = "/static/images/icon/author.svg"
            }else{
              data[i].author_pic = data[i].author_pic
            }
            state.searchData.push(data[i]);
          };
          state.searchNext = res.links.next;
          state.searchPage = res.meta.current_page;
          if (state.searchNext == null) {
            console.log(state.searchNext)
            state.searchLoad = false;
            state.searchFinish = true;
          } else {
            state.searchLoad = true;
            state.searchFinish = false;
          }
          if (state.searchData.length == 0) {
            state.searchFinish = true;
          }
        } else {
          state.searchData = [];
        }
      }, err => {
        if (err == undefined) {
          console.log("获取搜索列表数据失败！");
        }
      })
    },
    searchLabel(state,index){
      window.localStorage.removeItem("itemObj");
      var saveObj = state.searchData[index];
      saveObj.class_name_text = saveObj.class_name;
      let itemStr = JSON.stringify(saveObj);
      window.localStorage.setItem('itemObj', itemStr);
    },
    searchKeyDown(state,{result}){
      get("/aritcle", {keywords:result}).then(res => {
        //console.log(JSON.stringify(res))
        if (res.status == "success" && res.code == 200) {
          state.searchLenght = res.meta.total;
          if(res.data.length != 0){
            for(var i=0; i< res.data.length;i++){
              if(res.data[i].author_pic == "" || res.data[i].author_pic == false){
                res.data[i].author_pic = "/static/images/icon/author.svg"
              }else{
                res.data[i].author_pic = res.data[i].author_pic
              }
            };
          }
          state.searchData=class_name(res.data);
          state.searchNext = res.links.next;
          state.searchPage = res.meta.current_page;
          if (state.searchNext == null) {
            state.searchLoad = false;
            state.searchFinish = true;
          } else {
            state.searchLoad = true;
            state.searchFinish = false;
          }
          if (state.searchData.length == 0) {
            state.searchFinish = true;
          }
        } else {
          state.searchData = [];
        }
      }, err => {
        if (err == undefined) {
          console.log("获取搜索列表数据失败！");
        }
      })
    }
  },
  actions: {
    getSearchData(context,{word}) {
      get("/aritcle", {keywords:word}).then(res => {
        context.commit("searchKey", res)
      }, err => {
        if (err == undefined) {
          console.log("获取咨询列表未连接！");
        }
      })
    }
  },
  getters: {
    searchData: (state) => {
      var searchData =state.searchData;
      return searchData;
    },
    searchLenght: (state) => {
      var searchLenght = state.searchLenght;
      return searchLenght;
    },
    searchLoad: (state) => {
        var searchLoad = state.searchLoad;
        return searchLoad;
      },
    searchFinish: (state) => {
        var searchFinish = state.searchFinish;
        return searchFinish;
      },
    searchPage:(state) =>{//获取当前的页码
      var searchPage = state.searchPage;
      return searchPage;
    }
  }
}
export default moduleSearch;
