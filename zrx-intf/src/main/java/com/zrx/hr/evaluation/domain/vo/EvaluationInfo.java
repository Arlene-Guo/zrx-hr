package com.zrx.hr.evaluation.domain.vo;

import java.sql.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class EvaluationInfo extends CommonDomain{
	
	private Date importDate;
	private String importFilename;
	private Integer importCount;
	private Integer dutiestype;

}
