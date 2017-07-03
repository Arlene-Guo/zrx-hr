package com.zrx.hr.user.service;

import java.util.List;

import com.zrx.hr.user.domain.dto.UserRoleDto;
import com.zrx.hr.user.domain.request.SaveOrUpdateUserRoleRequest;
import com.zrx.hr.user.domain.request.SearchUserRoleListRequest;
import com.zrx.hr.user.domain.vo.Role;
import com.zrx.hr.user.domain.vo.Users;

public interface UserRoleService {
	
	/**
	 * 用戶賦值权限
	 * @param request
	 * @return
	 */
	int saveOrUpdate(SaveOrUpdateUserRoleRequest request);
	
	/**
	 * 用户对应角色列表
	 * @param request
	 * @return
	 */
	List<UserRoleDto> findUserRole(SearchUserRoleListRequest request);
	 
	/**
	 * 查询条件 角色id 和 角色名称
	 * 根据角色 返回 用户的userid和名称
	 * @return
	 */
	List<Users> findUserIdAllByRoleId(Role role);

	List<UserRoleDto> findUserIdAllByPhone(Role role);

	List<UserRoleDto> findUserRoleByAthory(SearchUserRoleListRequest request);

}
