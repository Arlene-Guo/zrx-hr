package com.zrx.hr.redis.service;

import java.io.Serializable;

import com.zrx.hr.redis.constants.RedisType;

/**
 * Description: Redis服务类<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午10:52:49
 *
 * @param <T>
 */
public interface RedisCacheService<T extends Serializable> {

    /**
     * 
     * Description: 设置缓存，永久不过期 <br/>
     * 
     * @param key
     * @param t
     * @return
     */
    T saveCache(String key, T cache);

    /**
     * 
     * Description: 设置缓存，并设置有效期为seconds秒<br/>
     * 
     * @param key
     * @param cache
     * @param second
     * @return
     */
    T saveCache(String key, T cache, int seconds);

    /**
     * 
     * Description: 获取key对应的value <br/>
     * 
     * @param key
     * @return
     */
    T getCache(String key);

    /**
     * 
     * Description: 移除cache <br/>
     * 
     * @param key
     */
    void removeCache(String key);

}
