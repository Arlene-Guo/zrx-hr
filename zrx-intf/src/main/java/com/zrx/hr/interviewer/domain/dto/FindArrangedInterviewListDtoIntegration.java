package com.zrx.hr.interviewer.domain.dto;

import lombok.Data;

@Data
public class FindArrangedInterviewListDtoIntegration {

	private Integer resumeDistributionId;
	private Integer interviewerOrderId;
	private Integer resumeId;
	private String intervieweeName;
	private String intervieweePhone;
	private Integer intervieweeDutiesId;
	private String intervieweeDutiesName;
	private String intervieweeMail;
	private Integer schoolId;
	private String schoolName;
	private String resumeFilename;
	private String resumePath;
	private String idNumber;
	private Integer resumeCommissionerId;
	private String resumeCommissionerName;
	/**
	 * 评测结果 0 待处理 1 未通过 2 通过
	 */
	private Integer evaluationResult;
	/**面试单状态**/
	private Integer state;	
	
	private Integer initInterviewArrangementsId;
	private Integer initInterviewerId;
	private String initInterviewerName;
	private String initInterviewerTime;
	/**	面试类型:0 初试 ,1复试 */
	private Integer initType;
	/**面试类型 0 单面 1 群面*/
	private Integer initInterviewerType;
	private String initRemark;
	
	private Integer reInterviewArrangementsId;
	private Integer reInterviewerId;
	private String reInterviewerName;
	private String reInterviewerTime;
	private Integer reType;
	private Integer reInterviewerType;
	private String reRemarks;
	private String ranking;
}
