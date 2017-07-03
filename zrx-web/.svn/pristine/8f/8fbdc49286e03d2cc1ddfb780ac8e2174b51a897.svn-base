package com.zrx.hr.resume.controller;

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
import com.zrx.hr.resume.domain.request.SaveOrUpdateResumeRequest;
import com.zrx.hr.resume.domain.request.SearchResumeListRequest;
import com.zrx.hr.resume.domain.response.SaveOrUpdateResumeReponse;
import com.zrx.hr.resume.domain.response.SearchResumeResponse;
import com.zrx.hr.resume.domain.vo.Resume;
import com.zrx.hr.resume.service.ResumeService;

@Slf4j
@RequestMapping("/resume")
@Controller
public class ResumeController {
	
	@Resource
	ResumeService resumeService;
	
	/**
	 * Description: 保存修改简历<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月15日 下午8:27:55
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveOrUpdateResume", method = RequestMethod.GET)
	@ResponseBody
	public void saveOrUpdateResume(@Json SaveOrUpdateResumeRequest requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateResumeReponse response = ResponseUtil.createResponse(SaveOrUpdateResumeReponse.class);
		int result;
        try {
            LOG.info("保存修改入参：{}", JsonUtil.toJson(requestVO));
            result = resumeService.saveOrUpdate(requestVO);
            if(result == -1){
            	response = ResponseUtil.createResponse(SaveOrUpdateResumeReponse.class, ErrorCode.RESUME_ALREADY_ADD);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            	return ;
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("保存修改出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("保存修改异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateResumeReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * Description: 搜索简历<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月15日 下午8:27:55
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/searchResume", method = RequestMethod.GET)
	@ResponseBody
	public void searchResume(@Json SearchResumeListRequest requestVO, HttpServletResponse servletRes) {
		SearchResumeResponse response = ResponseUtil.createResponse(SearchResumeResponse.class);
		List<Resume> resumeDtoList;
		List<Resume> resumeDtoListCount;
        try {
            LOG.info("搜索简历入参：{}", JsonUtil.toJson(requestVO));
            resumeDtoList = resumeService.searchResumeList(requestVO);
            requestVO.setIsPage(0);
            resumeDtoListCount = resumeService.searchResumeList(requestVO);
            CommonResult<Resume> result = new CommonResult<Resume>();
            result.setRows(resumeDtoList);
            if(!CollectionUtils.isEmpty(resumeDtoListCount)){
            	 result.setTotal(resumeDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("搜索简历出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("搜索简历异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchResumeResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * Description: 按照录入顺序查询简历<br/>
	 * 
	 * @author xunianchun
	 * @date 2017年6月14日
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/searchResumeByOptime", method = RequestMethod.GET)
	@ResponseBody
	public void searchResumeByOptime(@Json SearchResumeListRequest requestVO, HttpServletResponse servletRes) {
		SearchResumeResponse response = ResponseUtil.createResponse(SearchResumeResponse.class);
		List<Resume> resumeDtoList;
		List<Resume> resumeDtoListCount;
        try {
            LOG.info("搜索简历入参：{}", JsonUtil.toJson(requestVO));
            resumeDtoList = resumeService.findResumeByOptime(requestVO);
            requestVO.setIsPage(0);
            resumeDtoListCount = resumeService.findResumeByOptime(requestVO);
            CommonResult<Resume> result = new CommonResult<Resume>();
            result.setRows(resumeDtoList);
            if(!CollectionUtils.isEmpty(resumeDtoListCount)){
            	 result.setTotal(resumeDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("搜索简历出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("搜索简历异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchResumeResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}

}
