package com.zrx.hr.evaluation.domain.vo;

import com.zrx.hr.common.domain.CommonDomain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class EvaluationLink extends CommonDomain{
	
	private Integer batchid;
	private String link1;
	private String link2;
	private Integer userState;
	private String name;
	private String password;
	private Integer dutiestype;
}
