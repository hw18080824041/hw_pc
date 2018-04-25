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
	/*加载尾部*/
	$(".footerbox").load("/html/include/footer.html");
});




/*从cookie中读取数据 渲染*/
$(function(){
//使用jquery.cookie.js 插件
	$.cookie.json = true;
	//读取所有cookie中保存的购物车数据
	let _products = $.cookie("products") || [];
	if (_products.length === 0){//说明购物车没有数据
		$(".cart_empty").show()
						.next(".prod_list").hide();
		return;				
	}
	//显示读取的cookie 购物车数据
	let html = template("prod_list_temp",{products:_products});
	/*console.log(html);*/
	$(".cart_empty").hide()
					.next(".prod_list").show()
					.html(html);


	/*删除*/
	$(".cart_body").on("click","a.del",function(){
		//当前待删除商品的编号  在数组中的索引
		let _id = $(this).data("id"),
			_index = exist(_id,_products);
		//从数组中删除_index索引处的元素
		_products.splice(_index,1);
		//从cookie中移出部分数据 从dom数中删除节点
		$.cookie("products",_products,{expires:7,path:"/"});
		$(this).parents("tr").remove();
		if (_products.length === 0){//说明购物车没有数据
		$(".cart_empty").show()
						.next(".prod_list").hide();
	}
	//计算合计
		calcTotal();
	});

	/*数量加减*/
	$(".cart_body").on("click",".add,.minus",function(){
		//获取修改后的数量
		let _id = $(this).data("id");
		//获取数组中的元素下标
		let _index = exist(_id, _products);
		/*数量加减*/
		if ($(this).is(".add"))
			_products[_index].amount++;
		else {
			if(_products[_index].amount <= 1)
				return;
			_products[_index].amount--;
		};
	
/*覆盖保存coolie*/
	$.cookie("products",_products,{expires:7,path:"/"});
	//显示修改结果
	$(this).siblings(".amount").val(_products[_index].amount);
	//显示小计
	let _sub = _products[_index].price * _products[_index].amount;
	$(this).parent().next().text(_sub.toFixed(2));
	//计算合计
		calcTotal();
	});
/*输入修改*/
	$(".cart_body").on("blur",".amount",function(){
		//获取修改后的数量的商品id
		let _id = $(this).data("id");
		// console.log(_id);
		//获取数组中的元素下标
		let _index = exist(_id, _products);
		//console.log(_index);
		/*判断输入数据的格式*/
		if(!/^[1-9]\d*$/.test($(this).val())){
			$(this).val(_products[_index].amount);
			return;
		}
		
		/*修改数组中对应元素的数量*/
		_products[_index].amount = $(this).val();
	
/*覆盖保存coolie*/
	$.cookie("products",_products,{expires:7,path:"/"});
	//显示修改结果
	//$(this).siblings(".amount").val(_products[_index].amount);
	//显示小计
	let _sub = _products[_index].price * _products[_index].amount;
	$(this).parent().next().text(_sub.toFixed(2));
//计算合计
		calcTotal();
	});
/*全选*/
	$("#ck_all").on("click",function(){
		/*获取当前全选的选中状态*/
		let _status = $(this).prop("checked");
		//设置所有商品行前复选框选中状态
		$(".ck_prod").prop("checked",_status);
		//计算合计
		calcTotal();
	});

	$(".ck_prod").on("click",function(){
		let _status = $(".ck_prod:checked").length === _products.length;
		$("#ck_all").prop("checked",_status);
		//计算合计
		calcTotal();
	});
	// 找出 id 对应商品在 prodcuts 中下标
	function exist(id,products){
 			var existIndex = -1;
 			$.each(products,function(index,prod){
	 			if (prod.pid == id) {
	 				existIndex = index;
	 				return false;
	 			}
 			});
 		return existIndex;
 		}
 		/*计算合计*/
 		function calcTotal(){
 			let sum = 0;
 			$(".ck_prod:checked").each(function(index,element){
 				sum += Number($(this).parents("tr").find(".sub").text());
 			});
 			$(".total").text("$" + sum.toFixed(2));
 		}
});

