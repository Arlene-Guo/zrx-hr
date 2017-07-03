package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 下单渠道<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午11:12:00
 *
 */
public enum OrderChannel {

    M(40000, "M站"),
    IOS(50000, "苹果APP应用"),
    Android(60000, "安卓APP应用"),
    PC(70000, "PC网站");

    @Getter
    private int value;

    @Getter
    private String name;

    private OrderChannel(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public static OrderChannel valueOf(int value) {
//        for (OrderChannel oc : OrderChannel.values()) {
//            if (oc.getValue() == value) {
//                return oc;
//            }
//        }
        return null;
    }
}
