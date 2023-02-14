$(function () {

    // 编辑推荐组
    var array = [2,3,15];
    // banner
    var banner_arr = [3,7,8,9,11];
    var bannerLis = $(".pic-ul li");
            for(var i = 0; i < 5; i++) {
                bannerLis.eq(i).find("img").attr("src","img/cover_pic/"+(banner_arr[i]+1)+".jpg");
                bannerLis.eq(i).find("a").attr("href","detail.html?id="+(banner_arr[i]+1));
            }

    // 随机推荐
    $.ajax({
        url: './php/all_extension.php',
        method: 'POST',
        datatype: 'json',
        success: data => {
            // console.log(data);
            var len = data.length;

            // 随机推荐
            var arr = selectRandom(4,0,len);
            var cardOneLis = $(".card-1 ul li");
            for(var i = 0; i < 4; i++){
                // var num = arr[i];
                // console.log(arr[i],data[num]);
                // console.log(arr[i]+data[num].id+data[arr[i]].name+data[arr[i]].detail);
                cardOneLis.eq(i).find("a").attr("href","detail.html?id="+data[arr[i]].id);
                cardOneLis.eq(i).find("img").attr("src","img/cover_pic/"+(arr[i]+1)+".jpg");
                cardOneLis.eq(i).find("p:first").text(data[arr[i]].name);
                cardOneLis.eq(i).find("p:last").text(data[arr[i]].detail);
            }
            // 最热下载
            var colTwoLis = $(".col-2 ul li a");
            for(var i = 0; i < 5; i++){
                colTwoLis.eq(i).attr("href","detail.html?id="+data[i].id);
                colTwoLis.eq(i).find("img").attr("src","img/icon_pic/"+(i+1)+".png");
                colTwoLis.eq(i).find("p:first").text(data[i].name);
                colTwoLis.eq(i).find("p:last").text(data[i].detail);
            }
            // 最新插件
            var colThreeLis = $(".col-3 ul li a");
            for(var i = 0; i < 5; i++){
                colThreeLis.eq(i).attr("href", "detail.html?id="+data[i+5].id)
                colThreeLis.eq(i).find("img").attr("src","img/icon_pic/"+(i+6)+".png");
                colThreeLis.eq(i).find("p:first").text(data[i+5].name);
                colThreeLis.eq(i).find("p:last").text(data[i+5].detail);
            }
            // 编辑推荐
            var cardTwoLis = $(".card-2 ul li");
            for(var i = 0; i < 3; i++){
                cardTwoLis.eq(i).css({
                    "background-image":"url(img/cover_pic/"+(array[i]+1)+".jpg)",
                    // "background"
                });
                cardTwoLis.eq(i).find("a").attr("href","detail.html?id="+data[array[i]].id);
                cardTwoLis.eq(i).find("img").attr("src","img/icon_pic/"+(array[i]+1)+".png");
                cardTwoLis.eq(i).find("p").text(data[array[i]].name);
            }
            changeColorImpl();
        }
    })

    // num 数组长度，from起始范围，to结束范围
    function selectRandom (num, from, to) {
      let arr = [];
      let json = {};
      let needNum;
      if (from - to >= 0) {
        return '起始值要小于末尾值'
      }
      if (to - from == to) {
        needNum = parseInt(to);
      } else {
        needNum = to - from;
      }
      if (num > needNum) {
        return
      } else {
        while (arr.length < num) {
          let ranNum = parseInt(Math.random() * needNum);
          if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum)
          }
        }
        return arr;
      }
    }

    function changeColorImpl(){
        var img_arr_1 = $(".card-1 ul li img");
        var bg_color = [];
        var len = img_arr_1.length;
        for (let i = 0; i < len; i++) {
            img_url = img_arr_1[i].src;
            // var bg_color;
            RGBaster.colors(img_url, {
                success: function (payload) {
                    // payload.dominant是主色，RGB形式表示
                    // payload.secondary是次色，RGB形式表示
                    // payload.palette是调色板，含多个主要颜色，数组
                    //   exclude: [ // 过滤色值
                    //       'rgb(255,255,255)', 
                    //       'rgb(0,0,0)' 
                    //     ],
                    bg_color.push(payload.secondary);
                    $(".card-1 ul li").eq(i).css("background-color", payload.secondary.colorHex() + "8e");
                    if (i == len - 1) {
                        var str = linear_gradient_color(bg_color, len, 45, "8e");
                        $(".card-1").css("background-image", str);
                        //   $("header").css("background-image",str);
                        //   $("body").css("background-image",str);
                        //   $(".sub-menu").css("background-image",str);
                        //   $(".li-item-has-children::after, .ok-login span::after").css("background-image",str);
                    }
                }
            });
        }
            bg_color2 = [];
    img_arr_2 = $(".card-2 ul li>div img");
    len = img_arr_2.length;
    for (let i = 0; i < len; i++) {
        img_url = img_arr_2[i].src;
        RGBaster.colors(img_url, {
            success: function (payload) {
                bg_color2.push(payload.secondary);
                img_arr_2.eq(i).css({
                    "box-shadow": "none",
                    "box-shadow": "0px 2px 31px 17px " + payload.dominant.colorHex()+"8e"
                });
                $(".card-2 ul li>div .num").eq(i).css({
                    "background": LightenDarkenColor(payload.dominant.colorHex(), -80),
                    "box-shadow": "none",
                    "box-shadow": "0px 2px 29px 5px " + LightenDarkenColor(payload.dominant.colorHex(), -50)
                });
                if (i == len - 1) {
                    var str = linear_gradient_color(bg_color2, len, 90, "8e");
                    $(".card-2").css("background", str);
                }
            }
        });
    }
    }

    

    function linear_gradient_color(arr, len, angle, opcity) {
        var str = "linear-gradient(+" + angle + "deg,";
        for (var j = 0; j < len - 1; j++) {
            str += arr[j].colorHex() + opcity + ",";
        }
        str += arr[len - 1].colorHex() + opcity + ")";
        return str;
    }

    function box_shadow() {

    }






});