// 第一步：配置依赖的模块路径
require.config({
  shim: {
    easyui: ['jquery'],
    easyuizh: ['jquery'],
    validate: ['jquery'],
    messagesZh: ['jquery', 'validate']
  },
  paths: {
    jquery: '/lib/jquery.min',
    api: '/js/service/index/api',
    easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    easyuizh: '/lib/jquery-easyui-1.5.5.2/easyui-lang-zh_CN',
    tpl: '/js/tmpl/tpl',
    sha1: '/lib/sha1',
    md5: '/lib/md5',
    path: '/lib/path',
    validate: '/lib/jquery.validate.min',
    messagesZh: '/lib/zh/messages_zh.min',
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
  'sha1',
  'md5',
  'path',
  'validate',
  'messagesZh',
  'cook'
], function(
  $,
  easyui,
  easyuizh,
  tpl,
  api,
  sha1,
  md5,
  path,
  validate,
  messagesZh,
  cook
) {
  $(function() {
    //* ***** */
    // 引入登入页面模板
    $('#index_login_container').html(tpl('index/login_tpl'));
    var reqMsg = $('#login_form').serializeArray();
    console.log(reqMsg);
    // 点击登入按钮，发送登录请求，
    $.validator.setDefaults({
      submitHandler: function() {
        var reqMsg = $('#login_form').serializeArray();
        reqMsg[1].value = md5.hex_md5(reqMsg[1].value);
        console.log(reqMsg[1].value);
        reqMsg[2].value = md5.hex_md5(reqMsg[2].value);
        $.ajax({
          url: '/api/login',
          type: 'POST',
          data: reqMsg,
          dataType: 'json',
          success: function(data) {
            if (data.code === 1) {
              if ($("input[name='pork']:checked").val() === '2') {
                cook.set('token', data.token);
                window.location.href = '/view/teacher/tea_index.html';
              } else {
                cook.set('token', data.token);
                window.location.href = '/view/student/s-index.html';
              }
            } else {
              alert('请从新填写');
            }
          } // success
        }); // ajax
      } // submitHandler: function(){}
    }); // $.validator.setDefaults({})

    //* ************************* */
    // 校验
    $('#login_form').validate({
      rules: {
        username: {
          required: true,
          minlength: 2,
          maxlength: 4
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 12
        },
        confirm_password: {
          required: true,
          minlength: 6,
          maxlength: 12,
          equalTo: '#password'
        },
        confirm_jiaoyan: {
          required: true,
          equalTo: '#jiaoyan'
        }
      },
      messages: {
        username: {
          required: '**用户名必须为2-4个字符'
        },
        password: {
          required: '**密码必须为6-12个字符'
        },
        confirm_password: {
          required: '**密码必须为6-12个字符',

          equalTo: '两次密码输入不一致'
        },
        confirm_jiaoyan: {
          required: '**请输入校验码内的字段'
        }
      }
    });
  }); // 文档加载之后***
}); /// / 第二步：进行入口处理***结束
