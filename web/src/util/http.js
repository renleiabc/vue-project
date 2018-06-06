import axios from 'axios';
import router from '../router/router'
import Vue from 'vue'
import { delCookie, getCookie } from './util'

import qs from "qs"
// axios 配置
axios.defaults.timeout = 5000;

//axios.defaults.baseURL = 'https://172.30.10.215:8083/api/v1'; //内网
//axios.defaults.baseURL = 'https://www.mybiogate.com/api/v1';//正式
//axios.defaults.baseURL = 'https://dev.mybiogate.com/api/v1'; //测试
//axios.defaults.baseURL = 'http://172.30.51.13/meijian/public/index.php/api/v1';//不用
//axios.defaults.headers.common = {  };
//打包上传之前，把下面代码删除
axios.defaults.baseURL = '/api/v1';//本地
// http request 请求拦截器
axios.interceptors.request.use(config => {
  const token = getCookie('meibo');
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  };
  if (token) {
    config.headers.authorization = token;
  }
  return config;
},
  err => {
    return Promise.reject(err);
  });


// http response 相应拦截器axios.interceptors.response.use
axios.interceptors.response.use(response => {
  if (response.data.code === 200 && response.data.status === "success") {
    /*  router.push({
          path: '/member',
          query: {redirect: router.currentRoute.fullPath}  //从哪个页面跳转
      })*/

  }
  return response;
}, error => {

  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        delCookie("meibo");
        /* router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
         })*/
        router.push({ path: "/" });
    }
  }
  return Promise.reject(error.response)
});

export default axios;

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    }).catch(error => {
      if (error == undefined) {
        console.log("接口请求失败！")
      }
    })
  })
}

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      }).catch((error) => {
        if (error == undefined) {
          console.log("接口请求失败！")
        }
      })
  })
}


/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function cut(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

//并发处理多个请求


/*
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));*/
