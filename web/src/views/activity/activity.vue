<template>
  <div class="activity">
    <div class="activity-box">
      <div class="activity-left">
        <img src="../../assets/images/public/butt.jpg" alt="图片">
      </div>
      <div class="activity-right">
        <h1>医疗器械创新与对接论坛</h1>
        <p>医疗器械创新与对接论坛旨在帮助中国投资人务实对接优质医疗器械项目。
          论坛将邀请体外诊断（IVD），心血管及外科器械，
          医学影像以及血透等重点关注领域有成熟技术和产品的海外医疗器械公司，
          邀请国内有引进海外技术意愿的医健领域上市公司及投资机构探讨合作需求和投资机会。
        </p>
        <div class="activity-time">
          <img src="/static/images/icon/time.svg" alt="时间">
          <span>2018 年5月14-15日</span>
        </div>
        <div class="activity-address">
          <img src="/static/images/icon/address.svg" alt="地址">
          <span>The Westin Houston, Memorial City, 945 Gessner Rd., Houston, TX 77024</span>
        </div>
        <div class="activity-reprot">
          <el-button type="info" class="activity-btn">
            <a href="https://ucis2018.uschinainnovation.org/ "
               target="_blank" style="color:#fff;">立即报名</a>
          </el-button>
          <div class="activity-details">
            <a href="http://uschinainnovation.org/ucis2018/cn/" target="_blank">了解更多大会详情</a>
            <span>&gt;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-box">
      <div class="activity-left">
        <img src="../../assets/images/public/innovate.jpg" alt="图片">
      </div>
      <div class="activity-right">
        <h1>InnoSTARS创新创业大赛休斯顿赛区医疗分赛</h1>
        <p>InnoSTARS“创之星”中美创新创业大赛是2017年首轮中美社会与
          人文对话中确认的合作重点，该对话由国务院副总理刘延东和美国国务卿蒂勒森共同主持。
          InnoSTARS “创之星”大赛是中美两国政府支持的重大创新赛事，
          在中国科技部和中华人民共和国驻休斯敦总领馆的支持下，
          由中国科学技术交流中心（CSTEC）联合美中创新联盟（UCIA）、
          国际技术转移协作网络（ITTN）等国内外单位共同主办。
        </p>
        <div class="activity-time activity-date">
          <img src="/static/images/icon/time.svg" alt="时间">
          <span>2018 年5月14-15日</span>
        </div>
        <div class="activity-address">
          <img src="/static/images/icon/address.svg" alt="地址">
          <span>The Westin Houston, Memorial City, 945 Gessner Rd., Houston, TX 77024</span>
        </div>
        <div class="activity-reprot">
          <el-button type="info" class="activity-btn">
            <a href="http://uschinainnovation.org/innostars2018/cn/houston-city-2/ "
               target="_blank" style="color:#fff;">立即报名</a>
          </el-button>
          <div class="activity-details">
            <a href="http://uschinainnovation.org/innostars2018/cn/" target="_blank">了解更多大会详情</a>
            <span>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity",
    data() {
      return {
        article: [
          "细胞免疫治疗的初衷是采用患者自己的免疫细胞杀死该患者体内的肿瘤细胞,这是个非常诱人的想法。随后科学家们将这一设想得以实现，并成功治疗了终末期血液系统恶性肿瘤患者。",
          "最近几个月在这一设想实现的过程中，一种被称作CAR-T的免疫治疗方法发生了几件令人震惊的事件。",
          "最初由该领域的权威Juno Therapeutics公司宣布称，在临床试验过程中，曾经有4名患者因该治疗方法导致死亡。就在本周，一家一直以来致力于CAR-T的免疫治疗商业化的制药公司—诺华制药公司，宣布裁员120人，该团队一直在研发细胞及基因治疗。虽然诺华公司宣称，" +
          "它们的团队仍然致力于CAR-T的免疫治疗的研发。然而，业内人士认为，" +
          "诺华的此种举措实属为缓慢的撤退。与此同时，公司竞争将会给CAR-T市场带来极为严峻的挑战，" +
          "他们试图提高肿瘤患者个体化治疗的比例，并扩大CAR-T的适用瘤种。他们还将CAR-T的应用扩大到实体瘤的研究中，" +
          "不仅仅是血液系统的恶性肿瘤。" +
          "这样可以扩大CAR-T的市场范围。然而在实验性治疗过程中发现这样可能导致患者昏迷，甚至是脑疝。",
          "/static/images/public/doctroy.jpg",
          "细胞免疫治疗的初衷是采用患者自己的免疫细胞杀死该患者体内的肿瘤细胞，这是个非常诱人的想法。随后科学家们将这一设想得以实现，并成功治疗了终末期血液系统恶性肿瘤患者。",
          "最近几个月在这一设想实现的过程中，一种被称作CAR-T的免疫治疗方法发生了几件令人震惊的事件。",
          "最初由该领域的权威Juno Therapeutics公司宣布称，在临床试验过程中，曾经有4名患者因该治疗方法导致死亡。就在本周，一家一直以来致力于CAR-T的免疫治疗商业化的制药公司—诺华制药公司，宣布裁员120人，该团队一直在研发细胞及基因治疗。虽然诺华公司宣称，它们的团队仍然致力于CAR-T的免疫治疗的研发。然而，业内人士认为，诺华的此种举措实属为缓慢的撤退。与此同时，公司竞争将会给CAR-T市场带来极为严峻的挑战，他们试图提高肿瘤患者个体化治疗的比例，并扩大CAR-T的适用瘤种。他们还将CAR-T的应用扩大到实体瘤的研究中，不仅仅是血液系统的恶性肿瘤。这样可以扩大CAR-T的市场范围。然而在实验性治疗过程中发现这样可能导致患者昏迷，甚至是脑疝。"
        ]
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/activity/activity.css";
</style>
