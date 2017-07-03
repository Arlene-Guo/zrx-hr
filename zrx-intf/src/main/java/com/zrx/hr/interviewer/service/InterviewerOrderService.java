package com.zrx.hr.interviewer.service;

import java.util.List;

import com.zrx.hr.interviewer.domain.dto.FindArrangedInterviewListDtoIntegration;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewOrderPassedCountDto;
import com.zrx.hr.interviewer.domain.request.ArrangementsInterviewRequest;
import com.zrx.hr.interviewer.domain.request.ModifyIntervieOrderRequest;
import com.zrx.hr.interviewer.domain.request.SearchArrangedInterviewListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewerOrderListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewArrangements;
import com.zrx.hr.interviewer.domain.vo.InterviewerOrder;

public interface InterviewerOrderService {
	
	/**
	 * 面试结果汇总列表
	 * @param request
	 * @return
	 */
	List<SearchInterviewListDto> findInterviewerOrderList(SearchInterviewerOrderListRequest request);
	
	/**
	 * 安排面试
	 * @return interviewerOrderId 面试单id
	 */
	int arrangementsInterview(ArrangementsInterviewRequest request);
	
	/**
	 * 更新面试安排
	 * @param request
	 * @return
	 */
	int updateArrangementsInterview(ArrangementsInterviewRequest request);
	
	
	/**
	 *  修改状态 ：测评结果，面试单状态 修改招聘专员
	 *  @return interviewerOrderId 面试单id
	 */
	int modifyIntervieOrder(ModifyIntervieOrderRequest request);
	
	/**
	 * 招聘专员已经安排的面试列表
	 * @return
	 */
	List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewByCommissionerList(SearchArrangedInterviewListRequest request);
	
	/**
	 * 面试官已经安排的面试列表
	 * @return
	 */
	List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewByInterviewerList(InterviewArrangements interviewArrangements);
	
	/**
	 * 统计招聘职位通过面试人数或者发offer人数
	 * @param passedCountDto
	 * @return
	 */
	int findPassedCount(SearchInterviewOrderPassedCountDto passedCountDto);

	/**
	 * 按照更新的顺去排序
	 * @param interviewerOrder
	 * @return
	 */
	List<InterviewerOrder> findInterviewerOrderByOptime(SearchInterviewerOrderListRequest requestVO);
	

}
