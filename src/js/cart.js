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
	$(".headerbox").load("/html/include/header.html", function () {
		//加载完毕后 绑定搜索建议提示事件
		$(".search :text").on("keyup", function () {
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
	});
	/*加载尾部*/
	$(".footerbox").load("/html/include/footer.html");






	/*从cookie中读取数据 渲染*/
	$(function () {
		//使用jquery.cookie.js 插件
		$.cookie.json = true;
		//读取所有cookie中保存的购物车数据
		let _products = $.cookie("products") || [];
		if (_products.length === 0) {//说明购物车没有数据
			$(".cart_empty").show()
				.next(".prod_list").hide();
			return;
		}
		//显示读取的cookie 购物车数据 用artTemplate来渲染
		let html = template("prod_list_temp", { products: _products });
		//console.log(html);

		//显示到表格中
		$(".cart_empty").hide()
			.next(".prod_list").show();
		$("tbody").html(html);


		/* ****************************** */
		/* 删除购物车的商品  事件委派 */
		/* ***************************** */
		$("#tbody").on("click", ".del", function () {
			// 当前删除商品所在行，
			var row = $(this).parents("tr");
			//获取当前删除商品的id
			var _id = row.data("id")
			//在数组中的下标
			var index = exist(_id, _products);
			//从数组中删除
			_products.splice(index, 1);
			//再存回到cookie中
			$.cookie("products", _products, { expires: 7, path: "/" });
			//再从dom中删除节点
			row.remove();
			//计算合计
			calcTotalPrice();
			//计算购物车的总数量
			cart_total();





		});

		/* 修改数量  加减+-*/
		$("#tbody").on("click", ".minus,.add", function () {
			//获取行
			var row = $(this).parents("tr");
			//获取id
			var _id = row.data("id");
			//数组中的下标
			var index = exist(_id, _products)
			//使用变量暂存index索引处
			var prod = _products[index];
			//修改数量
			if ($(this).is(".add"))
				prod.amount++;
			else if ($(this).is(".minus")) {
				prod.amount--;
			}
			// 修改cookIe
			$.cookie("products", _products, { expires: 7, path: "/" });
			//显示修改后的数量与小计
			row.find(".amount").val(prod.amount);
			row.find(".sub").text((prod.price * prod.amount).toFixed(2));
			//计算合计
			calcTotalPrice();
			//计算购物车的总数量
			cart_total();
		});
		//修改 input内数量 
		$("#tbody").on("blur", ".amount", function () {
			// 行 
			var row = $(this).parents("tr");
			// id
			var _id = row.data("id");
			// index
			var index = exist(_id, _products);
			//商品
			var prod = _products[index];
			//获取输入值
			var inputAmount = $(this).val();
			//判断输入值
			if (!/^[1-9]\d*$/.test(inputAmount)) {
				$(this).val(prod.amount);
				return;
			}
			//将商品的数量属性值修改为当前输入值
			prod.amount = inputAmount;
			//然后保存在cookie中
			$.cookie("[products", _products, { expires: 7, path: "/" });
			//显示小计
			row.find(".sub").text((prod.price * prod.amount).toFixed(2));
			//计算合计
			calcTotalPrice();
			//计算购物车的总数量
			cart_total();
		});
		/* ************ */
		/* 全选 部分选中  */
		/* ***************** */
		$(".ck_all").click(function () {
			//获取当前全选 复选框选中状态
			var status = $(this).prop("checked");
			//设置商品当前复选框与全选状态一致
			$(".ck_prod").prop("checked", status);
			//计算合计
			calcTotalPrice();
			//计算购物车的总数量
			cart_total();

		});
		//判断已勾选框的商品行前复选框个数与_products数组长度是否一致，确定是否全选
		$(".ck_prod").click(function () {
			var b = $(".ck_prod:checked").length === _products.length;
			$(".ck_all").prop("checked", b);
			//计算合计
			calcTotalPrice();
			//计算购物车的总数量
			cart_total();
		});


		//判断指定的id的商品在数组中的下标
		function exist(id, products) {
			for (var i = 0, len = products.length; i < len; i++) {
				if (products[i].id == id) {
					return i;
				}
			}
			return -1;
		};

		//计算购物车的总数量
		function cart_total() {
			var cart_sum = 0;
			$("tbody tr").each(function () {
				cart_sum += Number($(this).find(".amount").val());
				console.log(cart_sum);
			});
			$("#top_cart span").text(cart_sum);
		};
		


		//计算合计
		function calcTotalPrice() {
			var total = 0;
			//遍历jQuery对象中的每个DOM元素
			$(".ck_prod:checked").each(function (index, element) {
				total += Number($(this).parents("tr").find(".sub").text());
			});
			// 显示合计金额
			$(".total_pay").text(total.toFixed(2));
		};
		calcTotalPrice();
	});


});

