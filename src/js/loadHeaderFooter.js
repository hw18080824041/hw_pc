/* 加载头部尾部模块 */

$(function () {
	$(".headerbox").load("/html/include/header.html", function () {
		//加载完毕后 绑定搜索建议提示事件
		$(".search :text").on("keyup", function () {
			//输入时让suggest显示
			$(".suggest").css("display", "block")
			//console.log("a");

			$(".suggest").css("display", "block");
			let val = $(this).val(),// 当前文本框的值
				url = `https://suggest.taobao.com/sug?callback=?&q=${val}&code=utf-8`
			$.getJSON(url, function (data) {
				// console.log(data); 
				let html = "";
				data.result.forEach(function (curr) {
					html += `<div>${curr[0]}</div>`;
				})
				// $(".search").append(html);
				$(".suggest").html(html);
			});
			

		});
		//选择更改搜索框的值
		$(".suggest").on("click",function(e){
			var asd = e.target;
			console.log(asd);
			var value = $(asd).text();
			console.log(value);
			$(".nav_txt").val(value);
			//选择后 隐藏盒子
			$(".suggest").css("display", "none");
		})


		//收缩失去焦点隐藏盒子

		 $(".search :text").on("blur", function () {
		 	$(".suggest").css("display", "none");
		 });

		// 鼠标移入显示二级菜单
		$("ul.megamenu>li:lt(3):gt(0)").hover(function () {
			//mouseenter
			$("#hf_list").show();

		}, function () {
			//mouseleave
			$("#hf_list").hide();

		});
		$("#hf_list").hover(function () {
			$(this).show();

		}, function () {
			$(this).hide();

		});


		//登录 显示 用cookie
		$.cookie.json = true;
		let user = $.cookie("information");
		if (user) {
			$(".login_register").html(`<a href="/html/login.html">退出</a>
				<a href="#">欢迎您 : ${user[0].email}</a>
														`);
		}
		//计算购物车的总数量
		let sum = $.cookie("products")||[];
			
		
		var cart_sum = 0;
		
		sum.forEach(function (cur) {
			cart_sum += Number(cur.amount);
		});
		//console.log(cart_sum);
		$("#top_cart span").text(cart_sum);
		



	});
	/*加载尾部*/
	$(".footerbox").load("/html/include/footer.html");
});
