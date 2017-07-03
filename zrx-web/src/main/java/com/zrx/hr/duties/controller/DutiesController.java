package com.zrx.hr.duties.controller;

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
import com.zrx.hr.duties.domain.dto.DutiesListDto;
import com.zrx.hr.duties.domain.request.SaveOrUpdateDutiesRequest;
import com.zrx.hr.duties.domain.request.SearchDutiesListRequest;
import com.zrx.hr.duties.domain.response.SaveOrUpdateDutiesReponse;
import com.zrx.hr.duties.domain.response.SearchDutiesListReponse;
import com.zrx.hr.duties.domain.vo.Duties;
import com.zrx.hr.duties.service.DutiesService;
import com.zrx.hr.evaluation.domain.dto.EvaluationDto;
import com.zrx.hr.evaluation.domain.response.SaveOrUpdateEvaluationResponse;
import com.zrx.hr.evaluation.domain.response.SearchEvaluationListResponse;
import com.zrx.hr.user.domain.response.SaveOrUpdateUsersReponse;

@Slf4j
@RequestMapping("/duties")
@Controller
public class DutiesController {
	
	@Resource
	DutiesService dutiesService;
	
	/**
	 * Description: 保存修改职务招聘计划<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月15日 下午8:27:55
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/editDuties", method = RequestMethod.GET)
	@ResponseBody
	public void editDuties(@Json SaveOrUpdateDutiesRequest requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateDutiesReponse response = ResponseUtil.createResponse(SaveOrUpdateDutiesReponse.class);
		int result;
        try {
            LOG.info("保存修改职务招聘计划入参：{}", JsonUtil.toJson(requestVO));
            result = dutiesService.saveOrUpdate(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("保存修改职务招聘计划出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("保存修改职务招聘计划异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateDutiesReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	
	/**
	 * Description: 搜索招聘计划<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月15日 下午8:27:55
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/searchDuties", method = RequestMethod.GET)
	@ResponseBody
	public void searchDuties(@Json SearchDutiesListRequest requestVO, HttpServletResponse servletRes) {
		SearchDutiesListReponse response = ResponseUtil.createResponse(SearchDutiesListReponse.class);
        List<DutiesListDto> dutiesList;
		List<DutiesListDto> dutiesListCount;
        try {
            LOG.info("搜索招聘计划入参：{}", JsonUtil.toJson(requestVO));
            dutiesList = dutiesService.searchDutiesList(requestVO);
            requestVO.setIsPage(0);
            dutiesListCount = dutiesService.searchDutiesList(requestVO);
            CommonResult<DutiesListDto> result = new CommonResult<DutiesListDto>();
            result.setRows(dutiesList);
            if(!CollectionUtils.isEmpty(dutiesListCount)){
            	result.setTotal(dutiesListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("搜索招聘计划出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("搜索招聘计划异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchDutiesListReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}

}
