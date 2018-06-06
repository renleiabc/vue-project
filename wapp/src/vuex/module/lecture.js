/*开讲模块*/
import {get, post} from "../../util/http";

const moduleLecture = {
  //vuex的配置
  state: {
    lectureList: [],
    lectureDetils: {},
    songList: {},
    playerOptions: {},
    video: false,
    audio: true,
  },
  mutations: {
    lectureList(state, {res, id}) {
      if (res.status == "success" && res.code == 200) {
        for (var i = 0; i < res.data.length; i++) {
          if (id == res.data[i].id) {
            res.data[i].mask = true;
          } else {
            res.data[i].mask = false;
          }
        }
        state.lectureList = res.data;
      } else {
        state.lectureList = [];
      }
    },
    lectureDetils(state, res) {
      if (res.status == "success" && res.code == 200) {
        let detils = res.data;
        state.lectureDetils = res.data;
        if (detils.movie_type == "audio") {
          state.lectureDetils.audio = true;
          state.lectureDetils.video = false;
          //音频参数
          state.lectureDetils.songList = {
            title: '',
            artist: '',
            src: detils.movie,
            pic: '/static/images/pic.svg'
          }
        } else if (detils.movie_type == "video") {
          //视频参数
          state.lectureDetils.audio = false;
          state.lectureDetils.video = true;
          state.lectureDetils.playerOptions = {
            //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            controls: true,//是否使用默认控制键；
            sources: [{
              type: "video/" + detils.movie_format,
              src: detils.movie //你的m3u8地址（必填）
            }],
            poster: detils.pic, //你的封面地址
            width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            voiceFlag: false,
            movieFlag: false
          }
        }
        // console.log(JSON.stringify(state.lectureDetils));
      } else {
        state.lectureDetils = {};
      }
    },
    lectureSrcoll(state, {id, scroll}) {
      console.log(JSON.stringify(state.lectureList));
      var index = "";
      for (var i = 0; i < state.lectureList.length; i++) {
        if (state.lectureList[i].id == id) {
          index = i;
        } else {
          index = 0;
        }
      }
      scroll.scrollTo(-index * 170, 0, 30, {})
    }
  },
  actions: {
    getLectureList(context, {id}) {//默认获取开讲列表
      post("/lottery").then(res => {
        context.commit("lectureList", {res, id});
      }, err => {
        if (err == undefined) {
          console.log("获取开讲列表未连接！");
        }
      })
    },
    getLectureDetils(context, {id, scroll}) {
      post("/lottery/detail", {id: id}).then(res => {
        context.commit("lectureDetils", res);//获取开讲详情
        context.commit("lectureSrcoll", {id, scroll});//滑动到正在播放的开讲详情
      }, err => {
        if (err == undefined) {
          console.log("获取开讲详情未连接！");
        }
      })
    }
  },
  getters: {
    lectureList: (state) => {
      var listData = state.lectureList;
      return listData;
    },
    lectureDetils: (state) => {
      var detilsData = state.lectureDetils;
      return detilsData;
    }
  }

}
export default moduleLecture;
