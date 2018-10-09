// 配置依赖的模块路径
require.config({
  shim: {
    easyui: ['jquery'],
    easyuizh: ['jquery'],
    carousel: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery.min',
    // api: '/js/service/api',
    easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    easyuizh: '/lib/jquery-easyui-1.5.5.2/easyui-lang-zh_CN',
    tpl: '/js/tmpl/tpl'
  }
});
// 第二步：进行入口处理
require(['jquery', 'easyui', 'easyuizh', 'tpl'], function(
  $,
  easyui,
  easyuizh,
  tpl
) {
  $(function() {
    // 引入头部模板
    $('#tea_my_teach_header').html(tpl('index/header_tpl'));

    $('#tea_my_teach_nav').html(
      tpl('index/nav_tpl', {
        left_list: [
          { url: '/view/teacher/tea_index.html', title: '首页', isText: true },
          {
            url: '/view/teacher/tea_teach_shop.html',
            title: '教材',
            isText: true
          },
          { url: '/', title: '|&nbsp;&nbsp;', isText: false },
          {
            url: '/view/teacher/tea_my_teach.html',
            title: '我的教学',
            isText: true
          }
        ],
        right_list: [
          { url: '', title: '通过序列号获取资源权限', isText: true },
          { url: '', title: '|', isText: false },
          { url: '', title: '建立课程', isText: true }
        ]
      })
    );
    // 引入中心内容部分模板teacher/my_teach/open_class_tpl
    $('#tea_my_teach_open_class').html(tpl('teacher/my_teach/open_class_tpl'));
    // 引入脚部模板
    $('#tea_my_teach_footer').html(tpl('index/footer_tpl'));
  }); // $(function() {})
});
