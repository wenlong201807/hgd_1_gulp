// 配置依赖的模块路径
require.config({
  shim: {
    easyui: ['jquery'],
    easyuizh: ['jquery'],
    carousel: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery.min',
    api: '/js/service/index/api',
    easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    easyuizh: '/lib/jquery-easyui-1.5.5.2/easyui-lang-zh_CN',
    tpl: '/js/tmpl/tpl',
    carousel: '/lib/carousel',
    // carouselFn: '/lib/function/index/carouselFn',
    cook: 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min'
  }
});
// 第二步：进行入口处理
require([
  'jquery',
  'easyui',
  'easyuizh',
  'tpl',
  'api',
  'carousel',
  'cook'
], function($, easyui, easyuizh, tpl, api, carousel, cook) {
  $(function() {
    // if (cook.get('token') !== 123654) {
    //   return;
    // }
    // 引入头部模板

    $('#tea_index_header').html(tpl('index/header_tpl'));

    $('#tea_index_nav').html(
      tpl('index/nav_tpl', {
        left_list: [
          { url: '/view/teacher/tea_index.html', title: '首页', isText: true },
          {
            url: '/view/teacher/tea_teach_shop.html',
            title: '教学商城',
            isText: true
          },
          {
            url: '/view/teacher/tea_enter_course.html',
            title: '课程',
            isText: true
          },
          {
            url: '/view/teacher/tea_teach_shop.html',
            title: '教材',
            isText: true
          },
          { url: '/', title: '|&nbsp;&nbsp;', isText: false },
          {
            url: '/view/teacher/tea_my_teach.html',
            title: '我的学习',
            isText: true
          }
        ],
        right_list: [
          { url: '', title: '通过序列号获取资源权限', isText: true },
          { url: '', title: '|', isText: false },
          { url: '', title: '通过课程邀请码加入课程', isText: true }
        ]
      })
    );

    // 引入轮播图模板*******************************
    api.getCarousel(function(data) {
      console.log(data); // 成功获取数据
      $('#tea_index_carousel').html(tpl('index/carousel_tpl', data));
      initCarousel();
    }); // api.getCarousel(function(data) {})

    // 引入热门教材模板
    $('#tea_index_hotMaterial').html(tpl('index/hotMaterial_tpl'));
    // 引入推荐课程模板********************************
    api.getRecommonded(function(data) {
      console.log(data); // 成功获取数据
      $('#tea_index_recommendedCourse').html(
        tpl('index/recommendedCourse_tpl', data)
      );
      // 委托方式点击获取动态加载内容
      $('.course_wrap').on('click', '.course_item .course_img', function() {
        console.log($(this).attr('Tid'));

        let newUrl;
        newUrl =
          '/view/teacher/tea_enter_course.html?id=' +
          $(this).attr('Tid') +
          '&v1=k1&v2=k2&v3=k3&v4=k4';
        alert(newUrl);
        window.location.href = newUrl;
      });
    }); //  api.getRecommonded(function(data){})

    // 引入脚部模板
    $('#tea_index_footer').html(tpl('index/footer_tpl'));
  }); // $(function() {})
  // 初始化轮播图效果
  function initCarousel() {
    $('.carousel-content').carousel({
      carousel: '.carousel', // 轮播图容器
      indexContainer: '.img-index', // 下标容器
      timing: 3000, // 自动播放间隔
      animateTime: 700, // 动画时间
      autoPlay: true, // 是否自动播放 true/false
      direction: 'left' // 滚动方向 right/left
    });
  }
});
