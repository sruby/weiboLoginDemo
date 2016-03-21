/**
 * web3.0 分页工具类
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module){
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	//require("/mall/scripts/utils/commonUtil");
	var layerWeb = require("/front/scripts/util/layer/layerWeb.js");
	var titleLength=15;
	require("/front/scripts/juicerUtil.js");
	require("/front/style/page.css");
	//初始化
	function init(param){
		$.juicer.register({"processTitle":processTitle});
	}
	/**
	 * 截取
	 */
	function processTitle(title){
		if(title && title.length > titleLength){
			title = title.substring(0,titleLength)+"...";
		}
		return title;
	}
	
	/**
	 * @功能 判断 obj下分页
	 * pageCode: 分页模板页面 
	 * dataList：数据(包含data和分页信息)
	 * clickFunc:跳转页 调用方法
	 * 
	 */
	
	$.fn.extend({
		loadPage:function(pageCode, dataList, pageCallBack,isNotTable,catalogId){
			var obj = this ;
			var html = "";
			if($.string.isNotEmpty(dataList) && parseInt(dataList.total_rows)>0){
//				alert(dataList.page_count);
				var pageSize = parseInt(dataList.page_count) ; //每页显示条数
				var pageCount = parseInt(dataList.total_pages) ; //总页数
				var pageNow = parseInt(dataList.curr_page) ;//当前 页码数
				var rowCount = parseInt(dataList.total_rows) ;//总记录数
				var data = dataList.data ; //数据集
				//$(obj).find("tbody").hide() ;
				if(isNotTable){
					$(obj).getTemplateHtml(pageCode,data);
				}else{
					$(obj).find("tbody").getTemplateHtml(pageCode,data);
				}
				//$(obj).find("tbody").slideDown("slow") ;
				
				var pageStr = "<span>总共<em class='orgcol'>"+rowCount+"</em>条记录</span>";
				
				
				if(pageNow!=1){//首页、上一页
					pageStr = pageStr + "<a class='page02' href='javascript:void(0);' id='pre_page'>上一页</a>" ;
				}
				if(pageCount<=7){
					for(var i=0; i<pageCount; i++){
						pageStr = pageStr + "<a href='javascript:void(0);' class='page01' data-pageNum='"+ (i+1) +"' >"+ (i+1) + "</a>" ;
					}
				}else{
					var pageHome = "<a href='javascript:void(0);' class='page01' data-pageNum='1'>1</a>" ;
					var pageEnd = "<a href='javascript:void(0);' class='page01' data-pageNum='"+pageCount+"'>"+pageCount+"</a>" ;
					
					if(pageNow==1 || pageNow==2){
						pageStr = pageStr + "<a href='javascript:void(0);' class='page01' data-pageNum='1'>1</a><a href='javascript:;' class='page01' data-pageNum='2'>2</a><a href='javascript:;' class='page01' data-pageNum='3'>3</a> . . . " + pageEnd ;
					}else if(pageNow == 3){
						pageStr =  pageStr + "<a href='javascript:void(0);' class='page01' data-pageNum='1'>1</a><a href='javascript:;' class='page01' data-pageNum='2'>2</a><a href='javascript:;' class='page01' data-pageNum='3'>3</a><a href='javascript:;' class='page01' data-pageNum='4'>4</a> . . . " + pageEnd ;
					
					}else if(pageNow==(pageCount-2)){
						pageStr = pageStr + pageHome + " . . . <a href='javascript:void(0);' class='page01' data-pageNum='"+(pageCount-3)+"'>"+(pageCount-3)+"</a><a href='javascript:;' class='page01' data-pageNum='"+(pageCount-2)+"'>"+(pageCount-2)+"</a><a href='javascript:;' class='page01' data-pageNum='"+(pageCount-1)+"'>"+(pageCount-1)+"</a><a href='javascript:;' class='page01' data-pageNum='"+pageCount+"'>"+pageCount+"</a>";
					}else if(pageNow>(pageCount-2)){
						pageStr = pageStr + pageHome + " . . . <a href='javascript:void(0);' class='page01' data-pageNum='"+(pageCount-2)+"'>"+(pageCount-2)+"</a><a href='javascript:;' class='page01' data-pageNum='"+(pageCount-1)+"'>"+(pageCount-1)+"</a><a href='javascript:;' class='page01' data-pageNum='"+pageCount+"'>"+pageCount+"</a>";
					}else{
						pageStr = pageStr + pageHome + " . . . <a href='javascript:void(0);' class='page01' data-pageNum='"+(pageNow-1)+"'>"+(pageNow-1)+"</a><a href='javascript:;' class='page01' data-pageNum='"+pageNow+"'>"+pageNow+"</a><a href='javascript:;' class='page01' data-pageNum='"+(pageNow+1)+"'>"+(pageNow+1)+"</a> . . . " + pageEnd ;
					}
				}
				
				if(pageNow!=pageCount){//末页、下一页
					pageStr = pageStr + "<a class='page02' href='javascript:void(0);' id='next_page'>下一页</a>" ;
				}
				
//				pageStr = pageStr + "&nbsp;&nbsp; 共 <b><span id='pageCount'>"+ pageCount +"</b> 页  <b>"+rowCount+"</b>  条记录   <span class='page_skip'>&nbsp;&nbsp;跳到第<input id='page_jump_txt' value='' class='page_jump_txt' type='text'>页  <button id='pageJump' class='page_jump_btn'>确定</button>" ;
				if(isNotTable){
					$("<div class='pagebox'>"+pageStr+"</div>").appendTo(obj);
				}else{
					$(obj).find(".pagebox").html(pageStr).slideDown("slow"); //页脚
				}
				$(obj).find(".page01").each(function(){
					
					var pageNum = parseInt($(this).attr("data-pageNum")) ;

					if(pageNum==pageNow){//设置当前页码样式
						$(this).addClass("on") ;
					}
				});
				//样式end
				
			   $(obj).find("#page_jump_txt").live("keyup",function(){ //禁止输入非数字
				   
				   if(!$.string.isNumeric($(this).val())){
					   layerWeb.showObjError("非法输入！",this,2) ;
				   }
				});
			
				$(obj).find(".page01").click(function(){ //点击数字跳转
					var pageNum = parseInt($(this).attr("data-pagenum"));			
					if($.string.isNotEmpty(pageNum)){
						pageCallBack(pageNum,pageSize,catalogId);
					}
				});
				
				$(obj).find("#home_page").click(function(){ //首页
					pageCallBack(1,pageSize,catalogId);
				});
				$(obj).find("#end_page").click(function(){ //末页
					pageCallBack(pageCount,pageSize,catalogId);
				});
				$(obj).find("#pre_page").click(function(){ //上一页
					if(pageNow>1){
						pageCallBack(pageNow-1,pageSize,catalogId);
					}
				});
				$(obj).find("#next_page").click(function(){ //下一页
					if(pageNow<pageCount){
						pageCallBack(pageNow+1,pageSize,catalogId);
					}
				});
				
				$(obj).find("#pageJump").click(function(){ //输入数字 跳页
					var pageNum = parseInt($(obj).find("#page_jump_txt").val()) ;

					if($.string.isNotEmpty(pageNum)){
						if(pageNum>=1 && pageNum<=pageCount){
							pageCallBack(pageNum,pageSize,catalogId);
						}else{
							layerWeb.showObjError("输入的页码超出范围！",this,2) ;
						}
					}else{
						layerWeb.showObjError("请输入页码！",this,2) ;
					}
				});
				
			}else{

				if(isNotTable){
					$(obj).html("暂无相关数据");
				}else{
					$(obj).find("tbody").html("暂无相关数据");
				}
				$(obj).find(".pagebox").html("暂无相关数据...").slideDown("slow") ;
			}
		},
		bindPageEvent:function(pageCallBack){
			var obj = this ;
			var pageSize = $(obj).find("#pageSize") ;
			var pageCount = parseInt($(obj).find("#pageCount")) ;
			$(obj).find("#page_jump_txt").live("keyup",function(){ //禁止输入非数字
				$(this).numberLimit() ;
			});
			
			$(obj).find(".page01").click(function(){ //点击数字跳转
				var pageNum = parseInt($(this).attr("data-pageNum")) ;
				if($.string.isNotEmpty(pageNum)){
					pageCallBack(pageNum,pageSize,catalogId);
				}
			});
			
			$(obj).find("#home_page").click(function(){ //首页
				pageCallBack(1,pageSize,catalogId);
			});
			$(obj).find("#end_page").click(function(){ //末页
				pageCallBack(pageCount,pageSize,catalogId);
			});
			$(obj).find("#pre_page").click(function(){ //上一页
				if(pageNow>1){
					pageCallBack(pageNow-1,pageSize,catalogId);
				}
			});
			$(obj).find("#next_page").click(function(){ //下一页
				if(pageNow<pageCount){
					pageCallBack(pageNow+1,pageSize,catalogId);
				}
			});
			
			$(obj).find("#pageJump").click(function(){ //输入数字 跳页
				var pageNum = parseInt($(obj).find("#page_jump_txt").val()) ;
				
				if($.string.isNotEmpty(pageNum)){
					if(pageNum>=1 && pageNum<=pageCount){
						pageCallBack(pageNum,pageSize,catalogId);
					}else{
						layerWeb.showObjError("输入的页码超出范围！",this,2) ;
					}
				}else{
					layerWeb.showObjError("请输入页码！",this,2) ;
				}
			});
		}
	});
	
	var pageUtil = {
	};
	// 暴露对外的接口
	module.exports = pageUtil;
});