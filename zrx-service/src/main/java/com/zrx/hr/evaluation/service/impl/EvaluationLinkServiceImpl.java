package com.zrx.hr.evaluation.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.evaluation.domain.request.InsertBatchEvaluationLinkListRequest;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;
import com.zrx.hr.evaluation.mapper.EvaluationLinkMapper;
import com.zrx.hr.evaluation.service.EvaluationLinkService;

@Service
public class EvaluationLinkServiceImpl implements EvaluationLinkService {
	
	@Resource
	EvaluationLinkMapper evaluationLinkMapper;

	@Override
	public int insertBatch(InsertBatchEvaluationLinkListRequest evaluationLinkList) {
		List<EvaluationLink> list = evaluationLinkList.getEvaluationLinkList();
		if(CollectionUtils.isEmpty(list)){
			return 0;
		}
		return evaluationLinkMapper.insertBatch(list);
	}

	@Override
	public int saveOrUpdate(EvaluationLink evaluationLink) {
		return evaluationLinkMapper.saveOrUpdateEvaluationLink(evaluationLink);
	}

	@Override
	@Transactional
	public EvaluationLink getEvaluationLink(EvaluationLink evaluationLink) {
		EvaluationLink link = evaluationLinkMapper.getEvaluationLink(evaluationLink);
		if(link == null) return null;
		link.setUserState(1);
		evaluationLinkMapper.saveOrUpdateEvaluationLink(link);
		return link;
	}

}
