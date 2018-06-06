// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './vuex/store'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {post, get, patch, put, cut} from './util/http'
import VideoPlayer from 'vue-video-player'//视频插件
require('video.js/dist/video-js.css')//视频的样式引入
require('vue-video-player/src/custom-theme.css')//视频的样式引入
//require('videojs-contrib-hls/dist/videojs-contrib-hls');//增加hls支持
Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);
Vue.use(VideoPlayer);//挂载到vue对象上
//这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
Vue.prototype.$axios = axios;
Vue.prototype.$post = post;//发送函数
Vue.prototype.$get = get;//获取
Vue.prototype.$patch = patch;//更新局部资源
Vue.prototype.$put = put;//完整更新
Vue.prototype.$cut = cut; //删除
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
