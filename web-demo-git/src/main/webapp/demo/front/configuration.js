/**
 * 程序入口配置读取
 * 项目开发时需要的自定义配置
 */
define(function(require, exports, module) {
	var project_configuration = require("front/project-configuration");
	if(!project_configuration){
		project_configuration = {};
	}
	var configuration = {};
	 //项目中的需要先加载的css样式文件
//	configuration["firstLoadCss"] = project_configuration["firstLoadCss"] || ["/front/style/style.css"];
	//各种弹出层样式主题样式，默认为系统自带
	//configuration["layerTheme"] = project_configuration.layerTheme || "a"; 
	//页面标题
	configuration["pageTitle"] = project_configuration["pageTitle"] || "网站-mysql版";
	//工程目录
	configuration["projPath"] = project_configuration["projPath"] || "/demo/front/"; 
	//views目录viewsPath
	configuration["viewsPath"] = project_configuration["viewsPath"] || "/demo/main/"; 
	
	 //正则表达式替换
	configuration["expMap"] = project_configuration["expMap"] || [[ /^(.*\/(?:front|plugins)\/.*\.(?:css|js))(?:.*)$/i, '$1?v='+seajs._sysVersion ]];
    //错误功能号定义
	configuration["filters"] = {
		//未登录
		"-999": function(resultVo){
			
		},
		//后台返回数据格式不正确，请联系管理员！
		"-998": function(resultVo){
			
		},
		//网络中断或跨域请求或服务器异常！
		"-997" : function(resultVo){
			
		},
		//请求超时
		"-996": function(resultVo){
			
		}
	};
	if(project_configuration["filters"]){
		for(var key in project_configuration["filters"]){
			configuration["filters"][key] = project_configuration["filters"][key];
		}
	}
	//登录检测
	configuration["loginCheck"] = {
	    "pageFilters" : ["include/foot"], //过滤的pageCode,可以绕过登录
	    "checkFunc" : function(pageCode,param){  //检测处理函数
			var  checkFlag = true;
			return checkFlag;
	    }
	};
	if(project_configuration["loginCheck"]){
		for(var key in project_configuration["loginCheck"]){
			configuration["loginCheck"][key] = project_configuration["loginCheck"][key];
		}
	}
	/**
	 * 项目中模块的别名配置
	 */
	configuration["pAlias"] = {
        "server":"/servlet/json",
		"popup" : "front/scripts/util/popup",
	};
	if(project_configuration["pAlias"]){
		for(var key in project_configuration["pAlias"]){
			configuration["pAlias"][key] = project_configuration["pAlias"][key];
		}
	}
	
	//全局初始化函数
	configuration["initFunc"] = project_configuration["initFunc"] || function(callBackFunc){
		//初始化js和css
		var jsAndCss = [];
//		jsAndCss.push("front/scripts/service/projectService");
		require.async(jsAndCss,function(){
			if(callBackFunc){
				callBackFunc();
			}
		});
	};
	
	/**
	 * 项目中需要调用到的常量、变量这里配置
	 */
	configuration["global"] = {
		"ctx_path": "",//工程目录
		"server" : "/servlet/json", //接入服务器接口地址
		"server_local":"http://127.0.0.1:6088/servlet/json",
		"op_source" : "0" //来源   pc/web：0 Android平板客户端：2 Android手机客户端：3  iPhone客户端：4
    };
	if(project_configuration["global"]){
		for(var key in project_configuration["global"]){
			configuration["global"][key] = project_configuration["global"][key];
		}
	}
	//暴露对外的接口
	module.exports = window.configuration = configuration;
});