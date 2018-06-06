/*vuex基础文件*/
import Vue from 'vue';
import Vuex from 'vuex';
import home from "./module/home"
import lecture from "./module/lecture"
import service from "./module/service"
import research from "./module/research"
import activity from "./module/activity"
import memberNav from "./module/memberNav"
import search from "./module/search"
import member from "./module/member"
import author from "./module/author"
import personal from "./module/personalPublic"
import reading from "./module/reading"

import applicationFormRecord from "./module/applicationFormRecord"

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
  memberNav,
  search,
  member,
  author,
  personal,
  reading,
  applicationFormRecord

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

