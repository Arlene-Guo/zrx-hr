package com.zrx.hr.interviewer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.interviewer.domain.request.SaveOrUpdateInterviewNumber;
import com.zrx.hr.interviewer.domain.request.SearchInterviewNumberListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewNumber;

@Repository
public interface InterviewNumberMapper {
	
	/**
	 * 面试时间，涉及单面、群面 、面试人数
	 * @param interviewNumber
	 * @return id
	 */
	int saveOrUpdateInterviewNumber(@Param("records") List<InterviewNumber> interviewNumbers);
	
	List<InterviewNumber> searchInterviewNumberList(@Param("interviewNumber") SearchInterviewNumberListRequest interviewNumber);
}
