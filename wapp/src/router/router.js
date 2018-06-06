import Vue from 'vue'
import Router from 'vue-router'
/*引入导航的页面*/
import Main from '@/views/main/main'
import Home from '@/views/home/home'
import Reading from '@/views/reading/reading'//分类阅读
import LectureView from '@/views/lecture/lecture'//开讲
import LectureLists from '@/views/lecture/lectureLists'//开讲列表
import LectrueDetails from '@/views/lecture/lectureDetails'//开讲详情
import Article from '@/views/reading/article'//文章
/*


import Answers from '@/views/answer/answers'//问答
import Service from '@/views/service/service'//海外项目
import MeiboVIP from '@/views/service/meiboVIP'//美柏VIP
import serviceDetail from '@/views/service/serviceDetail'
import Roadshow from '@/views/service/roadshow'//路演
import Activity from '@/views/activity/activity'//活动
import Research from '@/views/research/research'//行研
import ResearchDetail from '@/views/research/researchDetail.vue'
import Login from '@/views/personal/login'
import Personal from '@/views/personal/personal'//个人中心
import Member from '@/views/personal/member'//会员中心
import Application from '@/views/main/application'
import ArticleDetail from '@/views/child/articleDetail'
import LectureDetail from '@/views/lecture/LectureDetail' // 单个课程详情页
import LectureLists from '@/views/lecture/LectureLists' //单个专辑页
import LectureView from '@/views/lecture/lectrueView' //开讲列表渲染容器
import Result from '@/views/child/searchResults' //搜索界面
import Access from '@/wechat/access' //微信支付
import Invalid from '@/views/main/invalid' //微信支付
import AboutOur from '@/views/bottom/aboutOur'//关于我们
import Disclaimer from '@/views/bottom/disclaimer'//免责声明
import Feedback from '@/views/bottom/feedback'//意见反馈*/
Vue.use(Router);
//路由的数据配置
const RouterConfig = {
  mode: 'history',
  base: __dirname,
  linkActiveClass: "active",
  routes: [
    {path: '/', component: Main, children: [
      {name: 'Home', path: '/', component: Home},//首页
      {name: 'Reading', path: 'reading/:id', component: Reading},
      {name: 'Article', path: 'article/:id', component: Article},//首页
    ]},
    {path: '/lectureLists', component: LectureView, children: [
        {name: 'LectureLists',path: '', component:LectureLists},
        {name: 'LectureDetails',path: 'LectureDetails/:id', component:LectrueDetails},
      ]
    },//开讲
    /* //分类阅读
    ,//
     {name: 'Roadshow', path: 'roadshow', component: Roadshow},//路演
     {
       name: 'Lecture', path: 'lecture', component: Lecture, meta: {keepAlive: false}
     },//开讲
     {
       path: 'lectureLists', component: LectureView, meta: {keepAlive: false}, children: [
         {name: 'LectureLists', path: '', component: LectureLists, meta: {keepAlive: false}},
         {name: 'LectureDetail', path: 'lectureDetail/:id', component: LectureDetail, meta: {keepAlive: false}}, //开讲详情
       ]
     }, //课程专辑
     {name: 'Answers', path: 'answers', component: Answers},//问答
     {name: 'Service', path: 'service', component: Service},//投资人服务(海外项目列表页)
     {name: 'MeiboVIP', path: 'meibovip', component: MeiboVIP},//投资人服务(投资服务列表页)
     {name: 'serviceDetail', path: 'service/serviceDetail/:id', component: serviceDetail},//海外路演详情页
     {name: 'Activity', path: 'activity', component: Activity},//活动
     {name: 'Research', path: 'search', component: Research},//行研
     {name: 'ResearchDetail', path: 'ResearchDetail:id', component: ResearchDetail},
     {name: 'Login', path: 'login', component: Login},//登录/注册
     {name: 'Application', path: 'application', component: Application},//申请为专栏作者
     {name: 'ArticleDetail', path: 'articleDetail/:detailId', component: ArticleDetail, children: []},////文章详情
     {name: 'Result', path: 'search=:string', component: Result}, //搜索结果
     {name: 'AboutOur', path: 'aboutOur', component: AboutOur}, //关于美柏
     {name: 'Disclaimer', path: 'disclaimer', component: Disclaimer}, //免责声明
     {name: 'Feedback', path: 'feedback', component: Feedback}, //意见反馈*/
  ],

  /*{name: 'Personal', path: '/personal', component: Personal},//个人中心
  {
    name: 'Member', path: '/Member', component: Member, meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },//会员中心
  {name: 'Access', path: '/wechat/access', component: Access},//微信支付
  {name: 'Invalid', path: "/invalid", component: Invalid},//无效界面
  {path: "*", redirect: "/invalid"},//无效界面跳转*/

  scrollBehavior: function (to, from, savedPosition) { //切换路由滚动条回到顶部
    return {x: 0, y: 0}
  }
}
//配置路由；
const RouterModule = new Router(RouterConfig);
//导出模块
export default RouterModule
