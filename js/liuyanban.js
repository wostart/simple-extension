$(function() {
    // <div class="card">
    //             <div class="user clearfix">
    //                 <img src="img/icon.png">
    //                 <p class="l-name">admin</p>
    //                 <p><span class="l-date">2021-12-16</span><span class="l-time">17:59:00</span></p>
    //             </div>
    //             <p class="l-content">希望加个收藏功能！</p>
    //         </div>
    $.ajax({
        url: './php/liuyanban.php',
        method: 'POST',
        datatype: 'json',
        success: data => {
            for(var i = 0; i < data.length; i++) {
                $(".col").append(createLDiv(data[i].name,data[i].date,data[i].time,data[i].content));
            }
        },
        error: err => {
            ;
        }
    });

    $(".btn-Ok").click(function(){
        if($(this).siblings("textarea").val().length != 0){
            var date = new Date();
            var nowMonth = date.getMonth() + 1;
            var strDate = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            if(nowMonth >= 1 && nowMonth <= 9){
                nowMonth = "0" + nowMonth;
            }
            if(strDate >= 0 && strDate <= 9){
                strDate = "0" + strDate;
            }
            if(hour >= 0 && hour <= 9){
                hour = "0" + hour;
            }
            if(minute >= 0 && minute <= 9){
                minute = "0" + minute;
            }
            if(second >= 0 && second <= 9){
                second = "0" + second;
            }
            var nowDate = date.getFullYear() + "-" + nowMonth + "-" + strDate;
            var nowTime = hour + ":" + minute + ":" + second;
            var content = $(this).siblings("textarea").val();
            // console.log(nowTime);
            $.ajax({
                url:"./php/insert_liuyan.php",
                type:"POST",
                data:{
                    "date":nowDate,
                    "time": nowTime,
                    "content":content,
                },
                success:data => {
                    console.log(data);
                    window.location.reload();
                }
            });
        }
    });

    function createLDiv(name,date,time,content){
        var str = "<div class='card'>";
        str += "<div class='user clearfix'>";
        str += "<img src='img/user.png'>";
        str += "<p class='l-name'>"+name+"</p>";
        str += "<p><span class='l-date'>"+date+"</span><span class='l-time'>"+time+"</span></p>";
        str += "</div>";
        str += "<p class='l-content'>"+content+"</p>";
        str += "</div>";
        return str;
    }

});