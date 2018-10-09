// 第一步：配置依赖的模块路径
// 第二步：进行入口处理
require(['/js/controller/index/config.js'], function() {
  'use strict';
  require([
    'jquery',
    'easyui',
    'easyuizh',
    'tpl',
    'carousel',
    'api',
    'path',
    'nav'
  ], function($, easyui, easyuizh, tpl, carousel, api, path, nav) {
    $(function() {
      // 引入头部模板*****************************
      $('#index_header').html(tpl('index/header_tpl'));
      // 引入轮播图模板*******************************
      api.getCarousel(function(data) {
        console.log(data); // 成功获取数据
        $('#index_carousel').html(tpl('index/carousel_tpl', data));
        initCarousel();
      }); // api.getCarousel(function(data) {})
      // 引入推荐课程模板********************************
      api.getRecommonded(function(data) {
        console.log(data); // 成功获取数据
        $('#index_recommendedCourse').html(
          tpl('index/recommendedCourse_tpl', data)
        );
        // 委托方式点击获取动态加载内容
        $('.course_wrap').on('click', '.course_item .course_img', function() {
          console.log($(this).attr('Tid'));

          let newUrl;
          newUrl =
            window.location.href +
            '/view/teacher/tea_enter_course.html#id=' +
            $(this).attr('Tid');
          alert(newUrl);
          window.location.href = newUrl;
        });
      }); //  api.getRecommonded(function(data){})
      // $('#index_recommendedCourse').html(tpl('index/recommendedCourse_tpl'));
      // 引入热门教材模板********************************
      $('#index_hotMaterial').html(tpl('index/hotMaterial_tpl'));
      // 引入导航栏模板********************************
      $('#index_nav').html(tpl('index/nav_tpl', nav.nava()));
      // 引入脚部模板******************
      $('#index_footer').html(tpl('index/footer_tpl'));
    }); // 文档加载之后***
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
  }); /// / 第二步：进行入口处理***结束
});
