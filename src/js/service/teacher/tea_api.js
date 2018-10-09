define(['jquery'], function($) {
  'use strict';
  return {
    // 使用方法的方式写
    // *教师端，建立课程，选择课程页面**传递出去的功能函数
    getTea_build_choice: function(pageNum, Cid, cb) {
      // 发送ajax请求，后台返回数据后，调用cb函数
      $.ajax({
        url: '/api/choice_course',
        type: 'GET',
        data: {
          size: 3,
          page: pageNum,
          categories_id: Cid
        },
        dataType: 'json',
        success: cb
      });
    }
  };
});
