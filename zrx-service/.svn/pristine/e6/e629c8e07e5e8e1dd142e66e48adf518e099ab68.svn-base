package com.zrx.hr.interviewer.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.interviewer.domain.request.SaveOrUpdateInterviewNumber;
import com.zrx.hr.interviewer.domain.request.SearchInterviewNumberListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewNumber;
import com.zrx.hr.interviewer.mapper.InterviewNumberMapper;
import com.zrx.hr.interviewer.service.InterviewNumberService;

@Service
public class InterviewNumberServiceImpl implements InterviewNumberService {
	
	@Resource
	InterviewNumberMapper interviewNumberMapper;

	@Override
	public int saveOrUpdateInterviewNumber(SaveOrUpdateInterviewNumber interviewNumber) {
		List<InterviewNumber> list = interviewNumber.getInterviewNumbers();
		if(CollectionUtils.isEmpty(list)){
			return 0;
		}
		return interviewNumberMapper.saveOrUpdateInterviewNumber(list);
	}

	@Override
	public List<InterviewNumber> searchInterviewNumberList(SearchInterviewNumberListRequest interviewNumber) {
		return interviewNumberMapper.searchInterviewNumberList(interviewNumber);
	}

}
