<template>
  <div>
    <h2 class="come-title">我的收入</h2>
    <div class="member-all" v-if="total_income">
      <div class="come-enter">当月收入会在月底打入您的工资卡哦</div>
      <div class="come-money">
        <div class="come-left">
          <div class="come-total">
            <div class="come-img">
              <img src="../../../assets/images/respon/total.svg" alt="图片">
            </div>
            <div class="come-coin">
              <p>{{total.total_income}}</p>
              <p>￥&nbsp;总收入</p>
            </div>
          </div>
        </div>
        <div class="come-right">
          <div class="come-total">
            <div class="come-img">
              <img src="../../../assets/images/respon/month.svg" alt="图片">
            </div>
            <div class="come-coin">
              <p>{{total.total_income}}</p>
              <p>￥&nbsp;本月收入</p>
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="tagName" @tab-click="tagHandleClick" class="come-tag">
        <el-tab-pane label="按文章查看收入" name="first">
          <el-collapse  accordion @change="collapseClick">
            <div class="come-coll" v-for="(item,key) in listIncome">
              <div class="come-head">
                <span class="come-article">文章</span>
                <span class="come-in come-margin">收入</span>
              </div>
              <el-collapse-item :name="key+1">
                <template slot="title">
                  <div class="come-year">
                    <router-link :to="{name:'Article',params:{id:item.id}}" tag="a" class="come-article come-link">
                      {{item.title}}
                    </router-link>
                    <span class="come-in">￥{{item.amount}}</span>
                  </div>
                </template>
                <div class="collTable">
                  <el-table
                    :data="detailIncome"
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      :index="indexMethod"
                      label="序号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="pay_time"
                      label="时间"
                      width="380">
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="收入"
                      width="293">
                    </el-table-column>
                  </el-table>
                  <div class="table-footer">
                    <div class="table-num">
                      <span>{{smallPage.total}}条内容，</span>
                      <span>共{{smallPage.pageNum}}页，</span>
                      <span>当前第{{currentSamll}}页</span>
                    </div>
                    <div class="table-icon">
                      <el-pagination
                        layout="prev,next"
                        @current-change="smallChange"
                        :total="smallPage.total"
                        :page-size="listPage.pageSize">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </div>
            <div class="research-content-bottom" v-if="isPage">
              <el-pagination
                background
                @current-change="currentChange"
                layout="prev, pager, next"
                :total="listPage.totalPage"
                :page-size="listPage.per_page"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="按时间查看收入" name="second">
          <el-collapse accordion @change="yearClick">
            <div class="come-coll" v-for="(item,key) in yearIncome">
              <div class="come-head">
                <span class="come-article">时间</span>
                <span class="come-in come-margin">收入</span>
              </div>
              <el-collapse-item :name="key+1">
                <template slot="title">
                  <div class="come-year">
                    <span class="come-article">
                      {{item.created_year}}
                    </span>
                    <span class="come-in">￥{{item.amount}}</span>
                  </div>
                </template>
                <el-table
                  :data="monthevery"
                  style="width: 100%">
                  <el-table-column
                    prop="created_month"
                    label="自然月">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="收入">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </div>
            <div class="research-content-bottom" v-if="isYear">
              <el-pagination
                background
                @current-change="yearChange"
                layout="prev, pager, next"
                :total="yearPage.totalPage"
                :page-size="yearPage.per_page"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="member-no" v-else>
      <div class="member-empty">
        <img src="../../../assets/images/respon/month.svg" alt="图片">
        <p class="member-send">发布了文章才有机会获得打赏收入</p>
        <p class="member-contact">请联系您的美柏对接同事，获取发布文章的方法。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "author-income",
    data() {
      return {
        tagName: 'first',
        collapse: "1",
        currentSamll:"1",
        collTotal: 100,
        tagId:"",
        monthData: [{
          date: '一月',
          comein: 150.00
        }, {
          date: '二月',
          comein: 122
        }, {
          date: '三月',
          comein: 1246.20
        }, {
          date: '四月',
          comein: 13446.20
        }]
      };
    },
    methods: {
      indexMethod(index){
        return index+1;
      },
      tagHandleClick(tab, event) {
        //console.log(tab, event);
      },
      currentChange(page) {//点击分页获取数据；
        this.$store.dispatch('getlistIncome', {page});//调用文章列表（我的收入页面中）接口
      },
      yearChange(page){
        this.$store.dispatch('getYearIncome',{page});//调用作者每年的收入列表统计（我的收入）接口
      },
      collapseClick(name) {
        if (name) {
          let listIncome = this.$store.state.author.listIncome;
          let id = listIncome[name - 1].id;
          this.tagId = id;
          let page = 1;
          this.$store.dispatch('getDetailIncome', {id,page});
        }
      },
      yearClick(name) {
        if (name) {
          console.log(name);
         let yearIncome = this.$store.state.author.yearIncome;
          let year = yearIncome[name - 1].created_year;
          console.log(year);
          this.$store.dispatch('getMonthIncome', {year});
        }
      },
      smallChange(page){//点击文章收入详情的分页
        console.log(page);
        this.currentSamll = page;
        let id =  this.tagId;
        this.$store.dispatch('getDetailIncome', {id,page});
      }
    },
    created() {
      this.$store.dispatch('getIncome');//调用我的收入接口
      let page = 1;
      this.$store.dispatch('getlistIncome', {page});//调用文章列表（我的收入页面中）接口
      this.$store.dispatch('getYearIncome',{page});//作者每年的收入列表统计（我的收入）
    },
    computed: {
      total_income() {//判断是否有收入
        return this.$store.getters.total_income;
      },
      total() {//总收入
        return this.$store.getters.totalIncome;
      },
      listIncome() {//文章列表
        return this.$store.getters.listIncome;
      },
      isPage() {//确定是否需要分页
        return this.$store.getters.isPage;
      },
      listPage() {//文章列表分页对象
        return this.$store.getters.listPage;
      },
      detailIncome() {//每篇文章的收入详情
        return this.$store.getters.detailIncome;
      },
      smallPage(){//文章收入详情分页
        return this.$store.getters.smallPage;
      },
      yearIncome(){//作者每年的收入列表统计（我的收入）
        return this.$store.getters.yearIncome;
      },
      isYear(){//作者每年的收入(是否显示分页)
        return this.$store.getters.isYear;
      },
      yearPage(){//作者每年的收入（分页参数）
        return this.$store.getters.yearPage;
      },
      monthevery(){//作者每年的收入（分页参数）
        return this.$store.getters.monthevery;
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/author/personaCome.css";
</style>
