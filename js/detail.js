$(function() {
    var id = parseInt(getUrlParam("id"));
    $.ajax({
        url: './php/extension_detail.php',
        method: 'POST',
        datatype: 'json',
        data:{
            "id":(id>0?id-1:0),
        },
        success: data => {
            console.log(data);
            $(".col-header img").attr("src","img/icon_pic/"+data.id+".png");
            $(".title").text(data.name);
            $(".short-info").text(data.short_detail);
            $(".col-info img").attr("src","img/cover_pic/"+data.id+".jpg");
            $(".col-detail p:first").text(data.detail);
            $(".col-detail a").attr("href",data.website).text(data.website);
        },
        error: err => {
            ;
        }
    })
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
});