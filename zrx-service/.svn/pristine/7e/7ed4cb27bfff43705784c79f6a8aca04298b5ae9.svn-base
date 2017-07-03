package com.zrx.hr.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

//import com.zrx.hr.tsp.domain.request.TspCommonReqVO;

import lombok.extern.slf4j.Slf4j;

/**
 * Description: 记录调用时间日志<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月25日 下午2:04:23
 *
 */
@Slf4j
@Aspect
@Component
public class AopLogCostTime {

//	private static final String DOT_SPLIT = ".";  
//	  
//   @Around("within(com.zrx.hr.tsp.service.impl.TspServiceImpl)")
//   public Object around(ProceedingJoinPoint joinPoint) throws java.lang.Throwable {  
//        
//		String className = joinPoint.getTarget().getClass().getName();
//		String method = joinPoint.getSignature().getName();
//		final String key = className + DOT_SPLIT + method;
//		System.out.println("className: " + className);
//		long start = System.currentTimeMillis();
//		try {
//			return joinPoint.proceed();
//		} finally {
//			try {
//				
//				long end = System.currentTimeMillis();
//				
//				final long duration = end - start;
//
//				StringBuffer msg = new StringBuffer();
//				msg.append(key);
//
//				if (null != joinPoint.getArgs()) {
//					msg.append(" 参数列表 [");
//					for (int i = 0; i < joinPoint.getArgs().length; i++) {
//						Object obj = joinPoint.getArgs()[i];
//						msg.append(obj);
//						if(obj instanceof TspCommonReqVO) {
//							msg.append(", TSPName: ");
//							msg.append(((TspCommonReqVO)obj).applicationName());
//						}
//						if (i < joinPoint.getArgs().length - 1) {
//							msg.append(",");
//						}
//					}
//					msg.append("]");
//				}
//
//				msg.append("耗时：").append(duration).append("ms");
//				LOG.info(msg.toString());
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//   }
}
