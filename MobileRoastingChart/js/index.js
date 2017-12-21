/*
* Zepto跟jq不用，zepto是分版块来封装的，所有每一种方法对应的版块不同，如ajax form ie fx selector touch
* 所以使用之前要将 zepto常用的版块封装在一起，才能使用多种方法.
* 详情见\就业班课程资料\移动web\伍湖老师版移动web\第三天\03-day{zepto的使用,移动端的点击事件,封装tap事件,商品分类页面左侧栏滑动和点击操作}\加密视频
* */

$(function () {
    /*获取轮播图元素*/
    var banner=$(".jd_banner");
    /*获取轮播图的宽度*/
    var bannerWidth=banner.width();
    /*获取图片ul盒子*/
    var imgBox=banner.find("ul:first-of-type");
    /*获取点标记*/
    var indicators=banner.find("ul:eq(1)").find("li");
    /*获取首尾两张图片*/
    var first=imgBox.find("li:first-of-type");
    var last=imgBox.find("li:last-of-type");
    /*将两张图片添加到首尾位置  first.clone():将first复制一份*/
    imgBox.append(first.clone());
    last.clone().insertBefore(first);

    /*设置图片ul盒子的宽度*/
    var lis=imgBox.find("li");
    var count=lis.length;
    imgBox.width(count*bannerWidth);
    /*设置li标签的宽度*/
    lis.each(function (index,value) {    //index代表的是li的索引   value代表的是lis[i],也就是li元素
        $(lis[index]).width(bannerWidth);
    });
    /*设置默认偏移*/
    imgBox.css("left",-bannerWidth);
    /*定义图片索引*/
    var index=1;

    /*图片轮播的动画效果*/
    var imgAnimation=function () {
        imgBox.animate(
            {"left":-index*bannerWidth},
            600,
            "ease-in-out",
            function () {//动画执行完毕之后的回调
                /*判断当前索引位置是否是最后一张或者第一张*/
                if(index==count-1){//如果是最后一张
                    index=1;
                    /*让它瞬间偏移到索引1的位置--非过渡*/
                    imgBox.css("left",-index*bannerWidth);
                }else if(index==0){//如果是第一张
                    index==count-2;
                    /*让它瞬间偏移到真正的最后一张的位置--非过渡*/
                    imgBox.css("left",-index*bannerWidth);
                }
                /*设置点标记*/
                /*移除所有点的样式，再给当前的index添加样式，因为轮播图真正的第一张的index是1，而点点的第一个索引是0开始的，所以要-1*/
                indicators.removeClass("active").eq(index-1).addClass("active");
            }
        );
    };
    /*自动播放，开启定时器*/
    var timerId=setInterval(function () {
        index++;  //下一张
        /*在zepto中直接使用animate函数来实现
            * 参数1.需要添加动画效果的样式--对象
            * 参数2.动画的耗时
            * 参数3.动画的速度函数 animation-timing-function
            * 参数4.当前动画执行完毕之后的回调*/
        imgAnimation();  //调用图片轮播函数
    },2000);


    /*添加手指触摸滑动事件*/
    /*在谷歌浏览器的模拟器中，无法正确的触发swipe手指触摸相关事件，但是可以触发tap事件，可以用遨游*/
    /*左滑动*/
    imgBox.on("swipeLeft",function () {
        /*手指触摸时，停止自动播放*/
        clearInterval(timerId);
        index++;
        imgAnimation()
    });
    /*右滑动*/
    imgBox.on("swipeRight",function () {
        /*手指触摸时，停止自动播放*/
        clearInterval(timerId);
        index--;
        imgAnimation()
    })
})