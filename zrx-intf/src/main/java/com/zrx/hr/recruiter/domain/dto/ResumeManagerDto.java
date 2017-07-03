package com.zrx.hr.recruiter.domain.dto;

import com.zrx.hr.common.domain.CommonDomain;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ResumeManagerDto extends CommonDomain{
	
	private Integer resumeDistributionId;
	private Integer resumeId;
	private String intervieweeName;
	private String intervieweePhone;
	private String intervieweeDutiesId;
	private String intervieweeDutiesName;
	private String intervieweeMail;
	private Integer schoolId;
	private String schoolName;
	private String resumeFilename;
	private String resumePath;
	private String idNumber;
	private String resumeCreateTime;
	private String recommendedSource;
	private String recommendedId;
	private String recommendedName;
	private String jobNumber;
	private String distributionTime;
	private Integer resumeCommissionerId; 
	private String resumeCommissionerName;
	
//	判断是否到安排过复试的状态
	private String state;

}
