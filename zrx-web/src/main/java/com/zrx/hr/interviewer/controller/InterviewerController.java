package com.zrx.hr.interviewer.controller;

import java.io.OutputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import com.zrx.hr.file.excel.service.IncomExcelService;
import com.zrx.hr.interviewer.domain.dto.FindArrangedInterviewListDtoIntegration;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewOrderPassedCountDto;
import com.zrx.hr.interviewer.domain.request.ArrangementsInterviewRequest;
import com.zrx.hr.interviewer.domain.request.ModifyIntervieOrderRequest;
import com.zrx.hr.interviewer.domain.request.SaveOrUpdateInterviewNumber;
import com.zrx.hr.interviewer.domain.request.SearchArrangedInterviewListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewNumberListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewerOrderListRequest;
import com.zrx.hr.interviewer.domain.response.ArrangementsInterviewResponse;
import com.zrx.hr.interviewer.domain.response.FindArrangedInterviewByCommissionerListResponse;
import com.zrx.hr.interviewer.domain.response.FindArrangedInterviewByInterviewerListResponse;
import com.zrx.hr.interviewer.domain.response.FindInterviewerOrderByOptimeListResponse;
import com.zrx.hr.interviewer.domain.response.FindInterviewerOrderListResponse;
import com.zrx.hr.interviewer.domain.response.SaveOrUpdateInterviewNumberResponse;
import com.zrx.hr.interviewer.domain.response.SearchInterviewNumberResponse;
import com.zrx.hr.interviewer.domain.vo.InterviewArrangements;
import com.zrx.hr.interviewer.domain.vo.InterviewNumber;
import com.zrx.hr.interviewer.domain.vo.InterviewerOrder;
import com.zrx.hr.interviewer.service.InterviewNumberService;
import com.zrx.hr.interviewer.service.InterviewerOrderService;

@Slf4j
@RequestMapping("/interviewer")
@Controller
public class InterviewerController {
	
	@Resource
	InterviewNumberService interviewNumberService;
	
	@Resource
	InterviewerOrderService interviewerOrderService;
	
	@Resource
	IncomExcelService incomExcelService;
	
