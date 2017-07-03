package com.zrx.hr.evaluation.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchEvaluationListRequest extends QueryCommonParamVO {

	private Integer id;
}
