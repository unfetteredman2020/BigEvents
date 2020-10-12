$(function() {
    var { form, layer } = layui
    //验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6字符之间！'
            }
        }
    });
    initUserInfo();
    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置用户信息表单
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });
    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单默认提交事件
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                //调用父级页面中的函数方法
                window.parent.getUserInfo();
            }
        })
    })
})