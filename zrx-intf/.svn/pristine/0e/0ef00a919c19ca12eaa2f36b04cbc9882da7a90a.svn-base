package com.zrx.hr.recruiter.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zrx.hr.recruiter.domain.dto.ResumeManagerDto;
import com.zrx.hr.recruiter.domain.dto.SearchResumeDistributionListDto;
import com.zrx.hr.recruiter.domain.request.FilterResumeRequest;
import com.zrx.hr.recruiter.domain.request.SaveBatchResumeDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SaveResumeAndDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SearchResumeDistributionListRequest;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;

public interface ResumeDistributionService {
	
	/**
	 * 管理员 简历管理 列表
	 */
	List<ResumeManagerDto> searchResumeManagerList(@Param("resumeManager") ResumeManagerDto resumeManagerDto);
	
	/**
	 * 添加简历，自动分配给当前招聘专员
	 * @param requestVO
	 * @return
	 */
	public int saveResumeAndDistribution(SaveResumeAndDistributionRequest request);
	
	/**
	 * 分配简历 
	 * @param request
	 * @return 返回主键
	 */
	public int save(ResumeDistribution request);
	
	/**
	 * 批量分配
	 * @param resumeDistributionList
	 * @return
	 */
	public int saveBatch(SaveBatchResumeDistributionRequest saveBatchResumeDistributionRequest);
	
	/**
	 * 修改分配
	 * @param request
	 * @return
	 */
	public int update(ResumeDistribution request);
	
	/**
	 * 简历分配列表
	 * @param request
	 * @return
	 */
	public List<SearchResumeDistributionListDto> searchResumeDistributionList(SearchResumeDistributionListRequest request);

}
