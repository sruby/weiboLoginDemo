/**
 * cookie获取测试
 * demo/front/scripts/cookieTest为相对webroot的路径,如果写错误,会无法执行其中的代码
 */
define("demo/front/scripts/cookie/cookieTest",function(require, exports, module){
	function init(){
		$.post("/servlet/hn1/CookieHelperTest",function(data){
			var test = $.getStorage("test");
			console.log(test);
		});
	}
	
	
	function bindPageEvent(){
	}
	
	//页面销毁
	function destroy(){
	}
	
	var startup = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy,
	};
	// 暴露对外的接口
	module.exports = startup;
});
