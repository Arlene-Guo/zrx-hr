package com.zrx.hr.user.service;

import java.util.List;
import java.util.Map;

import com.zrx.hr.user.domain.dto.FindDutiesInfoDto;
import com.zrx.hr.user.domain.vo.Users;

public interface UserService {
	
	int saveOrUpdate(Users users);
	
	/** 
	 * @param users userName, dutiesName, id
	 * @return
	 */
	List<Users> findUsers(Users users);

    /**
     * 返回组织架构中的职能名称
     * @return
     */
    List<FindDutiesInfoDto> findDutiesInfoDto();

	int Batchinsert(List<Users> usersList);

	List<Map<Integer, String>> ExplanExcel();
    
}
