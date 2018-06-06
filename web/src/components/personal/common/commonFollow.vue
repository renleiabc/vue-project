<template>
  <div>
    <h1>关注的作者</h1>
    <div class="follow" v-if="isAttention">
      <ul class="follow-box" ref="followBox">
       <!-- <li style="display: none;">
          <div class="follow-img">
            <img src="../../../assets/images/respon/follow.svg" alt="图片">
          </div>
          <div class="follow-text">
            <span>已关注：36</span>
          </div>
          <div class="follow-btn">
            <input type="button" value="进入关注专栏">
          </div>
        </li>-->
        <li v-for="(item,key) in attentionList" >
          <div class="follow-line" @mouseenter="followAppear(key)" @mouseleave="followHidden">
            <div class="follow-cancel" @click.stop="followCancel(key)">
              <span>取消关注</span>
              <i class="el-icon-close"></i>
            </div>
            <router-link :to="{name:'Author',params:{authorId:item.user_id}}">
              <div class="follow-img">
                <img :src="item.photo" alt="图片">
              </div>
              <div class="follow-text">
                <span>{{item.pseudonym}}</span>
              </div>
              <div class="follow-introduce">
                <span>{{item.introduce}}</span>
              </div>
              <div class="follow-num">
                <span>文章数：{{item.article_total}}</span>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
      <div class="research-content-bottom" v-show="isAttentionPage">
        <el-pagination
          background
          @current-change="attentionChange"
          layout="prev, pager, next"
          :total="attentionPage.total"
          :page-size="attentionPage.pageSize"
          pager-count="10"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
    <div class="member-no" v-else>
      <div class="member-empty">
        <img src="../../../assets/images/respon/follow.svg" alt="图片">
        <p class="member-send">您还没有关注作者喔</p>
        <p class="member-contact">快去关注您感兴趣的作者吧~</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-follow",
    data() {
      return {
        collapse: 1,
        collTotal: 100,
        pageSize: 2,
        pageNow: true,
        num:[1,2,3,5,6,7,8],
        cancel:false,
        recovery:"",
        pageData:1,
        messageBox:""
      }
    },
    methods: {
      attentionChange(page) {//点击分页获取数据；
        this.pageData = page;
        this.$store.dispatch('getAttentionAuthorList',{page});//个人中心我的评论列表接口
      },
      followCancel(key){
        let that = this;
        let attentionList = this.$store.state.personal.attentionList;
        let id = this.recovery = attentionList[key].user_id;
        let obj = {user_id:id};
        console.log(id);
        let page = 1;
        this.$store.dispatch('getDeleteAttention',{obj,page});//个人中心我的关注删除接口调用
        this.messageBox = this.$message({
          showClose: true,
          duration:6000,
          customClass:"recovery",
          dangerouslyUseHTMLString: true,
          message: "<div><strong>已取消关注！</strong> <strong id='cancel' class='strong'>恢复</strong></div>",
          type: 'success'
        });
        var recovery = document.getElementById('cancel');
        recovery.onclick = function () {
          let id = that.recovery;
          let obj = {user_id:id};
          let page = that.pageData;
          that.$store.dispatch('getRecoveryAttention',{obj});//个人中心评论恢复接口调用
          that.$store.dispatch('getAttentionAuthorList',{page});//个人中心我的关注列表接口
          that.messageBox.close();//关闭恢复消息框；
        }
      },
      followAppear(key){
        let folllowBox = this.$refs.followBox;
        let child = folllowBox.children;
        for(var i=0; i<child.length;i++){
         child[i].children[0].children[0].style.display = 'none';
        }
        child[key].children[0].children[0].style.display = 'block';
      },
      followHidden(){
        let folllowBox = this.$refs.followBox;
        let child = folllowBox.children;
        for(var i=0; i<child.length;i++){
          child[i].children[0].children[0].style.display = 'none';
        }
      }
    },
    created(){
      let page = 1;
      this.$store.dispatch('getAttentionAuthorList',{page});//个人中心我的关注列表接口
    },
    computed: {
      attentionList() {//关注的作者的列表
        return this.$store.getters.attentionList;
      },
      isAttention() {//关注的作者的是否显示关注作者
        return this.$store.getters.isAttention;
      },
      isAttentionPage() {//是否显示关注作者分页
        return this.$store.getters.isAttentionPage;
      },
      attentionPage() {//关注作者分页参数
        return this.$store.getters.attentionPage;
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberFollow.css";
</style>
