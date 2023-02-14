$(function() {
    // var box = "<div class='card-col>"+
    var id = parseInt(getUrlParam("id"));
    var arr = [];
    // arr[0] = [6, 1, 4, 14, 11, 3, 5, 12, 15, 13, 10, 7, 0, 9, 8, 2];
    // arr[1] = [3, 5, 2, 9, 13, 1, 10, 11, 14, 0, 7, 12, 15, 4, 6, 8];
    // arr[2] = [1, 4, 6, 11, 13, 5, 12, 8, 9, 2, 14, 3, 10, 15, 7, 0];
    // arr[3] = [2, 0, 15, 11, 9, 7, 13, 6, 3, 10, 5, 12, 14, 8, 4, 1];
    // arr[4] = [6, 11, 2, 9, 12, 3, 0, 7, 8, 13, 4, 15, 1, 14, 5, 10];
    // arr[5] = [8, 5, 15, 13, 12, 11, 2, 1, 9, 10, 6, 7, 3, 14, 4, 0];
    // var default_arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    
    // "<img src="+data+
    $.ajax({
        url: './php/all_extension.php',
        method: 'POST',
        datatype: 'json',
        success: data => {
            var arr = selectRandom(data.length,0,data.length);
           switch (id) {
               case 1:
               case 2:
               case 3:
               case 4:
               case 5:
               case 6:
                   for(var i=0; i<arr.length; i++) {
                    $(".card-box").append(createDiv(arr[i]+1,data[arr[i]].name,data[arr[i]].detail));
                   }
                   break;
               default:
                for(var i = 0; i < data.length; i++){
                    $(".card-box").append(createDiv(i+1,data[i].name,data[i].detail));
                    // console.log(data);
                }
                   break;
           }
           
            // $(".card-box>div").addClass("card-col");
            changeBgColor();
        },
        error: err => {
            ;
        }
    });
    
    function changeBgColor(){
        var img_arr_1 = $(".card-col img");
        var color;
        var len = img_arr_1.length;
        for (let i = 0; i < len; i++) {
            img_url = img_arr_1[i].src;
            RGBaster.colors(img_url, {
                success: function (payload) {
                    console.log(payload);
                    color = LightenDarkenColor(payload.secondary.colorHex(), -100)
                    $(".card-col").eq(i).css("background-color", color);
                }
            });
        }
    }

    function createDiv(id,name,detail){
        var str = "";
        str+="<div class='card-col'>";
        str+="<a href='detail.html?id="+id+"'>"
        str+="<img src='img/cover_pic/"+id+".jpg'>";
        str+="<div class='txt'>";
        str+="<p>"+name+"</p>";
        str+="<p>"+detail+"</p>";
        str+="</div>";
        str+="</a>"
        str+="</div>";
        return str;
    }

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

      function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
});