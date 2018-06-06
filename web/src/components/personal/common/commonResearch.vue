<template>
  <div class="member-lecture">
    <h1>我的行研</h1>
    <ul class="member-details">
      <li v-for="(item,index) in research">
        <img :src="item.pic" alt="图片">
        <div class="member-category">
          <h3 @click="researchClick(index)">{{item.title}}</h3>
          <div class="member-time">
            <p><span class="member-classify">类</span><span>别：{{item.class_name}}</span></p>
            <p><span>出版时间：</span><span>{{item.publish_at}}</span></p>
          </div>
        </div>
        <div class="member-down">
          <div class="member-left" v-show="item.dir">
            <img src="/static/images/public/poeple.jpg" alt="">
            <p><a :href="item.dir_file">下载目录</a></p>
          </div>
          <div class="member-right" v-show="item.report">
            <img src="/static/images/public/poeple.jpg" alt="">
            <p><a :href="item.report_file">下载报告</a></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "member-search",
    data() {
      return {
        reaearch1:[{title:"2016年中国大企业开放式创新发展研究报告",
            src:"/static/images/public/pic1.jpg",
            category:"AI人工智能",
            time:"2018-3-20",
            catalog:"下载目录",
            report:"下载报告"},
          {title:"2016年中国大企业开放式创新发展研究报告",
            src:"/static/images/public/pic1.jpg",
            category:"AI人工智能",
            time:"2018-3-20",
            catalog:"下载目录",
            report:"下载报告"}
        ]
      }
    },
    methods:{
      researchClick(index){
        console.log(index);
        let _t = this;
        this.$store.commit('clickResearch',{index,_t});
      },
    },
    created(){

      this.$store.dispatch('getMyResearch');//调用我的开讲
    },
    computed: {
      research() {
        return this.$store.getters.research;
      }
    }
  }
</script>

<style scoped>
@import "../../../assets/css/personal/member/memberResearch.css";
</style>
