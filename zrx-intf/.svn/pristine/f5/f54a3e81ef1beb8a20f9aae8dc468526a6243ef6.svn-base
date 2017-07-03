package com.zrx.hr.recruiter.domain.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SearchResumeDistributionListDto {

	/**简历分配id*/
	private Integer id;
	
	private Integer resumeId;
	private Integer resumeCommissionerId;
	private String remarks;
	private Integer interviewOrderId;
	private Integer evaluationMailId;
	/** 0 初筛简历待处理 1 合格 2 不合格*/
	private Integer filterState;
	
	/**面试者简历信息*/
	private String intervieweeName;
	private String intervieweePhone;
	private Integer intervieweeDutiesId;
	private String intervieweeDutiesName;
	private String intervieweeMail;
	private String idNumber;
	private Integer schoolId;
	private String schoolName;
	private String resumeFilename;
	private String resumePath;
	private Integer recommendedId;
	private String recommendedName;
	private String recommendedJobNumber;
	private String recommendedSource;
	private Date createTime;
	
	/**面试单信息*/
	/** 3 安排初试 4 初试签到 5 初试通过 6初试不通过 7 安排复试 8 复试签到 9 复试通过 10 复试不通过 11已发offer 12关闭*/
	private Integer state = 0;
	
	/**
	 * 学校排名
	 */
	private String ranking;
}
