package com.zrx.hr.freezentime.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.freezentime.domain.dto.SearchFreezenTimeListDto;
import com.zrx.hr.freezentime.domain.request.IsFreezenRequest;
import com.zrx.hr.freezentime.domain.request.SaveOrUpdateFreezenTimeRequest;
import com.zrx.hr.freezentime.domain.request.SearchFreezenTimeListRequest;

@Repository
public interface FreezenTimeMapper {
	
	int saveOrUpdateFreezenTime(@Param("freezenTime") SaveOrUpdateFreezenTimeRequest freezenTime);
	
	List<SearchFreezenTimeListDto> findFreezenTimeList(@Param("freezenTime") SearchFreezenTimeListRequest freezenTimeList);
	
	List<SearchFreezenTimeListDto> isFreezenList(IsFreezenRequest request);
	
	

}
