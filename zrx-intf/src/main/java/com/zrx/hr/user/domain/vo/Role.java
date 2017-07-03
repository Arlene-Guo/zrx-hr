package com.zrx.hr.user.domain.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class Role extends CommonDomain{
	
	private String roleName;
//	private String description;
	//添加分公司字段
	private String company;
	//添加手机号字段
	private String phone;

}
