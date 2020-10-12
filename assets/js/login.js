$(function() {
    // 解构layui
    const { form, layer } = layui;
    // const layer = layui.layer;
    // const form = layui.form;
    // 去登录按钮
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    });
    //去注册按钮
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    });
    // 表单验证
    form.verify({
        'pwd': [/^[\S]{6,12}/, '密码6-12位，不能出现空格'],
        repwd(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致，请重新输入'
            }
        }
    });
    //注册请求
    $('#form_reg').on('submit', function(e) {
        //阻止表单默认提交
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return;
            }
            layer.msg(res.message);
            //注册成功，跳转回登录页面
            $('#link_login').click();
        })
    });
    //登录请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/login', {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return;
            }
            layer.msg(res.message);
            //保存token
            localStorage.setItem('token', res.token);
            location.href = './index.html';
        })
    });
})