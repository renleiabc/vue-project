<template>
  <main class="home-main">
    <div class="home-carousel">
      <div class="swiper-container" ref="slider123">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in carousel" :key="item.id">
            <a :href="item.url">
              <img :src="item.img_url" alt="图片">
            </a>
          </div>
        </div>
        <div class="swiper-pagination" ref="pagination"></div>
      </div>
    </div>
    <div class="home-tags" ref="offsetTop">
      <div ref="navFixed">
        <div class="home-tags" ref="navTabs">
          <div style="width: 700px;">
            <a href="javascript:;" class="home-tags-link" v-for="(tab,index) in homeTabs" @click="tabsSwitch(index)"
               :class="{optionsActive:tab.isActive}" :key="tab.title">
              <span>{{tab.sign}}</span>
              <span>{{tab.title}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="home-division"></div>
    <div class="main-list">
      <!--资讯列表-->
      <select-tabs></select-tabs>
    </div>
  </main>
</template>
<script>
  import BScroll from 'better-scroll'
  import SelectTabs from "../../components/home/selectTabs"

  export default {
    name: "home",
    data() {
      return {}
    },
    methods: {
      init() {
        this.$nextTick(function () {
          let wrapper = this.$refs.navTabs;
          let scroll = new BScroll(wrapper, {
            scrollX: true,
            click: true,
            tap: true
          })
        })
      },
      tabsSwitch: function (indexLable) {
        this.$store.commit('theLabel', {indexLable});
      },
    },
    created() {
      this.init();
      this.$store.dispatch('getCarousel');//获取轮播图;
    },
    mounted() {
      var navFixed = this.$refs.navFixed;
      ceiling(navFixed, "home-fixed");
      //不要选用creater钩子，而是选用mounted;
      //否则Swiper不能生效，因为creater调用时元素还没有挂载到Dom上；
      new Swiper(this.$refs.slider123, {
        pagination: this.$refs.pagination,
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
    },
    computed: {
      homeTabs() {
        return this.$store.getters.homeTabs
      },
      carousel() {
        return this.$store.getters.carousel
      },
    },
    components: {SelectTabs}
  }
</script>

<style scoped>
  .swiper-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .swiper-wrapper {
    height: 100%;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .swiper-slide {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
