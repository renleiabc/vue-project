<template>
  <div>
    <li v-for="(item,index) in results">
      <div class="home-pane">
        <router-link :to="{name:'Article',params:{id:item.id}}">
          <h1 @click="searchTitle(index)">{{item.title}}</h1>
        </router-link>
        <div class="home-tabs">
          <div class="home-tabs-left">
            <p>{{item.describe}}</p>
            <div class="home-tabs-lable">
              <router-link :to="{name:'Author',params:{authorId:item.author_id}}">
                <img :src="item.author_pic" alt="人物" class="home-img">
              </router-link>
              <span class="span-name">{{item.author}}</span>
              <span class="home-spot">·</span>
              <span class="span-time">{{item.release_at}}</span>
              <img src="/static/images/public/tag.svg" alt="标签">
              <span class="span-text">{{item.class_name}}</span>
              <img src="/static/images/public/readNums.svg" alt="阅读" style="margin-left: auto">
              <span class="span-text">{{item.views}}</span>
              <img src="/static/images/public/collectNum.svg" alt="收藏">
              <span class="span-text">{{item.collection_num}}</span>
              <img src="/static/images/public/clickGoodNum.svg" alt="点赞">
              <span class="span-text">{{item.link_num}}</span>
            </div>
          </div>
          <div class="home-tabs-right">
            <img :src="item.pic" alt="缩略图">
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
  export default {
    name: "res-result",
    props: ["results"],
    methods: {
      searchTitle(index) {
        this.$store.commit('searchLabel', index);
      }
    }
  }
</script>

<style scoped>

</style>
