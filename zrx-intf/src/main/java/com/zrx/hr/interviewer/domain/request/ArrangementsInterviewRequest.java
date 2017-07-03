package com.zrx.hr.interviewer.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ArrangementsInterviewRequest extends QueryCommonParamVO {
	
	/**面试安排id*/
	private Integer id;
	/**面试者信息**/
	private Integer resumeId;
	/**初试 0 复试则是对应值 */
	private Integer interviewOrderId;
	/**
	 * 面试者名称
	 */
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
	
	private Integer resumeDistributionId;
	/***招聘专员信息**/
	private Integer resumeCommissionerId;
	
	/***面试官安排信息**
	/**
	 * 面试类型:0 初试 ,1复试
	 */
	private Integer type;
	/**
	 * 面试官id
	 */
	private Integer interviewerId;
	/**
	 * 面试官名称
	 */
	private String interviewerName;
	/**
	 * 面试时间
	 */
	private String interviewerTime;
	
	private Integer interviewerCount;
	/**
	 * 面试类型 0 单面 1 群面
	 */
	private Integer interviewerType;
	
	/**发送给面试官邮件信息*/
	private String interviewerMailSubject;
	private String interviewerMailContent;
	
	/**发送给应聘者邮件信息*/
	private String intervieweeMailSubject;
	private String intervieweeMailContent;
	
	private String remarks;
	
	private Integer delFlag;
}
