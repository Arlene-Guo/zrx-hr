package com.zrx.hr.interviewer.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ModifyIntervieOrderRequest extends QueryCommonParamVO {
	
	private Integer id;
	private Integer evaluationResult;
	private Integer state;
	
//	更新招聘专员名称
	private String resumeCommissionerName;
}
