<template>
  <div class="reading-list">
    <div class="home-tags" >
      <div ref="lableFixed">
        <div class="home-tags" ref="lableTabs">
          <div :style="'width:'+lableData.length*100+'px'">
            <a href="javascript:;" class="home-tags-link" v-for="(tab,index) in lableData"
               @click="lableSwitch(tab.id,index)"
               :class="{optionsActive:tab.isActive}" :key="tab.title">
              <span>{{tab.sign}}</span>
              <span>{{tab.name}}</span>
            </a>
          </div>
        </div>
      </div>

    </div>
    <div class="home-division"></div>
    <div class="main-list">
      <!--资讯列表-->
      <read-lable></read-lable>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import readLable from "../../components/reading/readLable"
  export default {
    name: "reading",
    scroll: "",
    methods: {
      init() {
        this.$nextTick(function () {
          let lableTabs = this.$refs.lableTabs;
          this.scroll = new BScroll(lableTabs, {
            scrollX: true,
            click: true,
            tap: true
          });
          let id = this.$route.params.id;
          let scroll = this.scroll;
          console.log(id);
          this.$store.dispatch('getList', {id, scroll});//获得文章列表;
        })
      },
      lableSwitch: function (id, index) {
        this.$store.commit('isLabel', {index});
        this.$router.push({name: 'Reading', params: {id: id}});
      },
    },
    mounted() {
      var lableFixed = this.$refs.lableFixed;
      ceiling_tag(lableFixed, "home-fixed");
    },
    created() {
      this.init();
      this.$store.dispatch('getLabel');//分类标签;
    },
    computed: {
      lableData() {
        return this.$store.getters.lableData;
      },
    },
    watch: {
      $route(to, from) {
        let id = to.params.id;
        let scroll = this.scroll;
        this.$store.dispatch('getList', {id, scroll});//获得文章列表;
      }
    },
    components: {readLable}
  }
</script>

<style scoped>

</style>
