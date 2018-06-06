/**
 * Created by admin on 2017/7/4 0004.
 */

//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expireHour) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + (60 * 1000 * 60 )*parseInt(expireHour)); //过期时间 5小时
  console.log(exdate);
  document.cookie = c_name + "=" + escape(value) + ((expireHour == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
export function outputmoney(number) {
  number = number.replace(/\,/g, "");
  if(isNaN(number) || number == "")return "";
  number = Math.round(number * 100) / 100;
  if (number < 0)
    return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
  else
    return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化金额
function outputdollars(number) {
  if (number.length <= 3)
    return (number == '' ? '0' : number);
  else {
    var mod = number.length % 3;
    var output = (mod == 0 ? '' : (number.substring(0, mod)));
    for (var i = 0; i < Math.floor(number.length / 3); i++) {
      if ((mod == 0) && (i == 0))
        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
      else
        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return (output);
  }
}
function outputcents(amount) {
  amount = Math.round(((amount) - Math.floor(amount)) * 100);
  return (amount < 10 ? '.0' + amount : '.' + amount);
}
/**************************************时间格式化处理************************************/
export function dateFtt (fmt,date){
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
export function getUrlKey (name){
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}{

}
