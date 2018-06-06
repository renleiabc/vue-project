/*活动模块*/
import {get} from "../../util/http";

const moduleLogin = {
  //vuex的配置
  state: {
    defaultActive:"1"
  },
  mutations: {
    decrease(state, index) {
      state.defaultActive = index;
      let saveIndex = {};
      //window.localStorage.getItem("menberKey");
      saveIndex.index = index;
      let save = encodeURIComponent(JSON.stringify(saveIndex));
      window.localStorage.setItem("menberKey",save);
    },
    memberIndex(state,index){
      state.defaultActive = index;
    }
  },
  actions: {
    getMemberIndex(context, index) {
      context.commit("memberIndex", index);
    },
  },
  getters: {
    default:state =>{
      return state.defaultActive;
    }
  }

}
export default moduleLogin;
