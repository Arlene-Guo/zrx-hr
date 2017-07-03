package com.zrx.hr.aop;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.zrx.hr.common.datasource.DataSource;
import com.zrx.hr.common.datasource.DataSourceSelector.DataSourceType;
import com.zrx.hr.common.datasource.DataSourceSelector.HandleDataSource;

/**
 * Description: Service切入 <br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午2:05:34
 *
 */
@Aspect
@Component
public class AopServiceExecution {

    /**
     * 
     * Description: 切入点为所有的Service的所有方法 <br/>
     * 
     */
//    @Pointcut("execution (* com.zrx.hr..service.*.*(..))")
//    public void beforeService() {
//    }
//
//    /**
//     * 
//     * Description: 前置切入点 <br/>
//     * 
//     * @param point
//     * @throws Throwable
//     */
//    @Before("beforeService()")
//    public void before(JoinPoint point) throws Throwable {
//        Method method = ((MethodSignature) point.getSignature()).getMethod();
//        if (null == method) {
//            return;
//        }
//
//        // 获取实际接口实行类的方法
//        Method targetMethod = point.getTarget().getClass().getDeclaredMethod(method.getName(), method.getParameterTypes());
//        if (null == targetMethod) {
//            return;
//        }
//
//        DataSourceType datasource = null;
//
//        // 获取方法的注解
//        if (targetMethod.isAnnotationPresent(DataSource.class)) {
//            DataSource annotation = targetMethod.getAnnotation(DataSource.class);
//            datasource = annotation.value();
//        }
//
//        // 如果方法没有，则查看类的
//        if (null == datasource) {
//            Class<?> interfaces = point.getTarget().getClass();
//            if (null != interfaces && interfaces.isAnnotationPresent(DataSource.class)) {
//                DataSource annotation = interfaces.getAnnotation(DataSource.class);
//                datasource = annotation.value();
//            }
//        }
//
//        if (null != datasource) {
//            HandleDataSource.putDataSource(datasource);
//        }
//    }

}
