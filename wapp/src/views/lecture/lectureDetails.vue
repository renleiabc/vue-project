<template>
  <div class="content">
    <div class="content-box">
      <div class="lecture-player" v-if="detilsData.video">
        <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="detilsData.playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)">
        </video-player>
      </div>
      <div class="lecture-introduce">
        <div class="lecture-subject">{{detilsData.title}}</div>
        <div class="lecture-inf">
          <span>{{detilsData.author}}</span>&nbsp;|&nbsp;
          <span>{{detilsData.short_introduce}}</span>
        </div>
        <p ref="introduce">
          {{detilsData.describe}}
        </p>
        <div class="lecture-icon" @click="iconClick">
          <i class="el-icon-arrow-down" ref="iconArrow"></i>
        </div>
      </div>
      <div class="lecture-audio">
        <aplayer :music="detilsData.songList"
                 theme="#AACA13" mode="circulation"
                 listMaxHeight='60px' ref="player" v-if="detilsData.audio"></aplayer>
      </div>
      <div class="home-division"></div>
      <div class="main-list">
        <div class="lecture-num">
          <div class="lecture-anthology">选集</div>
          <div class="lecture-season">共{{lectureList.length}}集</div>
        </div>
        <div class="lecture-picture" ref="lectrueTabs">
          <div :style="'width:'+lectureList.length*160+'px'">
            <div class="lecture-img" v-for="item in lectureList" @click="listItem(item.id)">
              <img :src="item.pic" alt="图片">
              <div class="lecture-mask" v-if="item.mask">正在播放</div>
            </div>
          </div>
        </div>
        <div class="home-division"></div>
        <div class="lecture-num">
          <div class="lecture-anthology">讲者介绍</div>
        </div>
        <div class="lecture-author">
          <img :src="detilsData.author_logo" alt="">
          <div class="lecture-author-inf">
            <p>{{detilsData.author}}</p>
            <p>{{detilsData.short_introduce}} </p>
          </div>
        </div>
        <div class="lecture-present">
          {{detilsData.introduce}}
        </div>
        <div class="lecture-num">
          <div class="lecture-anthology">简介</div>
        </div>
        <!--内容-->
        <div class="lecture-content" v-html="detilsData.content"></div>
        <div class="lecture-tagName">
          <span v-for=" item in detilsData.lottery_tag_name">
            {{item}}
          </span>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from '../../components/main/footer'
  import {videoPlayer} from 'vue-video-player';
  import BScroll from 'better-scroll'
  import Aplayer from 'vue-aplayer'

  export default {
    name: "lcture-details",
    data() {
      return {
        icon: true,
        video: false,
        audio: true,
        width: "600px",
        mask:true
      }
    },
    methods: {
      init() {
        this.$nextTick(function () {
          let lableTabs = this.$refs.lectrueTabs;
          this.scroll = new BScroll(lableTabs, {
            scrollX: true,
            click: true,
            tap: true
          });
          let id = this.$route.params.id;
          let scroll = this.scroll;
          console.log(id);
          console.log(scroll);
          this.$store.dispatch('getLectureDetils', {id,scroll});//获取开讲列表详情;
        });
      },
      onPlayerPlay(player) {
        //alert("play");
      },
      onPlayerPause(player) {
        //alert("pause");
      },
      iconClick() {
        let introduce = this.$refs.introduce;
        let iconArrow = this.$refs.iconArrow;
        if (this.icon) {
          introduce.style.height = "auto";
          addClass(iconArrow, "el-icon-arrow-up");
          removeClass(iconArrow, "el-icon-arrow-down");
          this.icon = false;
        } else {
          introduce.style.height = "1rem";
          addClass(iconArrow, "el-icon-arrow-down");
          removeClass(iconArrow, "el-icon-arrow-up");
          this.icon = true;
        }
      },
      listItem(id) {
        this.$store.dispatch('getLectureList',{id});//传入开讲详情的id,进行滑动;
        this.$router.push({name: 'LectureDetails', params: {id: id}});
      }
    },
    mounted() {
      /* let that = this;
       function animate() {
         console.log(that.$refs.videoPlayer.player.currentTime());
         requestAnimationFrame(animate);
       }
       requestAnimationFrame(animate);*/
    },
    created() {
      this.init();
      let id = this.$route.params.id;
      this.$store.dispatch('getLectureList',{id});//传入开讲详情的id,进行滑动;
    },
    watch: {
      $route(to, from) {
        let id = to.params.id;
        let scroll = this.scroll;
        this.$store.dispatch('getLectureDetils', {id,scroll});//获取开讲列表详情;
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      },
      lectureList() {
        return this.$store.getters.lectureList;
      },
      detilsData() {
        return this.$store.getters.lectureDetils;
      }
    },
    components: {AppFooter, videoPlayer, Aplayer}
  }
</script>

<style scoped>
  .demo {
    background: red;
  }
</style>
