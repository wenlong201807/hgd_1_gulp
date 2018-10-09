require.config({
  shim: {

    page: ['jquery']
    // exports: 'page'

  },
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    page: '/lib/jquery.simplePagination',
    tpl: '/js/tmpl/tpl'
  }
});

require(['jquery', 'page', 'tpl'], function($, page, tpl) {
  $(function() {
    var currage = 1;
    init(currage);

    $('.bl').on('click', function() {
      $('.paging').pagination('prevPage');
    });

    $('.br').on('click', function() {
      $('.paging').pagination('nextPage');
    });

    function init() {
      $.ajax({
        type: 'POST',
        data: {
          rows: 6,
          page: currage
        },
        dataType: 'json',
        url: '/api/resources',
        success: function(data) {
          console.log(data);
          $('.booktxtlist').html(tpl('student/booklist', {
            arr: data
          }));
          $('.page-btn i').html(currage);
          $('.pagetotle span').html(data.total);
          $('.page-btn span').html(data.totalpage);
          $('.paging').pagination({
            items: data.total,
            itemsOnPage: 6,
            displayedPages: 10,
            cssStyle: 'light-theme',
            prevText: '上一页',
            nextText: '下一页',
            currentPage: currage,
            onPageClick: function(pageNumber, event) {
              currage = pageNumber;
              init(currage);
            }
          });
          //* ********************* */
        }
      });
      //* ************************** */
    }
  });
});
