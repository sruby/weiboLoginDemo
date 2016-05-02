/**
 * 服务类
 */
define("osoa/scripts/service/loginService",function(require, exports, module) {
	function LoginService(){
		this.service = new $.domain.Service();
	}
	
	/**
	 * 功能：测试登陆
	 * 参数: callBackFunc:回调函数
	 *       userName : 用户名
	 *       password : 密码
	 */
	LoginService.prototype.singlogin = function(callBackFunc){
		//需要传参数的话就在这里传
//		var paraMap = {};
//		paraMap["funcNo"] = "2000000";
//		paraMap["userName"] = userName;
//		paraMap["password"] = password;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl($.gconfig.global.server);
//		reqParamVo.setReqParam(paraMap);
		this.service.invoke(reqParamVo,callBackFunc,false);
	};
	
	/**
	 * 功能：测试查询
	 * 参数: callBackFunc:回调函数
	 */
//	LoginService.prototype.testQeuryList = function(callBackFunc){
//		var paraMap = {};
//		paraMap["funcNo"] = "2000001";
//		var reqParamVo = $.getReqParamVo();
//		reqParamVo.setUrl($.gconfig.global.server);
//		reqParamVo.setReqParam(paraMap);
//		this.service.invoke(reqParamVo,callBackFunc);
//	};
	
	/**
	 * 释放操作
	 */
	LoginService.prototype.destroy = function(){
		this.service.destroy();
	};
	
    /**
	 * 实例化对象
	 */
	function getInstance(){
		return new LoginService();
	}
	
	var loginService = {
		"getInstance" : getInstance
	};
	
	// 暴露对外的接口
	module.exports = loginService;
});