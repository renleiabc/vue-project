<template>
    <div class="reviewBox">
     <div class="title">
       <img src="../../assets/images/application/reviewSuccess.svg" alt="">
     </div>
      <div class="title_text">
        <span>您的申请已提交</span>
      </div>
      <div class="content">
        <span>我们的工作人员将在5个工作日内与您联系 请注意查收邮件</span>
      </div>
      <div class="content_bottom">
       <!-- <span>美柏期待与您同行!</span>-->
        <img src="../../assets/images/application/meibo_text.svg" alt="">
      </div>
      <div class="content_logo">
        <img src="../../assets/images/application/logo.png" alt="">
      </div>
      <div class="back_home">
        <span @click="backHome">返回美柏首页</span>
      </div>
    </div>
</template>

<script>
    export default {
      created:function(){

      },
      methods:{
        backHome:function () {
          var _t =this
          _t.$router.push({name:'Home'})
        }
      }
    }
</script>

<style scoped>
.reviewBox{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/application/revieSuccess_bg.svg");
  background-size: 100% 100%;
}
.title,.title_text,.content,.content_bottom,.content_logo,.back_home{
  text-align: center;
}
.title{

}
.title>img{
  width: 70px;
  height: 70px;
  margin-top: 160px;
  margin-bottom: 24px;
  }
.title_text>span{
  font-size: 24px;
  letter-spacing: 2px;
  color: #383838;
}
  .content>span{
    display: inline-block;
    width: 398px;
    margin: 19px auto 86px;
    font-size: 18px;
    color: #383838;
    letter-spacing: 2px;
    line-height: 32px;
  }
  .content_bottom>span{
    font-size: 36px;
    letter-spacing: 20px;
    color: #383838;
    font-family: 'HanziPenSC-W3';
    opacity: .5;
  }
  .content_logo>img{
   width: 82px;
    height: 29px;
    margin-top: 82px;
    margin-bottom: 10px;
  }
  .back_home>span{
    font-size: 14px;
    color: #383838;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
