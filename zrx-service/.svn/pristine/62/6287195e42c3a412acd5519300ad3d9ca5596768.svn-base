package com.zrx.hr.interviewer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.constants.OrderStatus;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.interviewer.domain.dto.FindArrangedInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.FindArrangedInterviewListDtoIntegration;
import com.zrx.hr.interviewer.domain.dto.InterviewerOrderArrangeCombineDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewOrderPassedCountDto;
import com.zrx.hr.interviewer.domain.request.ArrangementsInterviewRequest;
import com.zrx.hr.interviewer.domain.request.ModifyIntervieOrderRequest;
import com.zrx.hr.interviewer.domain.request.SearchArrangedInterviewListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewNumberListRequest;
import com.zrx.hr.interviewer.domain.request.SearchInterviewerOrderListRequest;
import com.zrx.hr.interviewer.domain.vo.InterviewArrangements;
import com.zrx.hr.interviewer.domain.vo.InterviewNumber;
import com.zrx.hr.interviewer.domain.vo.InterviewerOrder;
import com.zrx.hr.interviewer.mapper.InterviewArrangementsMapper;
import com.zrx.hr.interviewer.mapper.InterviewNumberMapper;
import com.zrx.hr.interviewer.mapper.InterviewerOrderMapper;
import com.zrx.hr.interviewer.service.InterviewerOrderService;
import com.zrx.hr.mail.domain.vo.Mail;
import com.zrx.hr.mail.service.SentedMailService;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;
import com.zrx.hr.recruiter.mapper.ResumeDistributionMapper;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.mapper.UserMapper;

@Slf4j
@Service
public class InterviewerOrderServiceImpl implements InterviewerOrderService {
	
	@Resource
	InterviewerOrderMapper interviewerOrderMapper;
	
	@Resource
	InterviewArrangementsMapper interviewArrangementsMapper;
	
	@Resource
	InterviewNumberMapper interviewNumberMapper;
	
	@Resource
	ResumeDistributionMapper resumeDistributionMapper;
	
	@Resource
	SentedMailService sentedMailService;
	
	@Resource
	UserMapper userMapper;
 
	@Override
	public List<SearchInterviewListDto> findInterviewerOrderList(SearchInterviewerOrderListRequest request) {
		
		List<SearchInterviewListDto> list = new ArrayList<SearchInterviewListDto>();
		Map<Integer, SearchInterviewListDto> arrangeCombineDtoMap = new HashMap<Integer, SearchInterviewListDto>();
		List<InterviewerOrderArrangeCombineDto> ArrangeCombineDtoList = interviewerOrderMapper.findInterviewerOrderArrangeCombine(request);
		if(CollectionUtils.isEmpty(ArrangeCombineDtoList)){
			return null;
		}
		
		SearchInterviewListDto interviewDto = null;
		for(InterviewerOrderArrangeCombineDto dto:ArrangeCombineDtoList){
			interviewDto = arrangeCombineDtoMap.get(dto.getId());
			if(interviewDto == null){
				interviewDto = new SearchInterviewListDto();
				arrangeCombineDtoMap.put(dto.getId(), interviewDto);
				interviewDto.setId(dto.getId());
				interviewDto.setResumeId(dto.getResumeId());
				interviewDto.setIntervieweeName(dto.getIntervieweeName());
				interviewDto.setIntervieweePhone(dto.getIntervieweePhone());
				interviewDto.setIntervieweeDutiesId(dto.getIntervieweeDutiesId());
				interviewDto.setIntervieweeDutiesName(dto.getIntervieweeDutiesName());
				interviewDto.setIntervieweeMail(dto.getIntervieweeMail());
				interviewDto.setResumeCommissionerId(dto.getResumeCommissionerId());
				interviewDto.setResumeCommissionerName(dto.getResumeCommissionerName());
				interviewDto.setResumeDistributionId(dto.getResumeDistributionId());
				interviewDto.setEvaluationResult(dto.getEvaluationResult());
				interviewDto.setOfferState(dto.getOfferState());
				interviewDto.setIdNumber(dto.getUserName());
				interviewDto.setCompany(dto.getCompany());
				interviewDto.setRecommendedName(dto.getRecommendedName());
				
			}
			int type = dto.getType() == null ? 0:dto.getType();
			if(type == 0){ //初试
				interviewDto.setInitInterviewArrangementsId(dto.getInterviewArrangementsId());
				interviewDto.setInitInterviewerId(dto.getInterviewerId());
				interviewDto.setInitInterviewerName(dto.getInterviewerName());
				interviewDto.setInitInterviewerTime(dto.getInterviewerTime());
				interviewDto.setInitPassed(dto.getOfferState());
				interviewDto.setInitRemarks(dto.getRemarks());
			} else if(type == 1){
				interviewDto.setReInterviewArrangementsId(dto.getInterviewArrangementsId());
				interviewDto.setReInterviewerId(dto.getInterviewerId());
				interviewDto.setReInterviewerName(dto.getInterviewerName());
				interviewDto.setReInterviewerTime(dto.getInterviewerTime());
				interviewDto.setRePassed(dto.getOfferState());
				interviewDto.setReRemarks(dto.getRemarks());
			}
		}
		list.addAll(arrangeCombineDtoMap.values());
		return list;
	}

