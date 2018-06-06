<template>
  <div class="reading-leftBox">
    <ul>
      <li v-for="(val,index) in leftNaveArr" :class="{navLeftActiveSty:val.activeSty}" @click="toggleNav(val,index)">{{val.name}}</li>
    </ul>
   <!-- <div class="reading-writerBox" >
      <p><span>相关作家</span></p>
      <div class="reading-writerImg">
        <img src="/static/images/public/pic3.jpg" alt="" >
        <img src="/static/images/public/pic3.jpg" alt="" >
        <img src="/static/images/public/pic3.jpg" alt="" >
        <img src="/static/images/public/pic3.jpg" alt="" >
        <img src="/static/images/public/pic3.jpg" alt="" >
        <img src="/static/images/public/pic3.jpg" alt="" >
      </div>
    </div>-->
    <div class="reading-writerBox" style="display: none">
      <p><span>热门话题</span></p>
      <router-link class="reading-topic" tag="p" :to="{path:'#'}">#紫杉醇#</router-link>
      <router-link class="reading-topic" tag="p" :to="{path:'#'}">#新世相#</router-link>
      <router-link class="reading-topic" tag="p" :to="{path:'#'}">#新药研发#</router-link>
      <router-link class="reading-topic" tag="p" :to="{path:'#'}">#霍金去世#</router-link>
    </div>
    <div class="reading-writerBox">
      <img src="/static/images/public/banner1.jpg" alt="" width="160px" height="101px" @click="toExteral()" style="cursor: pointer">
    </div>
    <div class="reading-addTeam">
      <p class="reading-addTeam-title">加入社群</p>
      <div class="QR">
        <img src="/static/images/public/code.jpg" alt="" width="87px" height="87px">
      </div>
      <div class="QR-text">
        <span>
        微信扫码<br>
        向客服提交入群申请
        </span>
      </div>
      <div class="QR-add">投资人群  +</div>
      <div class="QR-add">路演交流群  +</div>
      <div class="QR-add">医健研究群  +</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "readingc-com",
      data(){
        return{
          // 添加导航数组项
          leftNaveArr:[]
        }
      },
      props:['id'],
      created: function () { //默认上送第一项请求接口
          var _t = this

        /*_t.leftNaveArr = [{
          id:11,
          name:'投资研究',
          activeSty:false
        },{
          id:16,
          name:'深度解读',
          activeSty:false
        },{
          id:14,
          name:'CEO访谈',
          activeSty:false
        },{
          id:15,
          name:'企业分析',
          activeSty:false
        },{
          id:17,
          name:'报告精选',
          activeSty:false
        }]
        for(var n = 0;n<_t.leftNaveArr.length;n++){
          if(_t.leftNaveArr[n].id===Number(_t.id)){
            _t.leftNaveArr[n].activeSty = true
            var storage = window.localStorage
            storage.removeItem('tagObj')
            storage.setItem('tagObj',JSON.stringify(_t.leftNaveArr[n]))
            _t.$emit('getTagId')
          }
        }*/
        var req = _t.$post("/tags", {});
        req.then((value) => {
            for(var i = 0;i<value.data.length;i++){
              var obj = value.data[i]
              obj.activeSty = false
              _t.leftNaveArr.push(obj)
            }
            for(var n = 0;n<_t.leftNaveArr.length;n++){

              if(_t.leftNaveArr[n].id===Number(_t.id)){
                 _t.leftNaveArr[n].activeSty = true
/*               var storage = window.localStorage
                storage.removeItem('tagObj')
                storage.setItem('tagObj',JSON.stringify(_t.leftNaveArr[n]))*/
                _t.$emit('getTagId')
                _t.$emit('getTagName',{name:_t.leftNaveArr[n].name})
              }
            }


        }, err => {
          console.log(err);
        })

      },
      methods: {
        toggleNav: function (val,index) {
          var _t = this
          for (var i = 0; i < _t.leftNaveArr.length; i++) {
            if (i === index) {
              _t.leftNaveArr[i].activeSty = true
             _t.$router.push({name:'reading',params:{id:_t.leftNaveArr[i].id}})

            } else {
              _t.leftNaveArr[i].activeSty = false
            }
          }
        },
        toExteral: function () {
          var _t = this
          _t.$router.push({name:'LectureLists'})
        }

      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": function () {
          var _t = this
          for(var n = 0;n<_t.leftNaveArr.length;n++){
            if(_t.leftNaveArr[n].id===Number(_t.id)){
              _t.leftNaveArr[n].activeSty = true
              _t.$emit('getTagName',{name:_t.leftNaveArr[n].name})
/*              var storage = window.localStorage
              storage.removeItem('tagObj')
              storage.setItem('tagObj',JSON.stringify(_t.leftNaveArr[n]))*/

            }else{
              _t.leftNaveArr[n].activeSty = false
            }
          }
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/reading/readingCom.css";
</style>
