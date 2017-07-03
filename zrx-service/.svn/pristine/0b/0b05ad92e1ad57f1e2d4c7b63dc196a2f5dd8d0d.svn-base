package com.zrx.hr.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.user.domain.vo.Role;

@Repository
public interface RoleMapper {

	List<Role> findRole();
	
	int saveOrUpdateRole(@Param("role") Role role);
}
