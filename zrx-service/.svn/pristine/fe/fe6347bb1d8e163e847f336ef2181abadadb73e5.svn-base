package com.zrx.hr.recruiter.service.impl;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.recruiter.domain.dto.ResumeManagerDto;
import com.zrx.hr.recruiter.domain.dto.SearchResumeDistributionListDto;
import com.zrx.hr.recruiter.domain.request.SaveBatchResumeDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SaveResumeAndDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SearchResumeDistributionListRequest;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;
import com.zrx.hr.recruiter.mapper.ResumeDistributionMapper;
import com.zrx.hr.recruiter.service.ResumeDistributionService;
import com.zrx.hr.resume.domain.request.SaveOrUpdateResumeRequest;
import com.zrx.hr.resume.domain.vo.Resume;
import com.zrx.hr.resume.service.ResumeService;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.mapper.UserMapper;

@Slf4j
@Service
public class ResumeDistributionImpl implements ResumeDistributionService{
	
	@Resource
	ResumeDistributionMapper resumeDistributionMapper;
	
	@Resource
	ResumeService resumeService;
	
	@Resource
	UserMapper userMapper;

	@Override
	public List<SearchResumeDistributionListDto> searchResumeDistributionList(SearchResumeDistributionListRequest request) {
		return resumeDistributionMapper.searchResumeDistributionList(request);
	}


	@Override
	@Transactional 
	public int saveResumeAndDistribution(SaveResumeAndDistributionRequest request) {
		
		Integer resumeId = 0;
		try{
			Resume resume = new Resume();
			resume = JsonUtil.parseObject(JsonUtil.toJson(request), Resume.class);
			resume.setUid(request.getUid());
			int isExsit = resumeService.insertResume(resume);
			if(isExsit == -1){
				return -1;
			}
			resumeId  = resume.getId();
		}catch(Throwable e){
			//在这里处理 
			// 1 简历是否重复添加 如果简历已经添加过，则return 并且返回错误 信息
			LOG.info(e.getMessage());
		}
		
		if(resumeId <= 0 ){
			return 0;
		}
		//简历添加成功
		Integer resumeDistributionId = 0;
		Integer resumeCommissionerId = request.getUid();  //从登录中获取
		
		try{
			ResumeDistribution saveResumeDistributionRequest = new ResumeDistribution();
			saveResumeDistributionRequest.setResumeId(resumeId);
			saveResumeDistributionRequest.setResumeCommissionerId(resumeCommissionerId);
			saveResumeDistributionRequest.setState(1);  //自动合格
			save(saveResumeDistributionRequest);
			resumeDistributionId = saveResumeDistributionRequest.getId();
		}catch(Throwable e){
			try {
				throw e;
			} catch (Throwable e1) {
				LOG.info(e1.getMessage());
			}
		}
		
		return resumeDistributionId;
	}
	
	@Override
	public int save(ResumeDistribution request) {
		Integer resumeCommissionerId = request.getResumeCommissionerId();
		Users users = new Users();
		users.setId(resumeCommissionerId);
		List<Users> list = userMapper.findUsers(users);
		if(CollectionUtils.isEmpty(list)){
			return 0;
		}
		users = list.get(0);
		request.setResumeCommissionerName(users.getUserName());
		return resumeDistributionMapper.insertResumeDistribution(request);
		
	}
	
	public int saveBatch(SaveBatchResumeDistributionRequest saveBatchResumeDistributionRequest ){
		List<ResumeDistribution> resumeDistributionList = saveBatchResumeDistributionRequest.getResumeDistributionList();
		if(CollectionUtils.isEmpty(resumeDistributionList)){
			return 0;
		}
		return resumeDistributionMapper.insertBatchResumeDistribution(resumeDistributionList);
	}
	
	@Override
	public int update(ResumeDistribution request) {
		return resumeDistributionMapper.updateResumeDistributionByPrimaryKeySelective(request);
	}


	@Override
	public List<ResumeManagerDto> searchResumeManagerList(
			ResumeManagerDto resumeManagerDto) {
		return resumeDistributionMapper.searchResumeManagerList(resumeManagerDto);
	}

}
