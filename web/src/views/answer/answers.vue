<template>
  <div>投资人问答</div>
</template>

<script>
  export default {
    name: "module",
    data() {
      return {
        login: false,
        activeName: 'selection',
        url: "http://172.30.51.67/meijian/public/index.php/api/v1"
      }
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    },
    mounted() {
    },
    created() {
      console.log(this.url);
      var data = this.$patch("/message/country/mobile");
     data.then((value) => {
       console.log(value.data);
      },err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>

</style>
