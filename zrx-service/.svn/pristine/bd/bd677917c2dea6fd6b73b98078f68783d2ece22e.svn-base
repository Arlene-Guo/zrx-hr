package com.zrx.hr.school.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zrx.hr.school.domain.vo.School;
import com.zrx.hr.school.mapper.SchoolMapper;
import com.zrx.hr.school.service.SchoolService;

@Service
public class SchoolServiceImpl implements SchoolService {
	
	@Resource
	SchoolMapper schoolMapper;

	@Override
	public List<School> findSchools(School school) {
		return schoolMapper.findSchools(school);
	}

}
