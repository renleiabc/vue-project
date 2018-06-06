
export default{
  state: {
    selfName:'', //真实姓名
    penName:'', //笔名
    email:'', //邮箱
    phoneCode :[], //电话号码集合
    interCode: "+86",
    interPhone:false,
    phoneNum:'', //电话号码
    weixinNum:'',//微信号
    schoolName:'', //学校名称
    professText:'', //专业名称
    options: [{
      value: 1,
      label: '本科'
    }, {
      value: 2,
      label: '硕士研究生'
    }, {
      value: 3,
      label: '博士研究生'
    }],
    value: '', //最高学历
    params:[
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
    ],
    areaValue:[], //研究领域集合
    selfInfo:'', //个人简介
    introSmall:'',//一句话简介
    //校验输入框
    checkSty:false, //真实姓名
    checkName:'',
    //笔名
    checkPenNameSty:false,
    checkPenNameText:'',
    penLoading:false,
    penSuccess:false,
    //邮箱
    mailSty:false,
    mailText:'',
    //手机号
    phoneNumSty:false,
    phoneNumText:'',
    //学校
    schoolSty:false,
    schoolText:'',
    //学历
    educationSty:false,
    educationText:'',
    //微信号
    weixinSty:false,
    weixinText:'',
    //专业
    professSty:false,
    professStyText:'',
    //研究领域
    areaSty:false,
    areaStyText:'',
    //个人简介
    selfInfoSty:false,
    selfInfoStyText:'',
    //一句话简介
    introSmallSty:false,
    introSmallStyText:''
  }
}
