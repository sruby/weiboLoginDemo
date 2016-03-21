/**
 * cookie获取测试
 */
define("cookieTest",function(require, exports, module){
	function init(){
		alert(5);
		$.post("/servlet/hn1/CookieHelperTest",function(){
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
