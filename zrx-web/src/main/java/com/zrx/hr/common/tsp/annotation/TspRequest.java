package com.zrx.hr.common.tsp.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * Description: Tsp请求Base64解密 <br/>
 *
 * @author wangxiaoming
 * @date 2016年10月23日 上午9:30:15
 *
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface TspRequest {
}
