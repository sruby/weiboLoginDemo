/**
 * 首页
 */
define("osoa/scripts/user/success",function(require, exports, module){
	var pageId = "#user_success",
	    fxckhService = require("fxckhService").getInstance(),
	    layerUtils = require('layerUtils');
	
	//初始化
	function init(param){
		alert("页体逻辑初始化....");
	}
	
	//绑定事件
	function bindPageEvent(){
		$(pageId + " #demo0").bindEvent(function(){
			//回调函数
			var queryComplate = function(resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					$.getJuicerTemplateHtmlContent("test/demo0",function(data){
						layerUtils.iAlert(data,0);
					},result,true,5);
				}else{
					layerUtils.iAlert(resultVo.getErrorInfo(),-1);
				}
			};
			fxckhService.testQeuryList(queryComplate);
		});
		$(pageId + " #demo1").bindEvent(function(){
			//回调函数
			var queryComplate = function(resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					$.getModelHtmlContent("test/demo1",function(data){
						layerUtils.iAlert(data,0);
					},result,["age","name","lover","sex"],5);
				}else{
					layerUtils.iAlert(resultVo.getErrorInfo(),-1);
				}
			};
			fxckhService.testQeuryList(queryComplate);
		});
		$(pageId + " #demo2").bindEvent(function(){
			var callBackFunc = function(data){
				layerUtils.iAlert(data,0);
			};
			$.getHtmlContent("test/demo2",callBackFunc);
		});
		$(pageId + " #demo3").bindEvent(function(){
			var callBackFunc = function(){
				layerUtils.iAlert("加载成功！",0);
			};
			$(pageId+" #displayContent").loadHtmlContent("test/demo2",{},callBackFunc);
		});
		$(pageId + " #demo4").bindEvent(function(){
			$(pageId+" #displayContent").loadPageContent(null,"test/demo2");
		});
		$(pageId + " #demo5").bindEvent(function(){
			//回调函数
			var queryComplate = function(resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					$(pageId+" #displayContent").loadModuleHtmlContent("test/demo1",function(){
						layerUtils.iAlert("加载成功！",0);
					},result,["age","name","lover","sex"],5);
				}else{
					layerUtils.iAlert(resultVo.getErrorInfo(),-1);
				}
			};
			fxckhService.testQeuryList(queryComplate);
		});
		$(pageId + " #demo6").bindEvent(function(){
			//回调函数
			var queryComplate = function(resultVo){
				if(resultVo.getErrorNo() == 0){
					var result = resultVo.getResults();
					$(pageId+" #displayContent").loadJuicerTemplateHtmlContent("test/demo0",function(){
						layerUtils.iAlert("加载成功！",0);
					},result,true,5);
				}else{
					layerUtils.iAlert(resultVo.getErrorInfo(),-1);
				}
			};
			fxckhService.testQeuryList(queryComplate);
		});
		$(pageId + " #demo7").bindEvent(function(){
			$.setSessionStorage ("name","刘宝");
			layerUtils.iAlert("加载成功！",0);
		});
		$(pageId + " #demo8").bindEvent(function(){
			var str = $.getStorage ("name");
			layerUtils.iAlert("session:"+str,0);
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