package com.zrx.hr.redis.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.zrx.hr.redis.constants.RedisType;
import com.zrx.hr.redis.manager.RedisManager;
import com.zrx.hr.redis.service.RedisCacheService;

/**
 * 
 * Description: Serializable Redis服务类 <br/>
 *
 * @author wangxiaoming
 * @date 2016年3月22日 下午2:14:50
 *
 */
@Service
public class RedisCacheServiceImpl<T extends Serializable> implements RedisCacheService<T> {

    @Resource
    RedisTemplate<String, T> redisTemplate;

   /* @Resource
    RedisManager redisManager;*/

    @Override
    public T saveCache(String key, T cache) {
        redisTemplate.opsForValue().set(key, cache);
        return cache;
    }

    @Override
    public T saveCache(String key, T cache, int seconds) {
        saveCache(key, cache);
        redisTemplate.expire(key, seconds, TimeUnit.SECONDS);
        return cache;
    }

    @Override
    public T getCache(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void removeCache(String key) {
        redisTemplate.delete(key);
    }

}
