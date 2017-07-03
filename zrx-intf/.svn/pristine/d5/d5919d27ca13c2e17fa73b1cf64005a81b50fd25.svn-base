package com.zrx.hr.freezentime.service;

import java.util.List;

import com.zrx.hr.freezentime.domain.dto.SearchFreezenTimeListDto;
import com.zrx.hr.freezentime.domain.request.IsFreezenRequest;
import com.zrx.hr.freezentime.domain.request.SaveOrUpdateFreezenTimeRequest;
import com.zrx.hr.freezentime.domain.request.SearchFreezenTimeListRequest;

public interface FreezenTimeService {
	
	/**
	 * 新增 编辑 解冻
	 * @param request
	 * @return
	 */
	int saveOrUpdate(SaveOrUpdateFreezenTimeRequest request);
	
	/**
	 * 冻结时间列表
	 * @param request
	 * @return
	 */
	List<SearchFreezenTimeListDto> findFreezenTimeList(SearchFreezenTimeListRequest request);

	String isFreezen(IsFreezenRequest request);

	String isFreezenDan(IsFreezenRequest request);
	
	/**
	 * 判断给定时间是否被冻结
	 * @param request
	 * @return true 冻结  false 未冻结
	 */
	//boolean isFreezen(IsFreezenRequest request);
	
	
	
}
