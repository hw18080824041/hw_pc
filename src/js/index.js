/*require(["config"], function(){
	require(["jquery", "template", "loadHF"], function(){
		
	});
});*/


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
		$("ul.megamenu>li:lt(3):gt(0)").hover(function(){
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

		});
	});
				//$("#bannerBox").FtCarousel(0,true,1000,true,true);
	/*加载尾部*/
	$(".footerbox").load("/html/include/footer.html");
});
 //异步加载产品
 $(function(){
	$.getJSON("mock/tshirts.json",function(data){
		let html = "";
		data.res_body.products.forEach(function(prod){
			html += `<a href="single.html"><li><img src="${prod.img}" class="img-responsive" alt=""/>
			<span class="btn5">$${prod.price.toFixed(2)}</span>
			<p>${prod.title}</p>
			<p class="add_cart">${prod.addcart}</p>
			<span class = "id" style="display:none">${prod.pid}</span>
		</li></a>`;
		});
		$(".con1_wrap").prepend(html);
	});

	/*$.getJSON("/mock/tshirts.json",function(data){
	//使用artTemplate 渲染
		let html = template("prod_temp",{products :data.res_body.products})
		// console.log(html);
		//显示
		$(".con1_wrap").prepend(html);

	})*/

	$.getJSON("/mock/remai.json",function(data){
	//使用artTemplate渲染

	let html = template("prod_temp",{products : data.res_body.products })
	//console.log(html);
	$(".con2_bottom").prepend(html);
	});

});