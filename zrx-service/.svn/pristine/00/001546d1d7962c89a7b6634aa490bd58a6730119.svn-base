package com.zrx.hr.redis.manager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import com.zrx.hr.redis.constants.RedisType;
import com.zrx.hr.redis.service.RedisKey;

//@Component
public class RedisManager implements InitializingBean {

//    @Resource
    List<RedisKey> implList;

    private Map<RedisType, List<String>> redisMap = new HashMap<RedisType, List<String>>();

    /**
     * 
     * Description: 获取所有可能的键 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月18日 上午9:24:05
     * @param redisType
     * @return
     */
    public List<String> getAllKey(RedisType redisType) {
        return redisMap.get(redisType);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        for (RedisKey impl : implList) {
            List<String> list = redisMap.get(impl.redisType());
            if (null == list) {
                list = new ArrayList<String>();
                redisMap.put(impl.redisType(), list);
            }
            list.add(impl.redisKey());
        }
    }

}
