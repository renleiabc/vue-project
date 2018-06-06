<template>

</template>
<script>
  export default {
    name: "access",
    data(){
      return{
        token:""
      }
    },
    created() {
      var url = window.location.search;
      var name;
      var obj = {};
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        /*strs = str.split("&");*/
        console.log(str);
        var arr =str.split("&");
        console.log(arr);
        for(var i=0;i<arr.length;i++){
          obj[arr[i].split("=")[0]]=(arr[i].split("=")[1]);
        }
        console.log(obj)
      var data = this.$get("wechat/access", {
        object: obj
      });

      data.then((value) => {
        console.log(JSON.stringify(value));

        if(value.code==200&&value.status=="success"){
         var token = value.data.access_token;
          this.token = token;
        }
        //this.homeTabs = value.data;
      }, err => {
        console.log(err);
      })

      }
    },
  }
</script>

<style scoped>

</style>
