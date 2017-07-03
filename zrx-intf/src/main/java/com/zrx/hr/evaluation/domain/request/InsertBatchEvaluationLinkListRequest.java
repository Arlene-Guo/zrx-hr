package com.zrx.hr.evaluation.domain.request;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;

@Data
@EqualsAndHashCode(callSuper = true)
public class InsertBatchEvaluationLinkListRequest extends QueryCommonParamVO {

	List<EvaluationLink> evaluationLinkList;
}
