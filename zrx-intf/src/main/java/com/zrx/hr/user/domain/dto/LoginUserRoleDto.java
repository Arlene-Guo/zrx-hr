package com.zrx.hr.user.domain.dto;

import java.util.List;

import lombok.Data;

@Data
public class LoginUserRoleDto {
	
	private Integer uid;
	private String userName;
	private List<Integer> userRoleId;
	
//	管理员所在的分公司
	private String company;

}
