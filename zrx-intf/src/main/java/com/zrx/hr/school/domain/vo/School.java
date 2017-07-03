package com.zrx.hr.school.domain.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@SuppressWarnings("serial")
@Data
@EqualsAndHashCode(callSuper = true)
public class School extends CommonDomain{
	
	private Integer ranking;
	private String schoolName;

}
