package com.zrx.hr.evaluation.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.zrx.hr.common.util.excel.ImportExcel;
import com.zrx.hr.evaluation.domain.dto.DutiesTypeCountDto;
import com.zrx.hr.evaluation.domain.dto.EvaluationDto;
import com.zrx.hr.evaluation.domain.request.SaveOrUpdateEvaluationRequest;
import com.zrx.hr.evaluation.domain.request.SearchEvaluationListRequest;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;
import com.zrx.hr.evaluation.mapper.EvaluationInfoMapper;
import com.zrx.hr.evaluation.mapper.EvaluationLinkMapper;
import com.zrx.hr.evaluation.service.EvaluationInfoService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EvaluationInfoServiceImpl implements EvaluationInfoService {
	
	@Resource
	EvaluationInfoMapper evaluationInfoMapper;
	@Resource
	EvaluationLinkMapper evaluationLinkMapper;

	@Override
	@Transactional
	public int saveOrUpdate(SaveOrUpdateEvaluationRequest request, String basepath) {

		int num = request.getId() == null ? 0 : request.getId();
		if(num > 0){
			evaluationInfoMapper.saveOrUpdateEvaluation(request); //获得批次号更新
		}else{
			evaluationInfoMapper.saveOrUpdateEvaluation(request); //获得批次号增加
			String fileName = request.getImportFilename();
			String filepath = request.getImportFilenamePath();
			filepath = basepath+filepath;
			List<String> linkList = getLink(filepath);
			List<EvaluationLink> evaluationLinkList = null;
			EvaluationLink link = null;
			if(!CollectionUtils.isEmpty(linkList)){
				evaluationLinkList = new ArrayList<EvaluationLink>();
				for(String linkStr:linkList){
					link = new EvaluationLink();
					link.setDutiestype(request.getDutiestype());
					link.setLink1(linkStr);
					link.setBatchid(request.getId());
					evaluationLinkList.add(link);
				}
				if(!CollectionUtils.isEmpty(evaluationLinkList)){
					request.setImportCount(evaluationLinkList.size());
//					evaluationInfoMapper.saveOrUpdateEvaluation(request);  //更新数量
					evaluationLinkMapper.insertBatch(evaluationLinkList);
				}
			}
		}
		return 1;
	}

	@Override
	public List<EvaluationDto> findEvaluation(
			SearchEvaluationListRequest request) {
		return evaluationInfoMapper.findEvaluation(request);
	}
	
	@SuppressWarnings("unchecked")
	private List<String> getLink(String filepath){
		//导入工作可以改成异步
		List<String> linkList = new ArrayList<String>();
		List<ArrayList<String>> list = null;
		File file = new File(filepath);
		String path  =  file.getPath();
		if(path.endsWith(".xls")||path.endsWith(".XLS") || path.endsWith(".xlsx")||path.endsWith(".XLSX")){
    		InputStream in = null;
    		try{
    			in = new FileInputStream(file);
        		ImportExcel importExcel = new ImportExcel(in);
        		list = importExcel.getDatasInSheet(0);
    		}catch(Throwable e){
    			LOG.info("解析测评文件出错:{}", e.getMessage());
    		}finally{
    			if(in != null){
    				try {
						in.close();
					} catch (IOException e) {
						LOG.info("解析测评链接文件出错:{}", e.getMessage());
					}
    			}
    		}
    		
    		if(CollectionUtils.isEmpty(list)){
    			return null;
    		}
    		
    		Pattern pattern2 = Pattern.compile("(http|ftp|https):\\/\\/([\\w.]+\\/?)\\S*");
    		Matcher matcher2 = null;
    		
    		for(ArrayList<String> cells:list){
    			for(String cell:cells){
    				if(StringUtils.isBlank(cell)){
    					continue;
    				}
    				matcher2 = pattern2.matcher(cell);
    				if(matcher2.matches()){
    					linkList.add(cell);
    				}
    			}
    		}
    	}
		return linkList;
	}

	@Override
	public DutiesTypeCountDto findDutiesTypeCount() {
		List<Integer> DutiesTypeCountList = evaluationLinkMapper.findDutiesTypeCount();
		if(CollectionUtils.isEmpty(DutiesTypeCountList)){
			return null;
		}
		DutiesTypeCountDto dutiesTypeCountDto = new DutiesTypeCountDto();
		for(int i=0; i<DutiesTypeCountList.size();i++){
			if(i==0){
				dutiesTypeCountDto.setTop50(DutiesTypeCountList.get(i));
			}else if(i==1){
				dutiesTypeCountDto.setNotTop50(DutiesTypeCountList.get(i));
			}
		}
		return dutiesTypeCountDto;
	}

}
