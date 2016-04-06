package io.github.sruby.junit.basetools;

import junit.framework.TestCase;

/**
 * 基本测试工具
 * @author liuwf on 2016年4月1日 下午3:33:12
 */
public class JavaTest extends TestCase
{
	protected int value1,value2;
	
	/**
	 * 测试前调用
	 */
	protected void setUp()
	{
		System.out.println("测试开始");
		value1 = 10;
		value2 = 1;
	}
	
	/**
	 * 继承TestCase的方式,测试方法需要用test开头.
	 * 注解不需要
	 * @author liuwf on 2016年4月5日 下午5:23:24
	 */
	public void test()
	{
		System.out.println(value1 + value2);
	}
	
	protected void tearDown()
	{
		System.out.println("测试结束");
	}
}
