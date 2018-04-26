/*加载复用的头部尾部*/
$(function(){
	$(".headerbox").load("/html/include/header.html" , function(){

	});
	/*尾部*/
	$(".footerbox").load("/html/include/footer.html");
})