package com.zrx.hr.common.datasource;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.zrx.hr.common.datasource.DataSourceSelector.DataSourceType;

/**
 * Description: 数据源选择注解<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午2:09:32
 *
 */
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataSource {

    DataSourceType value() default DataSourceType.RW;
}
