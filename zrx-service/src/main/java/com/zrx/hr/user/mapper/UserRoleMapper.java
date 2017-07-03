package com.zrx.hr.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.user.domain.dto.UserRoleDto;
import com.zrx.hr.user.domain.request.SearchUserRoleListRequest;
import com.zrx.hr.user.domain.vo.Role;
import com.zrx.hr.user.domain.vo.UserRole;
import com.zrx.hr.user.domain.vo.Users;

@Repository
public interface UserRoleMapper {

	int saveOrUpdateUserRole(UserRole userRole);
	
	int UpdateUserRoleByPrimaryKeySelective(UserRole userRole);
	
	List<UserRoleDto> findUserRole(@Param("userRole") SearchUserRoleListRequest userRole);
	 
	/**
	 * 返回指定角色类型所有有效用户的userid
	 * @param int roleid
	 * @return
	 */
	List<Users> findUserIdAllByRoleId(@Param("role") Role role);
	
	/**
	 * 返回分公司已经授权的用户列表
	 * @param role
	 * @return
	 */
	List<UserRoleDto> findUserIdAllByPhone(@Param("role") Role role);
	
	/**
	 * 增加角色的权限判断
	 * @param role
	 * @return
	 */
	List<UserRoleDto> findUserRoleByAthory(@Param("userRole") SearchUserRoleListRequest userRole);
}
