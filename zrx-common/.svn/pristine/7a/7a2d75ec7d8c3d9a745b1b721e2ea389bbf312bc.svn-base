package com.zrx.hr.common.constants;

import lombok.Getter;

/**
 * Description: 请求响应编码<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午3:31:38
 *
 */
public enum ResponseCode {
	
	SUCCESS(10000, "请求成功"),
	PARAM_ERROR(10001, "请求参数错误"),
	RESOURCE_NOT_EXIST(10002, "请求资源不存在");
	
	@Getter
	private int value;
	@Getter
	private String desc;
	
	private ResponseCode(int value, String desc) {
		this.value = value;
		this.desc = desc;
	}
}
