<template>
  <div>
    <div ref="optionElement">
      <div class="home-pane" v-for="(ele,index) in tabs" :key="ele.title">
        <!-- <router-link :to="{name:'Article',query:{id:ele.id}}"> -->
        <router-link :to="{name:'Article',params:{id:ele.id}}">
          <h1>{{ele.title}}</h1>
        </router-link>
        <div class="home-tabs">
          <div class="home-tabs-left">
            <p>{{ele.describe}}</p>
            <div class="home-tabs-lable">
              <img :src="ele.author_pic" alt="man" class="home-img" style="cursor: pointer" @click="toPersonalPage(ele.author_id)">
              <span class="span-name">{{ele.author}}</span>
              <span class="home-spot">·</span>
              <span class="span-time">{{ele.release_at}}</span>
              <img src="/static/images/public/tag.svg" alt="标签">
              <span class="span-text">{{ele.class_name}}</span>
              <img src="/static/images/public/readNums.svg" alt="阅读" style="margin-left: auto">
              <span class="span-text">{{ele.views}}</span>
              <img src="/static/images/public/collectNum.svg" alt="收藏">
              <span class="span-text">{{ele.collection_num}}</span>
              <img src="/static/images/public/clickGoodNum.svg" alt="点赞">
              <span class="span-text">{{ele.link_num}}</span>
            </div>
          </div>
          <div class="home-tabs-right">
            <img :src="ele.pic" alt="">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "select-tabs",
    props: ["tabs"],
    data() {
      return {
        tagData:""
      }
    },
    methods: {
      toPersonalPage:function (authorId) {
        this.$router.push({name:'Author',params:{authorId:authorId}})
      }
    },
    mounted() {
      var option = this.$refs.optionElement;
      this.$emit("element", option);
    },
  }
</script>

<style scoped>
  .home-existent {
    text-align: center;
    width: 100%;
    color: red;
  }
</style>
