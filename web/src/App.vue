<template>
  <div id="app" ref="global">
    <router-view/>
    <div class="back-top" @click="backTop" v-show="back" ref="backTop">
      <img src="/static/images/icon/backTop.svg" alt="top">
      <span>回到顶部</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        option: {//滚动条参数配置
          barColor: "#959595",   //滚动条颜色
          barWidth: 5,           //滚动条宽度
          railColor: "#fff",     //导轨颜色
          barMarginRight: 0,     //垂直滚动条距离整个容器右侧距离单位（px）
          barMaginBottom: 0,     //水平滚动条距离底部距离单位（px)
          barOpacityMin: 0,      //滚动条非激活状态下的透明度
          zIndex: "auto",        //滚动条z-Index
          autohidemode: false,     //自动隐藏模式
          horizrailenabled: true,//是否显示水平滚动条
        },
        scroll: "",
        back: false,
      }
    },
    mounted: function () {
      let that = this;
      let backTop = this.$refs.backTop;
      window.onscroll = function (event) {
        let scrollTop = getScrollTop();//获取滚动条的高度；
        let scrollHeight = getScrollHeight();//获取整个文档的高度；
        let clientHeight = getClientHeight();//获取可视窗口范围内的高度;
        let add = scrollTop+clientHeight;
        if(scrollHeight -add <= 350){
          backTop.style.bottom=360+"px";
        }else {
          backTop.style.bottom=100+"px";
        };
        if (scrollTop > clientHeight - 200) {
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
          }
        }
        var timer = setInterval(gotoTop, 1);
      }
    }

  }
</script>

<style>
  #app {
    height: 100%;
  }

  .back-top {
    position: fixed;
    right: 100px;
    bottom: 100px;
    cursor: pointer;
    color: #383838;
    background: #fff;
  }

  .back-top:hover span {
    background: #abca11;
    color: #fff;
  }

  .back-top > * {
    display: block;
  }

  .back-top img {
    width: 35px;
    height: 35px;
  }

  .back-top span {
    font-size: 16px;
    width: 35px;
    word-wrap: break-word;
  }
</style>
