/*作者模块*/
import {post, get} from "../../util/http";

const moduleAuthor = {
  //vuex的配置
  state: {
    income: "",
    listIncome: "",
    isPage: false,
    totalPage: 1,
    perPage: 1,
    listPage: "",
    detailIncome: [],
    total_income: false,
    smallPage: "",
    yearIncome: [],
    isYear: false,
    yearPage: "",
    monthevery: [],
    aritcle: "",
    isAritcle: false,
    isAritclePage: false,
    aritclePage: "",
    aritcleComment:"",
    comPage:"",
    isAritcleData:true
  },
  mutations: {
    income(state, res) {//获取作者总收入和月收入
      if (res.status === "success" && res.code === 200) {
        state.income = res.data;
        let total_income = res.data.total_income;
        if (total_income == 0.00) {
          state.total_income = false;
        } else {
          state.total_income = true;
        }
      } else {
        state.income = {};
      }
    },
    listIncome(state, res) {//获取文章列表（我的收入页面中）
      if (res.status === "success" && res.code === 200) {
        let totalPage = res.meta.total;//总条数
        let per_page = res.meta.per_page;//每页的条数
        /*确定文章列表是否需要分页*/
        if (totalPage <= per_page) {
          state.isPage = false;
        } else {
          let bigPage = {};
          state.isPage = true;
          bigPage.totalPage = totalPage;
          bigPage.per_page = per_page;
          state.listPage = bigPage;
          console.log(state.listPage)
        }
        state.listIncome = res.data;
      } else {
        state.listIncome = [];
      }
    },
    detailIncome(state, res) {//文章详细收入（我的收入页面，单个文章收入流水）
      if (res.status === "success" && res.code === 200) {
        state.detailIncome = res.data;
        let smallObj = {};
        smallObj.total = res.meta.total;//总条数
        smallObj.pageSize = res.meta.per_page;//每页的条数
        smallObj.pageNum = Math.ceil(res.meta.total / res.meta.per_page);//页数
        state.smallPage = smallObj;
      } else {
        state.detailIncome = [];
      }
    },
    yearIncome(state, res) {//作者每年的收入列表统计（我的收入）
      if (res.status === "success" && res.code === 200) {
        state.yearIncome = res.data;
        let totalPage = res.meta.total;//总条数
        let per_page = res.meta.per_page;//每页的条数
        /*确定文章列表是否需要分页*/
        if (totalPage <= per_page) {
          state.isYear = false;
        } else {
          let bigPage = {};
          state.isYear = true;
          bigPage.totalPage = totalPage;
          bigPage.per_page = per_page;
          state.yearPage = bigPage;
          console.log(state.yearPage);
        }
      } else {
        state.listIncome = [];
      }
    },
    monthIncome(state, res) {//统计作者具体一年下每月的收入流水（我的收入
      if (res.status === "success" && res.code === 200) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].created_month = month(res.data[i].created_month);
        }
        state.monthevery = res.data;
        console.log(JSON.stringify(state.monthevery));
      } else {
        state.monthevery = [];
      }
    },
    myAritcle(state, res) {//我的文章
      if (res.status === "success" && res.code === 200) {
        state.aritcle = res.data;
        if(res.data.length==0){
          state.isAritcle = false;
        }else{
          state.isAritcle = true;
        }
        let totalPage = res.meta.total;//总条数
        let per_page = res.meta.per_page;//每页的条数
        /*确定文章列表是否需要分页*/
        if (totalPage <= per_page) {
          state.isAritclePage = false;
        } else {
          let bigPage = {};
          state.isAritclePage = true;
          bigPage.totalPage = totalPage;
          bigPage.per_page = per_page;
          state.aritclePage = bigPage;
          console.log(state.aritclePage);
        }
      } else {
        state.article = [];
      }
    },
    aritcleComment(state,res){//我的文章下面的评论的接口
      if (res.status === "success" && res.code === 200) {
        console.log(JSON.stringify(res));
        if(res.data.length == 0){
          state.isAritcleData = true;
        }else{
          state.isAritcleData = false;
        }
        state.aritcleComment = res.data;
        let smallCom = {};
        smallCom.total = res.meta.total;//总条数
        smallCom.pageSize = res.meta.per_page;//每页的条数
        smallCom.pageNum = Math.ceil(res.meta.total / res.meta.per_page);//页数
        state.comPage = smallCom;
        console.log(JSON.stringify(state.comPage))
      }else{
        state.aritcleComment=[]
      }
    }
  },
  actions: {
    getIncome(context) {//获取作者总收入和月收入
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        post("/user/income").then(res => {
          context.commit("income", res)
        }, err => {
          if (err == undefined) {
            console.log("获取作者总收入和月收入失败！");
          }
        })
      }
    },
    getlistIncome(context, {page}) {//获取文章列表（我的收入页面中）
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/user/income/article_list", {page:page}).then(res => {
          context.commit("listIncome", res);
        }, err => {
          if (err == undefined) {
            console.log("获取文章列表（我的收入页面中）失败！");
          }
        })
      }
    },
    getDetailIncome(context, {id, page}) {//文章详细收入（我的收入页面，单个文章收入流水）
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        console.log(id);
        var obj = {type: "article", type_id: id, page: page};
        post("/user/income/article_detail", obj).then(res => {
          context.commit("detailIncome", res);
        }, err => {
          if (err == undefined) {
            console.log("获取文章详细收入（我的收入页面，单个文章收入流水）失败！");
          }
        })
      }
    },
    getYearIncome(context, {page}) {//作者每年的收入列表统计（我的收入）
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        post("/user/income/annual", {page:page}).then(res => {
          context.commit("yearIncome", res);
        }, err => {
          if (err == undefined) {
            console.log("获取作者每年的收入列表统计（我的收入）！");
          }
        })
      }
    },
    getMonthIncome(context, {year}) {//统计作者具体一年下每月的收入流水（我的收入
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        post("/user/income/every_monthly", {year:year}).then(res => {
          context.commit("monthIncome", res);
        }, err => {
          if (err == undefined) {
            console.log("获取统计作者具体一年下每月的收入流水（我的收入)失败！");
          }
        })
      }
    },
    getMyAritcle(context,{page}) {//我的文章
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        post("/user/my_aritcle",{page:page}).then(res => {
          context.commit("myAritcle", res);
        }, err => {
          if (err == undefined) {
            console.log("获取我的文章失败！");
          }
        })
      }
    },
    getAritcleComment(context,{obj}) {//我的文章下面的评论的接口
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        post("/comment/list",obj).then(res => {
          context.commit("aritcleComment", res);
        }, err => {
          if (err == undefined) {
            console.log("获取我的文章下面的评论！");
          }
        })
      }
    },
  },
  getters: {
    total_income: function (state) {//判断是否有收入
      return state.total_income;
    },
    totalIncome: function (state) {//总收入
      return state.income;
    },
    listIncome: function (state) {//文章列表
      return state.listIncome;
    },
    isPage: function (state) {//确定是否需要分页
      return state.isPage;
    },
    listPage: function (state) {//文章列表分页对象
      return state.listPage;
    },
    detailIncome: function (state) {//每篇文章的收入详情
      return state.detailIncome;
    },
    smallPage: function (state) {//文章收入分页参数
      return state.smallPage;
    },
    yearIncome: function (state) {//作者每年的收入列表统计（我的收入）
      return state.yearIncome;
    },
    isYear: function (state) {//作者每年的收入(是否显示分页)
      return state.isYear;
    },
    yearPage: function (state) {//作者每年的收入（分页参数）
      return state.yearPage;
    },
    monthevery: function (state) {//统计作者具体一年下每月的收入流水（我的收入
      return state.monthevery;
    },
    aritcle: function (state) {//我的文章
      return state.aritcle;
    },
    isAritcle: function (state) {//是否显示我的文章
      return state.isAritcle;
    },
    isAritclePage: function (state) {//是否显示我的文章分页
      return state.isAritclePage;
    },
    aritclePage: function (state) {//我的的文章分页参数
      return state.aritclePage;
    },
    comPage: function (state) {//我的文章下面的评论分页参数
      return state.comPage;
    },
    aritcleComment: function (state) {//我的文章下面的评论数据
      return state.aritcleComment;
    },
    isAritcleData: function (state) {//是否有评论数据
      return state.isAritcleData;
    }
  },

}
export default moduleAuthor;
