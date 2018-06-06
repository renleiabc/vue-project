/*个人中心公用的模块*/
import {post, get} from "../../util/http";

const modulePersonal = {
  //vuex的配置
  state: {
    isComment: true,
    comment: "",
    commentPage: "",
    deleteComment: "",
    attentionList: "",
    isAttention: true,
    attentionPage: "",
    isAttentionPage: false,
    isCommentPage: false,
  },
  mutations: {
    myComment(state, res) {//个人中心我的评论列表接口（有文章标题）
      if (res.status === "success" && res.code === 200) {
        state.comment = res.data;
        let total = res.meta.total;//总条数
        let pageSize = res.meta.per_page;//每页的条数
        if (res.meta.total == 0) {
          state.isComment = false;
        } else {
          state.isComment = true;
        }
        if (total <= pageSize) {
          state.isCommentPage = false;
        } else {
          state.isCommentPage = true;
        }
        let smallCom = {};
        smallCom.total = res.meta.total;//总条数
        smallCom.pageSize = res.meta.per_page;//每页的条数
        smallCom.pageNum = Math.ceil(res.meta.total / res.meta.per_page);//页数
        state.commentPage = smallCom;
        console.log(smallCom);
      } else {
        state.comment = [];
      }
    },
    deleteComment(state, {res, page}) {//个人中心评论删除恢复接口
      if (res.status === "success" && res.code === 200) {
        //判断cookie是否存在；
        var token = getCookie("meibo");
        if (token) {
          get("/user/mycomment", {page: page}).then(res => {
            if (res.status === "success" && res.code === 200) {
              state.comment = res.data;
              if (res.meta.total == 0) {
                state.isComment = false;
              } else {
                state.isComment = true;
              }
              let smallCom = {};
              smallCom.total = res.meta.total;//总条数
              smallCom.pageSize = res.meta.per_page;//每页的条数
              smallCom.pageNum = Math.ceil(res.meta.total / res.meta.per_page);//页数
              state.commentPage = smallCom;
              console.log(smallCom);
            } else {
              state.comment = [];
            }
          }, err => {
            if (err == undefined) {
              console.log("获取我的评论失败！");
            }
          })
        }
      } else {
        state.deleteComment = [];
      }
    },
    recoveryComment(state, {res}) {//个人中心评论恢复接口
      if (res.status === "success" && res.code === 200) {
        console.log(JSON.stringify(res));
      } else {
        state.deleteComment = [];
      }
    },
    attentionAuthorList(state, res) {//关注的作者的列表
      if (res.status === "success" && res.code === 200) {
        let data = res.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].photo == "") {
            data[i].photo = "/static/images/public/author.svg"
          } else {
            data[i].photo = data[i].photo;
          }
        }
        state.attentionList = data;
        let total = res.meta.total;//总条数
        let pageSize = res.meta.per_page;//每页的条数
        if (total == 0) {
          state.isAttention = false;
        } else {
          state.isAttention = true;
        }
        if (total <= pageSize) {
          state.isAttentionPage = false;
        } else {
          state.isAttentionPage = true;
          let smallCom = {};
          smallCom.total = total;//总条数
          smallCom.pageSize = pageSize;//每页的条数
          state.attentionPage = smallCom;
          console.log(JSON.stringify(smallCom))
        }
      } else {
        state.attentionList = [];
      }
    },
    deleteAttention(state, {res, page}) {
      console.log(JSON.stringify(res));
      if (res.status === "success" && res.code === 200) {
        //判断cookie是否存在；
        var token = getCookie("meibo");
        if (token) {
          get("/author/attentionAuthorList", {page: page}).then(res => {
            let data = res.data;
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
              if (data[i].photo == "") {
                data[i].photo = "/static/images/public/author.svg"
              } else {
                data[i].photo = data[i].photo;
              }
            }
            state.attentionList = data;
            let total = res.meta.total;//总条数
            let pageSize = res.meta.per_page;//每页的条数
            if (total == 0) {
              state.isAttention = false;
            } else {
              state.isAttention = true;
            }
            if (total <= pageSize) {
              state.isAttentionPage = false;
            } else {
              state.isAttentionPage = true;
              let smallCom = {};
              smallCom.total = total;//总条数
              smallCom.pageSize = pageSize;//每页的条数
              state.attentionPage = smallCom;
              console.log(JSON.stringify(smallCom))
            }
          }, err => {
            if (err == undefined) {
              console.log("获取关注的作者的列表失败！");
            }
          })
        }
        if (state.attentionList.length == 0) {
          state.isAttention = false;
        } else {
          state.isAttention = true;
        }
      } else {
        state.deleteComment = [];
      }
    },
    recoveryAttention(state, {res, key}) {
      if (res.status === "success" && res.code === 200) {
        console.log(JSON.stringify(res));
      } else {
        state.deleteComment = [];
      }
    }
  },
  actions: {
    getMyComment(context, {page}) {//个人中心我的评论列表接口（有文章标题
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/user/mycomment", {page: page}).then(res => {
          context.commit("myComment", res);
        }, err => {
          if (err == undefined) {
            console.log("获取我的评论失败！");
          }
        })
      }
    },
    getDeleteComment(context, {obj, page}) {//个人中心评论删除恢复接口
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/user/delrescomment", obj).then(res => {
          context.commit("deleteComment", {res, page});
        }, err => {
          if (err == undefined) {
            console.log("删除恢复评论失败！");
          }
        })
      }
    },
    getRecoveryComment(context, {obj}) {//个人中心评论恢复接口
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/user/delrescomment", obj).then(res => {
          context.commit("recoveryComment", {res});
        }, err => {
          if (err == undefined) {
            console.log("恢复评论失败！");
          }
        })
      }
    },
    getAttentionAuthorList(context, {page}) {//关注的作者的列表
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/author/attentionAuthorList", {page: page}).then(res => {
          context.commit("attentionAuthorList", res);
        }, err => {
          if (err == undefined) {
            console.log("获取关注的作者的列表失败！");
          }
        })
      }
    },
    getDeleteAttention(context, {obj, key, page}) {//个人中心我的关注删除接口调用
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/author/cancleAttentionAuthor", obj).then(res => {
          context.commit("deleteAttention", {res, page});
        }, err => {
          if (err == undefined) {
            console.log("取消关注作者失败！");
          }
        })
      }
    },
    getRecoveryAttention(context, {obj}) {//个人中心我的关注删除接口调用
      //判断cookie是否存在；
      var token = getCookie("meibo");
      if (token) {
        get("/author/attentionAuthor", obj).then(res => {
          context.commit("recoveryAttention", {res});
        }, err => {
          if (err == undefined) {
            console.log("恢复关注作者失败！");
          }
        })
      }
    },
  },
  getters: {
    isComment: function (state) {//个人中心我的评论是否存在
      return state.isComment;
    },
    isCommentPage: function (state) {//个人中心我的评论是否显示分页
      return state.isCommentPage;
    },
    comment: function (state) {//个人中心我的评论列表
      return state.comment;
    },
    commentPage: function (state) {//个人中心我的评论列表下一页
      return state.commentPage;
    },
    attentionList: function (state) {//关注的作者的列表
      return state.attentionList;
    },
    isAttention: function (state) {//关注的作者的是否显示关注作者
      return state.isAttention;
    },
    isAttentionPage: function (state) {//是否显示关注作者分页
      return state.isAttentionPage;
    },
    attentionPage: function (state) {//关注作者分页参数
      return state.attentionPage;
    },
  }

}
export default modulePersonal;
