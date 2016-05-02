define("osoa/scripts/sinaLogin/login",function(require, exports, module){
var page_id = "#sinaLogin_login";
var loginService = require("loginService").getInstance();
	//初始化
	function init(param){
//		alert("页面初始化.....");
	}
	
	//绑定事件
	function bindPageEvent(){
		//微博登录点击事件
		$(page_id+" #sinaLogin").bindEvent(function(){
			var callBackFunc = function (resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					var userInfo = $.objectToString(result,",",":");
					alert("授权成功:["+userInfo+"]",0,function(){
//						$.redirect("user/success");//跳转到需要的页面
					});
				}else{
					alert(resultVo.getErrorInfo(),-1);
				}
				alert("errorNo: "+resultVo.getErrorNo()+" errorMsg: "+resultVo.getErrorMsg()+" yijingfanhui le ");
			};
			loginService.singlogin(callBackFunc);
		});
	}
	
	//销毁页面，单页面时候要用
	function destroy(){
		
	}
	
	var login = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	// 暴露对外的接口
	module.exports = login;
});