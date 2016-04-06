package io.github.sruby.junit.suite;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * 测试套件
 * 测试套件意味捆绑几个测试案例并且同时运行。
 * @author liuwf on 2016年4月1日 下午3:36:16
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestJunit1.class,TestJunit2.class
})
public class JunitTestSuite
{
	
}
