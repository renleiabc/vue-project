<template>
  <div>
    <h1>我的评论</h1>
    <div class="come-coll" v-if="isComment">
      <div class="article-comment" v-for="(item,key) in comment">
        <div class="article-time">
          <div class="article-left">
            <router-link :to="{name:'Article',params:{id:item.article_id}}" tag="a" class="come-article article-brackets">
              <span>《</span>
              <span>{{item.title}}</span>
              <span>》</span>
            </router-link>
          </div>
          <div class="article-right">
            <span class="comment-time"></span>
            <span>{{item.created_at}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <i class="el-icon-delete comment-icon" @click="deleteClick(key)"></i>
          </div>
        </div>
        <p class="article-text">{{item.content}}</p>
      </div>
      <div class="table-footer" style="padding: 0 20px">
        <div class="table-num">
          <span>{{commentPage.total}}条内容，</span>
          <span>共{{commentPage.pageNum}}页，</span>
          <span>当前第{{commentSize}}页</span>
        </div>
        <div class="table-icon" v-if="isCommentPage">
          <el-pagination
            layout="prev,next"
            @current-change="aritcleComment"
            :total="commentPage.total"
            :page-size="commentPage.pageSize">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="member-no" v-else>
      <div class="member-empty">
        <img src="../../../assets/images/respon/comment.svg" alt="图片">
        <p class="member-send">还未发表评论</p>
        <p class="member-contact">欢迎在文章评论区留下您的言论/观点</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-comment",
    data() {
      return {
        message: '',
        commentSize:1,
        recoveryId:"",
      }
    },
    methods: {
      deleteClick(key) {
        console.log(key);
        let that = this;
        let aritcle = this.$store.state.personal.comment;
        let id = this.recoveryId = aritcle[key].id;
        let obj = {id:id, type:0};
        let page = 1;
        this.$store.dispatch('getDeleteComment',{obj,page});//个人中心评论删除接口调用
        this.message = this.$message({
          showClose: true,
          duration: 6000,
          customClass: "recovery",
          dangerouslyUseHTMLString: true,
          message: "<div><strong>已取消关注！</strong> <strong id='recovery' class='strong'>恢复</strong></div>",
          type: 'success'
        });
        var recovery = document.getElementById('recovery');
        recovery.onclick = function () {
          let  page = that.commentSize;
          let id = that.recoveryId;
          let obj = {id:id, type:1};
          that.$store.dispatch('getRecoveryComment',{obj});//个人中心评论恢复接口调用
          that.$store.dispatch('getMyComment',{page});//个人中心我的评论列表接口
          that.message.close();//关闭恢复消息框；
        }
      },
      aritcleComment(page){
        this.commentSize = page;
        this.$store.dispatch('getMyComment',{page});//个人中心我的评论列表接口
      }
    },
    created() {
      let page = 1;
      this.$store.dispatch('getMyComment',{page});//个人中心我的评论列表接口
    },
    mounted() {

    },
    computed: {
      comment() {//我的评论是否存在
        return this.$store.getters.comment;
      },
      isComment() {//我的评论是否存在
        return this.$store.getters.isComment;
      },
      isCommentPage() {//个人中心我的评论是否显示分页
        return this.$store.getters.isCommentPage;
      },
      commentPage() {//我的评论列表下一页
        return this.$store.getters.commentPage;
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/author/personaCome.css";
</style>
