package com.zrx.hr.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.zrx.hr.common.util.json.JsonUtil;
//import com.zrx.hr.tsp.domain.request.TspCommonReqVO;

import lombok.extern.slf4j.Slf4j;

/**
 * Description: 记录TSP输入输出参数信息<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月26日 上午11:29:05
 *
 */
@Slf4j
@Aspect
@Component
public class AopLogTspParam {
	
//	private static final String DOT_SPLIT = ".";  
//	  
//   @Around("within(com.zrx.hr.tsp.service.impl.TspServiceImpl)")
//   public Object around(ProceedingJoinPoint joinPoint) throws java.lang.Throwable {  
//        
//		String className = joinPoint.getTarget().getClass().getName();
//		String method = joinPoint.getSignature().getName();
//		final String key = className + DOT_SPLIT + method;
//		String result = null;
//		try {
//			Object tmp = joinPoint.proceed();
//			result = JsonUtil.toJson(tmp);
//			return result;
//		} finally {
//			try {
//				
//				StringBuffer msg = new StringBuffer();
//				msg.append(key);
//
//				if (null != joinPoint.getArgs()) {
//					msg.append(" 参数列表 [");
//					for (int i = 0; i < joinPoint.getArgs().length; i++) {
//						Object obj = joinPoint.getArgs()[i];
//						msg.append(JsonUtil.toJson(obj));
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
//				msg.append(" 出参：[").append(result).append("]");
//				LOG.info(msg.toString());
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//   }
}