	@Override
	@Transactional
	public int arrangementsInterview(ArrangementsInterviewRequest request) {
		
		//面试类型:0 初试 ,1复试
		int type = request.getType();
		Integer orderId = 0;
		if(type == 0){ 
			//安排人数
			int arrangementCount = 0; 
			InterviewArrangements interviewArrangements = JsonUtil.parseObject(JsonUtil.toJson(request), InterviewArrangements.class);
			arrangementCount = interviewArrangementsMapper.arrangementCount(interviewArrangements);
			SearchInterviewNumberListRequest interviewNumber = new SearchInterviewNumberListRequest();
			interviewNumber.setUid(interviewArrangements.getInterviewerId());
			interviewNumber.setType(interviewArrangements.getInterviewerType());
			List<InterviewNumber> listNumber = interviewNumberMapper.searchInterviewNumberList(interviewNumber);
			
			InterviewNumber timerNumber = null;
			int settingTimeCount = 0;
			if(!CollectionUtils.isEmpty(listNumber)){
				timerNumber = listNumber.get(0);
				settingTimeCount = timerNumber.getCounts();
			}
			
			if(settingTimeCount <= 0){
				if(interviewArrangements.getInterviewerType() == 0){ //0 单面
					settingTimeCount = 1;
				}else if (interviewArrangements.getInterviewerType() == 1){ //群面
					settingTimeCount = 3;
				}
			}
			 
			if(arrangementCount + 1 > settingTimeCount){
				return -1;
			}
			
			//创建面试单
			InterviewerOrder interviewerOrder = new InterviewerOrder();
			interviewerOrder = JsonUtil.parseObject(JsonUtil.toJson(request), InterviewerOrder.class);
			interviewerOrder.setState(OrderStatus.PRELIMINARY_ARRANGEMENT.getValue()); //安排初始
			interviewerOrderMapper.insertInterviewerOrder(interviewerOrder);
			orderId = interviewerOrder.getId();
			//更新简历分配 中 面试单字段
			ResumeDistribution resumeDistribution = new ResumeDistribution();
			resumeDistribution.setId(request.getResumeDistributionId());
			resumeDistribution.setInterviewOrderId(orderId);
			resumeDistributionMapper.updateResumeDistributionByPrimaryKeySelective(resumeDistribution);
			
		}else{ 
			//更新面试单的复试状态
			ModifyIntervieOrderRequest mdifyRequest = new ModifyIntervieOrderRequest();
			mdifyRequest.setId(request.getInterviewOrderId());
			mdifyRequest.setState(OrderStatus.ARRANGE_RETEST.getValue());//安排复试 
			interviewerOrderMapper.updateInterviewerOrderByPrimaryKeySelective(mdifyRequest);
		}
		//面试安排 初试 或者 复试
		ArrangementsInterviewRequest interviewArrangements = new ArrangementsInterviewRequest();
		interviewArrangements = JsonUtil.parseObject(JsonUtil.toJson(request), ArrangementsInterviewRequest.class);
		
		orderId = orderId > 0 ? orderId : interviewArrangements.getInterviewOrderId();
		interviewArrangements.setInterviewOrderId(orderId);
		
		interviewArrangementsMapper.saveOrUpdateInterviewArrangements(interviewArrangements);
		sendNotifyMail(request, orderId);
		
		return orderId;
	}
	
	@Override
	public int updateArrangementsInterview(ArrangementsInterviewRequest request) {
		ArrangementsInterviewRequest interviewArrangements = new ArrangementsInterviewRequest();
		interviewArrangements = JsonUtil.parseObject(JsonUtil.toJson(request), ArrangementsInterviewRequest.class);
		interviewArrangementsMapper.saveOrUpdateInterviewArrangements(interviewArrangements);
		Integer orderId = interviewArrangements.getInterviewOrderId();
		sendNotifyMail(request, orderId);
		return 1;
	}
	
