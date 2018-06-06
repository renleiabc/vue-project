<template>
  <div>
    <!--搜索提示框-->
    <el-dialog :visible.sync="value" width="800px" class="prompt" :before-close="handleClose">
      <div class="prompt-box">
        <div class="prompt-text">
          <img src="/static/images/public/search.svg" alt="">
          <input v-model="search" type="text" placeholder="搜索">
        </div>
        <div class="search-prompt">{{prompt}}</div>
        <div class="prompt-title">大家都在搜</div>
        <ul class="prompt-content" @click="handleContent">
          <li>AI人工智能</li>
          <li>人物</li>
          <li>肿瘤</li>
          <li>创新药</li>
          <li>区块链</li>
          <li>肿瘤免疫疗法</li>
          <li>医疗器械</li>
          <li>精准医疗</li>
          <li>分子检测</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        dialogVisible: false,
        loginVisible: false,
        prompt: "",
        search: ""
      }
    },
    methods: {
      init() {
        let nav = this.$refs.nav;
        //吸顶函数；
        ceiling(nav, "nav-fixed");
      },
      handleClose() {//点击叉X取消,隐藏弹出框
        this.prompt = "";
        this.search == "";
        this.$emit("changeValue", false);

      },
      cancel() {//点击取消按钮，隐藏弹出框
        this.prompt = "";
        this.search == "";
        this.$emit("changeValue", false);

      },
      dialogSubmit() {//点击确定按钮，提交数据并取消弹出框
        if (this.search == "") {
          this.prompt = "搜索内容不能为空";
          return;
        }
        var keyword = this.search;
        this.$emit("changeValue", false);
        var str = encodeURIComponent(keyword);
        //this.$store.commit('searchKey', {str});
        this.$router.push({name: 'Result', params: {string:str}},);//动态路由传参；// 路由跳转时这么写
      },
      handleContent(event) {
        this.prompt = "";
        var event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == "li") {
          this.search = target.innerHTML;
        }
      }
    },
    created() {
      //console.log(this.values)；
      //this.$store.dispatch('getSearchData');
    },
    props: ["value"]
  }
</script>

<style scoped>
  @import "../../assets/css/mian/search.css";
</style>
