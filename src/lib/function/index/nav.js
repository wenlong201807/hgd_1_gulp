function nava() {
  var kk = [1, 2, 3];
  var oo = 258;

  var left_list = [
    { url: '/view/teacher/tea_index.html', title: '首页', isText: true },
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
  ];

  var right_list = [
    { url: '', title: '通过序列号获取资源权限', isText: true },

    { url: '', title: '|', isText: false },
    { url: '', title: '通过课程邀请码加入课程', isText: true }
  ];

  return {
    kk: kk,
    oo: oo,
    left_list: left_list,
    right_list: right_list
  };
}

define([], function() {
  return {
    nava: nava
    // str_md5: str_md5,
    // hex_md5: hex_md5
  };
});
//* ******************* */
// nav2 = (function() {
//   m3 = function() {
//     alert('im');
//   };
//   return { m3: m3 };
// })(window.nav2 || {});
