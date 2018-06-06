<template>
  <div class="main">
    <div class="articleDetail-leftBox">
        <div class="articleDetail-addTeam">
            <p class="articleDetail-addTeam-title">加入社群</p>
            <div class="QR">
                <img src="/static/images/public/code.jpg" alt="" width="87px" height="87px">
            </div>
            <div class="QR-text">
                <span>
                微信扫码<br /> 向客服提交入群申请
              </span>
            </div>
            <div class="QR-add QR1">投资人群 +</div>
            <!--<div><img src="/static/images/public/orcode.png" alt="" width="115px"></div>-->
            <div class="QR-add QR2">路演交流群 +</div>
            <!--<div><img src="/static/images/public/orcode.png" alt="" width="115px"></div>-->
            <div class="QR-add QR3">医健研究群 +</div>
            <!-- <div><img src="/static/images/public/orcode.png" alt="" width="115px"></div>-->

        </div>
        <div class="articleDetail-writerBox">
            <img @click="toExteral()" src="/static/images/public/banner1.jpg" alt="" width="160px" height="101px" style="cursor: pointer">
            <img @click="toExteral1()" src="/static/images/public/banner2.jpg" alt="" width="160px" height="101px" style="margin-top: 15px;cursor: pointer">
        </div>
    </div>
    <div class="articleDetail-newListBox">
        <div v-show="articleSave">
            <!--文章标题-->
            <div class="articleDetail-title">
                <span>{{title}}</span>
                <p>
                    <span>{{release_at}} · {{class_name}}</span>
                </p>
            </div>
            <!--文章前言-->
            <div class="articleDetail-font">
                <span v-html="describe"></span>
            </div>
            <!--文章内容-->
            <div class="articleDetail-content" v-html="content" style="overflow: hidden">

            </div>
            <!--参考资料-->
            <div class="articleDetail-source">
                <div class="reward">
                    <img src="/static/images/public/reward.svg" type="image/svg+xml" style="width: 60px;cursor: pointer" @click="authorPaymentCode"
                    />
                    <br>
                    <span>赞赏作者</span>
                </div>
            </div>
        </div>
        <div class="home-finish" v-show="articleNone">你所访问的内容不存在！</div>
        <!--参与讨论-->
        <div style="margin-top: 40px;padding: 0 55px;">
            <p class="p1">
                <embed src="/static/images/public/addTalk.svg" type="image/svg+xml" style="width: 16px;height: 16px" />
                <span>参与讨论</span>
            </p>
            <div class="inputBox">
                <textarea placeholder="欢迎参与讨论…" maxlength="255" v-model="commentValue" cols="2" rows="10"></textarea>
                <div class="submitBox">
                    <p v-if="islogin">hi, {{userName}}</p>
                    <p v-else>
                        <span style="color: #669934; cursor: pointer" @click="commentLogin">登录</span>
                        <span style="color:#615e5d">后即可参与讨论</span>
                    </p>
                    <p @click="reqComment">提交</p>
                </div>
            </div>
            <div class="comment">
                <p>
                    <embed src="/static/images/public/talk.svg" type="image/svg+xml" style="width: 16px;height: 16px" />
                    <span>评论</span>
                </p>
            </div>
        </div>
        <div class="talkList" v-if="commentList.length!==0">
            <div v-for="(item,index) in commentList" :key="index">
                <div class="talkTitle">
                    <p>{{item.nickname}}</p>
                    <p v-if="item.created_at">{{ new Date(item.created_at.replace(/-/g,'/')).getFullYear()}}年{{new Date(item.created_at.replace(/-/g,'/')).getMonth()+1}}月{{new
                        Date(item.created_at.replace(/-/g,'/')).getDate()}}日</p>
                    <p v-else>xxxx年xx月xx日</p>
                </div>
                <div class="talkContent">
                    {{item.content}}
                </div>
            </div>
        </div>
        <div class="talkList" v-else>
            暂时还没有评论哦~~~
        </div>
    </div>

    <div class="articleDetail-rightBox">
        <!--        <p><span>热门话题</span></p>
                  <router-link class="reading-topic" tag="p" :to="{path:'#'}" style="cursor: pointer">#紫杉醇#</router-link>
                  <router-link class="reading-topic" tag="p" :to="{path:'#'}" style="cursor: pointer">#新世相#</router-link>
                  <router-link class="reading-topic" tag="p" :to="{path:'#'}" style="cursor: pointer">#新药研发#</router-link>
                  <router-link class="reading-topic" tag="p" :to="{path:'#'}" style="cursor: pointer">#霍金去世#</router-link>-->
        <ul class="articleDetail-svg">
            <li></li>
            <li class="blog_hide"><img :src="blogImg" alt="" width="100px"></li>
            <li></li>
            <li class="webcate_hide"><img :src="weicatCRimg" alt="" width="100px"></li>
            <li class="collect" :class="collectObj" @click="collectClick" @mouseenter="collectEnter" @mouseleave="collectOut">
                <img v-if="collectIconColor" src="/static/images/public/collect_hover.svg " alt="" width="30px" height="30px">
                <img v-else src="/static/images/public/collect.svg" alt="" width="30px" height="30px">
                <p>
                    <span>{{collectText}}</span>
                </p>
            </li>
            <li class="clap" :class="clapObj" @click="clapClick" @mouseenter="clapEnter" @mouseleave="clapLeave">
                <img v-if="clapIconColor" src="/static/images/public/clap_hover.svg " alt="" width="30px" height="30px">
                <img v-else src="/static/images/public/clap.svg" alt="" width="30px" height="30px">
                <p>
                    <span>{{clapText}}</span>
                </p>
            </li>
        </ul>

    </div>
    <!--登录和注册对话框-->
    <register-from :register="registerVisible" @registerValue="register($event)"></register-from>
    <!--打赏对话框-->
    <el-dialog v-if="centerDialogVisible" :visible.sync="centerDialogVisible" :close-on-click-modal='false' width="600px" top="15vh"
        center custom-class="dialog">
        <div slot="title" class="payMentTitle">
            <span class="QR_titleSTY">知识就是金钱，打赏文章作者</span>
            <p class="QR_bottomSTY">赞赏金额会直接进入作者的平台账户</p>
        </div>
      <div class="QR_centerSTY" style="text-align: center">
        <ul ref="money_box">
          <li @click="moneyClick(0,'1')">
            <span>1 </span>
            <span>元</span>
          </li>
          <li @click="moneyClick(1,'3')" style="margin: 0 20px">
            <span>3 </span>
            <span>元</span>
          </li>
          <li class="active" @click="moneyClick(2,'5')">
            <span>5 </span>
            <span>元</span>
          </li>
          <li @click="moneyClick(3,'10')" style="margin-top: 20px">
            <span>10 </span>
            <span>元</span>
          </li>
          <li @click="moneyClick(4,'20')" style="margin: 20px 20px 0">
            <span>20 </span>
            <span>元</span>
          </li>
          <li @click="moneyClick(5,'50')" style="margin-top: 20px">
            <span>50 </span>
            <span>元</span>
          </li>
        </ul>
        <div style="clear: both"></div>
        <div class="payType">
          <div class="payTypeLeft" @change="changRadio">
            <el-radio v-model="radio" label="1">
              <img src="/static/images/public/weixin_payment.svg" alt="" width="56px" height="56px" style="vertical-align: middle;margin-right: 9px">
              <span class="payText">微信支付</span>
            </el-radio>
          </div>
          <!--<div class="payTypeRight" @change="changRadio">
              <el-radio v-model="radio" label="2">
                <img src="/static/images/public/alipay.svg" alt="" width="56px" height="56px" style="vertical-align: middle;margin-right: 9px">
                <span class="payText">支付宝支付</span>
              </el-radio>
            </div>-->
        </div>
        <div style="clear: both" class="payMessage">
          <input type="text" v-model="leaveWords" placeholder="感谢你写的文章，很棒！">
        </div>

      </div>
      <span slot="footer">
              <p class="QR_footerSTY" @click="payAuthor">
                 <span>支&nbsp;&nbsp;付</span>
              </p>
        </span>
    </el-dialog>
    <el-dialog v-if="centerDialogVisibleCode" :visible.sync="centerDialogVisibleCode" :close-on-click-modal='false' width="400px"
        top="15vh" center custom-class="dialog">
        <div slot="title" class="payMentTitle" style="height: 130px">
            <span class="QR_titleSTY" style="margin-top: 80px">微信扫码支付</span>
        </div>
        <div slot="title" class="payMentCodeText">
            <span>{{reqMoney}} 元</span>
        </div>
        <div class="payMentCodeContent">
            <div class="codeImg">
                <img :src="codeImg" alt="">
            </div>
        </div>
        <span slot="footer">
      </span>
    </el-dialog>
    <el-dialog v-if="centerDialogVisibleResSusses" :visible.sync="centerDialogVisibleResSusses" :close-on-click-modal='false'
        width="400px" top="15vh" center custom-class="dialog">
        <div slot="title" style="height: 130px">
            <span class="QR_titleSTY" style="margin-top: 80px;color: #264faa;">感谢您对原创知识的尊重</span>

        </div>
        <div class="payMentCodeContent">
            <div class="successText">
                <span>
            打赏支付成功！
          </span>
            </div>
            <div class="codeImg">
                <img src="../../assets/images/application/thanks.png" alt="" width="262px" height="236px">
            </div>
        </div>
        <span slot="footer">
        <div class="closeTime">
          <span>{{closeTime}}s后自动关闭</span>
        </div>
        </span>
    </el-dialog>
    <el-dialog v-if="centerDialogVisibleResErr" :visible.sync="centerDialogVisibleResErr" :close-on-click-modal='false' width="400px"
        top="15vh" center custom-class="dialog">
        <div slot="title" style="height: 130px">
            <span class="QR_titleSTY" style="margin-top: 80px;color: #383838;">打赏支付未成功</span>

        </div>
        <div class="payMentCodeContent">

            <div class="codeImg">
                <img src="../../assets/images/application/fail.png" alt="" width="207px" height="227px">
            </div>
        </div>
        <span slot="footer">
        <span class="payErrBtn" @click="retry">
          再试一次
        </span>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import RegisterFrom from "../../components/mian/register"
