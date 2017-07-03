package com.zrx.hr.freezentime.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.util.date.DateUtil;
import com.zrx.hr.freezentime.domain.dto.SearchFreezenTimeListDto;
import com.zrx.hr.freezentime.domain.request.IsFreezenRequest;
import com.zrx.hr.freezentime.domain.request.SaveOrUpdateFreezenTimeRequest;
import com.zrx.hr.freezentime.domain.request.SearchFreezenTimeListRequest;
import com.zrx.hr.freezentime.mapper.FreezenTimeMapper;
import com.zrx.hr.freezentime.service.FreezenTimeService;

@Slf4j
@Service
public class FreezenTimeServiceImpl implements FreezenTimeService {
	
	@Resource
	FreezenTimeMapper freezenTimeMapper;

	@Override
	public int saveOrUpdate(SaveOrUpdateFreezenTimeRequest request) {
		return freezenTimeMapper.saveOrUpdateFreezenTime(request);
	}

	@Override
	public List<SearchFreezenTimeListDto> findFreezenTimeList(SearchFreezenTimeListRequest request) {
		return freezenTimeMapper.findFreezenTimeList(request);
	}

	@Override
	public String isFreezen(IsFreezenRequest request) {
		//解析冻结时间
		if(request == null){
			return "传来的时间段为空";
		}
		
		int freezeStartStateRequest;
		int freezeEndStateRequest;
		String freezenTime = request.getInterviewerTime();
		String []Date_Times = freezenTime.split(" ");
		String freezeStartDate = Date_Times[0];
		System.out.println("freezeStartDate"+freezeStartDate);
		String freezeStartState = Date_Times[1];
		System.out.println("freezeStartState"+freezeStartState);
		if(freezeStartState.equals("上午")){
			freezeStartStateRequest = 0;
		}else{
			freezeStartStateRequest=1;
		}
		
		String freezeEndDate = Date_Times[2];
		System.out.println("freezeEndDate"+freezeEndDate);
		String freezeEndState = Date_Times[3];
		System.out.println("freezeEndState"+freezeEndState);
		if(freezeEndState.equals("上午")){
			freezeEndStateRequest = 0;
		}else{
			freezeEndStateRequest=1;
		}
		Date freezenBeginDateRequest = DateUtil.parseDate(freezeStartDate, DateUtil.YYYY_MM_DD);
		Date freezenEndDateRequest = DateUtil.parseDate(freezeEndDate, DateUtil.YYYY_MM_DD);
		
		Date freezenBeginDate;
		Date freezenEndDate;
		String freezenBeginString;
		String freezenEndString;
		int startAmPm;
		String startAmPmStirng;
		int endAmPm;
		String endAmPmStirng;
		String result="";
		try{
			List<SearchFreezenTimeListDto> dtoList = freezenTimeMapper.isFreezenList(request);
			for(SearchFreezenTimeListDto timeDto:dtoList){
				freezenBeginDate = timeDto.getStartFreezenDate();
				freezenEndDate = timeDto.getEndFreezenDate();
				freezenBeginString = DateUtil.formatDate(freezenBeginDate, DateUtil.YYYY_MM_DD);
				freezenEndString = DateUtil.formatDate(freezenEndDate, DateUtil.YYYY_MM_DD);
				startAmPm = timeDto.getStartAmPm();
				if(startAmPm==0){
					startAmPmStirng="上午";
				}else{
					startAmPmStirng="下午";
				}
				endAmPm = timeDto.getEndAmPm();
				if(endAmPm==0){
					endAmPmStirng="上午";
				}else{
					endAmPmStirng="下午";
				}
				boolean temstart = freezenBeginDateRequest.compareTo(freezenBeginDate)==0&&freezeStartStateRequest>=startAmPm;
				boolean temend = freezenEndDateRequest.compareTo(freezenEndDate)==0&&freezeEndStateRequest<=endAmPm;
				boolean start = freezenBeginDateRequest.compareTo(freezenBeginDate)>0||temstart;
				boolean end = freezenEndDateRequest.compareTo(freezenEndDate)<0||temend;
				boolean tem = freezenBeginDateRequest.compareTo(freezenEndDate)==0&&freezeStartStateRequest>endAmPm;
				/*if((freezenBeginDateRequest.compareTo(freezenBeginDate)<0||temstart)&&(freezenEndDateRequest.compareTo(freezenEndDate)>0||temend)){
					result = freezenTime+"改段时间已经冻结";
				}*/
				if(freezenBeginDateRequest.compareTo(freezenEndDate)>0||tem){
					continue;
				}
				if(start&&end){
					result = result+freezeStartDate+freezeStartState+"--"+freezeEndDate+freezeEndState+" "+"段时间已经冻结";
				}
				if(start==true&&end==false){
					result = result+freezeStartDate+freezeStartState+"--"+freezenEndString+endAmPmStirng+" "+"段时间已经冻结";
				}
				if(start==false&&end==true){
					result = result+freezenBeginString+startAmPmStirng+"--"+freezeEndDate+freezeEndState+" "+"段时间已经冻结";
				}
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
			
		/*if(result!=null){
			result = result+"段时间已经冻结";
		}*/
		
		return result;
		/*String freezenTime = request.getInterviewerTime();
		String []Date_Times = freezenTime.split(" ");
		String freezeDate = Date_Times[0];
		System.out.println("freezeDate:"+freezeDate);
		String FreezeTime = Date_Times[1];
		System.out.println("FreezeTime:"+FreezeTime);
		String time_arrange[] = FreezeTime.split("-");
		String time_arrange_1 = time_arrange[0];
		System.out.println("time_arrange_1:"+time_arrange_1);
		String time_arrange_2 = time_arrange[1];
		System.out.println("time_arrange_2:"+time_arrange_2);
		
		String freezenBeginTimeRequest = freezeDate +" "+ time_arrange_1;
		System.out.println("freezenBeginTimeRequest:"+freezenBeginTimeRequest);
		String freezenEndTimeRequest = freezeDate +" "+ time_arrange_2;
		System.out.println("freezenEndTimeRequest:"+freezenEndTimeRequest);
		Date freezenBegin2DateRequest = DateUtil.parseDate(freezenBeginTimeRequest, DateUtil.YYYY_MM_DD_HH_MM);
		System.out.println("freezenBegin2DateRequest:"+freezenBegin2DateRequest);
		Date freezenEnd2DateRequest = DateUtil.parseDate(freezenEndTimeRequest, DateUtil.YYYY_MM_DD_HH_MM);
		System.out.println("freezenEnd2DateRequest:"+freezenEnd2DateRequest);
		
		Date settingfreezenBeginTime2Date;
		Date settingfreezenEndTime2Date;
		Date freezenBeginDate;
		Date freezenEndDate;
		String freezenBeginString;
		String freezenEndString;
		String freezenBeginTime;
		String freezenEndTime;
		Integer startAmPm;
		Integer endAmPm;
		//上午 时间段， 下午时间段
		String settingFreezenBegin = null;
		String settingFreezenEnd = null;
		try{
			List<SearchFreezenTimeListDto> dtoList = freezenTimeMapper.isFreezenList(request);
			for(SearchFreezenTimeListDto timeDto:dtoList){
				freezenBeginDate = timeDto.getStartFreezenDate();
				freezenEndDate = timeDto.getEndFreezenDate();
				//freezenBeginString = DateUtil.formatDate(freezenBeginDate, DateUtil.YYYY_MM_DD);
				//freezenEndString = DateUtil.formatDate(freezenEndDate, DateUtil.YYYY_MM_DD);
				startAmPm = timeDto.getStartAmPm();
				endAmPm = timeDto.getEndAmPm();
				if(freezenBeginString.equals(freezenEndString)){ //日期相等 则是同一天
					if(startAmPm == endAmPm){ //是否同为上午或者下午---》半天
						if(startAmPm == 0){ //同为上午
							freezenBeginTime = "09:00";
							freezenEndTime = "12:00";
						}else{ //同为下午
							freezenBeginTime = "12:00";
							freezenEndTime = "21:00";
						}
						
					}else{ //则是上午和下午---》一天
						freezenBeginTime = "09:00";
						freezenEndTime = "21:00";
					}
				}else{ //不是同一天 
					//得到起始时间和结束时间，并且与起始日期和结束日期进行拼接
					if(startAmPm == 0){ //起始时间上午
						freezenBeginTime = "09:00";
					}else{  //起始时间下午
						freezenBeginTime = "12:00";
					}
					
					if(endAmPm == 0){
						freezenEndTime = "12:00";
					}else{
						freezenEndTime = "21:00";
					}
				}
				
				//settingFreezenBegin = freezenBeginString +" "+ freezenBeginTime;
				//settingFreezenEnd = freezenEndString +" "+ freezenEndTime;
				//settingfreezenBeginTime2Date = DateUtil.parseDate(freezenBeginString, DateUtil.YYYY_MM_DD);
				//settingfreezenEndTime2Date = DateUtil.parseDate(freezenEndString, DateUtil.YYYY_MM_DD);
//				if((settingFreezenBegin.compareTo(freezenBeginTimeRequest) == -1 || settingFreezenBegin.compareTo(freezenBeginTimeRequest) == 0)
//						&& (settingFreezenEnd.compareTo(freezenBeginTimeRequest) == 1 || settingFreezenEnd.compareTo(freezenBeginTimeRequest) == 0)
//						&& (settingFreezenBegin.compareTo(freezenEndTimeRequest) == -1 || settingFreezenBegin.compareTo(freezenEndTimeRequest) == 0)
//						&& (settingFreezenEnd.compareTo(freezenEndTimeRequest) == 1 || settingFreezenEnd.compareTo(freezenEndTimeRequest) == 0)){  //有一个在范围内，那么就应该被冻结，否则就不需要冻结
//					return true;
//				}
				
				if((settingfreezenBeginTime2Date.compareTo(freezenBegin2DateRequest) < 0 || settingfreezenBeginTime2Date.compareTo(freezenBegin2DateRequest) == 0)
						&& (settingfreezenEndTime2Date.compareTo(freezenBegin2DateRequest) > 0 || settingfreezenEndTime2Date.compareTo(freezenBegin2DateRequest) == 0)
						&& (settingfreezenBeginTime2Date.compareTo(freezenEnd2DateRequest) == -1 || settingfreezenBeginTime2Date.compareTo(freezenEnd2DateRequest) == 0)
						&& (settingfreezenEndTime2Date.compareTo(freezenEnd2DateRequest) == 1 || settingfreezenEndTime2Date.compareTo(freezenEnd2DateRequest) == 0)){  //有一个在范围内，那么就应该被冻结，否则就不需要冻结
					return true;
				}
				
			}
		}catch(Throwable e){
			LOG.info("判断是否为冻结时间异常 ：{}", e.getMessage());
		}
		
		return false;*/
	}
	
	@Override
	public String isFreezenDan(IsFreezenRequest request) {
		//解析冻结时间
		if(request == null){
			return "传来的时间段为空";
		}
		
		int freezeStartStateRequest;
		String freezenTime = request.getInterviewerTime();
		String []Date_Times = freezenTime.split(" ");
		String freezeStartDate = Date_Times[0];
		System.out.println("freezeStartDate"+freezeStartDate);
		String freezeStartState = Date_Times[1];
		System.out.println("freezeStartState"+freezeStartState);
		if(freezeStartState.equals("上午")){
			freezeStartStateRequest = 0;
		}else{
			freezeStartStateRequest = 1;
		}
		//freezeStartStateRequest = Int.valueOf(freezeStartState);
		System.out.println("freezeStartStateRequest"+freezeStartStateRequest);
		Date freezenBeginDateRequest = DateUtil.parseDate(freezeStartDate, DateUtil.YYYY_MM_DD);
		
		Date freezenBeginDate;
		Date freezenEndDate;
		String freezenBeginString;
		String freezenEndString;
		int startAmPm;
		String startAmPmStirng;
		int endAmPm;
		String endAmPmStirng;
		String result="";
		try{
			List<SearchFreezenTimeListDto> dtoList = freezenTimeMapper.isFreezenList(request);
			for(SearchFreezenTimeListDto timeDto:dtoList){
				freezenBeginDate = timeDto.getStartFreezenDate();
				freezenEndDate = timeDto.getEndFreezenDate();
				freezenBeginString = DateUtil.formatDate(freezenBeginDate, DateUtil.YYYY_MM_DD);
				freezenEndString = DateUtil.formatDate(freezenEndDate, DateUtil.YYYY_MM_DD);
				startAmPm = timeDto.getStartAmPm();
				if(startAmPm==0){
					startAmPmStirng="上午";
				}else{
					startAmPmStirng="下午";
				}
				endAmPm = timeDto.getEndAmPm();
				if(endAmPm==0){
					endAmPmStirng="上午";
				}else{
					endAmPmStirng="下午";
				}
				
				
				boolean temstart = freezenBeginDateRequest.compareTo(freezenBeginDate)==0&&freezeStartStateRequest>=startAmPm;
				System.out.println("temstart"+temstart);
				boolean start = freezenBeginDateRequest.compareTo(freezenBeginDate)>0||temstart;
				System.out.println("start"+start);
				boolean temend = freezenBeginDateRequest.compareTo(freezenEndDate)==0&&freezeStartStateRequest<=endAmPm;
				System.out.println("temend"+temend);
				boolean end = freezenBeginDateRequest.compareTo(freezenEndDate)<0||temend;
				System.out.println("end"+end);
				if(start&&end){
					result = "改时段时间已经冻结";
					break;
				}
				
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
			
		/*if(result!=null){
			result = result+"段时间已经冻结";
		}*/
		
		return result;
	}
}
