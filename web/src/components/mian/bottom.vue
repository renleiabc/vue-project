<template>
  <div class="home-footer">
    <div class="footer-box">
      <ul class="footer-content">
        <li>
          <img src="/static/images/public/code.jpg" alt="code">
          <h1 class="footer-sao">
            <span>
              微信扫一扫
            </span>
            <span>加客服为好友</span>
          </h1>
        </li>
        <li>
          <img src="/static/images/icon/footer-logo.png" alt="logo">
          <p>提供最全面的美国医健创新、创业、投资动态，大咖观点、重要活动信息，
            美国医健发展深度研究与分析，让中国医健企业和投资者洞悉趋势，把握机遇。</p>
          <p>为有意进入中国的美国创新企业提供发布合作需求、寻求报道的平台，
            组织到中国路演对接，提供中国落地服务。</p>
          <h1>联系我们：info@mybiogate.com</h1>
        </li>
        <li>
          <h2>产品和服务</h2>
          <p>
            <router-link :to="{name:'LectureLists'}" tag='a'>
              开讲
            </router-link>
            <router-link :to="{name:'Activity'}" tag='a'>
              活动对接
            </router-link>
          </p>
          <p>
            <router-link :to="{name:'Service'}" tag='a' style="padding-right: 25px;">
              海外项目
            </router-link>
            <router-link :to="{name:'Roadshow'}" tag='a'>
              网络路演
            </router-link>
          </p>
          <p>
            <router-link :to="{name:'Research'}" tag='a'>
              行研
            </router-link>
            <a href="javascript:;" style="display: none;">
              问答
            </a>
          </p>
        </li>
        <li>
          <h2>合作伙伴</h2>
          <p>
            <a href="http://uschinainnovation.org/" target="_blank">
              <img src="/static/images/icon/parter1.png" alt="1">
            </a>
            <a href="http://www.sinohealth.com/" target="_blank">
              <img src="/static/images/icon/parter2.png" alt="1">
            </a>
            <a href="http://www.sinohealth.cn/" target="_blank">
              <img src="/static/images/icon/parter3.png" alt="1">
            </a>
          </p>
          <p>
            <a href="https://www.cn-healthcare.com/" target="_blank">
              <img src="/static/images/icon/parter4.png" alt="1">
            </a>
            <a href="http://www.zjpark.com/rules" target="_blank">
              <img src="/static/images/icon/parter5.png" alt="1">
            </a>
            <a href="http://www.kjjr360.com/" target="_blank">
              <img src="/static/images/icon/parter6.png" alt="1">
            </a>
          </p>
        </li>
      </ul>
      <div class="footer-bottom">
        <div class="footer-bottom-link">
          <router-link :to="{name:'AboutOur'}" tag='a'>
            关于美柏 &nbsp;&nbsp;|&nbsp;&nbsp;
          </router-link>
          <router-link :to="{name:'Feedback'}" tag='a'>
            意见反馈 &nbsp;&nbsp;|&nbsp;&nbsp;
          </router-link>
          <router-link :to="{name:'Disclaimer'}" tag='a'>
            免责声明
          </router-link>
        </div>
        <div class="footer-bottom-over">
          Copyright2017-2018 All Rights Reserved BY MyBioGate 美柏医健
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom"
  }
</script>

<style scoped>
  @import "../../assets/css/mian/footer.css";
</style>
