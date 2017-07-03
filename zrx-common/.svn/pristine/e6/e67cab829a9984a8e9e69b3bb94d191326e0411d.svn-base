package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 订单内部状态描述信息<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月21日 上午10:35:50
 *
 */
public enum OrderInnerStatusDesc {
	
	ORDER_INIT("OS0000", ""),
	ORDER_REQUIREMENT_CONFIRM("OS0002", "需求确认"),
	ORDER_OCCUPY_SUCCESS("OS0002G", "占位成功"),
	ORDER_WAIT_PAY("OS0003", "待签约付款"),
	ORDER_CONFIRM_FEEDBACK("OS0004", "确认反馈中"),
	ORDER_CONFIRM_FAILED("OS0004A", "确认失败"),
	ORDER_WAIT_NOTICE("OS0006", "待通知"),
	ORDER_NOTICE_SEND("OS0007", "出团通知发送中"),
	ORDER_BEFORE_TOUR("OS0008", "出游前"),
	ORDER_MID_TOUR("OS0009", "出游中"),
	ORDER_BACK_TOUR("OS0010", "出游归来"),
	ORDER_ADD_OCCUPY("OS0011", "加人加资源占位中"),
	ORDER_ADD_FEEDBACK("OS0012", "加人加资源占位已反馈"),
	ORDER_ADD_CONFIRM("OS0012A", "加人加资源确认中"),
	ORDER_LOSSING("OS0013", "核损中"),
	ORDER_CANCEL_LOSS("OS0013A", "取消订单核损中"),
	ORDER_LOSS_FEEDBACK("OS0014", "核损已反馈"),
	ORDER_CANCEL_LOSS_FEEDBACK("OS0014A", "取消订单核损已反馈"),
	ORDER_ADD_WAIT_PAY("OS0015", "加人加资源待付款"),
	ORDER_CANCELED("OS0098", "已取消"),
	ORDER_CANCELED_OTHER("OS0099", "已取消");
	
	@Getter
	private String code;
	
	@Getter
	private String desc;
	
	private OrderInnerStatusDesc(String code, String desc) {
		this.code = code;
		this.desc = desc;
	}
}
