package sruby.github.io.redis;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.thinkive.redis.client.JedisClient;

/**
 * 描述: redis的demo 
 * 作者: 刘文飞  
 * 创建日期: 2016年3月21日 
 * 创建时间: 下午7:51:25
 */
public class RedisTest
{
	private JedisClient client = new JedisClient();
	Logger logger = Logger.getLogger(RedisTest.class);
	
	/**
	 * 描述：测试保存失效时间
	 * 作者：刘文飞
	 * 时间：2016年3月21日 下午8:00:19
	 * @throws InterruptedException 
	 */
	@Test
	public void testExpire() throws InterruptedException
	{
		client.set("key", "value",5);
		String value = client.getString("key");
		logger.info("value:"+value);
		
		Thread.sleep(5*1000);
		
		value = client.getString("key");
		logger.info("睡眠5秒后的值value:"+value);
	}
	
	/**
	 * 描述：测试保存list
	 * 作者：刘文飞
	 * 时间：2016年3月21日 下午8:16:59
	 */
	@Test
	public void testSetList()
	{
		Map<String,String> map = new HashMap<String, String>();
		map.put("key", "value");
		
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
		list.add(map);
		
		client.set("keyList", list);
		
		List<Map<String, String>> listValue = client.getList("keyList");
		logger.info("list:"+listValue.toString());
		
		String listStr = client.getString("keyList");
		logger.info("listStr:"+listStr);
		
		List<Map<String, String>> listValue2 = client.getList("keyList2");
		
		assert listValue2 == null:"listValue2 is null";
		assert listValue2.isEmpty():"listValue2 is empty";
	}
}
