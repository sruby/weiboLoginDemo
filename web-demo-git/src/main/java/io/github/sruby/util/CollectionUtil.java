package io.github.sruby.util;

import java.util.List;

/**
 * des: 集合工具类
 * @author: liuwf on 2016年3月22日 上午10:26:37
 */
public class CollectionUtil
{
	/**
	 * des:判断list是否为空
	 * @author: liuwf on 2016年3月22日 上午10:26:50
	 * @param list
	 * @return
	 */
	public static boolean isBlankList(List list)
	{
		if(list !=null && !list.isEmpty())
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}
