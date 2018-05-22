//依赖配置
/* require(["config"],function(){
	require(["jquery","template","cookie","fly","loadHF"],function(){

	});
}); */


/*加载复用的头部与尾部资源*/
$(function () {
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

});
//异步加载产品
$(function () {
	/* $.getJSON("mock/tshirts.json", function (data) {
		let html = "";
		data.res_body.products.forEach(function (prod) {
			html += `<li><a href="/html/detail.html"><img src="${prod.img}" class="img-responsive" alt=""/></a>
			<span class="price">${prod.price.toFixed(2)}</span>
			<p class="title">${prod.title}</p>
			<p class="add_cart"><a href="javascript:void(0)" >${prod.addcart}</a></p>
			<span class = "id" style="display:none">${prod.pid}</span>
		</li>`;
		});
		$(".con1_wrap").prepend(html);
	}); */

	$.getJSON("/mock/tshirts.json",function(data){
	//使用artTemplate 渲染
		let html = template("con1_prod_temp",{products :data.res_body.products})
		// console.log(html);
		//显示
		$(".con1_wrap").prepend(html);

	})

	$.getJSON("/mock/remai.json", function (data) {
		//使用artTemplate渲染
		let html = template("prod_temp", { products: data.res_body.products })
		//console.log(html);
		$(".con2_bottom").prepend(html);
	});

});

/* ********************************* */
/* 首页点加入购物车 */
/* ******************************** */
/*为加入购物车绑定点击事件 用事件委派""  */
$(function () {
	$(".con1_wrap,.con2_wrap").on("click", ".add_cart", function (e) {
		e.preventDefault();
		//获取当前点击加入购物车所在的大盒子
		var box = $(this).parent();
		  
		var sum =$("#top_cart span").text();
		sum++;
		$("#top_cart span").text(sum);
		
		//将当前信息保存到对象中
		var currentProduct = {
			id: box.children(".id").text(),
			price: box.children(".price").text(),
			title: box.children(".title").text(),
			img: box.children().children(".img-responsive").attr("src"),
			amount: 1,
			sum :$("#top_cart span").text()
		};
		
		//console.log(box);

		//配置cookie 使用 自动json转换

		$.cookie.json = true;
		
		//先读取已有的购物车cookie
		var products = $.cookie("products") || [];
		//判断已选商品中是否当前商品被选中过
		//console.log("a");
				
		var index = exist(currentProduct.id, products);
		//console.log(index);
		
		 if (index !== -1) {
			products[index].amount++;
		} else {
			products.push(currentProduct);
		} 
		//使用cookie保存购物车数据
		$.cookie("products",products,{expires:7,path:"/"});
		//保存成功 则添加抛物线效果
		var flyer = $(`<img style="width:50px; height:50px" src="${currentProduct.img}">`),
			offset = $(".top_cart").offset();
			
		flyer.fly({
			start :{
				left : e.pageX,
				top : e.pageY
			},
			
			end : {
				left:offset.left,
				top:offset.top,
				width:0,
				height:0
			}
		});

	});

	//判断某商品是否被选购
	function exist(id, products) {
		for (var i = 0, len = products.length; i < len; i++) {
			if (products[i].id == id) {
				return i;
			}
		}
		return -1;
	};
//
	$(".con1_wrap").on("click","li",function(){
		  /* 使用areTemplate渲染 */
		  var that = this
		  $.getJSON("/mock/detail.json",function(data){
			console.log(data)
			var prod = data.res_body.products;
			prod.forEach(function(cur){
				if($(that).children("a").children("img").src == cur.img){
					let html = template("detail_temp",{products:cur});
					//显示
					$(".main").prepend(html);
				}
			})
			
			
			
		});
	})

});

//