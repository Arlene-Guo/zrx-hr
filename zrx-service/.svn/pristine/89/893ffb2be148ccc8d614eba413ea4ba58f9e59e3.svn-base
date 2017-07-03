package com.zrx.hr.interviewer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.interviewer.domain.request.ArrangementsInterviewRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewArrangements;

@Repository
public interface InterviewArrangementsMapper {
	
	/**
	 * 统计已经安排的人数
	 * @param interviewArrangements
	 * @return
	 */
	int arrangementCount(@Param("interviewArrangements") InterviewArrangements interviewArrangements);
	
	/**
	 * 添加修改面试安排
	 * @param arrangementsInterview
	 * @return
	 */
	int saveOrUpdateInterviewArrangements(@Param("interviewArrangements") ArrangementsInterviewRequest interviewArrangements);
	
	List<InterviewArrangements> findInterviewArrangementList(@Param("interviewArrangements") InterviewArrangements interviewArrangements);
	
}
