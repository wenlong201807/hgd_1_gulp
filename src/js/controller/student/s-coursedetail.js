require(['jquery', 'tpl', 'nav'], function($, tpl, nav) {
  $(function() {
    $.ajax({
      type: 'POST',
      data: {
        rows: 4,
        page: 1
      },
      dataType: 'json',
      url: '/api/resources',
      success: function(data) {
        $('.bookintroduce').html(tpl('student/bookintroduce', {
          arr: data
        }));
        $('.authoerintroduce').html(tpl('student/authoerintroduce', {
          arr: data
        }));
        $('.coursecatelog').html(tpl('student/coursecatelog', {
          arr: data
        }));
      }
    });

    $.ajax({
      type: 'POST',
      data: {rows: 1, page: 1},
      dataType: 'json',
      url: '/api/resources',
      success: function(data) {
        $('.s-course').html(tpl('student/s-course', {
          arr: data
        }));
      }
    });
    $('#index_header').html(tpl('index/header_tpl'));
    $('#index_nav').html(tpl('index/nav_tpl', {left_list: [
      { url: '/view/student/s-index.html', title: '首页', isText: true },
      {
        url: '/view/student/s-courselist.html',
        title: '课程',
        isText: true
      },
      {
        url: '/view/student/s-booklist.html',
        title: '教材',
        isText: true
      },
      { url: '/', title: '|&nbsp;&nbsp;', isText: false },
      {
        url: '/view/student/tea_my_teach.html',
        title: '我的学习',
        isText: true
      }
    ],
    right_list: [
      { url: '', title: '通过序列号获取资源权限', isText: true },

      { url: '', title: '|', isText: false },
      { url: '', title: '通过课程邀请码加入课程', isText: true }
    ]
    }));
    // 底部数据加载
    $('#footer').html('<p>Copyrignt © 2004-2016 哈尔滨工业大学出版社  版权所有    京ICP备11017824号-7</p>');
  });
});
require.config({
  paths: {
    'jquery': 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    'tpl': '/js/tmpl/tpl',
    'nav': '/lib/function/index/nav'
  }
});
