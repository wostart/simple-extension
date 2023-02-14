$(function() {
    var currentIndex = 0;
            var $picUl = $(".pic-ul");
            var $dotLi = $(".dot-ul li");
            $picUl.css("width","600%");
            $picUl.find("li").css("width","16.666%");
            var width = $picUl.children().first().width();
            $picUl.append($picUl.find("li").first().clone());
            var len = $picUl.children().length;
            $dotLi.click(function(){
                currentIndex = $(this).index();
                $picUl.stop().animate({
                    left: -currentIndex * width
                },1000);
                $(this).addClass("active").siblings().removeClass("active");
            });

            var timer = setInterval(function(){
                currentIndex++;
                move();
            },2000);

            $(".banner").on({
                mouseover: function(){
                    clearInterval(timer);
                },
                mouseout: function(){
                    timer = setInterval(function(){
                        currentIndex++;
                        move();
                    },2000);
                }
            });

            $(".prev").click(function(){
                currentIndex--;
                move();
            });

            $(".next").click(function(){
                currentIndex++;
                move();
            });

            function move(){
                if(currentIndex == len){
                    $picUl.css({
                        left:0
                    });
                    currentIndex = 1;
                }
                if(currentIndex == -1){
                    $picUl.css({
                        left:-(len - 1) * width
                    });
                    currentIndex = len - 2;
                }

                $picUl.stop().animate({
                    left:-currentIndex * width
                },1000);

                if(currentIndex == len - 1){
                    $dotLi.eq(0).addClass("active").siblings().removeClass("active");
                }else{
                    $dotLi.eq(currentIndex).addClass("active").siblings().removeClass("active");
                }
            }
});