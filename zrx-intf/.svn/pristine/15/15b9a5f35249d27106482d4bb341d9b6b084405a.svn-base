package com.zrx.hr.interviewer.domain.vo;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class InterviewArrangements extends CommonDomain{

	private Integer orderId;
	
	private Integer interviewArrangementsId;
	/**
	 * 面试类型:0 初试 ,1复试
	 */
	private Integer type;
	/**
	 * 面试官id
	 */
	private Integer interviewerId;
	/**
	 * 面试者名称（非面试官名称）
	 */
	private String interviewerName;
	/**
	 * 面试时间
	 */
	private String interviewerTime;
	/**
	 * 面试类型 0 单面 1 群面
	 */
	private Integer interviewerType;
	/**
	 * 安排面试人数
	 */
	private Integer interviewerCount;
	
	private String remarks;

	/**
	 * 临时值 用于状态查询判断
	 * 1">待面试
	 * 2">已通过
				3">未通过
				4">待反馈
				5">已发offer
				6">待定
				7">待发
	 */
	private Integer temp;
	
	
	
}
