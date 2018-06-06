<template>
  <div class="home-section">
    <div class="home-content">
      <section class="home-render" v-for="ele in readData" :key="ele.id">
        <router-link :to="{name:'Article',params:{id:ele.id}}" tag='a'>
          <div class="home-render-title">
            <span>{{ele.title}}</span>
            <div class="home-inf">
              <p class="home-inf-left small-font">
                {{ele.author}} ·{{ele.release_at}}
              </p>
              <p class="home-inf-right small-font">
                {{ele.class_name}}
              </p>
            </div>
          </div>
          <div class="home-render-img">
            <img :src="ele.pic" alt="">
          </div>
        </router-link>
      </section>
      <div class="home-load" style="display: block" v-show="readLoad">
        <div class="home-load-center" @click="loadNext">
          <p>{{text}}</p>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <!--v-show="homeFinish"-->
      <div class="home-finish" style="display: none" v-show="readFinish">
        没有更多内容咯
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "select-tabs",
    data() {
      return {
        text: "加载更多",
        scroll: null,
      }
    },
    created() {
      this.$store.dispatch('getHomeTitle');//获取文章标题
    },
    methods: {
      loadNext() {//点击加载获取下一页
        let nextPage = this.$store.state.reading.readNext;
        let that = this;
        this.text = "正在加载数据";
        setTimeout(function () {
          if (nextPage != null) {
            that.text = "加载更多";
            var currentPage = that.$store.state.reading.readPage;
            var tag_id = that.$store.state.reading.tag_id;
            console.log(tag_id);
            var morePage = currentPage + 1;
            that.$store.commit('moreList', {morePage, tag_id})
          }
        }, 30);
      },
    },
    mounted() {
      let that = this;
      window.addEventListener('scroll', function () {
        // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
        // console.log(document.body.scrollTop); // 滚动高度
        // console.log(document.body.offsetHeight); // 文档高度
        // 判断是否滚动到底部
        if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
          /* var nextPage = that.$store.state.home.tagNext;
           this.text = "正在加载数据";
           setTimeout(function () {
             if (nextPage != null) {
               that.text = "加载更多";
               var currentPage = that.$store.state.home.currentPage;
               var tag_id = that.$store.state.home.tag_id;
               var morePage = currentPage + 1;
               that.$store.commit('moreData', {morePage, tag_id})
             }
           },1000);*/
        }
      });
    },
    computed: {
      readData() {
        return this.$store.getters.readData;
      },
      readLoad() {
        return this.$store.getters.readLoad;
      },
      readFinish() {
        return this.$store.getters.readFinish;
      },
      readNext() {
        return this.$store.getters.readNext;
      },
    }
  }
</script>

<style scoped>

</style>
