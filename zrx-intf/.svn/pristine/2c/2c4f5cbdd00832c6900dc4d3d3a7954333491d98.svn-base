package com.zrx.hr.evaluation.service;

import java.util.List;

import com.zrx.hr.evaluation.domain.dto.DutiesTypeCountDto;
import com.zrx.hr.evaluation.domain.dto.EvaluationDto;
import com.zrx.hr.evaluation.domain.request.SaveOrUpdateEvaluationRequest;
import com.zrx.hr.evaluation.domain.request.SearchEvaluationListRequest;

public interface EvaluationInfoService {
	
	/**
	 * 保存评测总体信息，通过id和path判断是否解析excel文件
	 * @param request
	 * @return
	 */
	int saveOrUpdate(SaveOrUpdateEvaluationRequest request, String basePath);
	
	/**
	 * 返回列表或者某个评测
	 * @param request
	 * @return
	 */
	List<EvaluationDto> findEvaluation(SearchEvaluationListRequest request);
	
	/**
	 * 返回汇总评测剩余top50和非top50
	 * @return
	 */
	DutiesTypeCountDto findDutiesTypeCount();
	
}
