<template>
  <div class="member-lecture">
    <h1>我的活动</h1>
    <ul class="member-details">
      <li v-for="item in activity">
        <img :src="item.src" alt="图片">
        <h3>{{item.title}}</h3>
        <div class="member-icon">
          <i class="el-icon-time"></i>
          <div class="member-time">
            <p>{{item.time}}</p>
            <p>（北京时间）</p>
          </div>
        </div>
        <div class="member-address">
          <img src="/static/images/icon/address.svg" alt="">
          <p>{{item.address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "member-activity",
    data() {
      return {
        activity: [
          {
            src: "/static/images/public/pic1.jpg", title: "海外大咖讲医健投资前沿", time: "2018-3-23 9:30-10:30",
            address: "美国休斯敦市"
          },
          {
            src: "/static/images/public/pic1.jpg", title: "海外大咖讲医健投资前沿", time: "2018-3-23 9:30-10:30",
            address: "美国休斯敦市"
          },
          {
            src: "/static/images/public/pic1.jpg", title: "海外大咖讲医健投资前沿", time: "2018-3-23 9:30-10:30",
            address: "美国休斯敦市"
          },
          {
            src: "/static/images/public/pic1.jpg", title: "海外大咖讲医健投资前沿", time: "2018-3-23 9:30-10:30",
            address: "美国休斯敦市"
          },
          {
            src: "/static/images/public/pic1.jpg", title: "海外大咖讲医健投资前沿", time: "2018-3-23 9:30-10:30",
            address: "美国休斯敦市"
          }
        ]
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberActivity.css";
</style>
