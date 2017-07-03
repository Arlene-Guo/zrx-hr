package com.zrx.hr.user.domain.request;

import java.util.List;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SaveOrUpdateUserRoleRequest extends QueryCommonParamVO {
	
	private Integer id;
	private Integer uid;
	private List<Integer> roleids; //超级管理员默认值为管理员 1
	private Integer delFlag;
	
//	权限配置新增查询字段 
	private String company;//公司
	private String core;//中心
	private String phone;//移动电话

}
