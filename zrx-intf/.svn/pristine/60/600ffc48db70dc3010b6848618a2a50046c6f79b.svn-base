package com.zrx.hr.freezentime.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchFreezenTimeListRequest extends QueryCommonParamVO {
	
	private Integer id;
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
}