import "../../assets/css/article/articleDetail.css"
export default {
  data() {
    return {
      attationSty: {
        attention: true,
        attention1: false
      },
      unAttation: true, //未关注
      attationText: '关注Ta',
      collect: 0,//默认收藏量
      clap: 0, //默认点赞量
      collectObj: {
        collect_active: false
      },
      clapObj: {
        clap_active: false
      },
      islogin: false,
      articleNone: false,
      articleSave: false,
      userName: '',
      authorName: '', //作者名称
      author_pic: '', //作者头像
      class_name: '', //资讯分类名称
      release_at: '', //发布时间
      pic: '', //缩略图
      content: '',//资讯内容
      describe: '',//资讯描述
      title: '',//资讯标题
      recommend: [],//行研推荐
      articleData: {},
      isClickCollectIcon: false, //是否点击收藏图标
      commentList: [],
      registerVisible: false,
      commentValue: '', //评论内容
      collectIconColor: false,
      clapIconColor: false,
      collectText: '收藏',
      clapText: '点赞',
      paymentCode: null,//作者付款码
      centerDialogVisible: false,
      centerDialogVisibleCode: false,//打赏二维码
      centerDialogVisibleResSusses: false, //打赏成功
      centerDialogVisibleResErr: false, //打赏失败
      articleId: "",
      blogImg: '',
      weicatCRimg: '',
      radio: '1', //默认上送微信支付类型
      leaveWords: '',//读者评论
      reqMoney: '5', //默认上送的钱数
      codeImg: '', //二维码图片
      interVal: '',
      closeTime: 6,
      setTime: ''
    }
  },
  created() {
    var _t = this
    _t.request()

  },
  components: { RegisterFrom },
  methods: {
    changRadio: function() {
      var _t = this
      //_t.radio = el.target.value
      console.log(_t.radio)
    },
    moneyClick: function(index, money) { //点击打赏金钱按钮
      var _t = this
      var ul = _t.$refs.money_box
      var arrChild = ul.children
      for (var i = 0; i < arrChild.length; i++) {
        if (index === i) {
          arrChild[i].className = 'active'
          _t.reqMoney = money
        } else {
          arrChild[i].className = ''
        }
      }
    },
    commentLogin: function() { //评论登录点击
      this.registerVisible = true;
    },
    isLogn: function() { //是否登录
      var _t = this
      return _t.getCookie('meibo')
    },
    register(val) { //登录成功回调
      this.registerVisible = val;
    },
    reqComment: function() { //提交评论信息
      var _t = this
      if (_t.islogin) {//登录后 调用提交接口
        if (_t.commentValue === '') {
          _t.$message.error('评论不能为空');
        } else {
          _t.commentReq('logined')
        }
      } else { //登录前
        _t.$message.error('请您先进行登录');
      }
    },
    commentReq: function(isLogin) { //评论提交请求
      var _t = this
      _t.$post('/user/comment_add', {
        content: _t.commentValue,
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 0) { //失败
            _t.$message.error(res.data.data);
          } else if (res.data.status === 1) {
            _t.$message({
              message: res.data.message,
              type: 'success'
            });
            _t.commentValue = ''
            _t.comment(isLogin)
          } else {
            _t.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    request: function() { //初始化请求接口
      var _t = this;
      _t.articleId = _t.$route.params.id;
      _t.blogImg = 'http://qr.liantu.com/api.php?text=https://m.mybiogate.com/article/' + _t.articleId
      _t.weicatCRimg = 'http://qr.liantu.com/api.php?text=https://m.mybiogate.com/article/' + _t.articleId
      _t.$post('/industry/recommend', {}).then((value1) => {// 请求行研列表
        if (value1.code === 200) { //请求成功
          _t.recommend = value1.data
          _t.$post("/aritcle/detail", {// 请求详情页
            id: this.articleId
          }).then((value) => {
            if (value.code === 200) {
              let data = value.data;//调用标签处理函数;
              var itemKey = Object.keys(data.class_name)[0]
              if (data.length === 0) {
                _t.articleNone = true;
                _t.articleSave = false;
              } else {
                _t.articleNone = false;
                _t.articleSave = true;
                _t.articleData = data //当前文章对象
                _t.authorName = data.author //作者名称
                _t.author_pic = data.author_pic, //作者头像
                  _t.class_name = data.class_name[itemKey];
                _t.release_at = data.release_at, //发布时间
                  _t.pic = data.pic, //缩略图
                  _t.content = data.content,//资讯内容
                  _t.describe = data.describe,//资讯描述
                  _t.title = data.title//资讯标题
                _t.collect = data.collection_num //收藏数
                _t.clap = data.link_num //点赞数
                _t.paymentCode = data.wechat_payment_code
              }
              _t.userView(_t.articleData.id) //调用浏览量接口
              var isLogin = _t.isLogn();
              if (isLogin) { //已登录
                _t.collectIconReq('logined')
              } else {//未登录
                _t.islogin = false
                //初始化收藏状态
                _t.collectObj.collect_active = false //改变星星样式
                _t.collect = 0 //初始化收藏次数
                _t.collectText = '收藏'
                _t.collectIconColor = false
                //初始化点赞状态
                _t.clapObj.clap_active = false
                _t.clap = 0
                _t.clapText = '点赞'
                _t.clapIconColor = false
                _t.comment('unLogin')//评论列表
              }
            } else {
              _t.$message.error(value.message || value.status || value);
            }

          }, err => {
            _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
          })
        } else {
          _t.$message.error(value1.message || value1.status || value1);
        }
      }, err1 => {
        _t.$message.error((err1 && err1.message) || '网络错误，请稍后再试');
      })

    },
    userView: function(id) { //增加用户浏览量
      var _t = this
      _t.$post('/aritcle/views', {
        id: id
      }).then(function(res) {
        if (res.code === 200) {
          console.log('浏览量自加成功')
        } else {
          _t.$message.error('浏览量自加失败');
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    attationEnter: function() { //关注按钮鼠标移入
      var _t = this
      if (_t.unAttation) { //未关注
        _t.attationSty.attention = true
        _t.attationSty.attention1 = false
        _t.attationText = '关注Ta'
      } else { //已关注
        _t.attationSty.attention = false
        _t.attationSty.attention1 = true
        _t.attationText = '取消关注'
      }

    },
    attationOut: function() {//关注按钮鼠标移出
      var _t = this
      if (_t.unAttation) { //未关注
        _t.attationSty.attention = true
        _t.attationSty.attention1 = false
        _t.attationText = '关注Ta'
      } else { //已关注
        _t.attationSty.attention = true
        _t.attationSty.attention1 = false
        _t.attationText = '<i class="el-icon-check"></i> 已关注'
      }
    },
    attationClick: function() { //关注按钮鼠标点击
      var _t = this
      if (_t.unAttation) {//已关注
        _t.unAttation = false
        _t.attationText = '<i class="el-icon-check"></i> 已关注'
      } else {//未关注
        _t.unAttation = true
        _t.attationText = '关注Ta'
        _t.attationSty.attention = true
        _t.attationSty.attention1 = false
      }
    },
    collectIconReq: function(isLogin) { //判断是否收藏过该文章
      var _t = this
      _t.$post('/user/collection_status', {
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 1) { //已收藏
            _t.collectObj.collect_active = true
            _t.collect = 1
            _t.collectIconColor = true
            _t.collectText = '取消收藏'

          } else { //未收藏
            _t.collectObj.collect_active = false
            _t.collect = 0
            _t.collectIconColor = false
            _t.collectText = '收藏'
          }
          // 判断是否点赞过该文章
          _t.$post('/user/like_status', {
            article_id: _t.articleData.id
          }).then(function(res1) {
            if (res1.code === 200) {
              if (res1.data.status === 1) { //已点赞
                _t.clapObj.clap_active = true
                _t.clap = 1
                _t.clapText = '取消点赞'
                _t.clapIconColor = true
              } else { //未点赞
                _t.clapObj.clap_active = false
                _t.clap = 0
                _t.clapText = '点赞'
                _t.clapIconColor = false
              }
              _t.getUserInfo(isLogin)
            } else {
              _t.$message.error(res1.message || res1.status || res1);
            }
          }, function(err1) {
            _t.$message.error((err1 && err1.message) || '网络错误，请稍后再试');
          })


        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    getUserInfo: function(isLogin) { //获取用户信息
      var _t = this
      _t.$post('/user').then(function(res) {
        if (res.code === 200) {
          _t.userName = res.data.name
          _t.islogin = true
          _t.comment(isLogin) //评论列表
        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    collectClick: function() { //点击收藏常亮图标
      var _t = this
      //var isLogin = _t.isLogn()

      if (_t.islogin) { //已登录
        if (_t.collectObj.collect_active) { //取消收藏
          _t.removeCollect()
        } else {//添加收藏
          _t.addCollect()
        }
      } else {//未登录
        _t.$message.error('请您先进行登录');
      }

    },
    addCollect: function() { //添加收藏接口调用
      var _t = this
      _t.$post('/user/collection', {
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 1) { //收藏成功
            _t.$message({
              message: res.data.message,
              type: 'success'
            });
            _t.collectObj.collect_active = true
            _t.collect = 1
            _t.collectIconColor = true
            _t.collectText = '取消收藏'
          } else if (res.data.status === 0) { //收藏失败
            _t.$message.error(res.data.message);
            _t.collectObj.collect_active = false
            _t.collect = 0
            _t.collectIconColor = false
            _t.collectText = '收藏'
          }

        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    removeCollect: function() {//移出收藏接口调用
      var _t = this
      _t.$post('/user/removecollection', {
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 0) { //移出失败
            _t.$message.error(res.data.message);
            _t.collectObj.collect_active = true
            _t.collect = 1
            _t.collectIconColor = true
            _t.collectText = '取消收藏'
          } else { //移出成功
            _t.$message({
              message: res.data.message,
              type: 'success'
            });
            _t.collectObj.collect_active = false
            _t.collect = 0
            _t.collectIconColor = false
            _t.collectText = '收藏'
          }
        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    clapClick: function() {//点击鼓掌常亮图标
      var _t = this
      if (_t.islogin) { //已登录
        if (_t.clapObj.clap_active) { //取消点赞
          _t.removeClap()
        } else {//添加点赞
          _t.addClap()
        }
      } else {// 未登录
        _t.$message.error('请您先进行登录');
      }

    },
    addClap: function() {//添加点赞
      var _t = this
      _t.$post('/user/like', {
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 1) { //点赞成功
            _t.$message({
              message: res.data.message,
              type: 'success'
            });
            _t.clapText = '取消点赞'
            _t.clapObj.clap_active = true
            _t.clapIconColor = true
            _t.clap = 1
          } else if (res.data.status === 0) { //点赞失败
            _t.$message.error(res.data.message);
            _t.clapText = '点赞'
            _t.clapObj.clap_active = false
            _t.clapIconColor = false
            _t.clap = 0
          }

        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    removeClap: function() {// 移出点赞
      var _t = this
      _t.$post('/user/removelike', {
        article_id: _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          if (res.data.status === 0) { //移出失败
            _t.$message.error(res.data.message);
            _t.clapText = '取消点赞'
            _t.clapObj.clap_active = true
            _t.clapIconColor = true
            _t.clap = 1
          } else { //移出成功
            _t.$message({
              message: res.data.message,
              type: 'success'
            });
            _t.clapText = '点赞'
            _t.clapObj.clap_active = false
            _t.clapIconColor = false
            _t.clap = 0
          }
        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    toResearch: function() {
      this.$router.push({ name: 'Research' })
    },
    toResearchDetail: function(item) { //进入行研详情页
      this.$router.push({ name: 'ResearchDetail', params: { id: item.id } })
    },
    comment: function(isLogin) { //评论列表接口
      var _t = this
      var url = ''
      if (isLogin === 'logined') { //已登录
        url = '/user/articlecomment'
      } else { //未登录
        url = '/comment/list'
      }
      _t.$post(url, {
        'article_id': _t.articleData.id
      }).then(function(res) {
        if (res.code === 200) {
          _t.commentList = res.data
        } else {
          _t.$message.error(res.message || res.status || res);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    collectEnter: function() { //收藏鼠标移入
      var _t = this
      if (_t.collect === 0) { //未点击过收藏
        _t.collectIconColor = true
      }
    },
    collectOut: function() { //收藏鼠标移出
      var _t = this
      if (_t.collect === 0) {
        _t.collectIconColor = false
      }
    },
    clapEnter: function() {//鼓掌鼠标移入
      var _t = this
      if (_t.clap === 0) { //未点击
        _t.clapIconColor = true
      }
    },
    clapLeave: function() {//鼓掌鼠标移出
      var _t = this
      if (_t.clap === 0) { //未点击
        _t.clapIconColor = false
      }
    },
    authorPaymentCode: function() { //赞赏作者
      var _t = this
      _t.centerDialogVisible = true
      _t.radio='1', //默认上送微信支付类型
      _t.leaveWords= ''//读者评论
      _t.reqMoney= '5' //默认上送的钱数
      _t.codeImg='' //二维码图片
      _t.interVal=''
      _t.closeTime=6
      _t.setTime=''
    },
    toExteral: function() {
      var _t = this
      _t.$router.push({ name: 'LectureLists' })
    },
    toExteral1: function() {
      window.open('http://uschinainnovation.org/ucis2018/cn/')
    },
    //支付接口
    payAuthor: function() {
      var _t = this
      _t.centerDialogVisible = false
      _t.centerDialogVisibleCode = false//打赏二维码
      _t.centerDialogVisibleResErr = false //打赏失败
      _t.centerDialogVisibleResSusses = false //打赏成功
      _t.$post('/reward', {
        type: 'article',
        type_id: _t.articleId,
        pay_method: 'wechat',
        pay_cate: 'NATIVE',
        amount: _t.reqMoney,
        notes: _t.leaveWords
      }).then(function(res) {
        if (res.status === "success" && res.code === 200) {
          _t.centerDialogVisibleCode = true//打赏二维码
          _t.codeImg = res.data.code_url
          clearInterval(_t.interVal)
          _t.interVal = setInterval(function() {
            _t.queryPaySuccess(res.data.order_num)
          }, 5000)
        } else {
          _t.$message.error(res.message);
        }
      }, function(err) {
        _t.$message.error((err && err.data.message) || '网络错误，请稍后再试');
      })
    },
    queryPaySuccess: function(params) {
      var _t = this
      _t.$post('/reward/status', { order_num: params }).then(function(res) {
        if (res.status === "success" && res.code === 200) {
          _t.centerDialogVisibleCode = false//打赏二维码
          _t.centerDialogVisibleResSusses = true
          clearInterval(_t.interVal)
          _t.setTime = setTimeout(function() {
            _t.closeTimeFn()
          }, 1000)
        }
      }, function(err) {
        _t.centerDialogVisibleCode = false//打赏二维码
        _t.centerDialogVisibleResErr = true //打赏失败
      })
    },
    closeTimeFn: function() {
      var _t = this
      _t.closeTime--
      if (_t.closeTime === 0) {
        _t.centerDialogVisibleResSusses = false
        clearTimeout(_t.setTime)
      } else {
        _t.setTime = setTimeout(function() {
          _t.closeTimeFn()
        }, 1000)
      }
    },
    retry: function() {
      var _t = this
      _t.centerDialogVisible = false //开始打赏
      _t.centerDialogVisibleCode = true//打赏二维码
      _t.centerDialogVisibleResErr = false //打赏失败
      _t.centerDialogVisibleResSusses = false //打赏成功
    }
  }

}
</script>

<style scoped>
.payMentTitle {
  height: 160px;
  background-color: #383838;
}

.QR_titleSTY {
  font-family: MicrosoftYaHei;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  display: inline-block;
  margin-top: 79px;
}

.QR_bottomSTY {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  margin-top: 10px;
}

.QR_centerSTY {
  margin-top: 31px;
}

.QR_centerSTY>ul {
  float: left;
  width: 100%;
}

.QR_centerSTY>ul>li {
  float: left;
  width: 140px;
  height: 50px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #c7c7c7;
  cursor: pointer;
}

.QR_centerSTY>ul>li:hover {
  border: solid 1px #5AC0A1;
}

.QR_centerSTY>ul>li>span {
  line-height: 50px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #383838;
}

.QR_centerSTY>ul>li.active {
  background-color: #383838;
  border-radius: 2px;
  border: solid 1px #c7c7c7;
}

.QR_centerSTY>ul>li.active>span {
  color: #ffffff;
}

.QR_centerSTY>ul>li.active:hover {
  border: solid 1px #c7c7c7;
}

.payTypeLeft,
.payTypeRight {
  float: left;
}

.payTypeRight {
  float: right;
}

.payType {
  float: left;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 29px;
}

.payText {
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0px;
  letter-spacing: 0px;
  color: #383838;
}

.payMessage {
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #c7c7c7;
  padding: 12px 21px;
  text-align: left;
}

.QR_footerSTY {
  height: 40px;
  line-height: 40px;
  background-image: linear-gradient(90deg,
  #3bb3c3 0%,
  #7ac49f 100%),
  linear-gradient( #262626,
  #262626);
  background-blend-mode: normal,
  normal;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;

  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}

.talkTitle {
  margin-top: 25px;
}

.payMentCodeText {
  height: 70px;
  line-height: 70px;
  font-family: MicrosoftYaHei;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #383838;
  background-color: rgba(56, 56, 56, 0.1);
}

.codeImg {
  text-align: center;
}

.codeImg>img {
  width: 250px;
  height: 250px;
  margin-top: 5px;
}

.successText {
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #383838;
  text-align: center;
  margin-top: -17px;
  margin-bottom: 23px;
}

.closeTime {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: rgba(56, 56, 56, 0.6);
}

.payErrBtn {
  display: inline-block;
  width: 180px;
  height: 45px;
  line-height: 45px;
  color: #ffffff;
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  background: #383838;
  cursor: pointer;
}
</style>
