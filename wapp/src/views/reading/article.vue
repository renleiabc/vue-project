<template>
  <article class="artice global-content">
    <h1 class="artice-title">{{articleData.title}}</h1>
    <p  class="artice-title-inf">
      {{articleData.release_at}}&nbsp;·&nbsp;{{articleData.class_name}}
    </p>
    <p class="artice-introduce">
      {{articleData.describe}}
    </p>
    <div class="artice-content" v-html="articleData.content">
    </div>
  </article>
</template>

<script>
  export default {
    key:"",
    created(){
      let id  = this.$route.params.id;
      this.$store.dispatch('getArticle',{id});//获取文章详情;
    },
    computed:{
      articleData() {
        return this.$store.getters.articleData;
      },
    }
  }
</script>

<style scoped>

</style>
