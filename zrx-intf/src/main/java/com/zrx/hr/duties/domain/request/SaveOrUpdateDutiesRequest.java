package com.zrx.hr.duties.domain.request;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SaveOrUpdateDutiesRequest extends QueryCommonParamVO {
	
	private Integer id; 
	private String dutiesName;
	private String dutiesNumber;
	private String description;
	private String dutiesType;
	private Integer recruitsCounts;
	private String dutiesDescription;
	private Integer delFlag;
	private String company;
}
