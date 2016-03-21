package root.hn1;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.web.base.ActionResult;
import com.thinkive.web.base.BaseAction;

/**
 * 描述: 测试服务端保存cookie,在客户端获取 
 * 作者: 刘文飞  
 * 创建日期: 2016年3月14日 
 * 创建时间: 下午7:55:53
 */
public class CookieHelperTest extends BaseAction
{
	Logger logger = Logger.getLogger(CookieHelperTest.class);
	public ActionResult doDefault() throws IOException
	{
		Object json = JSON.parse("{a:'a',b:'b'}");
		CookieHelper.setCookie(getRequest(), getResponse(), "test", "json.toString()");
		getResponse().getWriter().print("111111111111");
		logger.error("=======================123123");
		return null;
	}
}
