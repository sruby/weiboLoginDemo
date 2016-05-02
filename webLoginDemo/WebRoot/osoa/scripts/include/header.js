/**
 * 页头
 */
define("osoa/scripts/include/header",function(require, exports, module){
	var page_id = "#include_header";
	
	//初始化
	function init(param){
		alert("头部被加载.....");
	}
	
	//绑定事件
	function bindPageEvent(){
		
	}
	
	//销毁页面，单页面时候要用
	function destroy(){
		
	}
	
	var header = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	// 暴露对外的接口
	module.exports = header;
});