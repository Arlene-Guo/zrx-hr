package com.zrx.hr.interviewer.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchInterviewNumberListRequest extends QueryCommonParamVO {
	
	private Integer id;
	private Integer uid;
	private Integer type;

}
