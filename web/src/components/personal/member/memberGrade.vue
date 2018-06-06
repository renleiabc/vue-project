<template>
  <div class="member">
    <div class="member-top">
      <div class="member-title">
        <h2 class="member-hello">hello，</h2>
        <h2 class="member-hello">{{memberInf.memberName}}</h2>
        <p class="member-account">您是美柏{{memberInf.level_name}}</p>
        <span class="personal-small">
       加入会员请联系：miao.guo@mybiogate.com
      </span>
      </div>
      <div class="personal-tou">
        <img src="/static/images/public/tou.jpg" alt="头像">
      </div>
    </div>
    <ul class="member-grade">
      <li v-for="item in member">
        <h3 class="member-insider">{{item.insider}}</h3>
        <div class="member-money">
          <span class="member-wan">{{item.wan}}</span>
          <span class="member-each">元/年</span>
        </div>
        <h4 class="member-service">投资服务</h4>
        <div class="member-stage">
          <p v-for="stage in item.stage">
            {{stage}}
          </p>
        </div>
        <div class="member-project" v-for="project in item.project">
          <i class="el-icon-success"></i>
          <span>{{project}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "member-grade",
    data() {
      return {
        member: [
          {
            insider:"VIP会员",
            wan:"10万",
            stage:[
              "免费查看海外创新项目",
              "尊享个性化定向拓展的项目库项目",
              "每季度10个可投项目的前期合作接洽服务"
            ],
            project:[
              "优惠价获得1个细分行业或产品的海外图谱",
              "免费查看、搜索、下载1个行业数据库",
              "免费获得2个名额，收看微信公众号上的所有音频、视频专辑",
              "免费推荐海外知名华人科学家，获得联系方式",
              "第一时间获取美柏医健在中国和美国主办或承办的项目对接活动信息",
              "免费企业及其活动宣传机会"
            ]
          },
          {
            insider:"超级VIP会员",
            wan:"20万",
            stage:[
              "免费查看海外创新项目",
              "尊享个性化定向拓展的项目库项目",
              "每季度10个可投项目的前期合作接洽服务"
            ],
            project:[
              "优惠价获得2个细分行业或产品的海外图谱",
              "免费查看、搜索、下载2个行业数据库",
              "免费获得4个名额，收看微信公众号上的所有音频、视频专辑",
              "免费推荐海外知名华人科学家，获得联系方式，并可协助联络1位",
              "第一时间获取美柏医健在中国和美国主办或承办的项目对接活动信息",
              "免费企业及其活动宣传机会"
            ]
          },
          {
            insider:"顶级VIP会员",
            wan:"50万",
            stage:[
              "拥有1个项目库账号，可以查阅项目库所有项目的基础信息",
              "量身推荐符合要求的项目，由专人负责跟进项目推荐和对接",
              "协助会员企业与推荐项目的电话会议",
              "协助会员企业安排出国访问、考察项目方的行程",
              "协助安排项目方访问中国和与会员企业的会面"
            ],
            project:[
              "免费获得所有细分行业及产品的海外图谱",
              "免费查看、搜索、下载所有行业数据库",
              "获得10个免费名额，收看微信公众号上的所有音频、视频专辑",
              "免费推荐海外知名华人科学家，获得联系方式，并可根据客户需求协助联络",
              "第一时间获取美柏医健在中国和美国主办或承办的项目对接活动信息",
              "由专人协助会员企业在活动前及活动中与目标项目的对接会议",
              "免费企业及其活动宣传机会"
            ]
          }
        ]
      }
    },
    created(){

    },
    computed:{
      memberInf() {
        return this.$store.getters.memberInf;
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/personal/member/memberGrade.css";
</style>
