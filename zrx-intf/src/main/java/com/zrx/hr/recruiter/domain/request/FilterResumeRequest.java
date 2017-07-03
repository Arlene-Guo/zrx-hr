package com.zrx.hr.recruiter.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class FilterResumeRequest extends QueryCommonParamVO {
	
	private Integer id;
	private String remarks;
	private Integer interviewOrderId;
	private Integer evaluationMailId;
	/**
	 * 0 初筛简历待处理 1 合格 2 不合格 3 安排初试 4 初试签到 5 初试通过 6初试不通过 
	 * 7 安排复试 8 复试签到 9 复试通过 10 复试不通过 11已发offer 12关闭
	 */
	private Integer state;

}
