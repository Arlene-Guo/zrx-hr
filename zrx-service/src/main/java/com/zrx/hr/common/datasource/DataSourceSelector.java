package com.zrx.hr.common.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import lombok.extern.slf4j.Slf4j;

/**
 * Description: 数据源选择器<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午2:10:08
 *
 */
@Slf4j
public class DataSourceSelector extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        String dataSource = HandleDataSource.getDataSource();
        LOG.debug("使用{}数据库", dataSource);
        return dataSource;
    }

    public static class HandleDataSource {

        // 利用ThreadLocal解决线程安全问题
        public static final ThreadLocal<String> holder = new ThreadLocal<String>();

        public static void putDataSource(DataSourceType datasource) {
            if (null == datasource) {
                return;
            }
            holder.set(datasource.name());
        }

        public static String getDataSource() {
            return holder.get();
        }
    }

    /**
     * 
     * Description: 数据库类型 <br/>
     *
     *
     */
    public static enum DataSourceType {
        RW, RO;
    }
}
