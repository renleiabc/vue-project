/*vuex基础文件*/
import Vue from 'vue';
import Vuex from 'vuex';
import home from "./module/home"
import lecture from "./module/lecture"
import service from "./module/service"
import research from "./module/research"
import activity from "./module/activity"
import login from "./module/login"
import search from "./module/search"
import member from "./module/member"
import reading from "./module/reading"


Vue.use(Vuex);
var state = { //一级数据存储

}
var mutations =  {
  lifeExtendObject(state,object){
    Vue.prototype.$extend(state,object)
  }
}
var modules = {
  home,
  lecture,
  service,
  research,
  activity,
  login,
  search,
  member,
  reading,
}
/*拓展方法*/
var setObjToState = function (state,obj) {
  for(var f in obj){
    state[f]=obj[f]
  }
}
for(var m in modules){
  modules[m].mutations =modules[m].mutations || {}
  modules[m].mutations[m+'SetObjToState'] = setObjToState
}
export default new Vuex.Store({
  state,
  modules,
  mutations
})

