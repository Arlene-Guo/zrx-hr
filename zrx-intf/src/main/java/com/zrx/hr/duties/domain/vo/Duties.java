package com.zrx.hr.duties.domain.vo;

import com.zrx.hr.common.domain.CommonDomain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Duties extends CommonDomain{
	
	private String dutiesName;
	private String dutiesNumber;
	private String description;
	private String dutiesType;
	private Integer recruitsCounts;
	
}
