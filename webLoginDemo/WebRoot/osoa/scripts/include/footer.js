/**
 * 页脚
 */
define("osoa/scripts/include/footer",function(require, exports, module){
	var page_id = "#include_footer";
	
	//初始化
	function init(param){
		alert("页脚被加载.....");
	}
	
	//绑定事件
	function bindPageEvent(){
		
	}
	
	//销毁页面，单页面时候要用
	function destroy(){
		
	}
	
	var footer = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	// 暴露对外的接口
	module.exports = footer;
});