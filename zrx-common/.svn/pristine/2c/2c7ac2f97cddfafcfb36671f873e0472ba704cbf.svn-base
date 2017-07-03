package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 订单对客状态描述信息<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月21日 上午11:35:31
 *
 */
public enum OrderOuterStatusDesc {
	
	ORDER_DISPOSING("OS001", "正在处理"),
	ORDER_WAIT_PAY("OS002", "待签约付款"),
	ORDER_NOTICE_SEND("OS005", "出团通知发送中"),
	ORDER_WAIT_TOUR("OS006", "待出游"),
	ORDER_MID_TOUR("OS007", "出游中"),
	ORDER_BACK_TOUR("OS008", "出游归来"),
	ORDER_CHANGE_DISPOSING("OS037", "变更处理中"),
	ORDER_CHANGE_WAIT_PAY("OS042", "变更待付款"),
	ORDER_CANCELED("OS011", "已取消");
	
	@Getter
	private String code;
	
	@Getter
	private String desc;
	
	private OrderOuterStatusDesc(String code, String desc) {
		this.code = code;
		this.desc = desc;
	}
}
