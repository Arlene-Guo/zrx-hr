package com.zrx.hr.recruiter.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuniu.nfbird.web.annotation.Json;
import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.domain.CommonResult;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.response.ResponseBase64Util;
import com.zrx.hr.common.util.response.ResponseUtil;
import com.zrx.hr.freezentime.domain.dto.SearchFreezenTimeListDto;
import com.zrx.hr.recruiter.domain.dto.ResumeManagerDto;
import com.zrx.hr.recruiter.domain.dto.SearchResumeDistributionListDto;
import com.zrx.hr.recruiter.domain.request.SaveBatchResumeDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SaveResumeAndDistributionRequest;
import com.zrx.hr.recruiter.domain.request.SearchResumeDistributionListRequest;
import com.zrx.hr.recruiter.domain.response.ResumeDistributionResponse;
import com.zrx.hr.recruiter.domain.response.SearchResumeDistributionResponse;
import com.zrx.hr.recruiter.domain.response.SearchResumeManagerListResponse;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;
import com.zrx.hr.recruiter.service.ResumeDistributionService;
import com.zrx.hr.resume.domain.response.SaveOrUpdateResumeReponse;

@Slf4j
@RequestMapping("/recruiter")
@Controller
public class RecruiterController {
	
	@Resource
	ResumeDistributionService resumeDistributionService;
	
