/**
 * 服务类
 */
define("osoa/scripts/service/fxckhService",function(require, exports, module) {
	function FxckhService(){
		this.service = new $.domain.Service();
	}
	
	/**
	 * 功能：测试登陆
	 * 参数: callBackFunc:回调函数
	 *       userName : 用户名
	 *       password : 密码
	 */
	FxckhService.prototype.testLogin = function(callBackFunc,userName,password){
		var paraMap = {};
		paraMap["funcNo"] = "1000000";
		paraMap["userName"] = userName;
		paraMap["password"] = password;
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl($.gconfig.global.server);
		reqParamVo.setReqParam(paraMap);
		this.service.invoke(reqParamVo,callBackFunc,false);
	};
	
	/**
	 * 功能：测试查询
	 * 参数: callBackFunc:回调函数
	 */
	FxckhService.prototype.testQeuryList = function(callBackFunc){
		var paraMap = {};
		paraMap["funcNo"] = "1000001";
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl($.gconfig.global.server);
		reqParamVo.setReqParam(paraMap);
		this.service.invoke(reqParamVo,callBackFunc);
	};
	
	/**
	 * 释放操作
	 */
	FxckhService.prototype.destroy = function(){
		this.service.destroy();
	};
	
    /**
	 * 实例化对象
	 */
	function getInstance(){
		return new FxckhService();
	}
	
	var fxckhService = {
		"getInstance" : getInstance
	};
	
	// 暴露对外的接口
	module.exports = fxckhService;
});