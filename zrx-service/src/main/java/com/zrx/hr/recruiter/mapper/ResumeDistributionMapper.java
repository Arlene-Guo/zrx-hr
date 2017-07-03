package com.zrx.hr.recruiter.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.recruiter.domain.dto.ResumeManagerDto;
import com.zrx.hr.recruiter.domain.dto.SearchResumeDistributionListDto;
import com.zrx.hr.recruiter.domain.request.SaveResumeAndDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SearchResumeDistributionListRequest;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;

@Repository
public interface ResumeDistributionMapper {
	
	int insertResumeDistribution(ResumeDistribution resumeDistribution);
	
	int updateResumeDistributionByPrimaryKeySelective(ResumeDistribution resumeDistribution);
	
	int insertBatchResumeDistribution(@Param("records") List<ResumeDistribution> resumeDistributionList);
	
	List<SearchResumeDistributionListDto> searchResumeDistributionList(@Param("resumeDistribution") SearchResumeDistributionListRequest searchResumeDistributionListRequest);

	List<ResumeManagerDto> searchResumeManagerList(@Param("resumeManager") ResumeManagerDto resumeManagerDto);
}