	/**
	 * 保存简历分配信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/saveResumeDistribution", method = RequestMethod.GET)
	@ResponseBody
	public void saveResumeDistribution(@Json ResumeDistribution requestVO, HttpServletResponse servletRes) {
		ResumeDistributionResponse response = ResponseUtil.createResponse(ResumeDistributionResponse.class);
        try {
            LOG.info("保存简历分配入参：{}", JsonUtil.toJson(requestVO));
            resumeDistributionService.save(requestVO);
            response.setData(requestVO.getId());
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("保存简历分配出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("保存简历分配异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 批量简历分配信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/saveBatchResumeDistribution", method = RequestMethod.GET)
	@ResponseBody
	public void saveBatchResumeDistribution(@Json SaveBatchResumeDistributionRequest requestVO, HttpServletResponse servletRes) {
		ResumeDistributionResponse response = ResponseUtil.createResponse(ResumeDistributionResponse.class);
		int result;
        try {
            LOG.info("批量简历分配入参：{}", JsonUtil.toJson(requestVO));
            result = resumeDistributionService.saveBatch(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("批量简历分配出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("批量简历分配异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 更新简历分配信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/updateResumeDistribution", method = RequestMethod.GET)
	@ResponseBody
	public void updateResumeDistribution(@Json ResumeDistribution requestVO, HttpServletResponse servletRes) {
		ResumeDistributionResponse response = ResponseUtil.createResponse(ResumeDistributionResponse.class);
		int result;
        try {
            LOG.info("更新简历分配入参：{}", JsonUtil.toJson(requestVO));
            result = resumeDistributionService.update(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("更新简历分配出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("更新简历分配异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 简历分配列表信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/searchResumeDistributionList", method = RequestMethod.GET)
	@ResponseBody
	public void searchResumeDistributionList(@Json SearchResumeDistributionListRequest requestVO, HttpServletResponse servletRes) {
		SearchResumeDistributionResponse response = ResponseUtil.createResponse(SearchResumeDistributionResponse.class);
		List<SearchResumeDistributionListDto> searchResumeDistributionDtoList;
		List<SearchResumeDistributionListDto> searchResumeDistributionDtoListCount;
        try {
            LOG.info("简历分配列表入参：{}", JsonUtil.toJson(requestVO));
            searchResumeDistributionDtoList = resumeDistributionService.searchResumeDistributionList(requestVO);
            requestVO.setIsPage(0);
            searchResumeDistributionDtoListCount = resumeDistributionService.searchResumeDistributionList(requestVO);
            CommonResult<SearchResumeDistributionListDto> result = new CommonResult<SearchResumeDistributionListDto>();
            result.setRows(searchResumeDistributionDtoList);
            if(!CollectionUtils.isEmpty(searchResumeDistributionDtoListCount)){
            	 result.setTotal(searchResumeDistributionDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);                 
            LOG.info("简历分配列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("简历分配列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 保存简历并分配
	 * @param requestVO
	 * @param servletRes
	 * @return resumeDistributionId;
	 */
	@RequestMapping(value = "/saveResumeAndDistribution", method = RequestMethod.GET)
	@ResponseBody
	public void saveResumeAndDistribution(@Json SaveResumeAndDistributionRequest requestVO, HttpServletResponse servletRes) {
		ResumeDistributionResponse response = ResponseUtil.createResponse(ResumeDistributionResponse.class);
		Integer resumeDistributionId;
		try {
            LOG.info("保存简历并分配入参：{}", JsonUtil.toJson(requestVO));
            resumeDistributionId = resumeDistributionService.saveResumeAndDistribution(requestVO);
            if(resumeDistributionId == -1){
            	response = ResponseUtil.createResponse(ResumeDistributionResponse.class, ErrorCode.RESUME_ALREADY_ADD);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            	return ;
            }
            response.setData(resumeDistributionId);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("保存简历并分配出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("保存简历并分配异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 招聘专员待安排列表信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/readyInterview", method = RequestMethod.GET)
	@ResponseBody
	public void readyInterview(@Json SearchResumeDistributionListRequest requestVO, HttpServletResponse servletRes) {
		SearchResumeDistributionResponse response = ResponseUtil.createResponse(SearchResumeDistributionResponse.class);
		List<SearchResumeDistributionListDto> searchResumeDistributionDtoList;
		List<SearchResumeDistributionListDto> searchResumeDistributionDtoListCount;
        try {
            LOG.info(" 招聘专员待安排列表入参：{}", JsonUtil.toJson(requestVO));
            searchResumeDistributionDtoList = resumeDistributionService.searchResumeDistributionList(requestVO);
            requestVO.setIsPage(0);
            searchResumeDistributionDtoListCount = resumeDistributionService.searchResumeDistributionList(requestVO);
            
            List<SearchResumeDistributionListDto> filterList = null;
            if(!CollectionUtils.isEmpty(searchResumeDistributionDtoList)){
            	filterList = new ArrayList<SearchResumeDistributionListDto>();
            	for(SearchResumeDistributionListDto filterDto:searchResumeDistributionDtoList){
            		//只有初筛合格 或者 初试通过才会返回
            		if(filterDto.getState() == null || filterDto.getFilterState() == null 
            				|| filterDto.getFilterState() == 2 || filterDto.getFilterState() == 0){
            			continue;
            		}
            		if((filterDto.getState() == 5 && filterDto.getFilterState() == 1) ||  //初筛合格 并且 初试通过 可以复试
            				(filterDto.getState() == 0 && filterDto.getFilterState() == 1 )){  //初筛合格 没有安排初试  可以初试
            			filterList.add(filterDto);
            		}
            	}
            }
            
            CommonResult<SearchResumeDistributionListDto> result = new CommonResult<SearchResumeDistributionListDto>();
            result.setRows(filterList);
            if(!CollectionUtils.isEmpty(searchResumeDistributionDtoListCount)){
            	 result.setTotal(searchResumeDistributionDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);                 
            LOG.info(" 招聘专员待安排列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error(" 招聘专员待安排列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchResumeDistributionResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 简历管理列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/searchResumeManagerList", method = RequestMethod.GET)
	@ResponseBody
	public void searchResumeManagerList(@Json ResumeManagerDto requestVO, HttpServletResponse servletRes) {
		SearchResumeManagerListResponse response = ResponseUtil.createResponse(SearchResumeManagerListResponse.class);
        List<ResumeManagerDto> resumeManagerDtoList;
        List<ResumeManagerDto> resumeManagerDtoListCount;
		try {
            LOG.info("简历管理列表入参：{}", JsonUtil.toJson(requestVO));
            resumeManagerDtoList = resumeDistributionService.searchResumeManagerList(requestVO);
            requestVO.setIsPage(0);
            resumeManagerDtoListCount = resumeDistributionService.searchResumeManagerList(requestVO);
            CommonResult<ResumeManagerDto> result = new CommonResult<ResumeManagerDto>();
            result.setRows(resumeManagerDtoList);
            if(!CollectionUtils.isEmpty(resumeManagerDtoListCount)){
            	 result.setTotal(resumeManagerDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);                          
            LOG.info("简历管理列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("简历管理列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchResumeManagerListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	

}
