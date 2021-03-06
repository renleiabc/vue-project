/*会员信息*/
import {post, get, patch, put, cut} from '../../util/http'

const moduleLecture = {
  //vuex的配置
  state: {
    token: "",
    powerData: "",
    memberName: "",
    level_name: "",
    industry: [],
    collection: [],
    lecture: "",
    research: "",
    collNext: "",
    collTotal: "",
    per_page: "",
    pageNow: "",
    collId: [],
  },
  mutations: {
    getToken(state) {
      var token = getCookie("meibo")
      state.token = token;
    },
    jurisdiction(state, res) {
      if (res.status == "success" && res.code == 200) {
        var powerName = res.data.name;
        var powerEmail = res.data.email;
        var powerPhone = res.data.phone;
        var powerNickname = res.data.nickname;
        let indObj = {};
        indObj.type = "info";
        if (res.data.industry == null) {
          indObj.name = "";
          state.industry = [];
        } else {
          indObj.name = res.data.industry;
          state.industry.push(indObj);
        }
        state.level_name = res.data.level_name;
        if (powerName) {
          state.memberName = powerName;
          return;
        } else if (powerPhone) {
          state.memberName = powerPhone;
          return;
        } else if (powerEmail) {
          state.memberName = powerEmail;
          return;
        } else if (powerNickname) {
          state.memberName = powerNickname;
          return;
        }
      } else {
        state.memberName = "";
        state.level_name = "";
      }
    },
    mycollection(state, res) {
      if (res.status == "success" && res.code == 200) {
        state.collNext = res.links.next;
        state.collTotal = res.meta.total;
        state.per_page = res.meta.per_page;
        var collection = res.data;
        if (collection.length == 0) {
          state.pageNow = false;
        } else {
          for (var i = 0; i < collection.length; i++) {
            if (collection[i].author_pic == "" || collection[i].author_pic == false) {
              collection[i].author_pic = "/static/images/public/poeple.jpg";
            }
            state.collId.push(collection[i].id);
          }
          state.collection=collection;
          state.pageNow = true;
        }
      } else {
        state.collection = [];
      }
    },
    myLecture(state, res) {
      if (res.status == "success" && res.code == 200) {
        var lecture = res.data;
        for(var i=0;i<lecture.length;i++){
          if(lecture[i].pic == "" || lecture[i].pic == false){
            lecture[i].pic = "/static/images/public/pic1.jpg"
          }
        };
        state.lecture = lecture;
      } else {
        state.lecture = [];
      }
    },
    pagingClicks(state, {val}) {
      //console.log(val);
      get("/user/mycollection", {page: val}).then(res => {
        //console.log(JSON.stringify(res));
        console.log(val)
        if (res.status == "success" && res.code == 200) {
          /* state.collNext = res.links.next;
           state.collTotal = res.meta.total;
           state.per_page = res.meta.per_page;*/
          var collection = res.data;

          for (var i = 0; i < collection.length; i++) {
            //console.log(collection[i]);
            if (collection[i].author_pic == "" || collection[i].author_pic == false) {
              collection[i].author_pic = "/static/images/public/poeple.jpg";
            }
            state.collection.push(collection[i]);
            state.collId.push(collection[i].id);
          }
          //console.log(JSON.stringify(state.collection));
        } else {
          state.research = [];
        }
      }, err => {
        if (err == undefined) {
          console.log("获取我的开讲失败！");
        }
      })
    },
    cancelClicks(state, {article_id}) {//发送取消收藏的内容；
      post("/user/removecollection", {article_id: article_id}).then(res => {
        //console.log(JSON.stringify(res));
        if (res.status == "success" && res.code == 200) {
          get("/user/mycollection").then(res => {
            //console.log(JSON.stringify(res));
            if (res.status == "success" && res.code == 200) {
              var collection = res.data;
              for (var i = 0; i < collection.length; i++) {
                //console.log(collection[i]);
                if (collection[i].author_pic == "" || collection[i].author_pic == false) {
                  collection[i].author_pic = "/static/images/public/poeple.jpg";
                }
                state.collId.push(collection[i].id);
              }
              state.collection=collection;
            } else {
              state.research = [];
            }
          }, err => {
            if (err == undefined) {
              console.log("获取我的开讲失败！");
            }
          })
          if (state.collection.length == 0) {
            state.pageNow = false;
          } else {
            state.pageNow = true;
          }
        }
      }, err => {
        if (err == undefined) {
          console.log("取消收藏失败！");
        }
      })
    },
    saveClicks(state, {index}) {//把标题存入localStrage当中；
      window.localStorage.removeItem("itemObj");
      var saveObj = state.collection[index];
      saveObj.class_name_text = saveObj.class_name;
      let itemStr = JSON.stringify(saveObj);
      window.localStorage.setItem('itemObj', itemStr);
    },
    lectureClicks(state, {index,_t}){ //我的开讲
      var id = state.lecture[index].id;
      window.localStorage.removeItem('normalPath')
      window.localStorage.setItem('normalPath','userPath');
      _t.$router.push({name:'LectureDetail',params:{id:id}});
    },
    myResearch(state, res) {//我的行研
      if (res.status == "success" && res.code == 200) {
       var research = res.data;
        for(var i=0;i<research.length;i++){
          if(research[i].pic == "" || research[i].pic == false){
            research[i].pic = "/static/images/public/pic1.jpg"
          };
          if(research[i].dir_file == null){
            research[i].dir=false;
          }else{
            research[i].dir=true;
          };
          if(research[i].report_file == null){
            research[i].report=false;
          }else{
            research[i].report=true;
          }
        };
        state.research = research;
      } else {
        state.research = [];
      }
    },
    clickResearch(state,{index,_t}){
      let id = state.research[index].id;
      _t.$router.push({name:'ResearchDetail',params:{id:id}});
    }
  },
  actions: {
    getJurisdiction(context) {//获取个人信息
      //判断cookie是否存在；
      if (context.state) {
        post("/user").then(res => {
          context.commit("jurisdiction", res)
        }, err => {
          if (err == undefined) {
            console.log("获取我的收藏失败！");
          }
        })
      }
    },
    getMycollection(context) {//获取我的收藏
      //判断cookie是否存在；
      if (context.state) {
        get("/user/mycollection").then(res => {
          context.commit("mycollection", res)
        }, err => {
          if (err == undefined) {
            console.log("获取会员信息失败！");
          }
        })
      }
    },
    getMyLecture(context) {//默认获取我的开讲我的开讲
      //判断cookie是否存在；
      if (context.state) {
        get("/user/lottery").then(res => {
          context.commit("myLecture", res)
        }, err => {
          if (err == undefined) {
            console.log("获取我的开讲失败！");
          }
        })
      }
    },
    getMyResearch(context) {//默认获取的行研
      //判断cookie是否存在；
      if (context.state) {
        get("/user/industry").then(res => {

          context.commit("myResearch", res)
        }, err => {
          if (err == undefined) {
            console.log("获取我的行研失败！");
          }
        })
      }
    },
  },
  getters: {
    memberInf: (state) => {
      let memberInf = {};
      memberInf.memberName = state.memberName;
      memberInf.level_name = state.level_name;
      return memberInf;
    },
    industry: (state) => {
      let industry = state.industry;
      return industry;
    },
    collection: (state) => {
      var tagData = class_name(state.collection);//标签处理函数调用
      return tagData;
    },
    lecture: (state) => {
      return state.lecture
    },
    research: (state) => {
      return state.research
    },
    paging: (state) => {
      let paging = {};
      paging.collNext = state.collNext;
      paging.collTotal = state.collTotal;
      paging.per_page = state.per_page;
      paging.collTotal = state.collTotal;
      return paging;
    },
    collTotal: (state) => {
      return state.collTotal
    },
    per_page: (state) => {
      return state.per_page
    },
    collId: (state) => {
      let collId = unique(state.collId);
      return collId;
    },
    pageNow: (state) => {
      return state.pageNow;
    }
  }
}
export default moduleLecture;
