package com.zrx.hr.duties.service.impl;

import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.constants.OrderStatus;
import com.zrx.hr.duties.domain.dto.DutiesListDto;
import com.zrx.hr.duties.domain.request.SaveOrUpdateDutiesRequest;
import com.zrx.hr.duties.domain.request.SearchDutiesListRequest;
import com.zrx.hr.duties.mapper.DutiesMapper;
import com.zrx.hr.duties.service.DutiesService;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewOrderPassedCountDto;
import com.zrx.hr.interviewer.mapper.InterviewerOrderMapper;
@Slf4j
@Service
public class DutiesServiceImpl implements DutiesService {
	
	@Resource
	DutiesMapper dutiesMapper;
	
	@Resource
	InterviewerOrderMapper interviewerOrderMapper;

	@Override
	public int saveOrUpdate(SaveOrUpdateDutiesRequest requestVO) {
		return dutiesMapper.saveOrUpdateDuties(requestVO);
	}

	@Override
	public List<DutiesListDto> searchDutiesList(SearchDutiesListRequest requestVO) {
		List<DutiesListDto> dutiesListDtoList = dutiesMapper.searchDutiesList(requestVO);
		if(CollectionUtils.isEmpty(dutiesListDtoList)){
			return null;
		}
		
		SearchInterviewOrderPassedCountDto passedCount = null;
		int count = 0;
		for(DutiesListDto dutiesListDto:dutiesListDtoList){
			passedCount = new SearchInterviewOrderPassedCountDto();
			passedCount.setIntervieweeDutiesId(dutiesListDto.getDutiesNumber());
			passedCount.setIntervieweeDutiesName(dutiesListDto.getDutiesName());
			passedCount.setState(OrderStatus.SECOND_INTERVIEW.getValue());
			count = interviewerOrderMapper.findPassedCount(passedCount);
			dutiesListDto.setPassCounts(count);
			passedCount.setState(OrderStatus.OFFERED.getValue());
			count = interviewerOrderMapper.findPassedCount(passedCount);
			dutiesListDto.setOfferCounts(count);
		}
		return dutiesListDtoList;
	}


}
