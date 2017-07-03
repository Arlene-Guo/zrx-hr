package com.zrx.hr.common.util.bean;

import net.sf.cglib.beans.BeanCopier;

/**
 * Description: 对象属性复制工具类<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月14日 下午1:45:14
 *
 */
public class PropertyCopyUtil {
	
	public static void copy(Object from, Object to) {
		BeanCopier beanCopier = BeanCopier.create(from.getClass(), to.getClass(), false);
		beanCopier.copy(from, to, null);
	}
}