package com.zrx.hr.school.controller;

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
import com.zrx.hr.school.domain.response.SearchSchoolsListResponse;
import com.zrx.hr.school.domain.vo.School;
import com.zrx.hr.school.service.SchoolService;


@Slf4j
@RequestMapping("/school")
@Controller
public class SchoolController {
	
	@Resource
	SchoolService schoolService;
	
	
	/**
	 * Description: 搜索学校<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月15日 下午8:27:55
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/findSchools", method = RequestMethod.GET)
	@ResponseBody
	public void findSchools(@Json School requestVO, HttpServletResponse servletRes) {
		SearchSchoolsListResponse response = ResponseUtil.createResponse(SearchSchoolsListResponse.class);
		List<School> schoolList;
        try {
            LOG.info("搜索学校入参：{}", JsonUtil.toJson(requestVO));
            requestVO.setIsPage(0);
            schoolList = schoolService.findSchools(requestVO);
            CommonResult<School> result = new CommonResult<School>();
            result.setRows(schoolList);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("搜索学校出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("搜索学校异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchSchoolsListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}

}
