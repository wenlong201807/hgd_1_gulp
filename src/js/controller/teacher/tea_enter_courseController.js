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
    var url = location.search; // 获取url中"?"符后的字串
    var cunzai = url.indexOf('?');
    console.log(cunzai);
    // 判断是否存在  ?  存在时，不等于-1
    if (cunzai === -1) {
      return;
    }
    var sty = url.split('?');
    console.log('****sty**', sty[1]);
    var vk = sty[1].split('&');
    console.log('****vk**', vk);
    var kkkk = [];
    for (var i = 0; i < vk.length; i++) {
      var aa = vk[i].split('=');
      console.log(aa[1]); // 得到每一个value值
      kkkk.push(aa[1]); // 把所有的value合在一起形成数组
    }
    console.log(kkkk); // 得到全部的key=value 中的全部value 形成的数组
  }); // $(function() {})
});
