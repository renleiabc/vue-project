<template>
  <div class="member-lecture">
    <h1>我的开讲</h1>
    <ul class="member-details">
      <li v-for="(item,index) in lecture" >
        <img :src="item.pic" alt="图片">

        <h3 @click="lectureClick(index)">{{item.title}}</h3>
        <p>
          {{item.describe}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "member-lecture",
    data() {
      return {
        lectrue1:[
          {src:"/static/images/public/pic1.jpg",title:"海外大咖讲医健投资前沿",
            content:" 新药开发就是一场争分夺秒的竞赛。时间，至关重要。对患者而言，时间…"},
          {src:"/static/images/public/pic1.jpg",title:"海外大咖讲医健投资前沿",
            content:" 新药开发就是一场争分夺秒的竞赛。时间，至关重要。对患者而言，时间…"},
          {src:"/static/images/public/pic1.jpg",title:"海外大咖讲医健投资前沿",
            content:" 新药开发就是一场争分夺秒的竞赛。时间，至关重要。对患者而言，时间…"},
          {src:"/static/images/public/pic1.jpg",title:"海外大咖讲医健投资前沿",
            content:" 新药开发就是一场争分夺秒的竞赛。时间，至关重要。对患者而言，时间…"},
          {src:"/static/images/public/pic1.jpg",title:"海外大咖讲医健投资前沿",
            content:" 新药开发就是一场争分夺秒的竞赛。时间，至关重要。对患者而言，时间…"}
        ]
      }
    },
    created(){
      this.$store.dispatch('getMyLecture');//调用我的开讲
    },
    methods:{
      lectureClick(index){
        var _t =this
        _t.$store.commit('lectureClicks', {index,_t});
      },
    },
    computed: {
      lecture() {
        return this.$store.getters.lecture;
      },
    },
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberLecture.css";
</style>
