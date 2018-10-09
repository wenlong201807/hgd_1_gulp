// 配置依赖的模块路径
require.config({
  shim: {
    easyui: ['jquery'],
    easyuizh: ['jquery'],
    // magnifier: ['jquery'],
    carousel: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery.min',
    // api: '/js/service/api',
    easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    easyuizh: '/lib/jquery-easyui-1.5.5.2/easyui-lang-zh_CN',
    // magnifier: '/lib/magnifier',
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
    $('#tea_teach_header_container').html(tpl('index/header_tpl'));

    // 引入中心内容部分模板teacher/my_teach/open_class_tpl
    $('#tea_main_container').html(tpl('teacher/teach_shop/magnify_tpl'));
    // 放大镜功能
    initMagnify();

    // 引入脚部模板
    $('#tea_teach_footer_container').html(tpl('index/footer_tpl'));

    function initMagnify() {
      // alert(123); // 可使用

      //* ******************* */
      var arrimg = [
        'url(/asset/imgs/mid1.jpg)',
        'url(/asset/imgs/mid2.jpg)',
        'url(/asset/imgs/mid3.jpg)',
        'url(/asset/imgs/mid4.jpg)'
      ];
      var arrbigimg = [
        'url(/asset/imgs/big1.jpg)',
        'url(/asset/imgs/big2.jpg)',
        'url(/asset/imgs/big3.jpg)',
        'url(/asset/imgs/big4.jpg)'
      ];
      $('.magnify_hd .magnify_sm_img').on('mouseover', function() {
        var i = $(this).index();
        $('.magnify_bd').css('background', arrimg[i]);
        $('#magnify_bigimg').css('backgroundImage', arrbigimg[i]);
        $(this)
          .css('border', '2px solid #ff0000')
          .siblings()
          .css('border', '2px solid transparent');
      });
      // 以上是点击小图，看中图tab切换

      $('.magnify_bd').on('mouseover', function(e) {
        var x = e.pageX;
        var y = e.pageY;
        var bdL = $('.magnify_bd').offset().left;
        var bdT = $('.magnify_bd').offset().top;
        var zoomW = $('.magnify_zoom').outerWidth(); // 放大镜的宽度120
        var zoomH = $('.magnify_zoom').outerHeight(); // 放大镜的高度154
        var dx = x - bdL - zoomW / 2;
        var dy = y - bdT - zoomH / 2;
        $('.magnify_zoom').css({ left: dx + 'px', top: dy + 'px' });
        console.log($('.magnify_zoom').css('left'));
        var zooml = parseFloat($('.magnify_zoom').css('left')); // 获取放大镜片 内部定位 左定位值
        var zoomt = parseFloat($('.magnify_zoom').css('top')); // 获取放大镜片 内部定位 上定位值

        //* ************* */
        var mirrorH = $('.magnify_zoom').outerHeight(); // 154
        var mirrorW = $('.magnify_zoom').outerWidth(); // 120
        console.log(mirrorH);
        console.log(mirrorW);
        var midImgH = $('.magnify_bd').height(); // 450
        var midImgW = $('.magnify_bd').width(); // 470
        console.log(midImgH);
        console.log(midImgW);
        var activeH = midImgH - mirrorH;
        var activeW = midImgW - mirrorW;
        console.log(activeH);
        console.log(activeW);
        //* ************************ */
        if (zooml <= 0) {
          // 限制  左边界
          $('.magnify_zoom').css('left', 0);
          zooml = 0; // 当到达左边界时，让zooml设置为0
          console.log($('.magnify_zoom').css('left'));
          console.log(zooml);
        } else if (zooml >= activeW) {
          // 限制 右边界
          $('.magnify_zoom').css('left', activeW + 'px');
          zooml = activeW;
        }

        if (zoomt <= 0) {
          // 限制上边界
          $('.magnify_zoom').css('top', 0);
          zoomt = 0;
          console.log($('.magnify_zoom').css('top'));
          console.log(zoomt); // 当镜片移动到上边界时，将zoomt设置为0
        } else if (zoomt >= activeH) {
          // 限制  下边界
          $('.magnify_zoom').css('top', activeH + 'px');
          zoomt = activeH;
        }

        var posX, posY;
        posX = -zooml * (midImgW / mirrorW) + 'px';
        posY = -zoomt * (midImgH / mirrorH) + 'px';
        var bgscale = (midImgW / mirrorW) * 100 + '%';
        $('#magnify_bigimg').css({
          display: 'block',
          backgroundPositionX: posX,
          backgroundPositionY: posY,
          backgroundSize: bgscale
        });
      }); // $('.magnify_bd').on('mouseover', function(e) {})
      // 鼠标离开中图时，放大镜回到原来的定位位置
      $('.magnify_bd').on('mouseleave', function() {
        $('.magnify_zoom').css('left', '-150px');
        $('#magnify_bigimg').css('display', 'none');
      });

      //* *********************** */
    } // function initMagnify(){};
  }); // $(function(){})
}); // require
