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
    path: '/lib/path',
    nav: '/lib/function/index/nav'
  }
});
