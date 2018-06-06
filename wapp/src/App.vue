<template>
  <div id="app" class="global">
    <router-view/>
    <div class="back-top" ref="backTop" v-show="back"  @click="backTop">
      <img src="/static/images/back.svg" alt="back">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        back: false
      }
    },
    mounted: function () {
      let that = this;
      let backTop = this.$refs.backTop;
      window.onscroll = function (event) {
        let scrollTop = getScrollTop();//获取滚动条的高度；
        let scrollHeight = getScrollHeight();//获取整个文档的高度；
        let clientHeight = getClientHeight();//获取可视窗口范围内的高度;
        let add = scrollTop + clientHeight;
        if (scrollHeight - add <= 143) {
          backTop.style.bottom = 163 + "px";
        } else {
          backTop.style.bottom = 50 + "px";
        }
        ;
        if (scrollTop > clientHeight - 500) {
          that.back = true;
        } else {
          that.back = false;
        }
      };

    },
    methods: {
      backTop() {
        var gotoTop = function () {
          var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition -= 10;
          if (currentPosition > 0) {
            window.scrollTo(0, currentPosition);
          } else {
            window.scrollTo(0, 0);
            clearInterval(timer);
            timer = null;
            this.back = false;
          }
        }
        var timer = setInterval(gotoTop, 1);
      }
    },
  }
</script>

<style>

</style>
