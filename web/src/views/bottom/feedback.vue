<template>
  <div>
      <div class="auto_center">
        <img src="/static/images/public/feedback-pic01.png" alt=""  class="top_img">
      </div>
      <div  class="auto_center bottom_box" style="text-align: center">
        <textarea  placeholder="请在这里告诉我们"  maxlength="255"  v-model="feedBackValue" cols="2" rows="10"></textarea>
        <p><span class="btn-submit" @click="feedBackSubmit">提交</span></p>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        feedBackValue:''
      }
    },
    methods:{
      feedBackSubmit:function () { //用户反馈信息
        var _t = this
        if(_t.feedBackValue){
          _t.$post('/feedback',{
            content:_t.feedBackValue
          }).then(function (res) {
            if(res.code===200){
              if(res.data.status===0){
                _t.$message.error(res.data.message);
              }else{
                _t.$message({
                  message: res.data.message,
                  type: 'success'
                });
                _t.feedBackValue = ''
              }
            }else{
              _t.$message.error(res.message||res.status||res);
            }
          },function (err) {
            _t.$message.error((err&&err.data.message)||'网络错误，请稍后再试');
          })
        }else{
          _t.$message.error('请填写反馈信息');
        }

      }
    }
  }
</script>

<style scoped>
  .auto_center{
    width: 1180px;
    margin: 0 auto;
  }
  .top_img{
    width: 100%;
  }
   textarea{
    width: 50%!important;
    height: 230px!important;
    resize: none;
    overflow-y:auto;
    outline:none;
    padding: 15px;
    border: 1px solid rgba(199, 199, 199,.5);
    border-radius: 5px;
    border-bottom-left-radius:0;
    border-bottom-right-radius:0;
    box-sizing: border-box;
  }
  .bottom_box{
    padding: 20px 0;
    margin-bottom: 80px;
  }
  .btn-submit{
    display: inline-block;
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background:rgba(56,56,56,1);
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  textarea+p{
    margin-top: 20px;
  }
</style>
