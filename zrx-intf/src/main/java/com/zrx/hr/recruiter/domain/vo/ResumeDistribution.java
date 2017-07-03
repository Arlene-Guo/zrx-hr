package com.zrx.hr.recruiter.domain.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class ResumeDistribution extends CommonDomain{
	
	private Integer resumeId;
	private Integer resumeCommissionerId;
	private String resumeCommissionerName;
	private String remarks;
	private Integer interviewOrderId;
	private Integer evaluationMailId;
	/**
	 * 0 初筛简历待处理 1 合格 2 不合格
	 */
	private Integer state;

}
