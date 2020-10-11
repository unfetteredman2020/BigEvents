$(function() {
    // 去登录
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    });
    //去注册按钮
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    });
    const { form } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}/, '密码6-12位，不能出现空格'],
        repwd(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致，请重新输入'
            }
        }
    });
})