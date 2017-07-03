package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 订单类型<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午11:31:09
 *
 */
public enum SourceType {

    BACK(0, "后台订单");

    @Getter
    private int value;

    @Getter
    private String name;

    private SourceType(int value, String name) {
        this.value = value;
        this.name = name;
    }
}
