package com.zrx.hr.common.util.task;

import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * 
 * Description: 线程池工具 <br/>
 *
 * @author wangxiaoming
 * @date 2016年4月9日 上午10:14:28
 *
 */
public class TaskExecutorUtil {

    private static final int DEFAULT_CORE_POOL_SIZE = 3;
    private static final int DEFAULT_MAX_POOL_SIZE = 3;

    /**
     * 
     * Description: 线程池 <br/>
     * 默认3个
     * 
     * @author wangxiaoming
     * @date 2016年4月9日 上午10:14:00
     * @return
     */
    public static TaskExecutor newInstance() {
        return newInstance(DEFAULT_CORE_POOL_SIZE, DEFAULT_MAX_POOL_SIZE);
    }

    /**
     * 
     * Description: 线程池 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月9日 上午10:14:10
     * @param corePoolSize
     * @param maxPoolSize
     * @return
     */
    public static TaskExecutor newInstance(int corePoolSize, int maxPoolSize) {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.afterPropertiesSet();
        return executor;
    }
}
