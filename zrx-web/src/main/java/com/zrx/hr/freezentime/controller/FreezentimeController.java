package com.zrx.hr.freezentime.controller;

import java.util.List;

import javax.annotation.Resource;
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
import com.zrx.hr.freezentime.domain.request.IsFreezenRequest;
import com.zrx.hr.freezentime.domain.request.SaveOrUpdateFreezenTimeRequest;
import com.zrx.hr.freezentime.domain.request.SearchFreezenTimeListRequest;
import com.zrx.hr.freezentime.domain.response.SaveOrUpdateFreezenTimeResponse;
import com.zrx.hr.freezentime.domain.response.SearchFreezenTimeListResponse;
import com.zrx.hr.freezentime.service.FreezenTimeService;

@Slf4j
@RequestMapping("/freezentime")
@Controller
public class FreezentimeController {
	
	@Resource
	FreezenTimeService freezenTimeService;
	
	/**
	 * 编辑冻结时间信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/editFreezentime", method = RequestMethod.GET)
	@ResponseBody
	public void editFreezentime(@Json SaveOrUpdateFreezenTimeRequest requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateFreezenTimeResponse response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class);
		int result;
        try {
            LOG.info("编辑冻结时间入参：{}", JsonUtil.toJson(requestVO));
            result = freezenTimeService.saveOrUpdate(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("编辑冻结时间出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("编辑冻结时间异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 冻结时间列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findFreezenTimeList", method = RequestMethod.GET)
	@ResponseBody
	public void findFreezenTimeList(@Json SearchFreezenTimeListRequest requestVO, HttpServletResponse servletRes) {
		SearchFreezenTimeListResponse response = ResponseUtil.createResponse(SearchFreezenTimeListResponse.class);
		List<SearchFreezenTimeListDto> searchFreezenTimeDtoList;
		List<SearchFreezenTimeListDto> searchFreezenTimeDtoListCount;
        try {
            LOG.info("冻结时间入参：{}", JsonUtil.toJson(requestVO));
            searchFreezenTimeDtoList = freezenTimeService.findFreezenTimeList(requestVO);
            requestVO.setIsPage(0);
            searchFreezenTimeDtoListCount = freezenTimeService.findFreezenTimeList(requestVO);
            CommonResult<SearchFreezenTimeListDto> result = new CommonResult<SearchFreezenTimeListDto>();
            result.setRows(searchFreezenTimeDtoList);
            if(!CollectionUtils.isEmpty(searchFreezenTimeDtoListCount)){
            	 result.setTotal(searchFreezenTimeDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("冻结时间出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("冻结时间异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchFreezenTimeListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 判断给一段时间是否被冻结
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/isFreezen", method = RequestMethod.GET)
	@ResponseBody
	public void isFreezen(@Json IsFreezenRequest requestVO, HttpServletResponse servletRes) {
		System.out.println("--------------开始调用！");
		SaveOrUpdateFreezenTimeResponse response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class);
		String result;
        try {
            LOG.info("判断给定时间是否被冻结入参：{}", JsonUtil.toJson(requestVO));
            result = freezenTimeService.isFreezen(requestVO);
            response.setMsg(result);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("判断给定时间是否被冻结出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("判断给定时间是否被冻结异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 判断给定时间是否被冻结
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/isFreezenDan", method = RequestMethod.GET)
	@ResponseBody
	public void isFreezenDan(@Json IsFreezenRequest requestVO, HttpServletResponse servletRes) {
		System.out.println("--------------开始调用！");
		SaveOrUpdateFreezenTimeResponse response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class);
		String result;
        try {
            LOG.info("判断给定时间是否被冻结入参：{}", JsonUtil.toJson(requestVO));
            result = freezenTimeService.isFreezenDan(requestVO);
            response.setMsg(result);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("判断给定时间是否被冻结出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("判断给定时间是否被冻结异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateFreezenTimeResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	

}
