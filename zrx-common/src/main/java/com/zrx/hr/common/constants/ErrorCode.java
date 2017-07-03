package com.zrx.hr.common.constants;

import java.sql.Date;

import lombok.Getter;

public enum ErrorCode {
	
	SUCCESS_CODE(10000, "成功"),
	RESULT_NULL_CODE(10000, "没有查询到任何数据"),
	EXCEPTION_ERROR(10010, "系统异常"),
	FAILED_ERROR(10020, "请求失败"),
	PARAM_ERROR(10030, "请求参数错误"),
	
	LOGIN_ERROR(10040, "登录失败，用户名或密码错误"),
	LOGIN_EXPIRED(10050, "登录过期，请求重新登录"),
	LOGIN_UNASSIGNED_ROLE(10060, "未分配角色"),
	
	RESUME_ALREADY_ADD(10070, "简历已经添加过"),
	
	INTERVIEWER_FULL(10080, "面试官安排人数已满");
	
	@Getter
	private int code;
	@Getter
	private String desc;
	
	private ErrorCode(int code, String desc) {
		this.code = code;
		this.desc = desc;
	}
}
