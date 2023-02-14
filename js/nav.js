$(function () {
    // 鼠标点击页面动画
    // 来源:https://www.cnblogs.com/renjianjun/p/13632109.html
    $("html").click(function (e) {
        var a = new Array('富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法制', '爱国', '敬业', '诚信', '友善');
        var max = a.length;
        var min = 0;
        var num = Math.floor(Math.random() * (max - min + 1) + min);
        var $i = $("<span></span>").text(a[num]);
        var $i2 = $("<span></span>");
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," +
                ~~(255 * Math.random()) + ")"
        });
        $("html").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
            1500,
            function () {
                $i.remove();
            });
    });
    // $("html").on({
    //     mousemove:function(e){
    //         var x = e.pageX,
    //         y = e.pageY;
    //         var $i2 = $("<span></span>");
    //         $i2.css({
    //         "z-index": 999999999,
    //         "top": y,
    //         "left": x,
    //         "width": "10px",
    //         "height": "10px",
    //         "border-radius": "50%",
    //         "position": "absolute",
    //         "font-weight": "bold",
    //         "border": "solid 1px rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," +
    //             ~~(255 * Math.random()) + ")"
    //     });
    //     $("html").append($i2);
    //     $i2.animate({
    //         "top": 0,
    //         "left": x,
    //         width: "50px",
    //         height: "50px",
    //     },
    //         1500,
    //         function () {
    //             $i2.remove();
    //         });
    //     }
    // })
    
    // 登录成功
    function okLogin() {
        $(".nav-login").removeClass("no-login");
        $(".signin-dialog").dialog("close");
    }

    var username;

    // 检查登录状态
    $.post("./php/login_state.php", function (data) {
        console.log(Boolean(data));
        if (Boolean(data)) {
            console.log(Boolean(data));
            okLogin();
        }
    });
    // 当前登录用户信息
    $.post("./php/user_login_info.php", function (data) {
        $("span.login-name").html(data);
    });

    $(".sub-menu").css({
        top: "+=25px",
        opacity: "0"
    }).hide();
    $(".nav-main>li,.ok-login").on({
        mouseenter: function () {
            $(this).find(".sub-menu").animate({
                top: "-=25px",
                opacity: "1"
            }, "fast").show();
            $(this).toggleClass("li-item-down_arrow");
        },
        mouseleave: function () {
            $(this).find(".sub-menu").animate({
                top: "+=25px",
                opacity: "0"
            }, "fast").hide();
            $(this).toggleClass("li-item-down_arrow");
        }
    });

    $(".tip").hide();

    var dialogStyle = {
        width: "400px",
        modal: true,
        autoOpen: false,
        show: {
            effect: "bounce",

            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    };

    $(".signin-dialog").dialog(dialogStyle);
    $(".signup-dialog").dialog(dialogStyle);
    $(".forgot-password-dialog").dialog(dialogStyle);
    $(".signin-loader").click(function () {
        $(".tip").hide();
        $(".signin-dialog").dialog("open").find("input[type!=button]").val('');
    });
    $(".signup").click(function () {
        $(".tip").hide();
        $(".signin-dialog").dialog("close").find("input[type!=button]").val('');;
        $(".signup-dialog").dialog("open");
    });
    $(".forgot-password").click(function () {
        $(".tip").hide();
        $(".signin-dialog").dialog("close").find("input[type!=button]").val('');
        $(".forgot-password-dialog").dialog("open");
    });
    $(".signin").click(function () {
        $(".tip").hide();
        $(".signup-dialog").dialog("close").find("input[type!=button]").val('');
        $(".signin-dialog").dialog("open");
    });
    $(".signup-loader").click(function () {
        $(".tip").hide();
        $(".signup-dialog input[type!='button']").val("");
        $(".signup-dialog").dialog("open");
    });
    var bVaild = true;
    // $(".has-input")
    // $(".has-input-dialog").children().blur(function (){
    //     // isInput($(this).siblings().forEach(element => {
    //     //     isInput(element.val(),
    //     // });
    //     isInput($(this).val(),$(this).attr('placeholder'));
    // if(isInput($(this).val(),$(this).attr('placeholder')) && isInput($(this).siblings().val(),$(this).siblings().attr('placeholder'))){
    //     $(this).siblings("input[type=button]").attr("disabled",false);
    // }else{
    //     $(this).siblings("input[type=button]").attr("disabled",true);
    // }
    // });
    // $(".username").blur(function () {
    //     isInput($(this).val(),"用户名");
    // })
    // $(".password").blur(function () {
    //     isInput($(this).val(),"密码");
    // })
    // 登录
    $(".login-btn").click(function () {
        var username = $(this).parent().find(".username").val();
        var password = $(this).parent().find(".password").val();
        var bVaild = true;
        bVaild = bVaild && isInput(username, "用户名")
        bVaild = bVaild && isInput(password, "密码");
        if (bVaild) {
            password = $.md5(password);
            $.ajax({
                type: "POST",
                url: "./php/check.php",
                data: {
                    "option": "check",
                    "username": username,
                    "password": password
                },
                success: function (data) {
                    if (Boolean(data)) {
                        okLogin();
                        $("span.login-name").html(username);
                        // 刷新页面
                        window.location.reload();
                    } else {
                        alert("用户名或密码错误！");
                    }
                }
            });
        }
    });

    // 退出登录
    $(".logout").click(function () {
        $.post("./php/logout.php", function (data) {
            console.log(data);
            $(".nav-login").addClass("no-login");
            alert("退出成功！");
            // 刷新页面
            window.location.reload();
        });
    });
    usernaem = $("span.login-name").text();
    // 修改密码
    $(".forgot-password-btn").click(function () {
        var username = $(this).parent().find(".username").val();
        var password = $(this).parent().find(".password").val();
        var new_password = $(this).parent().find(".new_password").val();
        var again_new_password = $(this).parent().find(".again_new_password").val();
        var bVaild = true;
        bVaild = bVaild && isInput(username, "用户名")
        bVaild = bVaild && isInput(password, "原密码");
        bVaild = bVaild && isInput(new_password, "新密码");
        bVaild = bVaild && isInput(again_new_password, "再次输入新密码");
        bVaild = bVaild && isEqual(new_password, again_new_password);
        if (bVaild) {
            password = $.md5(password);
            new_password = $.md5(new_password);
            $.ajax({
                type: "POST",
                url: "./php/recive_password.php",
                data: {
                    "username": username,
                    "password": password,
                    "new_password": new_password
                },
                success: function (data) {
                    if (Boolean(data)) {
                        alert("修改成功！");
                        $(".forgot-password-dialog input[type!=button]").val("");
                        $(".forgot-password-dialog").dialog("close");
                    } else {
                        alert("修改失败！");
                    }
                }
            });
        }
    });

    function isEqual(new_password, again_new_password) {
        if (new_password != again_new_password) {
            $(".tip").show();
            $(".tip strong").text("两次输入的密码不一致！");
            return false;
        } else {
            $(".tip").hide();
            return true;
        }
    }
    // 注册

    $(".signup-btn").click(function () {
        var input_name = $(this).parent().find(".username");
        var input_password = $(this).parent().find(".password")
        var username = input_name.val();
        var password = input_password.val();
        var again_password = $(this).parent().find(".again_password").val();
        var bVaild = true;
        bVaild = bVaild && checkLength(input_name, "用户名", 1, 8)
        bVaild = bVaild && checkLength(input_password, "密码", 6, 12)
        bVaild = bVaild && isInput(again_password, "再次输入密码");
        bVaild = bVaild && isEqual(password, again_password)
        if (bVaild) {
            password = $.md5(password);
            $.ajax({
                type: "POST",
                url: "./php/signup.php",
                data: {
                    "username": username,
                    "password": password,
                },
                success: function (data) {
                    if (Boolean(data)) {
                        alert("注册成功！");
                        $(".signup-dialog input[type!=button]").val("");
                        $(".signup-dialog").dialog("close");
                    } else {
                        alert("用户名已存在!");
                    }
                }
            });
        }
    });

    function isInput(value, txt) {
        if (value.length == 0) {
            $(".tip").show();
            $(".tip strong").text(txt + "不能为空！");
            return false;
        } else {
            $(".tip").hide();
            return true;
        }
    }

    function checkLength(obj, txt, min, max) {  // 检测长度
        // obj 是被检测的对象,txt是显示的提示文本,min 是要求长度的最小值,max是要求长度的最大值
        if (obj.val().length < min || obj.val().length > max) {
            $(".tip").show();
            $(".tip strong").text(txt + "必须在" + min + "到" + max + "位之间");
            return false;
        } else {
            $(".tip").hide();
            return true;
        }
    }


});