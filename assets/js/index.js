$(function() {
    getUserInfo();
    var layer = layui.layer;
    //logout 退出业务
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //清空本地token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';
            //关闭confirm询问框页面
            layer.close(index);
        })
    })
});
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //渲染用户头像
            renderAvatar(res.data);
        },
        //判断用户的登录状态的返回信息，
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清空token
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //渲染用户头像
    $('#welcome').html('欢迎:&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染用户的自己的图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染用户文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}