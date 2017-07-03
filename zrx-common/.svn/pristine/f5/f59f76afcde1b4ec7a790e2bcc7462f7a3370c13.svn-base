package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 促销类型编码<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月15日 上午11:04:29
 *
 */
public enum PromotionType {

	REDUCTION(14, "立减"),
	COUPON(21, "优惠券"),
	PAY_DISCOUNT(24, "支付优惠"),
	DISCOUNT_AND_DISCOUNT(23, "折上折"),
	BACK_COUPON(22, "返券"),
	DOUBLE_OFFSET_COUPON(15, "双倍抵用券"),
	MANY_BOOK(16, "多预定"),
	EARLY_BOOK(17, "早预定"),
	JOINT_CARD(19, "联名卡");
	
	@Getter
	private int typeId;
	
	@Getter
	private String desc;

	private PromotionType(int typeId, String desc) {
		this.typeId = typeId;
		this.desc = desc;
	}
}
