/* 加载头部尾部模块 */
define(["jquery"], function($){
	$(function(){
		$.ajax("/html/include/header.html").done(function(data){
			$(".header").html(data);
		}).done(function(){
			// 加载完毕后，绑定搜索建议提示事件
			$(".search :text").on("keyup", function(){
				let val = $(this).val(), // 当前文本框中的值
					url = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`; // jsonp URL
				// 使用 $.getJSON 来实现 jsonp 跨域
				$.getJSON(url, function(data){
					let html = "";
					data.result.forEach(function(curr){
						html += `<div>${curr[0]}<div>`;
					});
					$(".suggest").html(html);
				});
			});
		});

		$(".footer").load("/html/include/footer.html");
	});
});