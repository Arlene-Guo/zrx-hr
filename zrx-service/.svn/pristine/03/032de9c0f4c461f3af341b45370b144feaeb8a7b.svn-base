package com.zrx.hr.evaluation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.evaluation.domain.dto.DutiesTypeCountDto;
import com.zrx.hr.evaluation.domain.dto.EvaluationDto;
import com.zrx.hr.evaluation.domain.request.SaveOrUpdateEvaluationRequest;
import com.zrx.hr.evaluation.domain.request.SearchEvaluationListRequest;

@Repository
public interface EvaluationInfoMapper {

	int saveOrUpdateEvaluation(@Param("evaluationRequest") SaveOrUpdateEvaluationRequest evaluationRequest);
	
	List<EvaluationDto> findEvaluation(@Param("evaluationListRequest") SearchEvaluationListRequest evaluationListRequest);
	
//	List<Integer> findDutiesTypeCount();
}
