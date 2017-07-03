package com.zrx.hr.evaluation.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zrx.hr.evaluation.domain.request.InsertBatchEvaluationLinkListRequest;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;

public interface EvaluationLinkService {
	
	
	/**
	 * 批量导入
	 * @param evaluationLinkList
	 * @return
	 */
	int insertBatch(InsertBatchEvaluationLinkListRequest evaluationLinkList);
	
	/**
	 * 导入， 取消
	 * @return
	 */
	int saveOrUpdate(EvaluationLink evaluationLink);
	
	/**
	 * 获取一个可用测评链接，如果没有可以链接返回null
	 * 使用事物（查到一个可用的，然后更新状态，并返回这个可用的链接）
	 * 先找到一个可用的link，然后标记为正在使用，发送邮件后标记为已使用，如果没有发送，则需要取消使用
	 * @param int dutiestype
	 * @return 
	 */
	EvaluationLink getEvaluationLink(EvaluationLink evaluationLink);
	
	

}
