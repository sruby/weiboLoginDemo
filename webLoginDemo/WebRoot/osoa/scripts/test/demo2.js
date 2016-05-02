/**
 * 首页
 */
define("osoa/scripts/test/demo2",function(require, exports, module){
	var pageId = "#test_demo2",
	    fxckhService = require("fxckhService").getInstance(),
	    layerUtils = require('layerUtils');
	
	//初始化
	function init(param){
		alert("osoa/scripts/test/demo2.js模块初始化成功....");
	}
	
	//绑定事件
	function bindPageEvent(){
		
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