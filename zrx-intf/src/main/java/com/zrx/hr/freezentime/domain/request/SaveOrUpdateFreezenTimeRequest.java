package com.zrx.hr.freezentime.domain.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

@Data
@EqualsAndHashCode(callSuper = true)
public class SaveOrUpdateFreezenTimeRequest extends QueryCommonParamVO {

	private Integer id;
	private String startFreezenDate;
	private Integer startAmPm;
	private String endFreezenDate;
	private Integer endAmPm;
	private Integer isEvery;
	/**
	 * isEvery 是 1 表示所有面试官  interviewerId为空，
	 * 在面试官安排面试时，如果isEvery 是1，
	 * 通过 角色返回所有用户，然后判断当前面试官是否在这个列表中
	 */
	private Integer interviewerId;
	private String interviewerName;
	private String dutiesNumber;
	private String dutiesName;
	private String jobNumber;
	private Integer delFlag;
	private String company;
}
