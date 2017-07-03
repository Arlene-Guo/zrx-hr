package com.zrx.hr.resume.servcie.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.resume.domain.request.SaveOrUpdateResumeRequest;
import com.zrx.hr.resume.domain.request.SearchResumeListRequest;
import com.zrx.hr.resume.domain.vo.Resume;
import com.zrx.hr.resume.mapper.ResumeMapper;
import com.zrx.hr.resume.service.ResumeService;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.mapper.UserMapper;

@Slf4j
@Service
public class ResumeServiceImple implements ResumeService {
	
	public static Map<Integer, Map<String, String>> mailMap = new HashMap<Integer, Map<String, String>>();
	
//	static{
//		mailMap.put(1, value)
//	}

	@Resource
	ResumeMapper resumeMapper;
	@Resource
	UserMapper userMapper;

	@Override
	public int saveOrUpdate(SaveOrUpdateResumeRequest requestVO) {
		Resume resume = JsonUtil.parseObject(JsonUtil.toJson(requestVO), Resume.class);
		if(requestVO.getId() <= 0){
			resume.setUid(requestVO.getUid());
			resume.setRecommendedSource("内部推荐");
			setResume(resume);
			resume.setId(null);
			resume.setUid(null);
			Boolean isExsit = isResumeExsit(resume);
			if(isExsit){
				return -1;
			}
		}
		//增加逻辑 判断是否有重复添加的情况
		return resumeMapper.saveOrUpdateResume(resume);
	}
	
	private void setResume(Resume resume){
		
		Integer uid = resume.getUid();
		Users users = new Users();
		users.setId(uid);
		List<Users> list = userMapper.findUsers(users);
		if(CollectionUtils.isEmpty(list)){
			return ;
		}
		users = list.get(0);
		resume.setRecommendedId(uid);
		resume.setRecommendedName(users.getUserName());
		resume.setRecommendedJobNumber(users.getJobNumber());
	}
	
	private boolean isResumeExsit(Resume resume){
		SearchResumeListRequest resumeRequest = JsonUtil.parseObject(JsonUtil.toJson(resume), SearchResumeListRequest.class);
		List<Resume> list = resumeMapper.searchResumeList(resumeRequest);
		return list.size() > 0;
	}

	@Override
	public List<Resume> searchResumeList(SearchResumeListRequest requestVO) {
		return resumeMapper.searchResumeList(requestVO);
	}

	@Override
	public int insertResume(Resume resume) {
		setResume(resume);
		resume.setId(null);
		resume.setUid(null);
		Boolean isExsit = isResumeExsit(resume);
		if(isExsit){
			return -1;
		}
		resume.setRecommendedSource("招聘专员录入");
		return resumeMapper.insertResume(resume);
	}

	
	@Override
	public List<Resume> findResumeByOptime(SearchResumeListRequest requestVO) {
		return resumeMapper.findResumeByOptime(requestVO);
	}

}
