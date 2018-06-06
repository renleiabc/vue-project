/*吸顶函数*/

//getElementsByClassName兼容新旧浏览器的封装；
function getElementsByClassName(node, classname) {
  if (node.getElementsByClassName) {
    //使用现有的方法；
    return node.getElementsByClassName(classname);
  } else {
    var results = new Array();
    var elemts = node.getElementsByTagName("*");
    for (var i = 0; i < elemts.length; i++) {
      if (elemts[i].className.indexOf(classname) != -1) {
        results[results.length] = elemts[i];
      }
    }
    return results;
  }
}
function ceiling(obj, cls) {
  var offsetTop = obj.offsetTop;
  document.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    /*
     * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
     * 三元运算使代码更简洁
     */
    if (scrollTop > offsetTop) {
      addClass(obj, cls);
    } else {
      removeClass(obj, cls);
    }
  }
}

/*吸顶函数*/
function ceiling_tag(obj, cls) {
  document.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    /*
     * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
     * 三元运算使代码更简洁
     */
    var child = obj.children[0]
    if (scrollTop > 64) {
      addClass(child, "home-suction");
      addClass(obj, cls);
      removeClass(child, "home-tags");
    } else {
      removeClass(obj, cls);
      removeClass(child, "home-suction");
      addClass(child, "home-tags");
    }
  }
}

//判断 class类名
function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

//添加class
function addClass(obj, cls) {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

//移除class
function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

//切换class
function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
  } else {
    addClass(obj, cls);
  }
}

//对数组里面完全相同的数据进行删除
function dataReorganization(arr) {
  var data = [];
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i])
    if (!arr[i].visited) {
      data.push(arr[i]);
      for (var j = 1; j < arr.length - 1; j++) {
        if (arr[i].name == arr[j].name) {
          arr[j].visited = true;
        }
      }
    }
  }
  //去除元素里面的visited
  for (var i = 0; i < data.length; i++) {
    for (key in data[i]) {
      if (key == "visited") {
        delete data[i][key];
      }
    }
  }
  return data;
}

//倒计时60秒函数封装；
var countdown = 60;

function settime(obj) {
  if (countdown == 0) {
    obj.removeAttribute("disabled");
    obj.value = "获取验证码";
    obj.style.borderColor = "#8fbf37";
    obj.style.color = "#8fbf37";
    countdown = 60;
    return;
  } else {
    obj.setAttribute("disabled", true);
    obj.style.borderColor = "rgb(153, 153, 153)";
    obj.style.color = "rgb(153, 153, 153)";
    obj.value = countdown + "s";
    countdown--;
  }
  setTimeout(function () {
    settime(obj)
  }, 1000)
}

//验证数字
function regNum(value) {
  var numReg = /^[0-9]*$/;
  return numReg.test(value)
}

//验证邮箱
function mailbox(value) {
  var mailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return mailReg.test(value)
}

/**
 * Created by admin on 2017/7/4 0004.
 */

//获取cookie、
function getCookie(name) {
  var myCookie = document.cookie;
  //分隔字符串时用分号加+空格；
  var date = myCookie.split("; ");
  for (var i = 0; i < date.length; i++) {
    var co = date[i].split("=");
    if (co[0] == name) {
      return co[1];
    }
  }
  return "";
}

//设置cookie,增加到vue实例方便全局调用
function setCookie(name, value) {
  var expireHour = 5;
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + (60 * 1000 * 60) * parseInt(expireHour)); //过期时间 5小时
  document.cookie = name + "=" + value + ((expireHour == null) ? "" : ";expires=" + exdate.toUTCString());
};

//删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

function outputmoney(number) {
  number = number.replace(/\,/g, "");
  if (isNaN(number) || number == "") return "";
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

//标签处理函数
function class_name(data) {
  for (var i = 0; i < data.length; i++) {
    var keyArr = Object.keys(data[i].class_name)
    var val = data[i].class_name[keyArr[0]];
    data[i].class_name = val;
  }
  return data;
}

function class_tag(data) {
  var arr = []
  for (var i in data.class_name) {
    arr.push(data.class_name[i]); //属性
  }
  data.class_name = arr[0];
  return data;
}

//存储cookie代码封装
//数据去重的函数
function unique(arr) {
  var res = [];
  var json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

/*
    取窗口滚动条高度
*/
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  }
  else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

/*
 取窗口可视范围的高度
*/
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
    var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/*
 取文档内容实际高度
*/
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//把一个节点元素放插到另一个节点之后的函数封装；
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChind(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

window.onload = function () {
  var dev = "https://mdev.mybiogate.com/api/v1";
  var local = "http://172.30.51.67/meijian/public/index.php/api/v1";
  var formal = "https://m.mybiogate.com/api/v1";
  var test = 'https://172.30.10.215:8084/api/v1';
  /*获取网站基本信息*/
  axios.post(formal + '/basic')
    .then(function (response) {
      var res = response.data;
      if (res.status == "success" && res.code == 200) {
        var indexTitle = document.getElementById("indexTitle");
        var indexMate = document.getElementById("indexMate");
        indexTitle.innerHTML = res.data.title;//添加标题
        var keywords = document.createElement("mate");//创建mate标签
        keywords.setAttribute("name", "keywords");//给mate标签添加name属性
        keywords.setAttribute("keywords", res.data.keywords);//给mate标签添加keywords属性
        insertAfter(keywords, indexMate);//把创建的新元素放到indexMate之后；
        var description = document.createElement("mate");//创建mate标签
        description.setAttribute("name", "description");//给mate标签添加name属性
        description.setAttribute("description", res.data.describe);//给mate标签添加description属性
        insertAfter(description, keywords);//把创建的新元素放到indexMate之后；

      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
/*引入fastclick.js并调用，处理移动端 click 事件 300 毫秒延迟，*/
window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);
