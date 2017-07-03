package com.zrx.hr.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zrx.hr.user.domain.vo.Role;
import com.zrx.hr.user.mapper.RoleMapper;
import com.zrx.hr.user.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	
	@Resource
	RoleMapper roleMapper;

	@Override
	public List<Role> findRole() {
		return roleMapper.findRole();
	}

	@Override
	public int saveOrUpdate(Role role) {
		return roleMapper.saveOrUpdateRole(role);
	}

}
