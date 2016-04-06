package io.github.sruby.security;

import junit.framework.TestCase;

/**
 * md5解密测试
 * @author liuwf on 2016年4月5日 下午5:25:42
 */
public class MD5ProjectTest extends TestCase
{
	public void testDecode()
	{
		byte[] decode = MD5Project.decode("MTIzNDU2Nzg5MA==");
		System.out.println(new String(decode));
	}
}
