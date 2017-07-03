package com.zrx.hr.file.excel.service;

import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;


public interface IncomExcelService {
	
	HSSFWorkbook summaryExportExcel(List<SearchInterviewListDto> list);
	
}
