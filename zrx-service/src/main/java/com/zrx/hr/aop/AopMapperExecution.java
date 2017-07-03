package com.zrx.hr.aop;

import java.util.Random;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Component;

import com.mysql.jdbc.MysqlDataTruncation;

import lombok.extern.slf4j.Slf4j;

/**
 * Description: Mapper切入<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午2:05:00
 *
 */
@Slf4j
@Aspect
@Component
public class AopMapperExecution {

//    Random random = new Random();
//
//    /**
//     * 
//     * Description: 切入点为所有的Mapper的所有方法 <br/>
//     * 
//     */
//    @Pointcut("execution (* com.zrx.hr..mapper.*.*(..))")
//    public void pointcut() {
//    }
//
//    /**
//     * 
//     * Description: <br/>
//     * 
//     * @param point
//     * @return
//     * @throws Throwable
//     */
//    @Around("pointcut()")
//    public Object around(ProceedingJoinPoint point) throws Throwable {
//        int tryTime = 10;
//
//        while (tryTime-- > 0) {
//            try {
//                return point.proceed();
//            } catch (BadSqlGrammarException e) {
//                throw e;
//            } catch (MysqlDataTruncation e) {
//                throw e;
//            } catch (Exception e) {
//                LOG.error("", e);
//                try {
//                    // 休眠两秒后，进行重试
//                    Thread.sleep(random.nextInt(2000));
//                } catch (InterruptedException e1) {
//                    LOG.error("休眠失败！", e);
//                }
//            }
//        }
//        LOG.warn("重试了9次了，最后一次！");
//        Object object = point.proceed();
//        LOG.warn("重试第10次成功了");
//
//        return object;
//    }
}