	/**
	 * 批量添加修改面试时间信息  面试官页面
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/editInterviewNumber", method = RequestMethod.GET)
	@ResponseBody
	public void editInterviewNumber(@Json SaveOrUpdateInterviewNumber requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateInterviewNumberResponse response = ResponseUtil.createResponse(SaveOrUpdateInterviewNumberResponse.class);
		int result;
        try {
            LOG.info("批量添加修改面试时间入参：{}", JsonUtil.toJson(requestVO));
            result = interviewNumberService.saveOrUpdateInterviewNumber(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("批量添加修改面试时间出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("批量添加修改面试时间异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateInterviewNumberResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 返回面试时间信息  面试官页面
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/searchInterviewNumber", method = RequestMethod.GET)
	@ResponseBody
	public void searchInterviewNumber(@Json SearchInterviewNumberListRequest requestVO, HttpServletResponse servletRes) {
		SearchInterviewNumberResponse response = ResponseUtil.createResponse(SearchInterviewNumberResponse.class);
		List<InterviewNumber> list;
		InterviewNumber interviewNumber;
        try { 
            LOG.info("返回面试时间信息入参：{}", JsonUtil.toJson(requestVO));
            list = interviewNumberService.searchInterviewNumberList(requestVO);
            if(CollectionUtils.isEmpty(list)){
            	interviewNumber = null;
            }else{
            	interviewNumber = list.get(0);
            }
            response.setData(interviewNumber);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("返回面试时间信息出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("返回面试时间信息异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchInterviewNumberResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 安排面试
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/arrangementsInterview", method = RequestMethod.POST)
	@ResponseBody
	public void arrangementsInterview(@Json ArrangementsInterviewRequest requestVO, HttpServletResponse servletRes) {
		ArrangementsInterviewResponse response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class);
		int result;
        try {
            LOG.info("安排面试入参：{}", JsonUtil.toJson(requestVO));
            result = interviewerOrderService.arrangementsInterview(requestVO);
            if(result == -1){
            	response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class, ErrorCode.INTERVIEWER_FULL, true);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            	return ;
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("安排面试出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("安排面试异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 更新安排面试
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/updateArrangementsInterview", method = RequestMethod.GET)
	@ResponseBody
	public void updateArrangementsInterview(@Json ArrangementsInterviewRequest requestVO, HttpServletResponse servletRes) {
		ArrangementsInterviewResponse response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class);
		int result;
        try {
            LOG.info("更新安排面试入参：{}", JsonUtil.toJson(requestVO));
            result = interviewerOrderService.updateArrangementsInterview(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("更新安排面试出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("更新安排面试异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 面试汇总
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findInterviewerOrderList", method = RequestMethod.GET)
	@ResponseBody
	public void findInterviewerOrderList(@Json SearchInterviewerOrderListRequest requestVO, HttpServletResponse servletRes) {
		FindInterviewerOrderListResponse response = ResponseUtil.createResponse(FindInterviewerOrderListResponse.class);
		List<SearchInterviewListDto> SearchInterviewListDtoList1;
		List<SearchInterviewListDto> SearchInterviewListDtoListCount;
        try {
            LOG.info("面试汇总入参：{}", JsonUtil.toJson(requestVO));
            SearchInterviewListDtoList1 = interviewerOrderService.findInterviewerOrderList(requestVO);
            requestVO.setIsPage(0);
            SearchInterviewListDtoListCount = interviewerOrderService.findInterviewerOrderList(requestVO);
            int len = SearchInterviewListDtoList1.size();
            int start = requestVO.getStart();
            int end = requestVO.getLimit();
            int page = len/end;
            if(start==end*page){
            	List<SearchInterviewListDto> SearchInterviewListDtoList = SearchInterviewListDtoList1.subList(requestVO.getStart(),len);
          	    CommonResult<SearchInterviewListDto> result = new CommonResult<SearchInterviewListDto>();
                result.setRows(SearchInterviewListDtoList);
                if(!CollectionUtils.isEmpty(SearchInterviewListDtoListCount)){
               	 result.setTotal(SearchInterviewListDtoListCount.size());
               }
               response.setData(result);
               ResponseUtil.setResponseSuccess(response);       
               LOG.info("面试汇总出参：{}",  JsonUtil.toJson(response)); 
            }else{
            	List<SearchInterviewListDto> SearchInterviewListDtoList = SearchInterviewListDtoList1.subList(requestVO.getStart(), requestVO.getLimit()+requestVO.getStart());
          	    CommonResult<SearchInterviewListDto> result = new CommonResult<SearchInterviewListDto>();
                result.setRows(SearchInterviewListDtoList);
                if(!CollectionUtils.isEmpty(SearchInterviewListDtoListCount)){
               	 result.setTotal(SearchInterviewListDtoListCount.size());
               }
               response.setData(result);
               ResponseUtil.setResponseSuccess(response);       
               LOG.info("面试汇总出参：{}",  JsonUtil.toJson(response));
            }
            
        } catch (Exception e) {
            LOG.error("面试汇总异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(FindInterviewerOrderListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 修改面试状态  ：测评，签到，通过状态，offer状态 ，关闭状态  
	 * 修改招聘专员
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/modifyIntervieOrder", method = RequestMethod.GET)
	@ResponseBody
	public void modifyIntervieOrder(@Json ModifyIntervieOrderRequest requestVO, HttpServletResponse servletRes) {
		ArrangementsInterviewResponse response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class);
		int result;
        try {
            LOG.info("修改面试状态入参：{}", JsonUtil.toJson(requestVO));
            result = interviewerOrderService.modifyIntervieOrder(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("修改面试状态出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("修改面试状态异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 招聘专员已经安排的面试列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findArrangedInterviewByCommissionerList", method = RequestMethod.GET)
	@ResponseBody
	public void findArrangedInterviewByCommissionerList(@Json SearchArrangedInterviewListRequest requestVO, HttpServletResponse servletRes) {
		FindArrangedInterviewByCommissionerListResponse response = ResponseUtil.createResponse(FindArrangedInterviewByCommissionerListResponse.class);
		List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewListDtoList;
		List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewListDtoListCount;
        try {
            LOG.info("招聘专员已经安排的面试列表入参：{}", JsonUtil.toJson(requestVO));
            findArrangedInterviewListDtoList = interviewerOrderService.findArrangedInterviewByCommissionerList(requestVO);
            requestVO.setIsPage(0);
            findArrangedInterviewListDtoListCount = interviewerOrderService.findArrangedInterviewByCommissionerList(requestVO);
            CommonResult<FindArrangedInterviewListDtoIntegration> result = new CommonResult<FindArrangedInterviewListDtoIntegration>();
            result.setRows(findArrangedInterviewListDtoList);
            if(!CollectionUtils.isEmpty(findArrangedInterviewListDtoListCount)){
            	 result.setTotal(findArrangedInterviewListDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);       
            LOG.info("招聘专员已经安排的面试列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("招聘专员已经安排的面试列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(FindArrangedInterviewByCommissionerListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	/**
	 * 面试官已经安排的面试列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findArrangedInterviewByInterviewerList", method = RequestMethod.GET)
	@ResponseBody
	public void findArrangedInterviewByInterviewerList(@Json InterviewArrangements requestVO, HttpServletResponse servletRes) {
		FindArrangedInterviewByInterviewerListResponse response = ResponseUtil.createResponse(FindArrangedInterviewByInterviewerListResponse.class);
		List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewListDtoList;
		List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewListDtoListCount;
        try {
            LOG.info("面试官已经安排的面试列表入参：{}", JsonUtil.toJson(requestVO));
            findArrangedInterviewListDtoList = interviewerOrderService.findArrangedInterviewByInterviewerList(requestVO);
            requestVO.setIsPage(0);
            findArrangedInterviewListDtoListCount = interviewerOrderService.findArrangedInterviewByInterviewerList(requestVO);
            CommonResult<FindArrangedInterviewListDtoIntegration> result = new CommonResult<FindArrangedInterviewListDtoIntegration>();
            result.setRows(findArrangedInterviewListDtoList);
            if(!CollectionUtils.isEmpty(findArrangedInterviewListDtoListCount)){
            	 result.setTotal(findArrangedInterviewListDtoListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);       
            LOG.info("面试官已经安排的面试列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("面试官已经安排的面试列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(FindArrangedInterviewByInterviewerListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	
	/**
	 * 统计招聘职位通过面试人数或者发offer人数
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findPassedCount", method = RequestMethod.GET)
	@ResponseBody
	public void findPassedCount(@Json SearchInterviewOrderPassedCountDto requestVO, HttpServletResponse servletRes) {
		ArrangementsInterviewResponse response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class);
		int result;
        try {
            LOG.info("统计招聘职位通过面试人数或者发offer人数入参：{}", JsonUtil.toJson(requestVO));
            result = interviewerOrderService.findPassedCount(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("统计招聘职位通过面试人数或者发offer人数出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("统计招聘职位通过面试人数或者发offer人数异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(ArrangementsInterviewResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	
	@RequestMapping(value={"/exportExcel"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
	  @ResponseBody
	  public void exportExcel(@Json SearchInterviewerOrderListRequest requestVO, HttpServletResponse servletRes)
	  {
	    try
	    {
	      requestVO.setIsPage(0);
	      List SearchInterviewListDtoList = this.interviewerOrderService.findInterviewerOrderList(requestVO);
	      HSSFWorkbook workbook = this.incomExcelService.summaryExportExcel(SearchInterviewListDtoList);
	      String filename = "Summary";
	      String name = String.valueOf(filename) + "-EXCEL.xls";
	      OutputStream out = null;
	      try {
	        out = servletRes.getOutputStream();
	        servletRes.setHeader("Content-Disposition", "attachment;filename=" + new String(name.getBytes("UTF-8"), "UTF-8"));
	        servletRes.setContentType("application/msexcel;charset=UTF-8");
	        workbook.write(out);
	        out.flush();
	      } catch (Throwable e) {
	        LOG.error("导出excel异常:{}", e.getMessage());
	      } finally {
	        if (out != null)
	          out.close();
	      }
	    }
	    catch (Exception e) {
	      LOG.error("导出excel异常:{}", e.getMessage());
	    }
	  }
	
	/**
	 * 按照评测结果的顺序进行排序
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findInterviewByOptime", method = RequestMethod.GET)
	@ResponseBody
	public void findInterviewByOptime(@Json SearchInterviewerOrderListRequest requestVO, HttpServletResponse servletRes) {
		FindInterviewerOrderByOptimeListResponse response = ResponseUtil.createResponse(FindInterviewerOrderByOptimeListResponse.class);
		List<InterviewerOrder> interviewerOrderList;
		List<InterviewerOrder> interviewerOrderListCount;
        try {
            LOG.info("搜索简历入参：{}", JsonUtil.toJson(requestVO));
            interviewerOrderList = interviewerOrderService.findInterviewerOrderByOptime(requestVO);
            requestVO.setIsPage(0);
            interviewerOrderListCount = interviewerOrderService.findInterviewerOrderByOptime(requestVO);
            CommonResult<InterviewerOrder> result = new CommonResult<InterviewerOrder>();
            result.setRows(interviewerOrderList);
            if(!CollectionUtils.isEmpty(interviewerOrderListCount)){
            	 result.setTotal(interviewerOrderListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("搜索简历出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("搜索简历异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(FindInterviewerOrderListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	}
	

}
