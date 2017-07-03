package com.zrx.hr.user.domain.dto;

import lombok.Data;

@Data
public class UserRoleDto {

	/**
	 * user_role 主键
	 */
	private Integer userRoleId;
	private Integer uid;
	private Integer roleid;
	private String  userName;
	private String dutiesName;
	private String jobNumber;
	private String roleName;
	private Integer delFlag;
	
//	权限配置新增查询字段 
	private String company;//公司
	private String core;//中心
	private String phone;//移动电话
	private String headQuarters;//总公司
	private String business;//业务
	private String department;//部门
	private String group;//组
	
	private String grade;

}
