package com.zrx.hr.duties.service;

import java.util.List;

import com.zrx.hr.duties.domain.dto.DutiesListDto;
import com.zrx.hr.duties.domain.request.SaveOrUpdateDutiesRequest;
import com.zrx.hr.duties.domain.request.SearchDutiesListRequest;
import com.zrx.hr.duties.domain.response.SaveOrUpdateDutiesReponse;
import com.zrx.hr.duties.domain.response.SearchDutiesListReponse;

public interface DutiesService {
	
	public int saveOrUpdate(SaveOrUpdateDutiesRequest requestVO);
	
	public List<DutiesListDto> searchDutiesList(SearchDutiesListRequest requestVO);
	
}
