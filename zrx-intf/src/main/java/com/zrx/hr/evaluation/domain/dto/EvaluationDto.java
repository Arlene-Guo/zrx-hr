package com.zrx.hr.evaluation.domain.dto;

import java.sql.Date;

import lombok.Data;

/**
 * 搜索列表返回
 * @author wangxiaoming
 *
 */
@Data
public class EvaluationDto {
	
	private Integer id;
	private Date importDate;
	private String importFilename;
	private Integer importCount;
	private Integer dutiestype;
	private Integer delFlag;
}
