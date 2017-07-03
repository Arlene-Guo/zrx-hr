$(function(){
	if (firefoxAdd) {
		$("body header div:first,body footer div:first").removeClass("breadcrumb-fixed-unfull");
	};

	//测试环境面包屑上加入标志
	var reg = /http:\/\/boss.tuniu.org\//g;
	if(!reg.test(projectUrl)) {
		if($("ul.breadcrumb li") && $("ul.breadcrumb li").length > 0) {
			$("ul.breadcrumb li").eq(0).prepend("<span style='color: red'>（测试环境）</span>")
		}
	}
})