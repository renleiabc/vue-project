<template>
  <div>
  </div>
</template>

<script>
    export default {
        name: "article",
      data(){
          return {
            title:"",
            id:"",
          }
      },
      created (){
        let bookID = this.$route.params.id;
        this.title = bookID;
        console.log(bookID);
      },
    }
</script>

<style scoped>

</style>
