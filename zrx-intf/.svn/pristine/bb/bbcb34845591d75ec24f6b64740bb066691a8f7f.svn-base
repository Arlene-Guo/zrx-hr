package com.zrx.hr.resume.service;

import java.util.List;

import com.zrx.hr.resume.domain.request.SaveOrUpdateResumeRequest;
import com.zrx.hr.resume.domain.request.SearchResumeListRequest;
import com.zrx.hr.resume.domain.vo.Resume;

public interface ResumeService {

	/**
	 * 招聘专员录入
	 * 
	 * @param resume
	 * @return
	 */
	int insertResume(Resume resume);

	/**
	 * 推荐人录入
	 * 
	 * @param requestVO
	 * @return
	 */
	int saveOrUpdate(SaveOrUpdateResumeRequest requestVO);

	List<Resume> searchResumeList(SearchResumeListRequest requestVO);

	List<Resume> findResumeByOptime(SearchResumeListRequest requestVO);

}
