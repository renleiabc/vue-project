<template>
  <div class="lecture">
    <div class="lecture-banner">
      <img src="../../assets/images/public/name.png" alt="banner">
      <div class="lecture-tags">
        <ul ref="listFixed">
          <li v-for=" (item,index) in lectureTag" @click="listClick(index)">
            <span :class="{'lecture-border':item.isActive}">{{item.tag}}</span>
          </li>
        </ul>
      </div>
      <div class="home-division"></div>
      <div class="main-list">
        <ul ref="lectrueList" class="lecture-list">
          <li>
            <p v-for="ele in synopsis" class="lecture-text">
              {{ele}}
            </p>
          </li>
          <li>
            <div class="lecture-statement" v-for="(item,index) in lectureList"
                 :key="item.id" @click="detailsClick(item.id)">
              <img :src="item.pic" alt="name">
              <p class="lecture-title">{{item.title}}</p>
              <p class="small-font font-min lecture-name">{{item.author}}&nbsp;·&nbsp;{{item.short_introduce}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="lecture-footer" @click="forFree">免费收听</div>
  </div>
</template>

<script>
  export default {
    name: "lectrue-lists",
    data() {
      return {
        synopsis: true,
        statement: false,
        lectureTag: [
          {tag: '简介', isActive: true},
          {tag: '讲单', isActive: false},
        ],
        synopsis: [
          "肿瘤免疫疗法是当前肿瘤治疗领域最具前景的研究方向之一，" +
          "通过调动机体的免疫系统，增强肿瘤微环境抗肿瘤免疫力，" +
          "从而控制和杀伤肿瘤细胞。由于其卓越的疗效和创新性，" +
          "在2013年被《科学》杂志评为年度最重要的科学突破。" +
          "肿瘤免疫治疗正在全球范围内如火如荼地开展，多个肿瘤免疫治疗药物已经获得美国FDA批准临床应用。",
          "美柏开讲，邀请海外科学大咖，围绕重点前沿领域，为中国投资者讲解创新突破及投资机会。",
          "《肿瘤免疫》专辑一，" +
          "聚焦热得发烫的肿瘤免疫疗法，深度解读全球创新前沿与投资热点。由顶尖华人科学家为您提炼肿瘤免疫领域的知识精华，" +
          "理清肿瘤免疫疗法的来龙去脉，助您克服领域高门槛，及时掌握科技前沿，洞察海外投资机会。"
        ]
      }
    },
    methods: {
      init() {},
      listClick(index) {
        let lectureList = this.$refs.lectrueList;
        let children = lectureList.children;
        for(var i = 0; i<children.length;i++){
          children[i].style.display = "none";
          this.lectureTag[i].isActive = false;
        };
        children[index].style.display = "block";
        this.lectureTag[index].isActive = true;
      },
      detailsClick(id){
        this.$router.push({name:'LectureDetails',params:{id:id}});
      },
      forFree(){
        //点击免费收听获取开讲列表第一个id；
        let id = this.$store.state.lecture.lectureList[0].id;
        this.$router.push({name:'LectureDetails',params:{id:id}});
      }
    },
    mounted() {
      var navFixed = this.$refs.listFixed;
      ceiling(navFixed, "home-fixed");
    },
    created() {
      this.init();
      let id = "";
      this.$store.dispatch('getLectureList',{id});//获取开讲列表;
    },
    computed: {
      lectureList() {
        return this.$store.getters.lectureList
      },
      /*carousel() {
        return this.$store.getters.carousel
      },*/
    },
  }
</script>

<style scoped>

</style>
