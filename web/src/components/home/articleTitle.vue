<template>
  <div>
    <div v-for="(item, key) in items" :key="item.name" v-if="key===name">
      <div class="home-pane" v-for="ele in item" :key="ele.id">
        <router-link :to="{name:'ArticleDetail',params:{id:ele.id}}" target="_blank">
          <h1>{{ele.title}}</h1>
        </router-link>
        <div class="home-tabs">
          <div class="home-tabs-left">
            <p>{{ele.content}}</p>
            <div class="home-tabs-lable">
              <img src="/static/images/public/poeple.jpg" alt="人物">
              <span>{{ele.author}}</span>
              <span>&#8226;</span>
              <span>{{ele.time}}</span>
              <img src="/static/images/public/tag.svg" alt="标签">
              <span>{{ele.label}}</span>
              <img src="/static/images/public/readNums.svg" alt="阅读" style="margin-left: auto">
              <span>{{ele.read}}</span>
              <img src="/static/images/public/collectNum.svg" alt="收藏">
              <span>{{ele.collection}}</span>
              <img src="/static/images/public/clickGoodNum.svg" alt="点赞">
              <span>{{ele.read}}</span>
            </div>
          </div>
          <div class="home-tabs-right">
            <img src="static/images/public/pic1.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "article-title",
    props: ['name', 'items'],
    data() {
      return {}
    },
    created() {
      console.log(this.items)
    }
  }
</script>

<style scoped>

</style>
