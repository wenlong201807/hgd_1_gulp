/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('index/carousel_tpl',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,carouselList=$data.carouselList,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="ind_carousel_container">\n  <div class="carousel-content">\n    <ul class="carousel">\n      ';
$each(carouselList,function(v,i){
$out+='\n      <li>\n        <a href="javascript:void(0);">\n          <img src="';
$out+=$escape(v.img);
$out+='" alt="我是放图片的位置" title="';
$out+=$escape(v.introduce);
$out+='**';
$out+=$escape(v.id);
$out+='">\n        </a>\n      </li>\n      ';
});
$out+='\n    </ul>\n    <ul class="img-index"></ul>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('index/footer_tpl','<footer class="ind_footer">\n  <div class="foot_center">\n    Copyrignt © 2004-2016 哈尔滨工业大学出版社 版权所有 京ICP备11017824号-7\n  </div>\n</footer>\n');/*v:1*/
template('index/header_tpl','<div class="ind_header_container">\n  <div class="header_wrap">\n    <div class="le_fl logo">\n      <a href="/view/index/login.html" title="点我跳转至登入页面">\n        <img class="logo_img" src="/asset/imgs/logo.png" alt="">\n      </a>\n      <h1>哈尔滨工业大学</h1>\n    </div>\n    <div class="le_fl search">\n      <div class="sea_com sea_choice">\n        <a href="javascript:void(0);">课程</a>\n        <i class=" iab fa fa-sort-desc" aria-hidden="true"></i>\n        <ul class="choice_ab">\n          <li class="choice_item">课程</li>\n          <li class="choice_item">教材</li>\n        </ul>\n      </div>\n      <input class="sea_com sea_val " type="text" name="" id="">\n      <i class=" iab fa fa-search fa-2x" aria-hidden="true"></i>\n    </div>\n    <div class="le_fl info">\n      <ul class="info_wrap">\n        <!-- *登录之前** -->\n        <!-- <li class="bef_info">登录</li>\n        <li class="bef_info">|</li>\n        <li class="bef_info">注册</li> -->\n        <!-- *登录之后** -->\n        <li class="info_item com_name">\n          <a href="">教师端</a>\n          <i class=" iab fa fa-sort-desc" aria-hidden="true"></i>\n          <ul class="choice_wrap">\n            <li class="choice_item">教师端</li>\n            <li class="choice_item">学生端</li>\n          </ul>\n        </li>\n        <li class="info_item com_name">\n          <a href="">张三丰</a>\n          <i class=" iab fa fa-sort-desc" aria-hidden="true"></i>\n          <ul class="choice_wrap">\n            <li class="choice_item">我的资源</li>\n            <li class="choice_item">我的订单</li>\n            <li class="choice_item">个人资料</li>\n            <li class="choice_item">退出登录</li>\n          </ul>\n        </li>\n        <li class="info_item pic">\n          <div class="pic_cover">\n            <img src="/asset/imgs/transparency.png" alt="">\n          </div>\n          <img class="info_item_img" src="/asset/imgs/portrait.png" alt="">\n        </li>\n        <li class="info_item msg">\n          <i class="fa fa-commenting-o fa-2x" aria-hidden="true"></i>\n          <span>1</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n');/*v:1*/
template('index/hotMaterial_tpl','<div class="ind_hotMaterial_container">\n  <div class="wrap">\n    <div class="title">\n      <h2>热门教材</h2>\n      <span>more...</span>\n    </div>\n    <ul class="course_wrap">\n\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n      <li class="course_item">\n        <img class="course_img" src="/asset/imgs/teaching.png" alt="">\n        <h3>alsdfjkalsdfbsdfbkdsfjadsfalsdfkjaldsfkja</h3>\n      </li>\n    </ul>\n  </div>\n\n</div>\n');/*v:1*/
template('index/login_tpl','<form class="login_form" id="login_form" method="" action="">\n  <fieldset>\n    <legend>\n      <img class="login_logo" src="/asset/imgs/logo.png" alt="图片不显示，我显示" title="我是哈工大"> </legend>\n    <p class="login_line">\n      <label class="login_info" for="username">用户名</label>\n      <input class="login_inp" id="username" name="username" type="text" value="胡伟">\n    </p>\n    <p class="login_line">\n      <label class="login_info" for="password">密码</label>\n      <input class="login_inp" id="password" name="password" type="password" value="123456">\n    </p>\n    <!-- <p class="login_line">\n      <label class="login_info" for="confirm_password">确认密码</label>\n      <input class="login_inp" id="confirm_password" name="confirm_password" type="password" value="123456">\n    </p> -->\n    <p class="login_line">\n      <label class="login_info flle" for="pork">\n        端口选择\n      </label>\n      <input class="login_rad" name="pork" type="radio" value="2">\n      <span class="pork_text">教师端</span>\n      <input class="login_rad" name="pork" type="radio" value="1">\n      <span class="pork_text ">学生端</span>\n      <input class="login_rad " name="pork" type="radio" value="管理员" disabled>\n      <span class="pork_text">管理员</span>\n\n    </p>\n\n\n\n    <!-- <p class="login_line">\n      <label class="login_info" for="jiaoyan">校验码</label>\n      <input class="login_inp" id="jiaoyan" name="jiaoyan" type="text">\n    </p>\n    <p class="login_line">\n      <label class="login_info" for="confirm_jiaoyan">输入校验码</label>\n      <input class="login_inp" id="confirm_jiaoyan" name="confirm_jiaoyan" type="text">\n    </p> -->\n\n    <p class="login_line">\n      <input class="button login_btn submit" type="submit" value="登录">\n      <input class="button login_btn login" type="button" value="注册">\n    </p>\n\n    <div class="login_fail" id="login_fail">\n      <!-- 我是登入失败后，后台返回的提示信息位置,若是成功，则页面跳转 -->\n    </div>\n\n  </fieldset>\n</form>\n');/*v:1*/
template('index/nav_tpl',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,left_list=$data.left_list,val=$data.val,index=$data.index,$escape=$utils.$escape,right_list=$data.right_list,$out='';$out+='<div class="nav_tpl_container">\n  <div class="nav_wrap">\n    <ul class="main_nav">\n      ';
$each(left_list,function(val,index){
$out+=' ';
if(val.isText){
$out+='\n      <li class="main_item">\n        <a href="';
$out+=$escape(val.url);
$out+='">';
$out+=$escape(val.title);
$out+='</a>\n      </li>\n      ';
}else{
$out+='\n      <li class="main_item">';
$out+=$escape(val.title);
$out+=' </li>\n      ';
}
$out+=' ';
});
$out+='\n    </ul>\n    <ul class="aside_nav">\n      ';
$each(right_list,function(val,index){
$out+=' ';
if(val.isText){
$out+='\n      <li class="aside_item">\n        <a href="';
$out+=$escape(val.url);
$out+='">';
$out+=$escape(val.title);
$out+='</a>\n      </li>\n      ';
}else{
$out+='\n      <li class="aside_item">\n        ';
$out+=$escape(val.title);
$out+='\n      </li>\n      ';
}
$out+=' ';
});
$out+='\n    </ul>\n    <!-- 最右侧部分多出来的红色区域使用相对定位，层级高于模块容器，低于其他 -->\n  </div>\n  <div class="container_right_red"></div>\n</div>\n';
return new String($out);
});/*v:1*/
template('index/recommendedCourse_tpl',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,courseList=$data.courseList,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="ind_recommendedCourse_container">\n  <div class="wrap">\n    <div class="title">\n      <h2>推荐课程</h2>\n      <span>more...</span>\n    </div>\n    <ul class="course_wrap">\n      ';
$each(courseList,function(v,i){
$out+='\n      <li class="course_item">\n        <img class="course_img" src="';
$out+=$escape(v.imgUrl);
$out+='" Tid="';
$out+=$escape(v.id);
$out+='" alt="图片不显示的时候我会显示 " title="';
$out+=$escape(v.imgTitle);
$out+='***';
$out+=$escape(v.id);
$out+='">\n        <h3>';
$out+=$escape(v.title);
$out+='***';
$out+=$escape(v.id);
$out+='</h3>\n      </li>\n      ';
});
$out+='\n    </ul>\n  </div>\n\n</div>\n';
return new String($out);
});/*v:1*/
template('student/authoerintroduce',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 教师介绍 -->\r\n<dl>\r\n    <dt>教师介绍\r\n      ';
$each(arr['rows'],function(value,$index){
$out+='\r\n      <dd>';
$out+=$escape(value.intro);
$out+='</dd>\r\n      ';
});
$out+='\r\n    </dt>\r\n  </dl>\r\n  ';
return new String($out);
});/*v:1*/
template('student/bookintroduce',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 课程介绍 -->\r\n<dl>\r\n  <dt>课程介绍\r\n    ';
$each(arr['rows'],function(value,$index){
$out+='\r\n    <dd>';
$out+=$escape(value.intro);
$out+='</dd>\r\n    ';
});
$out+='\r\n  </dt>\r\n</dl>\r\n';
return new String($out);
});/*v:1*/
template('student/booklist',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,val=$data.val,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 教材列表 -->\r\n<ul>\r\n  ';
$each(arr['rows'],function(val,$index){
$out+='\r\n  <li>\r\n\r\n    <a href="s-bookdetail.html" class="fl">\r\n      <img src="';
$out+=$escape(val.imgUrl);
$out+='">\r\n    </a>\r\n    <div class="texmes fl">\r\n      <h3>';
$out+=$escape(val.title);
$out+='</h3>\r\n      <div class="author">\r\n        <a href="javacript:;">';
$out+=$escape(val.author);
$out+='</a>著</div>\r\n      <div class="price">20.00 /年</div>\r\n      <p>';
$out+=$escape(val.intro);
$out+=' ';
$out+=$escape(val.id);
$out+='</p>\r\n      <div class="usericon">\r\n        <i>\r\n          <img src="/asset/imgs/usericon.png">\r\n        </i>';
$out+=$escape(val.price);
$out+='\r\n      </div>\r\n    </div>\r\n  </li>\r\n  ';
});
$out+='\r\n</ul>\r\n';
return new String($out);
});/*v:1*/
template('student/coursecatelog','<!-- 课程目录 -->\r\n<dl>\r\n  <dt>课程目录</dt>\r\n  <dd>第一课时 课时名称课时名称</dd>\r\n  <dd>第二课时 课时名称课时名称</dd>\r\n  <dd>第三课时 课时名称课时名称</dd>\r\n  <dd>第四课时 课时名称课时名称</dd>\r\n</dl>\r\n');/*v:1*/
template('student/courselist',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 课程列表 -->\r\n<ul>\r\n  ';
$each(arr['rows'],function(value,$index){
$out+='\r\n  <li class="fl">\r\n      <a href="s-coursedetail.html">\r\n        <img src="';
$out+=$escape(value.imgUrl);
$out+='">\r\n      </a>\r\n      <p>';
$out+=$escape(value.title);
$out+='</p>\r\n      <h6>';
$out+=$escape(value.author);
$out+='</h6>\r\n  </li>\r\n  ';
});
$out+='\r\n</ul>';
return new String($out);
});/*v:1*/
template('student/dropdown-navigation',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,hh=$data.hh,$each=$utils.$each,dropdown=$data.dropdown,navigation=$data.navigation,as=$data.as,v=$data.v,i=$data.i,$out='';$out+='<!-- 左侧下拉导航 -->\r\n<div>\r\n  2222\r\n  <!-- ';
$out+=$escape(hh);
$out+=' -->\r\n  <!-- ';
$each(dropdown-navigation,function(as,v){
$out+='\r\n  <dl>\r\n   \r\n    <dd>';
$out+=$escape(v.two);
$out+='</dd>\r\n    <dd>';
$out+=$escape(v.two);
$out+=$escape(v.one);
$out+='</dd>\r\n    <dd>';
$out+=$escape(v.two);
$out+='</dd>\r\n  </dl>\r\n    ';
});
$out+=' -->\r\n</div>\r\n<ul>\r\n  ';
$each(dropdown-navigation,function(v,i){
$out+='\r\n  <li>\r\n';
$out+=$escape(v);
$out+=$escape(i);
$out+='\r\n  </li>\r\n  ';
});
$out+='\r\n</ul>';
return new String($out);
});/*v:1*/
template('student/footer',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,footer=$data.footer,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- footer底部 -->\r\n';
$each(footer,function(value,$index){
$out+='\r\n<p>';
$out+=$escape(value.txt);
$out+='</p>\r\n';
});
return new String($out);
});/*v:1*/
template('student/popular-textbook',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 热门教材 -->\r\n<dl>\r\n    <dt>\r\n      <h3>热门教材</h3>\r\n      <a href="/view/student/s-booklist.html">more...</a>\r\n    </dt>\r\n    ';
$each(arr['rows'],function(value,$index){
$out+='\r\n    <dd>\r\n      <a href="/view/student/s-bookdetail.html">\r\n        <img src="';
$out+=$escape(value.imgUrl);
$out+='">\r\n      </a>\r\n      <h4>';
$out+=$escape(value.title);
$out+='</h4>\r\n    </dd>\r\n    ';
});
$out+='\r\n  </dl>';
return new String($out);
});/*v:1*/
template('student/Recommended-course',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,val=$data.val,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<!-- 推荐课程 -->\r\n<dl>\r\n  <dt>\r\n    <h3>推荐课程</h3>\r\n    <a href="/view/student/s-courselist.html">more...</a>\r\n  </dt>\r\n  ';
$each(arr['rows'],function(val,$index){
$out+='\r\n  <dd>\r\n    <a href="/view/student/s-coursedetail.html">\r\n      <img src="';
$out+=$escape(val.imgUrl);
$out+='">\r\n    </a>\r\n    <h4>';
$out+=$escape(val.title);
$out+='</h4>\r\n  </dd>\r\n  ';
});
$out+='\r\n</dl>';
return new String($out);
});/*v:1*/
template('student/s-course',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,arr=$data.arr,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(arr['rows'],function(value,$index){
$out+='\r\n<a href="javascript:;" class="fl imgfl">\r\n  <img src="';
$out+=$escape(value.imgUrl);
$out+='">\r\n</a>\r\n<div class="texmes fl">\r\n  <h3>课程名称课程名称课程名称</h3>\r\n  <h4>课程邀请码\r\n    <span>';
$out+=$escape(value.Invitationcode);
$out+='</span>\r\n  </h4>\r\n  <ul>\r\n    <li>\r\n      <span>任课老师\r\n        <a href="#">张三 东南大学</a>\r\n      </span>\r\n      <span>开课时间\r\n        <a href="#">';
$out+=$escape(value.curriculumtime);
$out+='</a>\r\n      </span>\r\n    </li>\r\n    <li>\r\n      <span>报名权限\r\n        <a href="#">所有用户</a>\r\n      </span>\r\n      <span>\r\n        学生人数\r\n        <a href="#">200</a>\r\n      </span>\r\n    </li>\r\n  </ul>\r\n  <button>加入课程</button>\r\n</div>\r\n';
});
$out+='\r\n';
return new String($out);
});/*v:1*/
template('teacher/build_course/checkModel',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,rows=$data.rows,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+='<ul class="choice_wrap ">\n  <!-- 模板使用位置****开始 -->\n  ';
$each(rows,function(v,i){
$out+='\n  <li class="choice_item ">\n    <div class="item_img_container ">\n      <img class="item_img " src="';
$out+=$escape(v.imgUrl);
$out+='" alt="图片不显示我显示 " title="';
$out+=$escape(v.title);
$out+='">\n    </div>\n    <div class="item_introduce ">\n      <h2>';
$out+=$escape(v.title);
$out+='</h2>\n      <h4 class="auhor ">';
$out+=$escape(v.author);
$out+='</h4>\n      <p class="item_p ">';
$out+=$escape(v.intro);
$out+='</p>\n      <div class="lastdata ">权限截止日期&nbsp;&nbsp;\n        <span class="time ">';
$out+=$escape(v.dpermissionTime);
$out+='\n        </span>\n      </div>\n      <button class="button detail ">查看详情</button> &nbsp;&nbsp;\n      <button getid="';
$out+=$escape(v.id);
$out+='" getimgUrl="';
$out+=$escape(v.imgUrl);
$out+='" gettitle="';
$out+=$escape(v.title);
$out+='" getauthor="';
$out+=$escape(v.author);
$out+='" getcontent="';
$out+=$escape(v.intro);
$out+='"\n        getdatatime="';
$out+=$escape(v.dpermissionTime);
$out+='" id="choice_to_set" class="button build ">使用该教材建立课程</button>\n    </div>\n    <!-- 有无权限绝对定位 -->\n    ';
if(v.permissionboolean){
$out+='\n    <div class="item_limit">\n      有权限\n    </div>\n    ';
}else{
$out+='\n    <div class="item_limit ">\n      无权限\n    </div>\n    ';
}
$out+='\n\n  </li>\n  ';
});
$out+='\n  <!-- 模板使用位置借宿***结束 -->\n\n</ul>\n';
return new String($out);
});/*v:1*/
template('teacher/build_course/choice_tpl',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,rows=$data.rows,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="tea_choice_tpl">\n  <div class="search_wrap">\n    <input type="text" placeholder="教材名称/ISBN/作者" id="search_box">\n    <i id="searchBtn" class="search_icon fa fa-search fa-2x"></i>\n    <ul id="select_box">\n      <li class="select_warp">\n        <span>全部分类</span>\n        <i class="select_icon fa fa-angle-down fa-2x"></i>\n        <!-- 全部分类里面的下拉隐藏框 -->\n        <ul class="choice_cate_id">\n          <li Cid="1" class="cate_item">教材名称</li>\n          <li Cid="2" class="cate_item">作者</li>\n          <li Cid="3" class="cate_item">有权限</li>\n          <li Cid="4" class="cate_item">无权限</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n  <div class="info_introduce ">\n    <!-- 上下相同的 -->\n    <div class="course_num ">\n      共\n      <span class="total_num_two" id="total_num ">100</span>个教材\n    </div>\n    <div class="course_page_handler ">\n      <div id="nextBtn" class="flr page_com_btn btn_hou ">&gt; </div>\n      <div id="total_page" class="flr page_com_num total_page ">110</div>\n      <div class="flr page_com ">/</div>\n      <div id="curPageee" class="flr page_com_num cur_page ">1</div>\n      <div id="prevBtn" class="flr page_com_btn btn_qian ">&lt; </div>\n    </div>\n  </div>\n  <!-- 课程介绍开始 -->\n  <ul class="choice_wrap ">\n    <!-- 模板使用位置****开始 -->\n    ';
$each(rows,function(v,i){
$out+='\n    <li class="choice_item ">\n      <div class="item_img_container ">\n        <img class="item_img " src="';
$out+=$escape(v.imgUrl);
$out+='" alt="图片不显示我显示 " title="';
$out+=$escape(v.title);
$out+='">\n      </div>\n      <div class="item_introduce ">\n        <h2>';
$out+=$escape(v.title);
$out+='</h2>\n        <h4 class="auhor ">';
$out+=$escape(v.author);
$out+='</h4>\n        <p class="item_p ">';
$out+=$escape(v.intro);
$out+='</p>\n        <div class="lastdata ">权限截止日期&nbsp;&nbsp;\n          <span class="time ">';
$out+=$escape(v.dpermissionTime);
$out+='\n          </span>\n        </div>\n        <button class="button tea_choice_detail ">查看详情</button> &nbsp;&nbsp;\n        <button getid="';
$out+=$escape(v.id);
$out+='" getimgUrl="';
$out+=$escape(v.imgUrl);
$out+='" gettitle="';
$out+=$escape(v.title);
$out+='" getauthor="';
$out+=$escape(v.author);
$out+='" getcontent="';
$out+=$escape(v.intro);
$out+='"\n          getdatatime="';
$out+=$escape(v.dpermissionTime);
$out+='" id="choice_to_set" class="button build ">使用该教材建立课程</button>\n      </div>\n      <!-- 有无权限绝对定位 -->\n      ';
if(v.permissionboolean){
$out+='\n      <div class="item_limit">\n        有权限\n      </div>\n      ';
}else{
$out+='\n      <div class="item_limit ">\n        无权限\n      </div>\n      ';
}
$out+='\n\n    </li>\n    ';
});
$out+='\n    <!-- 模板使用位置借宿***结束 -->\n\n  </ul>\n  <div class="build_page_container ">\n    <!-- 上下相同的 -->\n    <div class="course_num ">\n      共\n      <span class="total_num_two" id="total_num ">100</span>个教材\n    </div>\n    <div class="course_page_list" id="build_page">\n      我是留给分页器的容器\n    </div>\n    <div class="page_selected">\n      <input type="text" class="page_sel_num" id="page_jump_num">\n      <button id="page_jump_btn" class="button">跳转至</button>\n    </div>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('teacher/build_course/set_tpl','<div class="tea_set_tpl">\n  <div class="choiced_material_warp">\n    <div class="set_selected">选用的教材</div>\n    <button id="set_to_choice" class="button selected_btn">更换的教材</button>\n  </div>\n  <div class="set_wrap">\n    <div class="choice_item ">\n      <div class="item_img_container ">\n        <img id="new_item_img" class="item_img " src="/asset/imgs/course_map5.png" alt="图片不显示我显示 " title="123">\n      </div>\n      <div class="item_introduce ">\n        <h2 id="new_h2">数学解题泄天机</h2>\n        <h4 id="new_author" class="auhor ">杨飞，陈荣主</h4>\n        <p id="new_item_p" class="item_p ">本书分为3编.第1编解题心经，结合高中一线教师的解题心得和国内外解题名家的思想，提出数学解题活动中的操作规律和思维规律.第2编方法歌诀，归纳总结了高中数学典型的。</p>\n        <div class="lastdata ">权限截至日期&nbsp;&nbsp;\n          <span id="new_time" class="time ">0000.00.00</span>\n        </div>\n      </div>\n      <!-- 有无权限绝对定位 -->\n      <div id="new_item_limit" class="item_limit ">\n        有权限\n      </div>\n    </div>\n  </div>\n</div>\n<!-- 表单部分***开始 -->\n<form class="clearfix" id="set_info_form" action="">\n  <div class="info_title">\n    基本信息设置\n  </div>\n  <ul class="info_content">\n    <li class="item_list">\n      <span class="item_key">课程名称</span>\n      <input value="暂时全部都是设置固定值，我在设置页签的模板中写的" class="class_title" type="text" name="title" id="">&nbsp;&nbsp;&nbsp;\n      <span>0</span>\n      <span>/</span>\n      <span>24</span>\n    </li>\n    <li class="item_list">\n      <span class="item_key">开课时间</span>\n      <input class="singer_celect" type="radio" checked name="open_class" value="设置" id="">&nbsp;&nbsp;&nbsp;设置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n      <input class="singer_celect" type="radio" name="open_class" value="不设置" id="">&nbsp;&nbsp;&nbsp;不设置\n    </li>\n    <li class="item_list list_bg">\n      &nbsp;&nbsp;&nbsp;&nbsp;开始时间&nbsp;&nbsp;&nbsp;&nbsp;\n      <input class="time" type="time" name="startTime" id=""> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止时间&nbsp;&nbsp;&nbsp;&nbsp;\n      <input class="time" type="time" name="endTime" id="">\n    </li>\n    <li class="item_list">\n      <span class="item_key">课程封面</span>\n      <!-- <button id="sky" class="sky button">浏览</button> -->\n      <input type="file" name="file" class="sky button" id="doc" value="阿斯顿发生" onchange="javascript:setImagePreview();">\n    </li>\n    <div id="localImag" class="class_img_wrap">\n      <img id="preview" class="class_img" src="/asset/imgs/course_map7.png" alt="tupian buxianshi woxianshi " title="asdfaasd">\n    </div>\n\n    <li class="item_list">\n      <span class="item_key"> 报名权限</span>\n      <input class="singer_celect" type="radio" checked name="limit" value="允许任何人加入课程" id="">&nbsp;&nbsp;&nbsp;&nbsp;允许任何人加入课程\n    </li>\n    <li class="item_list">\n      <span class="item_key">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n      <input class="singer_celect" type="radio" name="limit" value="需要验证后才可以加入" id="">&nbsp;&nbsp;&nbsp;&nbsp;需要验证后才可以加入\n    </li>\n    <li class="item_list">\n      <span class="item_key">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n      <input class="singer_celect" type="radio" name="limit" value="暂不开放报名" id="">&nbsp;&nbsp;&nbsp;&nbsp;暂不开放报名\n    </li>\n    <div class="sep_line"></div>\n    <li class="item_list">\n      <span class="item_key">学生自主退出课程</span>\n      <input class="singer_celect" checked type="radio" name="access" value="允许" id="">&nbsp;&nbsp;&nbsp;允许&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n      <input class="singer_celect" type="radio" name="access" value="不允许" id="">&nbsp;&nbsp;&nbsp;不允许\n    </li>\n  </ul>\n\n</form>\n<button id="tea_build_set_submit" class="button set_submit">提交</button>\n');/*v:1*/
template('teacher/build_course/tab_num_tpl','<div class="tea_tab_num_tpl">\n  <ul class="choice_wrap">\n    <li class="choice_item">\n      <div class="item_num enter">1</div>\n      <h3 class="item_title act">选择教材</h3>\n    </li>\n    <li class="choice_item">\n      <div class="item_num">2</div>\n      <h3 class="item_title">课程设置</h3>\n    </li>\n    <li class="choice_item">\n      <div class="item_num">3</div>\n      <h3 class="item_title">建立成功</h3>\n    </li>\n    <!-- 相对父容器的相对定位背景线 -->\n    <div class="sep_line"></div>\n  </ul>\n</div>\n');/*v:1*/
template('teacher/build_course/win_tpl','<div class="tea_win_tpl">\n  <h1>课程建立成功！</h1>\n  <div class="sep_line"></div>\n  <div class="visit"> 课程邀请码:&nbsp;&nbsp;\n    <span class="visit_num">123456789</span>\n  </div>\n  <h3>课程建立成功，请将该课程邀请码告诉您的学生，您的学生可以通过课程编号找到这个课程并进行报名</h3>\n</div>\n<form id="tea_win_form" action="">\n\n  <li class="win_item">\n    <span class="item_title">课程名称</span>\n    <span id="win_info_title" class="set_to_win new_title">sfb s</span>\n  </li>\n  <li class="win_item">\n    <span class="item_title">开课时间</span>\n    <span id="win_info_time" class="set_to_win new_time">dfgng</span>\n  </li>\n  <li class="win_item">\n    <span class="item_title">报名权限</span>\n    <span id="win_info_limit" class="set_to_win new_limit">sfb swfb </span>\n  </li>\n  <li class="win_item">\n    <span class="item_title">学生自主退出课程</span>\n    <span id="win_info_access" class="set_to_win new_choice">sf bs</span>\n  </li>\n  <div class="sep_line"></div>\n  <!-- 复用标签与样式 开始 -->\n  <li class="win_item_wrap">\n    <h2>选用的教材</h2>\n    <div class="item_img_container ">\n      <img id="win_item_img" class="item_img " src="/asset/imgs/course_map5.png " alt="图片不显示我显示 " title="woshi tupian ">\n    </div>\n    <div class="item_introduce ">\n      <h2 id="win_h2">数学解题泄天机</h2>\n      <h4 id="win_author" class="auhor ">杨飞，陈荣主</h4>\n      <p id="win_item_p" class="item_p ">本书分为3编.第1编解题心经，结合高中一线教师的解题心得和国内外解题名家的思想，提出数学解题活动中的操作规律和思维规律.第2编方法歌诀，归纳总结了高中数学典型的。</p>\n      <div class="lastdata ">权限截至日期&nbsp;&nbsp;\n        <span id="win_time" class="time ">0000.00.00</span>\n      </div>\n    </div>\n  </li>\n  <!-- 复用标签与样式结束 -->\n</form>\n<button id="tea_build_win_submit" class="button win_submit">进入课程</button>\n');/*v:1*/
template('teacher/my_teach/open_class_tpl','<div class="tea_my_teach_open_class_container">\n  <div class="nav_wrap">\n    <div class="nav_com nav_fl">\n      <li class="nav_fl_item  active">开课中</li>\n      <li class="nav_fl_item">已完结</li>\n    </div>\n    <div class="nav_com nav_fr">\n      课程管理\n    </div>\n  </div>\n  <!-- ***模板使用开始 -->\n  <ul class="content_wrap">\n    <!-- 权限设置 -->\n    <div class="content_wrap_ab">无权限</div>\n    <!-- 开课中的 -->\n    <li class="content_item">\n      <img class="content_item_img" src="/asset/imgs/course_map2.png" alt="我是图片位置" title="我是图片1">\n      <div class="content_item_right">\n        <h2>我是标题</h2>\n        <ul class="content_item_list">\n          <li class="content_item_detail">需要验证后才可以加入课程</li>\n          <li class="content_item_detail">邀请码 &nbsp; &nbsp; 000000009</li>\n          <li class="content_item_detail">截至时间 &nbsp; &nbsp;2017.09.10</li>\n          <li class="content_item_detail">\n            <i class="fa fa-user-o"></i> &nbsp; &nbsp;200</li>\n        </ul>\n        <div class="sep_line"></div>\n        <!-- 开课中***课程管理部分***开始 -->\n        <!-- <ul class="kaike_guanli_wrap">\n          <li class="item">\n            <span class="item_zuo zuo_bg1">待批准</span>\n            <span class="item_you">待批准报名的学生2人</span>\n          </li>\n          <li class="item">\n            <span class="item_zuo zuo_bg2">待评判</span>\n            <span class="item_you">待评判的作业测试20人</span>\n          </li>\n          <li class="item">\n            <span class="item_zuo zuo_bg3">待回答</span>\n            <span class="item_you">待回答的问题10个</span>\n          </li>\n          <li class="item">\n            <span class="item_zuo zuo_bg4">活动</span>\n            <span class="item_you">活动通知标题 &nbsp;&nbsp; 活动时间:00.00 00:00</span>\n          </li>\n        </ul> -->\n        <!-- 开课中***课程管理部分***结束 -->\n        <!-- ************选择******另外一种模式 -->\n        <!-- 复制课程与结束课程*****开始 -->\n        <div class="kaike_wancheng">\n          <button class="button is-primary ">\n            复制课程\n          </button>&nbsp;&nbsp;\n          <button class="button is-primary ">结束课程</button>\n        </div>\n        <!-- 复制课程与结束课程*****结束 -->\n      </div>\n    </li>\n  </ul>\n  <!-- ***模板使用结束 -->\n  <div class="page_wrap">\n    <div id="page_le_fl">共100个课程</div>\n    <div id="page_ri_fl">分页器</div>\n  </div>\n</div>\n');/*v:1*/
template('teacher/teach_shop/magnify_tpl','<div class="magnify_tpl">\n  <h1>放大镜实例</h1>\n  <div id="magnify_tab">\n    <!-- 中图区域 -->\n    <div class="magnify_bd">\n      <div class="magnify_zoom"></div>\n    </div>\n    <!-- 小图区域 -->\n    <div class="magnify_hd">\n      <img class="magnify_sm_img" src="/asset/imgs/sm1.jpg" alt="" style="border: 2px solid #ff0000">\n      <img class="magnify_sm_img" src="/asset/imgs/sm2.jpg" alt="小兔">\n      <img class="magnify_sm_img" src="/asset/imgs/sm3.jpg" alt="小兔">\n      <img class="magnify_sm_img" src="/asset/imgs/sm4.jpg" alt="小兔">\n    </div>\n    <!-- 大图区域 -->\n    <div id="magnify_bigimg"></div>\n  </div>\n</div>\n');

}()