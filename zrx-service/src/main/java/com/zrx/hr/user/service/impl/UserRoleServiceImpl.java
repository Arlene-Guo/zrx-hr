package com.zrx.hr.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.user.domain.dto.UserRoleDto;
import com.zrx.hr.user.domain.request.SaveOrUpdateUserRoleRequest;
import com.zrx.hr.user.domain.request.SearchUserRoleListRequest;
import com.zrx.hr.user.domain.vo.Role;
import com.zrx.hr.user.domain.vo.UserRole;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.mapper.UserRoleMapper;
import com.zrx.hr.user.service.UserRoleService;

@Service
public class UserRoleServiceImpl implements UserRoleService {
	
	@Resource
	UserRoleMapper userRoleMapper;

	@Override
	public int saveOrUpdate(SaveOrUpdateUserRoleRequest request) {
		Integer userroleId = request.getId();
		UserRole userRole = null;
		userroleId = userroleId != null ? userroleId : 0;
		if(userroleId <= 0){ //新增
			List<Integer> roleids = request.getRoleids();
			if(CollectionUtils.isEmpty(roleids)){
				return 0;
			}
			
			
			for(Integer roleid:roleids){
				userRole = new UserRole();
				userRole.setId(request.getId());
				userRole.setUid(request.getUid());
				userRole.setRoleid(roleid);
				userRole.setDelFlag(request.getDelFlag());
				userRoleMapper.saveOrUpdateUserRole(userRole);
			}
		}else{ //更新
			userRole = JsonUtil.parseObject(JsonUtil.toJson(request), UserRole.class);
			userRoleMapper.UpdateUserRoleByPrimaryKeySelective(userRole);
		}
		
		return 1;
	}

	@Override
	public List<UserRoleDto> findUserRole(SearchUserRoleListRequest request) {
		return userRoleMapper.findUserRole(request);
	}

	@Override
	public List<Users> findUserIdAllByRoleId(Role role) {
		return userRoleMapper.findUserIdAllByRoleId(role);
	}
	
	@Override
	public List<UserRoleDto> findUserIdAllByPhone(Role role) {
		return userRoleMapper.findUserIdAllByPhone(role);
	}
	
	@Override
	public List<UserRoleDto> findUserRoleByAthory(SearchUserRoleListRequest request) {
		return userRoleMapper.findUserRoleByAthory(request);
	}
}
