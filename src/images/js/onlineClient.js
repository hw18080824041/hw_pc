// JavaScript Document
(function($) {
    var imgPath = "../themes/shiseido/images/onlineClient.png";
    var linkTxt = "javascript:popUp()";
    var offsetTOP = 300;
    var FloatMenu = document.createElement("DIV");
    FloatMenu.style.cssText = "position:absolute;right:0;top:" + offsetTOP + "px;z-index:99999;";
    //	FloatMenu.innerHTML = "<a href='"+linkTxt+" 'style='text-align:right;display:block;'><img src='"+imgPath+"' /><br/></a><img src='../themes/shiseido2/images/erweima.png' />";
    FloatMenu.innerHTML = "<ul id='backTop'>" +
        "<li class='call'><span>电话咨询</span><div class='phone'>" +
        "<img src='../themes/shiseido3/images/call.png' />" +
        " <p>咨询热线</p>" +
        "<p>400-821-6076</p>" +
        "</div></li>" +
        "<li class='wxcode'><span>关注我们</span><div>扫一扫<br/>  即刻关注官方微信<img src='../themes/shiseido3/images/wxcode.jpg' /></div></li>" +
        "<li><a href='javascript:popUp()'><img src='../themes/shiseido3/images/ChatIcon.png'><p>在线客服</p></a></li>" +
        "<li id='to_top'><a><img src='../themes/shiseido3/images/ArrowUp.png'></a></li></ul>"
    document.body.appendChild(FloatMenu);

    var stmnGAP2 = 121;
    var stmnGAP1 = 198;
    var stmnScrollSpeed = 10;
    var stmnActivateSpeed = 80;

    var RefreshStaticMenu = function() {
        var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;
        stmnStartPoint = parseInt(FloatMenu.style.top, 10);
        stmnEndPoint = document.body.scrollTop || document.documentElement.scrollTop;
        stmnEndPoint += offsetTOP;
        if (stmnStartPoint != stmnEndPoint) {
            stmnScrollAmount = Math.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
            FloatMenu.style.top = parseInt(FloatMenu.style.top, 10) + ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount : stmnScrollAmount) + "px";
            stmnRefreshTimer = stmnScrollSpeed;
        } else {
            stmnRefreshTimer = stmnActivateSpeed;
        }
        setTimeout(function() { RefreshStaticMenu() }, stmnRefreshTimer);
    }
    RefreshStaticMenu();
    $(".call").on("mouseover", function() {
        $(this).find(".phone").show();
    })
    $(".call").on("mouseout", function() {
        $(this).find(".phone").hide();
    })
    $(".wxcode").on("mouseover", function() {
        $(this).find("div").show();
    })
    $(".wxcode").on("mouseout", function() {
            $(this).find("div").hide();
        })
        //	$("#to_top").on("click",function(){
        //		$('body').animate({scrollTop:0},1000);
        //	})
    var oTop = document.getElementById("to_top");
    oTop.onclick = function() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

})(jQuery)

function popUp() {
    props = window.open("http://livechat.shiseido.cn/livechat/chat/clientchat_SHISEIDO","poppage","toolbars=0, scrollbars=0, location=0, statusbars=0, menubars=0, resizable=1, width=1020, height=560, left = 200px, top = 100");
}