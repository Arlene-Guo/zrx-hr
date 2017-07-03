package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 订单来源 <br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午11:13:35
 *
 */
public enum OrderSource {

    PHONE(1, "电话"),

    INTERNET(2, "网络"),

    ONLINE(3, "在线");

    @Getter
    private int value;

    @Getter
    private String name;

    private OrderSource(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public static OrderSource valueOf(int value) {
//        for (OrderSource os : OrderSource.values()) {
//            if (os.getValue() == value) {
//                return os;
//            }
//        }
        return null;
    }

}
