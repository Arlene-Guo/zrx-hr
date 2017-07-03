package com.zrx.hr.common.datasource;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import com.zrx.hr.common.datasource.DataSourceSelector.DataSourceType;

/**
 * Description: 数据源切面<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午2:11:23
 *
 */
public class DataSourceAspect {

    public void before(JoinPoint point) {
        Object target = point.getTarget();
        String method = point.getSignature().getName();

        Class<?>[] classz = target.getClass().getInterfaces();
        
        for(Class c : classz) {
        	System.out.println("class: " + c.getName());
        }

        Class<?>[] parameterTypes = ((MethodSignature) point.getSignature()).getMethod().getParameterTypes();
        
        for(Class c : parameterTypes) {
        	System.out.println("parameterType: " + c.getName());
        }
        try {
            Method m = classz[0].getMethod(method, parameterTypes);
            if (m != null) {
            	if(m.isAnnotationPresent(DataSource.class)) {
		            DataSource data = m.getAnnotation(DataSource.class);
		            DataSourceSelector.HandleDataSource.putDataSource(data.value());
		            System.out.println(data.value());
            	} else {
            		DataSourceSelector.HandleDataSource.putDataSource(DataSourceType.RW);
            	}
            }
        } catch (Exception e) {
        	e.printStackTrace();
        }
    }
}