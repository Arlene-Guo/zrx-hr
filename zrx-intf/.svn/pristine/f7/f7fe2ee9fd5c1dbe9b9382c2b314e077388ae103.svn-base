package com.zrx.hr.freezentime.domain.vo;

import java.sql.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class FreezenTime extends CommonDomain{
	
	private Date startFreezenDate;
	/**
	 * 冻结时间段 0 上午 1下午
	 */
	private Integer startAmPm;
	
	
	private Date endFreezenDate;
	/**
	 * 冻结时间段 0 上午 1下午
	 */
	private Integer endAmPm;
	
	/**
	 * 是否 所有面试官 0 否 1是
	 * isEvery 是 1 表示所有面试官  interviewerId为空，
	 * 在面试官安排面试时，如果isEvery 是1，
	 * 通过角色返回所有用户，然后判断当前面试官是否在这个列表中
	 */
	private Integer isEvery;
	/**
	 * 面试官id
	 */
	private Integer interviewerId;
	/**
	 * 面试官名称
	 */
	private String interviewerName;
	/**
	 * 职务编号
	 */
	private String dutiesNumber;
	/**
	 * 职务名称
	 */
	private String dutiesName;
	/**
	 * 员工编号
	 */
	private String jobNumber;
	
	
}
