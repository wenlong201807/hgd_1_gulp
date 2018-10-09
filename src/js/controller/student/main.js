require.config({
  shim: {
    page: ['jquery']
  },
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/1.12.3/jquery.min',
    page: '/lib/page'
  }
});

require(['jquery', 'page'], function($, p) {
  // 左侧导航下拉
  $(function() {
    $('.bookdrop dd').hide();
    $('.bookdrop dt').click(function() {
      $(this)
        .parent()
        .find('dd')
        .removeClass('menu_chioce');
      $('.bookdrop dt img').attr('src', '/asset/imgs/add.png');
      $(this)
        .parent()
        .find('img')
        .attr('src', '/asset/imgs/reduce.png');
      $('.menu_chioce').slideUp();
      $(this)
        .parent()
        .find('dd')
        .slideToggle();
      $(this)
        .parent()
        .find('dd')
        .addClass('menu_chioce');
    });
  });
});

require(['jquery'], function($) {
  $(function() {
    var num = 1;

    $('.booktxttotal .lt').click(function() {
      num--;
      if (num < 1) {
        num = 1;
      }
      $('.totalpage i').html(num);
    });
    $('.booktxttotal .gt').click(function() {
      num++;
      if (num > 10) {
        num = 10;
      }
      $('.totalpage i').html(num);
    });
  });
});
