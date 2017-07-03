package com.zrx.hr.interviewer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.interviewer.domain.dto.FindArrangedInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.InterviewerOrderArrangeCombineDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewOrderPassedCountDto;
import com.zrx.hr.interviewer.domain.request.ArrangementsInterviewRequest;
import com.zrx.hr.interviewer.domain.request.ModifyIntervieOrderRequest;
import com.zrx.hr.interviewer.domain.request.SaveOrUpdateInterviewNumber;
import com.zrx.hr.interviewer.domain.request.SearchArrangedInterviewListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewerOrderListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewArrangements;
import com.zrx.hr.interviewer.domain.vo.InterviewerOrder;

@Repository
public interface InterviewerOrderMapper {
	
	/**
	 * 面试单与安排面试的联合查询  面试结果汇总
	 * @param searchInterviewerOrderList
	 * @return
	 */
	List<InterviewerOrderArrangeCombineDto> findInterviewerOrderArrangeCombine(@Param("searchInterviewerOrderList") SearchInterviewerOrderListRequest searchInterviewerOrderList);
	
	/**
	 * 安排面试时 添加 面试单， 修改测评结果和面试单状态
	 * @return interviewerOrderId 面试单id
	 */
	int saveOrUpdateInterviewerOrder(@Param("interviewerOrder") InterviewerOrder interviewerOrder);
	
	/**
	 * 添加面试单
	 * @param interviewerOrder
	 * @return
	 */
	int insertInterviewerOrder(InterviewerOrder interviewerOrder);
	
	/**
	 * 更新面试单
	 * @param request
	 * @return
	 */
	int updateInterviewerOrderByPrimaryKeySelective(ModifyIntervieOrderRequest request);
	
	/**
	 * 招聘专员已经安排的面试列表
	 * @return
	 */
	List<FindArrangedInterviewListDto> findArrangedInterviewByCommissionerList(@Param("searchArrangedInterviewList") SearchArrangedInterviewListRequest searchArrangedInterviewList);
	
	/**
	 * 面试官已经安排的面试列表
	 * @return
	 */
	List<FindArrangedInterviewListDto> findArrangedInterviewByInterviewerList(@Param("interviewArrangements") InterviewArrangements interviewArrangements);
	
	
	/**
	 * 统计招聘职位通过面试人数或者发offer人数
	 * @return
	 */
	int findPassedCount(@Param("passedCountDto") SearchInterviewOrderPassedCountDto passedCountDto);
	
	/**
	 * 查找面试单
	 * @param interviewerOrder
	 * @return
	 */
	List<InterviewerOrder> findInterviewerOrderList(InterviewerOrder interviewerOrder);
	/**
	 * 按照更新的顺去排序
	 * @param requestVO
	 * @return
	 */
	List<InterviewerOrder> findInterviewerOrderByOptime(SearchInterviewerOrderListRequest requestVO);

}
