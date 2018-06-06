<template>
  <div>
    <h1>我的文章</h1>
    <div class="member-all" v-if="isAritcle">
      <el-collapse accordion @change="articleClick">
        <div class="come-coll" v-for="(item,key) in aritcle">
          <div class="come-head">
            <span class="come-article article-link">{{item.release_at}}</span>
            <span class="come-article article-span">阅读</span>
            <span class="come-article article-span">收藏</span>
            <span class="come-article article-span">掌声</span>
            <span class="come-in come-margin">评论</span>
          </div>
          <el-collapse-item :name="key+1">
            <template slot="title">
              <div class="come-year">
                <router-link :to="{name:'Article',params:{id:item.id}}" tag="a" class="come-article article-link">
                  {{item.title}}
                </router-link>
                <span class="come-article article-span">{{item.views}}</span>
                <span class="come-article article-span">{{item.collection_num}}</span>
                <span class="come-article article-span">{{item.link_num}}</span>
                <span class="come-in">{{item.comment_num}}</span>
              </div>
            </template>
            <div class="article-text article-text-no" v-if="isAritcleData">暂无数据</div>
            <div class="article-comment" v-for="(item,key) in aritcleComment" v-else>
              <div class="article-time">
                <span class="article-left">{{item.created_at}}</span>
                <span class="article-right">{{item.nickname}}</span>
              </div>
              <p class="article-text">{{item.content}}</p>
            </div>
            <div class="table-footer">
              <div class="table-num">
                <span>{{comPage.total}}条内容，</span>
                <span>共{{comPage.pageNum}}页，</span>
                <span>当前第{{compage}}页</span>
              </div>
              <div class="table-icon">
                <el-pagination
                  layout="prev,next"
                  @current-change="aritcleChange"
                  :total="comPage.total"
                  :page-size="comPage.pageSize">
                </el-pagination>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <div class="research-content-bottom" v-show="isAritclePage">
        <el-pagination
          background
          @current-change="articlePage"
          layout="prev, pager, next"
          :total="aritclePage.totalPage"
          :page-size="aritclePage.per_page"
          pager-count="10"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
    <div class="member-no" v-else>
      <div class="member-empty">
        <img src="../../../assets/images/respon/article.svg" alt="图片">
        <p class="member-send">期待您的大作</p>
        <p class="member-contact">请联系您的美柏对接同事，获取发布文章的方法。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "author-article",

    data() {
      return {
        collTotal: 100,
        articleSize: 1,
        pageNow: true,
        compage:1,
        aritcleId:"",
      }
    },
    methods: {
      articlePage(page) {//点击分页获取数据；
        console.log(page);
        this.articleSize = page;
        this.$store.dispatch('getMyAritcle', {page});//调用我的文章接口
      },
      aritcleChange(page) {//点击评论分页获取我的文章评论的数据
        console.log(page);
        let id = this.articleId;
        this.compage = page;
        let obj = {
          article_id:id,
          page:page
        }
        this.$store.dispatch('getAritcleComment', {obj});//调用我的文章接口
      },
      articleClick(name) {//我的文章下面的评论的接口
        if(name){
          console.log(name);
          let aritcle = this.$store.state.author.aritcle;
          let id = this.articleId = aritcle[name].id;
         let obj = {
           article_id:id,
           page:1
         }
          this.$store.dispatch('getAritcleComment', {obj});//调用我的文章接口
        }
      },
    },
    created() {
      let page = this.articleSize;
      this.$store.dispatch('getMyAritcle', {page});//调用我的文章接口
    },
    computed: {
      aritcle() {//我的文章
        return this.$store.getters.aritcle;
      },
      isAritclePage() {//判断是否显示我的文章分页
        return this.$store.getters.isAritclePage;
      },
      aritclePage() {//我的文章分页参数
        return this.$store.getters.aritclePage;
      },
      isAritcle() {//判断是否显示我的文章
        return this.$store.getters.isAritcle;
      },
      comPage() {//我的文章下面的评论分页参数
        return this.$store.getters.comPage;
      },
      aritcleComment() {//我的文章下面的评论数据
        return this.$store.getters.aritcleComment;
      },
      isAritcleData() {//是否有评论数据
        return this.$store.getters.isAritcleData;
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/author/personaCome.css";
</style>
