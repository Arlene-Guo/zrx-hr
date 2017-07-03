package com.zrx.hr.interviewer.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchInterviewerOrderListRequest extends QueryCommonParamVO {
	
	private String intervieweeName;
	private String intervieweeDutiesName;
	private Integer resumeCommissionerId;
	private String resumeCommissionerName;
	
	private Integer interviewArrangementsId;
	private String initInterviewerTime;
	private String interviewerName;
	/**5 初试通过 6初试不通过*/
	private Integer initPassed;
	/**9 复试通过 10 复试不通过*/
	private Integer rePassed;
	/**评测结果 0 待处理 1 未通过 2 通过*/
	private Integer evaluationResult;
	private Integer offerState;
	
//	管理员所在的分公司
	private String company;

}
