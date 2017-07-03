package com.zrx.hr.mail.controller;

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
import com.zrx.hr.mail.domain.response.SendMailResponse;
import com.zrx.hr.mail.domain.vo.Mail;
import com.zrx.hr.mail.service.SentedMailService;
import com.zrx.hr.mail.service.impl.SearchMailResponse;

@Slf4j
@RequestMapping("/mail")
@Controller
public class MailController {
	
	@Resource
	SentedMailService sentedMailService;
	
	/**
	 * 发送邮件
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/SendMail", method = RequestMethod.GET)
	@ResponseBody
	public void SendMail(@Json Mail requestVO, HttpServletResponse servletRes) {
		SendMailResponse response = ResponseUtil.createResponse(SendMailResponse.class);
		int result;
        try {
            LOG.info("发送邮件入参：{}", JsonUtil.toJson(requestVO));
            result = sentedMailService.SendMail(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("发送邮件出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("发送邮件异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SendMailResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 查询邮件
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findMail", method = RequestMethod.GET)
	@ResponseBody
	public void findMail(@Json Mail requestVO, HttpServletResponse servletRes) {
		SearchMailResponse response = ResponseUtil.createResponse(SearchMailResponse.class);
		List<Mail> list = null;
		List<Mail> listCount = null;
        try {
            LOG.info("查询邮件入参：{}", JsonUtil.toJson(requestVO));
            list = sentedMailService.findMail(requestVO);
            requestVO.setIsPage(0);
            listCount = sentedMailService.findMail(requestVO);
            CommonResult<Mail> result = new CommonResult<Mail>();
            result.setRows(list);
            if(!CollectionUtils.isEmpty(listCount)){
            	 result.setTotal(listCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);             
            LOG.info("查询邮件出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("查询邮件异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchMailResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}

}
