package com.zrx.hr.duties.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.duties.domain.dto.DutiesListDto;
import com.zrx.hr.duties.domain.request.SaveOrUpdateDutiesRequest;
import com.zrx.hr.duties.domain.request.SearchDutiesListRequest;
import com.zrx.hr.duties.domain.vo.Duties;

@Repository
public interface DutiesMapper {
	
	public int saveOrUpdateDuties(@Param("duties") SaveOrUpdateDutiesRequest duties);
	
	public List<DutiesListDto> searchDutiesList(@Param("duties") SearchDutiesListRequest duties);
	
}
