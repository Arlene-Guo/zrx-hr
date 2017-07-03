package com.zrx.hr.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.user.domain.dto.FindDutiesInfoDto;
import com.zrx.hr.user.domain.vo.Users;

@Repository
public interface UserMapper {
	
	/**
	 * 批量导入
	 * @param usersList
	 * @return
	 */
	int insertBatch(@Param("records") List<Users> usersList);
	
	int saveOrUpdateUsers(@Param("users") Users users);
	
	List<Users> findUsers(@Param("users") Users users);
	
	/**
     * 返回组织架构中的职能名称
     * @return
     */
    List<FindDutiesInfoDto> findDutiesInfoDto();

}
