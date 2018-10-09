/**
 * *** 与后台打交道的接口文件都封装到这里来
 *
 *
 *
 */
define(['jquery'], function($) {
  'use strict';
  return {
    // *轮播图中**传递出去的功能函数
    getCarousel: function(cb) {
      // 发送ajax请求，后台返回数据后，调用cb函数
      $.ajax({
        url: '/api/student/carousel',
        type: 'GET',
        data: '',
        dataType: 'json',
        success: cb
      });
    },
    // *首页推荐课程中**传递出去的功能函数
    getRecommonded: function(cb) {
      // 发送ajax请求，后台返回数据后，调用cb函数
      $.ajax({
        url: '/api/student/recommonded',
        type: 'GET',
        data: {
          page: 1,
          size: 10
        },
        dataType: 'json',
        success: cb
      });
    },
    // *登录页面**
    postLogin: function(cb) {
      // 发送ajax请求，后台返回数据后，调用cb函数
      $.ajax({
        url: '/api/login',
        type: 'POST',
        data: {},
        dataType: 'json',
        success: cb
      });
    }
  };
});
