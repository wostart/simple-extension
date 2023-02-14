$(function() {
    $.ajax({
        url: './php/personal_info.php',
        method: 'POST',
        datatype: 'json',
        success: data => {
            if(data != 0){
                $(".col-1 h1").text(data.name);
                $(".input-gender").val(data.gender);
                $(".input-name").val(data.name);
                $(".input-email").val(data.email);
                $(".textarea-say").val(data.say);
                $(".input-phone").val(data.phone);
                $(".input-address").val(data.address);
                $(".input-qq").val(data.qq);
            }else{
                location.href = "index.html";
            }
        }
    });

    $(".check-submit").click(function(){
        var $email = $(".input-email").val();
        var $phone = $(".input-phone").val();
        var $gender = $(".input-gender").val();
        var $say = $(".textarea-say").val();
        var $address = $(".input-address").val();
        var $qq = $(".input-qq").val();
        $.post("./php/recive_personal_info.php", 
        {
            "email":$email,
            "phone":$phone,
            "gender":$gender,
            "say":$say,
            "address":$address,
            "qq":$qq
        }, function(data){
            if(Boolean(data)){
                console.log(1);
            }else{
                console.log(0);
            }
            window.location.reload();
        })
    });

    function checkRegexp(obj,reg,txt){  //用于输入信息的格式规则检测
        //obj被检测的对象，reg用于检测的正则表达式，txt检测非法时的提示信息
        if(reg.test(obj.val())){ 
          //test()方法用于检测一个字符串是否符合某个规则要求，返回结果为boolean值
          return true;
        }else{
        //   updateTips(txt);
          return false;
        }            
       }
});

