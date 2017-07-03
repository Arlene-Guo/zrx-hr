package com.zrx.hr.evaluation.controller;

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
import com.zrx.hr.common.constants.Constants;
import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.domain.CommonResult;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.response.ResponseBase64Util;
import com.zrx.hr.common.util.response.ResponseUtil;
import com.zrx.hr.evaluation.domain.dto.DutiesTypeCountDto;
import com.zrx.hr.evaluation.domain.dto.EvaluationDto;
import com.zrx.hr.evaluation.domain.request.InsertBatchEvaluationLinkListRequest;
import com.zrx.hr.evaluation.domain.request.SaveOrUpdateEvaluationRequest;
import com.zrx.hr.evaluation.domain.request.SearchEvaluationListRequest;
import com.zrx.hr.evaluation.domain.response.SaveOrUpdateEvaluationResponse;
import com.zrx.hr.evaluation.domain.response.SearchDutiesTypeCountResponse;
import com.zrx.hr.evaluation.domain.response.SearchEvaluationListResponse;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;
import com.zrx.hr.evaluation.service.EvaluationInfoService;
import com.zrx.hr.evaluation.service.EvaluationLinkService;
import com.zrx.hr.user.domain.response.SaveOrUpdateUsersReponse;

@Slf4j
@RequestMapping("/evaluation")
@Controller
public class EvaluationController {
	
	@Resource
	EvaluationInfoService evaluationInfoService;
	
	@Resource
	EvaluationLinkService evaluationLinkService;
	
	
	/**
	 * 编辑评测信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/editEvaluation", method = RequestMethod.GET)
	@ResponseBody
	public void editEvaluation(@Json SaveOrUpdateEvaluationRequest requestVO, HttpServletRequest hrequest, HttpServletResponse servletRes) {
		SaveOrUpdateEvaluationResponse response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class);
		int result;
        try {
            LOG.info("编辑评测信息入参：{}", JsonUtil.toJson(requestVO));
            String basePath =  Constants.DOWNLOADPATH;
            result = evaluationInfoService.saveOrUpdate(requestVO, basePath);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("编辑评测信息出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("编辑评测信息异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 评测列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findEvaluation", method = RequestMethod.GET)
	@ResponseBody
	public void findEvaluation(@Json SearchEvaluationListRequest requestVO, HttpServletResponse servletRes) {
		SearchEvaluationListResponse response = ResponseUtil.createResponse(SearchEvaluationListResponse.class);
		List<EvaluationDto> evaluationDtoList;
		List<EvaluationDto> evaluationDtoListCount;
        try {
            LOG.info("评测列表入参：{}", JsonUtil.toJson(requestVO));
            evaluationDtoList = evaluationInfoService.findEvaluation(requestVO);
            requestVO.setIsPage(0);
            evaluationDtoListCount = evaluationInfoService.findEvaluation(requestVO);
            CommonResult<EvaluationDto> result = new CommonResult<EvaluationDto>();
            result.setRows(evaluationDtoList);
            if(!CollectionUtils.isEmpty(evaluationDtoListCount)){
            	result.setTotal(evaluationDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("评测列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("评测列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchEvaluationListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 评测列表 数量统计
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findDutiesTypeCount", method = RequestMethod.GET)
	@ResponseBody
	public void findDutiesTypeCount(HttpServletResponse servletRes) {
		SearchDutiesTypeCountResponse response = ResponseUtil.createResponse(SearchDutiesTypeCountResponse.class);
		DutiesTypeCountDto dutiesTypeCountDto;
        try {
//            LOG.info("评测列表入参：{}", JsonUtil.toJson(requestVO));
            dutiesTypeCountDto = evaluationInfoService.findDutiesTypeCount();
            response.setData(dutiesTypeCountDto);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("评测列表 数量统计出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("评测列表 数量统计异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchDutiesTypeCountResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 批量添加测评链接
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/insertBatch", method = RequestMethod.GET)
	@ResponseBody
	public void insertBatch(@Json InsertBatchEvaluationLinkListRequest requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateEvaluationResponse response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class);
		int result;
        try {
            LOG.info("批量添加测评链接入参：{}", JsonUtil.toJson(requestVO));
            result = evaluationLinkService.insertBatch(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("批量添加测评链接出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("批量添加测评链接异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateUsersReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 更改测评链接状态
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/saveOrUpdateEvaluationLink", method = RequestMethod.GET)
	@ResponseBody
	public void saveOrUpdateEvaluationLink(@Json EvaluationLink requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateEvaluationResponse response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class);
		int result;
        try {
            LOG.info("更改测评链接入参：{}", JsonUtil.toJson(requestVO));
            result = evaluationLinkService.saveOrUpdate(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("更改测评链接出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("更改测评链接异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateUsersReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 获取测评链接
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/getEvaluationLink", method = RequestMethod.GET)
	@ResponseBody
	public void getEvaluationLink(@Json EvaluationLink requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateEvaluationResponse response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class);
		EvaluationLink result;
        try {
            LOG.info("获取测评链接入参：{}", JsonUtil.toJson(requestVO));
            result = evaluationLinkService.getEvaluationLink(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("获取测评链接出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("获取测评链接异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateEvaluationResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}

}
