package com.zrx.hr.recruiter.domain.request;

import java.util.Date;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;

@Data
public class SearchResumeDistributionListRequest extends QueryCommonParamVO {
	
	private Integer id;
	private Integer resumeCommissionerId;
	private String intervieweeName;
	private String intervieweeDutiesName;
	/**简历来源  内部推荐 招聘专员*/
	private String recommendedSource;
	private String createTime;
	private String recommendedName;
	/**初筛结果*/
	private Integer filterState;
	/**面试单状态*/
	private Integer state;
}
