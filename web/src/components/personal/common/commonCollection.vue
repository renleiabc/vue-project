<template>
  <div class="member">
    <h1>我的收藏</h1>
    <div class="member-collect">
      <div class="member-plate">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                     class="member-cancel">
        </el-checkbox>
        <div class="member-select" @click="cancelColl">取消收藏</div>
        <div class="member-time">
          <span>按收藏时间排序</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <el-checkbox-group v-model="checkedColl" @change="handleCheckedCitiesChange" fill="red" text-color="#000">

          <div class="member-data" v-for="(item,index) in collection">
            <el-checkbox   :label="item.id" :key="item.id">
            </el-checkbox>
            <div class="home-pane">
              <router-link :to="{name:'Article',params:{id:item.id}}">
                <h1>{{item.title}}</h1>
              </router-link>
              <div class="home-tabs">
                <div class="home-tabs-left">
                  <p>{{item.describe}}</p>
                  <div class="home-tabs-lable">
                    <img :src="item.author_pic" alt="人物" class="home-img">
                    <span>{{item.author}}</span>
                    <span>&#8226;</span>
                    <span class="span-text">{{item.release_at}}</span>
                    <img src="/static/images/public/tag.svg" alt="标签">
                    <span class="span-text">{{item.class_name}}</span>
                    <img src="/static/images/public/readNums.svg" alt="阅读" style="margin-left: auto">
                    <span class="span-text">{{item.views}}</span>
                    <img src="/static/images/public/collectNum.svg" alt="收藏">
                    <span class="span-text">{{item.collection_num}}</span>
                    <img src="/static/images/public/clickGoodNum.svg" alt="点赞">
                    <span class="span-text">{{item.like_num}}</span>
                  </div>
                </div>
                <div class="home-tabs-right">
                  <img :src="item.pic" alt="">
                </div>
              </div>
            </div>
          </div>
      </el-checkbox-group>
      <!---->
    </div>
    <div class="research-content-bottom" v-show="pageNow">
      <el-pagination
        background
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="collTotal"
        :page-size="pageSize"
        pager-count="10"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: "personal",
    data() {
      return {
        checkAll: false,
        checkedColl: [],
        isIndeterminate: false,
        cancelStr: "",
      };
    },
    methods: {
      currentChange(val) {//点击分页获取数据；
        this.$store.commit('pagingClicks', {val});
      },
      handleCheckAllChange(val) {//全选
        let getColl = this.$store.state.member.collId;
        this.checkedColl = val ? getColl : [];
        this.isIndeterminate = false;
        if (val) {
          this.cancelStr = this.checkedColl.join(",");
        }
      },
      handleCheckedCitiesChange(value) {//点击选中
        let checkedCount = value.length;
        this.cancelStr = value.join(",");
        let getColl = this.$store.state.member.collId;
        this.checkAll = checkedCount === getColl.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < getColl.length;
      },
      cancelColl() {//取消收藏的方法
        if (this.cancelStr == "") {
          alert("请选择需要取消的内容");
        } else {
          let article_id = this.cancelStr;
          this.$store.commit('cancelClicks', {article_id});
        }
      }
    },
    created() {
      this.$store.dispatch('getMycollection');//调用我的收藏
    },
    computed: {
      collection() {
        return this.$store.getters.collection;
      },
      paging() {
        return this.$store.getters.paging;
      },
      collTotal() {
        var total = parseInt(this.$store.getters.collTotal)
        return total;
      },
      pageSize() {
        var pageSize = parseInt(this.$store.getters.per_page)
        return pageSize;
      },
      collId() {
        return this.$store.getters.collId;
      },
      pageNow() {
        return this.$store.getters.pageNow;
      },
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberCollection.css";
</style>
