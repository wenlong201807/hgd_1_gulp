// 第一步：配置依赖的模块路径

function paths_config() {
  var shim_paths = [
    {
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
        nav: '/lib/function/index/nav'
      }
    }
  ];

  return {
    shim_paths: shim_paths
  };
}

define([], function() {
  return {
    paths_config: paths_config

    // nava: nava
    // str_md5: str_md5,
    // hex_md5: hex_md5
  };
});
