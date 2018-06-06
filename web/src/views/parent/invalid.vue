<template>
    <div class="invalid">
      <h1>您访问的链接不存在……，请回到主页</h1>
    </div>
</template>

<script>
    export default {
        name: "invalid"
    }
</script>

<style scoped>
.invalid{
  width: 100%;
  height: 100%;
  background: url("/static/images/icon/404.jpg") center no-repeat;
  background-size: cover;
  overflow: hidden;
}
.invalid h1{
  width: 100%;
  margin-top: 30px;
  font-size: 25px;
  text-align: center;
  color: #fff;
}
</style>
