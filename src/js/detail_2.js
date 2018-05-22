
$(function () {

    /* 加载复用头部尾部资源 */
    $(".headerbox").load("/html/include/header.html");
    /* 加载复用尾部尾部资源 */
    $(".footerbox").load("/html/include/footer.html");



    $.getJSON("/mock/commodity/commodity2.json", function (data) {
        var prod = data.res_body.products;
        let html = template("detail_temp", { products: data.res_body.products });
        $(".main").prepend(html);
    });


});
