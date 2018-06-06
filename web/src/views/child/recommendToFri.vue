<template>
    <div class="recommend">
      <div class="recommend_content">
       <div class="logo">
         <img src="../../assets/images/application/logo.png" alt="">
       </div>
        <div class="content_text">
          <span>引荐他人成为作者</span>
        </div>
        <div class="content_bottom_text">
          <span>把以下链接发给您的朋友<br>Ta可以直接到达申请成为作者的主页。</span>
        </div>
        <div class="interUrl">
          <span ref="copyDom">
            http://www.mybiogate.com/application
          </span>
        </div>
        <div class="copy_tip" v-if="showTip">
          <span>
             <img src="../../assets/images/application/correct.svg" alt="">
             <span>复制成功!</span>
          </span>
        </div>
        <div class="copy_btn">
          <span @click="copyUrl">复制链接</span>
        </div>
      </div>
      <div class="recommend_bottom">
      <span @click="backHome">
         返回美柏首页
      </span>
      </div>
    </div>

</template>

<script>
    export default {
       data(){
         return {
           showTip:false
         }
       },
        methods:{
          copyUrl:function () {
            var _t =this
            var Url2=_t.$refs.copyDom.innerText;
            var oInput = document.createElement('input');
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';
            _t.showTip = true
            setTimeout(function () {
              _t.showTip = false
            },6000)
          },
          backHome:function () {
            var _t = this
            _t.$router.push({name:'Home'})
            //_t.$router.push('Home')
          }


        }
    }
</script>

<style scoped>
.recommend{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  .recommend_content{
    background: url("../../assets/images/application/recommend_bj.jpg") no-repeat;
    background-size: 700px 700px;
    width: 700px;
    height: 627px;
    margin: 81px auto 0;
    padding-top: 100px;
  }
  .logo,.content_text,.content_bottom_text,.interUrl,.copy_btn,.recommend_bottom,.copy_tip{
    text-align: center;
  }
  .logo>img{
    width: 82px;
    height: 29px;
  }
  .content_text{
    margin-top: 86px;
  }
.content_text>span{
  color: #383838;
  letter-spacing: 2px;
  font-size: 36px;
}
.content_bottom_text{
  margin-top: 41px;
  margin-bottom: 18px;
}
  .content_bottom_text>span{
    letter-spacing: 2px;
    font-size: 14px;
    line-height: 28px;

  }
  .interUrl>span{
    display: inline-block;
    width: 380px;
    height: 43px;
    border: 1px solid #C7C7C7;
    line-height: 43px;
    font-size: 16px;
    color: #383838;
    letter-spacing: 2px;

  }
  .copy_btn{
    margin-top: 27px;
  }
.copy_btn>span{
  display: inline-block;
  width: 180px;
  height: 40px;
  line-height: 40px;
  letter-spacing: 2px;
  background: #383838;
  color: #ffffff;
  border-radius: 2px;
  cursor: pointer;
}
.recommend_bottom{
  width: 700px;
  margin: 0 auto;
}
  .recommend_bottom>span{
    width: 420px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 2px;
    background: #383838;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
  }
  .copy_tip{
    position: relative;
  }
  .copy_tip>span{
    display: inline-block;
    width: 120px;
    height: 36px;
    color: #383838;
    line-height: 36px;
    border-radius: 2px;
    box-shadow: 0 0 6px 0 #C7C7C7;
    font-size: 12px;
    letter-spacing: 2px;
    position: absolute;
    background: #ffffff;
    top: -20px;
    left: 50%;
    margin-left: -60px;
  }
.copy_tip>span>img{
  vertical-align: middle;
}
</style>
