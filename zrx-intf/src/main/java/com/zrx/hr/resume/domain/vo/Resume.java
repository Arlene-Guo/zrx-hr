package com.zrx.hr.resume.domain.vo;

import java.sql.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class Resume extends CommonDomain{
	
	private String intervieweeName;
	private String intervieweePhone;
	private Integer intervieweeDutiesId;
	private String intervieweeDutiesName;
	private String intervieweeMail;
	private String idNumber;
	private Integer schoolId;
	private String schoolName;
	private String educationFilename;
	private String educationPath;
	private String resumeFilename;
	private String resumePath;
	private Integer recommendedId;
	private String recommendedName;
	private String recommendedJobNumber;
	private String recommendedSource;
	private Integer uid;
	private Date opTime;
	private Integer delFlag;
	
//	招入方式 校招 社招
	private String recruitWay;
	
}
