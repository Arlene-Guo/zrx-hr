package com.zrx.hr.interviewer.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zrx.hr.interviewer.domain.request.SaveOrUpdateInterviewNumber;
import com.zrx.hr.interviewer.domain.request.SearchInterviewNumberListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewNumber;

public interface InterviewNumberService {

	/**
	 * 面试时间，涉及单面、群面 、面试人数
	 * @param interviewNumber
	 * @return id
	 */
	int saveOrUpdateInterviewNumber(SaveOrUpdateInterviewNumber interviewNumber);
	
	List<InterviewNumber> searchInterviewNumberList(SearchInterviewNumberListRequest interviewNumber);
}
