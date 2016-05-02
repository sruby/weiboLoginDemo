/**
 * 首页
 */
define("osoa/scripts/index",function(require, exports, module){
	var pageId = "#index",
	    fxckhService = require("fxckhService").getInstance(),
	    layerUtils = require('layerUtils');
	
	//初始化
	function init(param){
		alert("页体逻辑初始化....");
	}
	
	//绑定事件
	function bindPageEvent(){
		$(pageId + " #submit").bindEvent(function(){
			var str = $(pageId + " #userName").checkValid ("用户名", "NotEmpty");
			if($.string.isNotEmpty(str)){
				layerUtils.iAlert(str,-1);
				return;
			}
			str = $(pageId + " #password").checkValid ("密码", "NotEmpty");
			if($.string.isNotEmpty(str)){
				layerUtils.iAlert(str,-1);
			    return;
			}
			var userName = $(pageId + " #userName").val();
			var password = $(pageId + " #password").val();
			//登陆回调函数
			var loginComplate = function(resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					var userInfo = $.objectToString(result,",",":");
					layerUtils.iAlert("登陆成功:["+userInfo+"]",0,function(){
						$.redirect("user/success");
					});
				}else{
					layerUtils.iAlert(resultVo.getErrorInfo(),-1);
				}
			};
			fxckhService.testLogin(loginComplate,userName,password);
		});
	}

	//销毁页面，单页面时候要用
	function destroy(){
		fxckhService.destroy();
	}
	
	var index = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	// 暴露对外的接口
	module.exports = index;
});