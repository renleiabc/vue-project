<template>
  <div>
    <div>
      <slot name="lable"></slot>
    </div>
    <!--内容区域-->
    <div>
      <slot>adasdasd</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "module-slot"
  }
</script>

<style scoped>

</style>
