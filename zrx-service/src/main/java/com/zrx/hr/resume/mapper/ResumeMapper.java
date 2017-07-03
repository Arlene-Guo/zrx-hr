package com.zrx.hr.resume.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.resume.domain.request.SaveOrUpdateResumeRequest;
import com.zrx.hr.resume.domain.request.SearchResumeListRequest;
import com.zrx.hr.resume.domain.vo.Resume;

@Repository
public interface ResumeMapper {
	
	public int insertResume(Resume resume);
	
	public int saveOrUpdateResume(@Param("resume") Resume resume);
	
	public List<Resume> searchResumeList(@Param("resume") SearchResumeListRequest resume);
	
	public List<Resume> findResumeByOptime(@Param("resume") SearchResumeListRequest resume);

}
