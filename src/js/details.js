//商品详情页面内加入购物车
$(function () {
    //获取input 里面的数量
    var num = 0;
    $("body").on("blur", ".form-control", function () {
        num = Number($("#exampleInputAmount").val());
    });
   // num = Number($("#exampleInputAmount").val());
    console.log(num);
    

    //用事件委派
    $(".main").on("click", ".add_cart", function (e) {
        e.preventDefault();
        var box = $(".main_right");
        //将当前信息保存到对象中
        var currentProduct = {
            id: box.children(".id").text(),
            //  price:box.children().children().children().children(".to_buy_up_right").children().text()
            price: $("span", ".to_buy_up_right").text(),
            title: $(".title", ".introduce").text(),
            img: box.children(".m_pic").children().attr("src"),
            amount: 1
        };
        // console.log("a");
        //配置cookie使用 自动json转换
        $.cookie.json = true;
        //先读取已有的购物车cookie
        var products = $.cookie("products") || [];
        //判断已选商品中是否当前商品被选中过
        var index = exist(currentProduct.id, products);


        if (index !== -1) {
            //如果购物车已经有该产品 则加上input的数量
            products[index].amount += num;
        } else {
            currentProduct.amount = num;
            products.push(currentProduct)
        }


        //使用cookie保存购物车数据
        $.cookie("products", products, { expires: 7, path: "/" });


        //保存成功后 添加抛物线效果
        var flyer = $(`<img style="width:50px; height:50px" src="${currentProduct.img}">`),
            offset = $(".top_cart").offset();

        flyer.fly({
            start: {
                left: e.pageX,
                top: e.pageY
            },

            end: {
                left: offset.left,
                top: offset.top,
                width: 0,
                height: 0
            }
        });



        //计算购物车的总数量
        let sum = $.cookie("products") || [];
        var cart_sum = 0;
        sum.forEach(function (cur) {
            cart_sum += Number(cur.amount);
        });
        //console.log(cart_sum);
        $("#top_cart span").text(cart_sum);
        // console.log(currentProduct);
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

});

