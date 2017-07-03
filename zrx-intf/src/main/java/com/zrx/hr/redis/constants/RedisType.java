package com.zrx.hr.redis.constants;

import lombok.Getter;

/**
 * 
 * Description: 缓存类型 <br/>
 *
 * @author wangxiaoming
 * @date 2016年4月16日 下午4:52:09
 *
 */
public enum RedisType {

    ZRX_HR("面试管理系统信息");

    @Getter
    private String desc;

    private RedisType(String desc) {
        this.desc = desc;
    }
}
