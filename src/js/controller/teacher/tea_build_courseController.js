// 配置依赖的模块路径
require.config({
  shim: {
    // easyui: ['jquery'],
    // easyuizh: ['jquery'],
    carousel: ['jquery'],
    simplePage: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery.min',
    tea_api: '/js/service/teacher/tea_api',
    // easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    // easyuizh: '/lib/jquery-easyui-1.5.5.2/easyui-lang-zh_CN',
    tpl: '/js/tmpl/tpl',
    simplePage: '/lib/jquery.simplePagination'
  }
});
// 第二步：进行入口处理
require(['jquery', 'tpl', 'tea_api', 'simplePage'], function(
  $,
  tpl,
  teaApi,
  simplePage
) {
  $(function() {
    // var 分页中的默认页码值
    var curpage = 1;
    // _id,
    // author,
    // title,
    // intro,
    // classifyid=1;
    // permissionboolean;

    // 引入头部模板
    $('#tea_build_course_header').html(tpl('index/header_tpl'));

    // 引入tab标签导航数字模板
    $('#tea_build_course_tab_num').html(
      tpl('teacher/build_course/tab_num_tpl')
    );

    // 设置课程模板
    $('#tea_build_set_container').html(tpl('teacher/build_course/set_tpl'));

    // 成功建立课程模板
    $('#tea_build_win_container').html(tpl('teacher/build_course/win_tpl'));

    // 引入脚部模板
    $('#tea_build_course_footer').html(tpl('index/footer_tpl'));

    // 0.模态框初始化时为隐藏状态
    initTeaBuidlModel();

    // 1. 页面初始化的时候，显示tab页面的选择页签
    initTabChoice();

    // 2. 点击选择页签跳转至设置页签
    initTabChoiceToSetHandler();

    // 3. 点击设置页签中的按钮**更换教材，设置页签跳转至选择页签
    initTabSetToChoiceHandler();

    // 4. 页面初始化，选择页签添加选择课程模板中的数据
    initTeaBuildCourseChoiceAjax(curpage);

    // 5.设置页签跳转至成功选课页签
    initTabSetToWinHandler();

    // 6.点击成功选课中的 **进入课程按钮***
    $('#tea_build_win_submit').on('click', function() {
      window.location.href = '/view/teacher/tea_enter_course.html';
    });

    // 7.点击设置课程中的浏览按钮****
    // $('#sky').on('click', function() {
    //   alert('我是被点击浏览时，弹出来的点击事件，在js入口文件中，');
    // });

    // 8.点击选则页签中的** 跳转至**按钮，条转至第几页
    $('body').on('click', '#page_jump_btn', function() {
      var pageJumpTo = $('#page_jump_num').val();
      // 判断填入的只能是数字
      initTeaBuildCourseChoiceAjax(pageJumpTo);
    });

    // 9.选择页签中的搜索图标，点击进行模糊查询
    initCheck();

    // 10.选择页签中，全部分类中下拉菜单为分类id，点击获取分类id值，并将此分类传递给分页

    // 11. 选择页签中，独立的上一页和下一页按钮
    $('body').on('click', '#prevBtn', function() {
      $('#build_page').pagination('prevPage');
    });

    // 12. 选择页签中，独立的上一页和下一页按钮
    $('body').on('click', '#nextBtn', function() {
      $('#build_page').pagination('nextPage');
    });

    // 13 .图片上传于预览

    // 判断浏览器是否支持FileReader接口
    // if (typeof FileReader === 'undefined') {
    //   $('#result').html('<p>你的浏览器不支持FileReader接口！</p>');
    //   // 使选择控件不可操作
    //   $('#file').attr('disabled', 'disabled');
    // }

    // $('body').on('click', '#sky', function() {
    //   alert(123);
    //   // 检验是否为图像文件
    //   var file = document.getElementById('file').files[0];
    //   if (!/image\/\w+/.test(file.type)) {
    //     alert('看清楚，这个需要图片！');
    //     return false;
    //   }
    //   var reader = new FileReader();
    //   // 将文件以Data URL形式读入页面
    //   reader.readAsDataURL(file);
    //   reader.onload = function(e) {
    //     var result = document.getElementById('result');
    //     // 显示文件
    //     result.innerHTML =
    //       '<img class="class_img" src="' + this.result + '" alt="" />';
    //   };
    // });
    //* ****5555************ */

    // 下面用于图片上传预览功能
    // var avalue；
    setImagePreview();
    function setImagePreview() {
      var docObj = document.getElementById('doc');

      var imgObjPreview = document.getElementById('preview');
      if (docObj.files && docObj.files[0]) {
        // 火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '150px';
        imgObjPreview.style.height = '180px';
        // imgObjPreview.src = docObj.files[0].getAsDataURL();

        // 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
      } else {
        // IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById('localImag');
        // 必须设置初始大小
        localImagId.style.width = '150px';
        localImagId.style.height = '180px';
        // 图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
          localImagId.style.filter =
            'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
          localImagId.filters.item(
            'DXImageTransform.Microsoft.AlphaImageLoader'
          ).src = imgSrc;
        } catch (e) {
          alert('您上传的图片格式不正确，请重新选择!');
          return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
      }
      return true;
    }

    //* ******555*********** */
  }); // $(function() {})
  //* ******************功能函数区域********************************** */

  // 0.模态框初始化时为隐藏状态
  function initTeaBuidlModel() {
    // $('#tea_build_model_bg').fadeIn();
  } // function   initTeaBuidlModel(){};

  // 1. 页面初始化的时候，显示tab页面的选择页签
  function initTabChoice() {
    $('#tea_build_course_main_wrap>li')
      .eq(0)
      .fadeIn();
    // 显示tab数字的第一个
    $('.choice_item')
      .children('.item_num')
      .addClass('enter');
    $('.choice_item')
      .children('.item_title')
      .addClass('act');
  } // function  initTabChoice(){};

  // 2. 点击选择页签跳转至设置页签
  function initTabChoiceToSetHandler() {
    // 未完成**数字颜色于文字颜色变化
    // $this.children('.item_num').addClass('enter');
    // $this.children('.item_title').addClass('act');
    $('body').on('click', '#choice_to_set', function() {
      // 显示设置页签，兄弟页签隐藏
      $('#tea_build_course_main_wrap>li')
        .eq(1)
        .fadeIn()
        .siblings()
        .fadeOut();
      // 页码数字的背景色与对应文字的颜色改变**没写

      // 将选择页签中相应的课程内容信息 传递给设置的位置**修改之前的数据
      $('#new_item_img').attr('src', $(this).attr('getimgUrl'));
      $('#new_h2').html($(this).attr('gettitle'));
      $('#new_author').html($(this).attr('getauthor'));
      $('#new_item_p').html($(this).attr('getcontent'));
      $('#new_time').html($(this).attr('getdatatime'));
      $('#new_item_limit').html(
        $(this)
          .parent()
          .siblings('.item_limit')
          .html()
      );
    });
  } // function initTabChoiceToSetHandler(){};

  // 3. 点击设置页签中的按钮**更换教材，设置页签跳转至选择页签
  function initTabSetToChoiceHandler() {
    $('body').on('click', '#set_to_choice', function() {
      // 显示设置页签，兄弟页签隐藏
      $('#tea_build_course_main_wrap>li')
        .eq(0)
        .fadeIn()
        .siblings()
        .fadeOut();
    });
  } // function initTabSetToChoiceHandler(){};

  // initTeaBuildCourseChoiceAjax
  // 4. 页面初始化，选择页签添加选择课程模板中的数据
  function initTeaBuildCourseChoiceAjax(curpage) {
    $.ajax({
      url: '/api/resources',
      type: 'POST',
      data: {
        rows: 3, // 每页显示多少条
        page: curpage // 当前页码数
        // _id: _id,
        // author: author,
        // title: title,
        // intro: intro,
        // classifyid: classifyid,
        // permissionboolean: permissionboolean
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        // 模板引入 // 选择课程模板
        $('#tea_build_choice_container').html(
          tpl('teacher/build_course/choice_tpl', data)
        );
        // 模板加载之后，才能使用模板中的标签
        $('.total_num_two').html(data.total);
        $('#total_page').html(data.totalpage);
        $('#curPageee').html(curpage);
        // 分页开始
        $('#build_page').pagination({
          items: data.total, // 总条数
          itemsOnPage: 3, // 每页多少条
          currentPage: curpage,
          displayedPages: 5, // 显示的页码数字个数
          edges: 1, // 边界显示个数
          prevText: '上一页',
          nextText: '下一页',
          cssStyle: 'light-theme',
          onPageClick: function(pageNumber, event) {
            // 点击当前页时发生的事情
            curpage = pageNumber;
            initTeaBuildCourseChoiceAjax(curpage);
          }
        });
      }
    });
  } // function initTeaBuildCourseChoiceAjax(){};

  // 5.设置页签跳转至成功选课页签
  function initTabSetToWinHandler() {
    $('#tea_build_set_submit').on('click', function() {
      // 显示成功选择页签，兄弟页签隐藏
      $('#tea_build_course_main_wrap>li')
        .eq(2)
        .fadeIn()
        .siblings()
        .fadeOut();

      // 将设置页签中的选用教材信息传递给成功建立页签中的选用教材对应的位置
      $('#win_item_img').attr('src', $('#new_item_img').attr('src'));
      $('#win_h2').html($('#new_h2').html());
      $('#win_author').html($('#new_author').html());
      $('#win_item_p').html($('#new_item_p').html());
      $('#win_time').html($('#new_time').html());

      // 将设置页签中填写的基本信息传递给成功建立页签中对应的位置
      var setInfoForm = $('#set_info_form').serializeArray();
      $('#win_info_title').html(setInfoForm[0].value);
      $('#win_info_time').html(
        setInfoForm[2].value + '  ----  ' + setInfoForm[3].value
      );
      $('#win_info_limit').html(setInfoForm[4].value);
      $('#win_info_access').html(setInfoForm[5].value);
      // 发送ajax请求，随机生成课程邀请码
      $.ajax({
        url: '/api/visiteNum',
        success: function(data) {
          console.log(data);
          console.log(data.visiteNum);
        }
      });
    });
  } // function initTabSetToWinHandler(){};
  // 9.选择页签中的搜索图标，点击进行模糊查询
  function initCheck() {
    $('body').on('click', '#searchBtn', function() {
      // 获取搜索框中输入的内容，
      var searchBox = $('#search_box').val();
      console.log(searchBox);
      $.ajax({
        url: '/api/resources',
        type: 'GET',
        data: {
          // rows: 3, // 每页显示多少条
          // page: curpage // 当前页码数
          // _id: _id,
          author: searchBox
          // title: title,
          // intro: intro,
          // classifyid: classifyid,
          // permissionboolean: permissionboolean
        },
        dataType: 'json',
        success: function(data) {
          console.log(data);
          // 使用模态框接收返回的数据
          console.log('查询的结果需要用模态框来装，然后传入页面');
          // $('#check_tpl').css('display', 'none');
        }
      });
    });
  } // function  initCheck(){};
  //* *****************功能函数区域******************* */
});