	public void sendNotifyMail(ArrangementsInterviewRequest request, Integer orderId){
		try{
			//面试邀请
			Mail intervieweeMail = new Mail();
			intervieweeMail.setRecipient(request.getIntervieweeMail());
			intervieweeMail.setSubject(request.getIntervieweeMailSubject());
			intervieweeMail.setContent(request.getIntervieweeMailContent());
			intervieweeMail.setSendMainId(orderId);
			intervieweeMail.setType(1);
			intervieweeMail.setFormat(2);
			sentedMailService.SendMail(intervieweeMail);
		}catch(Throwable e){
			LOG.info("面试邀请 发邮件异常:{}", e.getMessage());
		}
		
		try{
			//面试官通知
			Mail interviewerMail = new Mail();
			String interviewerMailAddr = null;
			Integer interviewerId = request.getInterviewerId();
			Users users = new Users();
			users.setId(interviewerId);
			List<Users> list = userMapper.findUsers(users);
			if(CollectionUtils.isEmpty(list)){
				throw new Exception("面试官不存在 interviewerId："+interviewerId);
			}
			users = list.get(0);
			interviewerMailAddr = users.getEmail();
			interviewerMail.setRecipient(interviewerMailAddr);
			String intervieweeMailSubject = request.getIntervieweeMailSubject();
			intervieweeMailSubject  = intervieweeMailSubject == null ? "安排面试通知":intervieweeMailSubject;
			interviewerMail.setSubject(intervieweeMailSubject);
			interviewerMail.setContent(request.getInterviewerMailContent());
			interviewerMail.setSendMainId(orderId);
			interviewerMail.setType(1);
			interviewerMail.setFormat(1);
			sentedMailService.SendMail(interviewerMail);
		}catch(Throwable e){
			LOG.info("面试官通知 发邮件异常:{}", e.getMessage());
		}
	}


	@Override
	public List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewByCommissionerList(SearchArrangedInterviewListRequest request) {
		
		List<FindArrangedInterviewListDtoIntegration> list = new ArrayList<FindArrangedInterviewListDtoIntegration>();
		Map<Integer, FindArrangedInterviewListDtoIntegration> dtoIntegrationMap = new HashMap<Integer, FindArrangedInterviewListDtoIntegration>();
		List<FindArrangedInterviewListDto> FindArrangedInterviewListDtoList = interviewerOrderMapper.findArrangedInterviewByCommissionerList(request);
		if(CollectionUtils.isEmpty(FindArrangedInterviewListDtoList)){
			return null;
		}
		
		FindArrangedInterviewListDtoIntegration dtoIntegration = null;
		for(FindArrangedInterviewListDto dto:FindArrangedInterviewListDtoList){
			dtoIntegration = dtoIntegrationMap.get(dto.getInterviewerOrderId());
			if(dtoIntegration == null){
				dtoIntegration = new FindArrangedInterviewListDtoIntegration();
				dtoIntegrationMap.put(dto.getInterviewerOrderId(), dtoIntegration);
				dtoIntegration.setResumeDistributionId(dto.getResumeDistributionId());
				dtoIntegration.setInterviewerOrderId(dto.getInterviewerOrderId());
				
				dtoIntegration.setResumeId(dto.getResumeId());
				dtoIntegration.setIntervieweeName(dto.getIntervieweeName());
				dtoIntegration.setIntervieweePhone(dto.getIntervieweePhone());
				dtoIntegration.setIntervieweeDutiesId(dto.getIntervieweeDutiesId());
				dtoIntegration.setIntervieweeDutiesName(dto.getIntervieweeDutiesName());
				dtoIntegration.setIntervieweeMail(dto.getIntervieweeMail());
				dtoIntegration.setSchoolId(dto.getSchoolId());
				dtoIntegration.setSchoolName(dto.getSchoolName());
				dtoIntegration.setResumeFilename(dto.getResumeFilename());
				dtoIntegration.setResumePath(dto.getResumePath());
				dtoIntegration.setIdNumber(dto.getIdNumber());
				dtoIntegration.setResumeCommissionerId(dto.getResumeCommissionerId());
				dtoIntegration.setResumeCommissionerName(dto.getResumeCommissionerName());
				dtoIntegration.setEvaluationResult(dto.getEvaluationResult());
				dtoIntegration.setState(dto.getState());
			}
			int type = dto.getType() == null ? 0:dto.getType();
			if(type == 0){ //初试
				dtoIntegration.setInitInterviewArrangementsId(dto.getInterviewArrangementsId());
				dtoIntegration.setInitInterviewerId(dto.getInterviewerId());
				dtoIntegration.setInitInterviewerName(dto.getInterviewerName());
				dtoIntegration.setInitInterviewerTime(dto.getInterviewerTime());
				dtoIntegration.setInitInterviewerType(dto.getInterviewerType());
				dtoIntegration.setInitType(dto.getType());
				dtoIntegration.setInitRemark(dto.getRemarks());
			} else if(type == 1){
				dtoIntegration.setReInterviewArrangementsId(dto.getInterviewArrangementsId());
				dtoIntegration.setReInterviewerId(dto.getInterviewerId());
				dtoIntegration.setReInterviewerName(dto.getInterviewerName());
				dtoIntegration.setReInterviewerTime(dto.getInterviewerTime());
				dtoIntegration.setReInterviewerType(dto.getInterviewerType());
				dtoIntegration.setReType(dto.getType());
				dtoIntegration.setReRemarks(dto.getRemarks());
			}
		}
		list.addAll(dtoIntegrationMap.values());
		return list;
	}

