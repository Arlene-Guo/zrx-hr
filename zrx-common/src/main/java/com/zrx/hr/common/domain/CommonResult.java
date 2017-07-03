package com.zrx.hr.common.domain;

import java.util.List;

import lombok.Data;

@Data
public class CommonResult<E> {
	
	private Integer total;
//	private Integer currentPgae;
//	private Integer pageSize;
	private List<E> rows;

}
