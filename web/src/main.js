// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router';
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import store from './vuex/store'
import {post, get, patch, put, cut} from './util/http'
import {getCookie, setCookie, delCookie, outputmoney, dateFtt,getUrlKey} from './util/util'
import extend from './util/extend'
import VideoPlayer from 'vue-video-player'
import 'babel-polyfill'
Vue.use(VideoPlayer);
import filters from './util/filters'
Vue.use(ElementUI);
Vue.config.productionTip = false
//这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
Vue.prototype.$axios = axios;
Vue.prototype.$post = post;//发送函数
Vue.prototype.$get = get;//获取
Vue.prototype.$patch = patch;//更新局部资源
Vue.prototype.$put = put;//完整更新
Vue.prototype.$cut = cut; //删除
const APP_URL = "https://www.mybiogate.com";//网站域名
//cookie方法
Vue.prototype.app_url = APP_URL;
Vue.prototype.getCookie = getCookie;
Vue.prototype.setCookie = setCookie;
Vue.prototype.delCookie = delCookie;
Vue.prototype.outputmoney = outputmoney
Vue.prototype.dateFtt = dateFtt
Vue.prototype.getUrlKey = getUrlKey
// extend 封装
Vue.prototype.$extend = extend;
import HappyScroll from 'vue-happy-scroll'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.use(HappyScroll);
//上传图片插件
Vue.prototype.router = router;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
//回到顶部；
/*router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})*/
//进入会员中心的时候判断该用户是否已经登录
/*router.beforeEach((to, from, next) => {
  const stateToken = getCookie("meibo");//获取cookie
  console.log(stateToken);
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (stateToken) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
})*/