	@Override
	public List<FindArrangedInterviewListDtoIntegration> findArrangedInterviewByInterviewerList(InterviewArrangements interviewArrangements) {
		
		List<FindArrangedInterviewListDtoIntegration> list = new ArrayList<FindArrangedInterviewListDtoIntegration>();
		Map<Integer, FindArrangedInterviewListDtoIntegration> dtoIntegrationMap = new HashMap<Integer, FindArrangedInterviewListDtoIntegration>();
		List<FindArrangedInterviewListDto> FindArrangedInterviewListDtoList = interviewerOrderMapper.findArrangedInterviewByInterviewerList(interviewArrangements);
		if(CollectionUtils.isEmpty(FindArrangedInterviewListDtoList)){
			return null;
		}
		
		FindArrangedInterviewListDtoIntegration dtoIntegration = null;
		for(FindArrangedInterviewListDto dto:FindArrangedInterviewListDtoList){
			dtoIntegration = dtoIntegrationMap.get(dto.getInterviewerOrderId());
			if(dtoIntegration == null){
				dtoIntegration = new FindArrangedInterviewListDtoIntegration();
				dtoIntegrationMap.put(dto.getInterviewerOrderId(), dtoIntegration);
				dtoIntegration.setResumeDistributionId(dto.getResumeDistributionId());
				dtoIntegration.setInterviewerOrderId(dto.getInterviewerOrderId());
				dtoIntegration.setResumeId(dto.getResumeId());
				dtoIntegration.setIntervieweeName(dto.getIntervieweeName());
				dtoIntegration.setIntervieweePhone(dto.getIntervieweePhone());
				dtoIntegration.setIntervieweeDutiesId(dto.getIntervieweeDutiesId());
				dtoIntegration.setIntervieweeDutiesName(dto.getIntervieweeDutiesName());
				dtoIntegration.setIntervieweeMail(dto.getIntervieweeMail());
				dtoIntegration.setSchoolId(dto.getSchoolId());
				dtoIntegration.setSchoolName(dto.getSchoolName());
				dtoIntegration.setResumeFilename(dto.getResumeFilename());
				dtoIntegration.setResumePath(dto.getResumePath());
				dtoIntegration.setIdNumber(dto.getIdNumber());
				dtoIntegration.setResumeCommissionerId(dto.getResumeCommissionerId());
				dtoIntegration.setResumeCommissionerName(dto.getResumeCommissionerName());
				dtoIntegration.setEvaluationResult(dto.getEvaluationResult());
				dtoIntegration.setState(dto.getState());
				dtoIntegration.setRanking(dto.getRanking());
			}
			int type = dto.getType() == null ? 0:dto.getType();
			if(type == 0){ //初试
				dtoIntegration.setInitInterviewArrangementsId(dto.getInterviewArrangementsId());
				dtoIntegration.setInitInterviewerId(dto.getInterviewerId());
				dtoIntegration.setInitInterviewerName(dto.getInterviewerName());
				dtoIntegration.setInitInterviewerTime(dto.getInterviewerTime());
				dtoIntegration.setInitInterviewerType(dto.getInterviewerType());
				dtoIntegration.setInitType(dto.getType());
				dtoIntegration.setInitRemark(dto.getRemarks());
			} else if(type == 1){
				dtoIntegration.setReInterviewArrangementsId(dto.getInterviewArrangementsId());
				dtoIntegration.setReInterviewerId(dto.getInterviewerId());
				dtoIntegration.setReInterviewerName(dto.getInterviewerName());
				dtoIntegration.setReInterviewerTime(dto.getInterviewerTime());
				dtoIntegration.setReInterviewerType(dto.getInterviewerType());
				dtoIntegration.setReType(dto.getType());
				dtoIntegration.setReRemarks(dto.getRemarks());
			}
		}
		list.addAll(dtoIntegrationMap.values());
		return list;
		
	}

	@Override
	public int findPassedCount(SearchInterviewOrderPassedCountDto passedCountDto) {
		return interviewerOrderMapper.findPassedCount(passedCountDto);
	}
	
	@Override
	public int modifyIntervieOrder(ModifyIntervieOrderRequest request) {
		return interviewerOrderMapper.updateInterviewerOrderByPrimaryKeySelective(request);
	}
	
	@Override
	public List<InterviewerOrder> findInterviewerOrderByOptime(SearchInterviewerOrderListRequest requestVO) {
		return interviewerOrderMapper.findInterviewerOrderByOptime(requestVO);
	}


}
