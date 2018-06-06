import axios from 'axios'

export function fetch(url,params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url,{params:params})
      .then(response => {
        console.log('Api--ok');
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}
export default {
  // 获取我的页面的后台数据
  mineBaseMsgApi() {
    console.log('进入api.js')
    return fetch("/aritcle", {tag_id: 4});
  }
}
