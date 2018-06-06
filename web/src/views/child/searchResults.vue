<template>
  <div class="main results">
    <div class="results-input">
      <div class="results-right">
        <el-input v-model="result" placeholder="请输入内容" type="text" @focus="searchNow" @blur="startSearch"
                  @keyup.enter.native="productSearch">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <span class="results-reveal">{{reveal}}</span>
    </div>
    <div class="results-appear">
      <div class="results-number">
        <h1>
          <span>相关搜索结果</span>
          <span>(&nbsp;{{searchLenght}}&nbsp;)条 </span>
        </h1>
      </div>
    </div>
    <div class="options-content">
      <res-result :results="searchData"></res-result>
    </div>
    <!--v-show="homeLoad"-->
    <div class="home-load" v-show="searchLoad">
      <div class="home-load-center" @click="searchNext">
        <h1>加载更多</h1>
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
    <!--v-show="homeFinish"-->
    <div class="home-finish" v-show="searchFinish">
      没有更多内容咯
    </div>
  </div>
</template>

<script>
  import ResResult from "../../components/search/resResult"

  export default {
    name: "seek",
    data() {
      return {
        result: '',
        amount: 24,
        getResults: "",
        reveal: "",
        keyword: ""
      }
    },
    methods: {
      productSearch() {
        if (this.result == "") {
          this.reveal = "搜索内容不能为空";
          return;
        }
        var result = this.result;
        this.$store.commit('searchKeyDown', {result});
      },
      init() {
        // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
        var that = this;
        document.onkeydown = function (event) {
          var e = event || window.event;
          var key = e.keyCode || e.which || e.charCode;
          if (key == 13) {
            that.productSearch();
          }
        }
      },
      searchNow() {
        this.result = "";
        this.reveal = "";
      },
      startSearch() {
        this.reveal = "";
      },
      searchNext() {//点击加载获取下一页
        let next = this.$store.state.search.searchNext;
        let kew = this.keyword;
        console.log(next);
        if (next != null) {
          let current_page = this.$store.state.search.searchPage;
          let page = ++current_page;
            console.log(page);
          this.$store.commit("searchNext",{page,kew});
        }
      }
    },
    created() {
      this.init();
      var keyWord = this.$route.params;
      var word = decodeURIComponent(keyWord.string);
      this.keyWord = word;
      this.$store.dispatch('getSearchData', {word});
    },
    mounted(){
     /* var keyWord = this.$route.params;

      var word = decodeURIComponent(keyWord.string);
      this.keyWord = word;
      console.log(word)
      this.$store.dispatch('getSearchData', {word});*/
    },
    watch:{
      $route(to, from) {
        this.keyWord = decodeURIComponent(to.params.string);
        var word = this.keyWord;
        this.$store.dispatch('getSearchData', {word});
      }
    },
    components: {ResResult},
    computed: {
      searchData() {
        return this.$store.getters.searchData
      },
      searchLenght() {
        return this.$store.getters.searchLenght
      },
      searchLoad() {
        return this.$store.getters.searchLoad;
      },
      searchFinish() {
        return this.$store.getters.searchFinish;
      },
      searchPage() {
        return this.$store.getters.searchPage;
      },
    }
  }
</script>

<style scoped>

</style>
