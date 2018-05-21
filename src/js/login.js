/*加载复用的头部与尾部资源*/
$(function(){
	//加载头部
	//方法一
	/*$.ajax({
		type : "get",
		url : "/hw_pc/src/html/include/header.html",
		success:function(data){
			$(".headerbox").html(data);
		}
	});*/
//方法二
	/*$.get("/hw_pc/src/html/include/header.html",function(data){
		$(".headerbox").html(data);
	})*/
	//方法三
	$(".headerbox").load("/html/include/header.html",function(){
		//加载完毕后 绑定搜索建议提示事件
		$(".search :text").on("keyup", function(){
			let val = $(this).val(),// 当前文本框的值
				url = `https://suggest.taobao.com/sug?callback=?&q=${val}&code=utf-8`
			$.getJSON(url,function(data){
				// console.log(data); 
				let html = "";
				data.result.forEach(function(curr){
					html += `<div>${curr[0]}</div>`;
				})
				// $(".search").append(html);
				$(".suggest").html(html);
			});
		});
		// 鼠标移入显示二级菜单
		/*$("ul.megamenu>li:lt(3):gt(0)").hover(function(){
			//mouseenter
			$("#hf_list").show();
		},function(){
			//mouseleave
			$("#hf_list").hide();
		});
		$("#hf_list").hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		});*/
	});
	/*加载尾部*/
	$(".footerbox").load("/html/include/footer.html");


	
	
});


//注册会员用cookie保存

$(function(){
	$("#register,#identity").on("click",function(){
		// 将注册信息保存在对象中
		var logOnMessage = {
			email: $(".b_email").text()
			
		};
		console.log(logOnMessage.email)
		//配置cookie 使用自动转换
		$.cookie.json = true;

	});
});

