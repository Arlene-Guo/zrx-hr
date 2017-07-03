package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 订单状态<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午10:24:37
 *
 */
public enum OrderStatus {

	PENDING_TREATMENT("初筛简历待处理", 0),
	QUALIFIED("初筛简历合格", 1),
	UNQUALIFIED("初筛简历不合格", 2),
	PRELIMINARY_ARRANGEMENT("安排初试", 3),
	FIRST_SIGN("初试签到", 4),
	FIRST_PASS("初试通过", 5),	
	FIRST_NO_PASS("初试不通过", 6),
	ARRANGE_RETEST("安排复试", 7),
	CHECK_IN("复试签到", 8),
	SECOND_INTERVIEW("复试通过", 9),	
	RE_EXAMINATION("复试不通过", 10),	
	OFFERED("已发offer", 11),	
	CLOSE("关闭", 12);

    @Getter
    private String desc;
    
    @Getter
    private Integer value;

    private OrderStatus(String desc, Integer value) {
        this.desc = desc;
        this.value = value;
    }

    public static OrderStatus valueOf(int value) {
        if (OrderStatus.values().length < value) {
            return null;
        }
        return OrderStatus.values()[value];
    }
}
