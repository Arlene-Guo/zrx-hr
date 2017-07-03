package com.zrx.hr.file.excel.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;
import org.springframework.stereotype.Service;

import com.zrx.hr.common.util.excel.StringUtil;
import com.zrx.hr.interviewer.domain.dto.SearchInterviewListDto;

@Service
public class IncomExcelServiceImpl implements IncomExcelService{

	public void printExcel(HSSFWorkbook workbook, HttpServletResponse response, String filename)throws IOException{
	        
        OutputStream out = response.getOutputStream();
        String name = (new StringBuilder(String.valueOf(filename))).append("-EXCEL.xls").toString();
        //Content-Disposition: attachment; filename=“filename.xls”
		//Content-Disposition就是当用户想把请求所得的内容 存为 一个文件的时候提供一个默认的文件名
        response.setHeader("Content-Disposition", (new StringBuilder("attachment;filename=")).append(new String(name.getBytes("gb2312"), "ISO8859-1")).toString());
        response.setContentType("application/msexcel;charset=UTF-8");
        workbook.write(out);
        out.flush();
        out.close();
    }
	
	public HSSFWorkbook summaryExportExcel(List<SearchInterviewListDto> list){
    
        HSSFWorkbook workbook = null;
        try{
            workbook = new HSSFWorkbook();
            String labNameString = "结果汇总";
            String titleName = "面试结果汇总";
            String intervieweeName = "应聘者姓名";
            String intervieweeDutiesName = "应聘者职位";
            String intervieweePhone = "手机号";
            String idNumber = "身份证号";
            String intervieweeMail = "邮箱";
            String resumeFilename = "简历";
            String initInterviewerName = "初试面试官";
            String initInterviewerTime = "初试时间";
            String initPassed = "初试结果";
            String evaluationResult = "测评结果";
            String reInterviewerName = "复试面试官";
            String reInterviewerTime = "复试时间";
            String rePassed = "复试结果";
            String offerState = "offer";
            String resumeCommissionerName = "招聘专员";
            
            String headerName[] = {
        		intervieweeName, intervieweeDutiesName, intervieweePhone, idNumber, intervieweeMail, resumeFilename,
        		initInterviewerName,initInterviewerTime,initPassed,evaluationResult,reInterviewerName,reInterviewerTime,
        		rePassed,offerState,resumeCommissionerName
            };
            HSSFSheet sheet = workbook.createSheet(labNameString);  //标签名称
            short width[] = {
                4000, 5000, 7000, 7000, 7000, 4000, 4000, 7000, 4000, 4000, 4000, 7000, 4000, 4000, 4000
            };
            setSheetColumnWidth(sheet, width);
            
            //HSSFCellStyle类代表一种单元格样式。可以通过这些类来设置单元格的边框样式、背景颜色、
            //字体、水平和垂直方式的对齐
            HSSFCellStyle style_center = createTitleStyle_center(workbook);
            HSSFCellStyle style_right = createTitleStyle_right(workbook);
            HSSFCellStyle style_title = createTitleStyle_title(workbook);
            creatBookHeader(sheet, style_center, style_right, style_title, titleName, headerName, (list == null ? 0 : list.size()) * 5 + 2, "","");
            SearchInterviewListDto InterviewSummary = null;
            
            Integer initpassed;
            Integer repassed;
            Integer offerstate;
            Integer evaluationresult;
            Integer []initpassedItem = {5,7,8,9,10,11};
            List<Integer> initpassedList = Arrays.asList(initpassedItem);
            Integer []repassedItme = {9,11};
            List<Integer> repassedList = Arrays.asList(repassedItme);
//            Integer []offerstateItme = {11};
//            List<Integer> offerstateList = Arrays.asList(offerstateItme);
            
            String initResult = null;
            String evaluation_result = null;
            String repassed_result = null;
            String offerstate_result = null;
            
            if(list != null && list.size() > 0){
          
                for(int i = 0; i < list.size(); i++){
                
                	InterviewSummary = (SearchInterviewListDto)list.get(i);
                    int j = 2 + i;
                    HSSFRow row1 = sheet.createRow((short)j);
                    createCell(row1, 0, style_center, 1, StringUtil.nvl(InterviewSummary.getIntervieweeName()));
                    createCell(row1, 1, style_center, 1, StringUtil.nvl(InterviewSummary.getIntervieweeDutiesName()));
                    createCell(row1, 2, style_center, 1, StringUtil.nvl(InterviewSummary.getIntervieweePhone()));
                    createCell(row1, 3, style_center, 1, StringUtil.nvl("")); //暂时没有身份证号
                    createCell(row1, 4, style_center, 1, StringUtil.nvl(InterviewSummary.getIntervieweeMail()));
                    createCell(row1, 5, style_center, 1, StringUtil.nvl("")); //简历名称
                    createCell(row1, 6, style_center, 1, StringUtil.nvl(InterviewSummary.getInitInterviewerName() == null?"未安排":InterviewSummary.getInitInterviewerName()));
                    createCell(row1, 7, style_center, 1, StringUtil.nvl(InterviewSummary.getInitInterviewerTime()==null?"未安排":InterviewSummary.getInitInterviewerTime()));
                    initpassed = InterviewSummary.getInitPassed() == null ? 0 : InterviewSummary.getInitPassed();
                    initResult = initpassedList.contains(initpassed) ? "通过" : (initpassed == 6 ? "不通过" : "未处理"); 
                    createCell(row1, 8, style_center, 1, StringUtil.nvl(initResult));
                    evaluationresult = InterviewSummary.getEvaluationResult() == null ? 0 : InterviewSummary.getEvaluationResult();
                    evaluation_result = evaluationresult == 2 ? "通过" : (initpassed == 1 ? "不通过" : "未处理"); 
                    createCell(row1, 9, style_center, 1, StringUtil.nvl(evaluation_result));
                    createCell(row1, 10, style_center, 1, StringUtil.nvl(InterviewSummary.getReInterviewerName()==null?"未安排":InterviewSummary.getReInterviewerName()));
                    createCell(row1, 11, style_center, 1, StringUtil.nvl(InterviewSummary.getReInterviewerTime()==null?"未安排":InterviewSummary.getReInterviewerTime()));
                    repassed = InterviewSummary.getRePassed() == null ? 0 : InterviewSummary.getRePassed();
                    repassed_result = repassedList.contains(repassed) ? "通过" : (initpassed == 10 ? "不通过" : "未处理"); 
                    createCell(row1, 12, style_center, 1, StringUtil.nvl(repassed_result));
                    offerstate = InterviewSummary.getOfferState() == null ? 0 : InterviewSummary.getOfferState();
                    offerstate_result = offerstate == 11 ? "发送" : "未发送";
                    createCell(row1, 13, style_center, 1, StringUtil.nvl(offerstate_result));
                    createCell(row1, 14, style_center, 1, StringUtil.nvl(InterviewSummary.getResumeCommissionerName()));
                }

            }
        } catch(Exception e) {
//            logger.error(e.toString());
        }
        return workbook;
    }
	


	    
    //给单元格填充内容 样式  数据类型
    private void createCell(HSSFRow row, int column, HSSFCellStyle style, int cellType, String value)
    {
        HSSFCell cell = row.createCell((short)column);
        
        if(style != null)
            cell.setCellStyle(style);
		
        switch(cellType)
        {
        case 1: // '\001'
            cell.setCellValue(new HSSFRichTextString(value));
            
        case 0: // '\0'
        case 2: // '\002'
        case 3: // '\003'
        default:
            return;
        }
    }
    
    //给单元格填充内容 样式  数据类型的公用方法
    public void createCell_ls(HSSFRow row, int column, HSSFCellStyle style, int cellType, String value)
    {
        HSSFCell cell = row.createCell((short)column);
        if(style != null)
            cell.setCellStyle(style);
        switch(cellType)
        {
        case 1: // '\001'
            cell.setCellValue(new HSSFRichTextString(value));
            // fall through

        case 0: // '\0'
        case 2: // '\002'
        case 3: // '\003'
        default:
            return;
        }
    }
    
   

    private HSSFCellStyle createTitleStyle_center(HSSFWorkbook wb)
    {
        HSSFFont boldFont = wb.createFont();//创建单元格字体格式
        boldFont.setFontHeight((short)200);//设置字体高度
        
        //HSSFCellStyle类代表一种单元格样式。可以通过这些类来设置单元格的边框样式、背景颜色、
        //字体、水平和垂直方式的对齐
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment((short)2);//设置水平对齐方式
        style.setVerticalAlignment((short)1);//设置垂直对齐方式
        style.setFont(boldFont);
        style.setDataFormat(HSSFDataFormat.getBuiltinFormat("###,##0.00"));
        return style;
    }

    //定义表头的样式
    private HSSFCellStyle createTitleStyle_title(HSSFWorkbook wb)
    {
        HSSFFont boldFont = wb.createFont();
        boldFont.setFontHeight((short)300);
        boldFont.setBoldweight((short)400);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment((short)2);
        style.setFont(boldFont);
        style.setDataFormat(HSSFDataFormat.getBuiltinFormat("###,##0.00"));
        return style;
    }

    private HSSFCellStyle createTitleStyle_left(HSSFWorkbook wb)
    {
        HSSFFont boldFont = wb.createFont();
        boldFont.setFontHeight((short)200);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment((short)1);
        style.setFont(boldFont);
        style.setDataFormat(HSSFDataFormat.getBuiltinFormat("###,##0.00"));
        return style;
    }

    private HSSFCellStyle createTitleStyle_right(HSSFWorkbook wb)
    {
        HSSFFont boldFont = wb.createFont();
        boldFont.setFontHeight((short)200);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment((short)3);
        style.setFont(boldFont);
        style.setDataFormat(HSSFDataFormat.getBuiltinFormat("###,##0.00"));
        return style;
    }

    //设置每列的宽度
    public void setSheetColumnWidth(HSSFSheet sheet, short s[])
    {
        for(int i = 0; i < s.length; i++)
            sheet.setColumnWidth((short)i, s[i]);

    }
    
    

    //创建表头
    private void creatBookHeader(HSSFSheet sheet, HSSFCellStyle style_center, HSSFCellStyle style_right, HSSFCellStyle style_title, String bookName, String headername[], int number, 
            String company, String username)
    {
        HSSFRow r = sheet.createRow(0);//产生一行 行号为0
        HSSFCell cell = r.createCell((short)0);//第一行第一列
        cell.setCellValue(new HSSFRichTextString(bookName));//填充第一行第一列
        cell.setCellStyle(style_title);//为第一行第一列填样式
        sheet.addMergedRegion(new Region(0, (short)0, 0, (short)(headername.length - 1)));
        HSSFRow row = sheet.createRow(1);
        createHeader(headername, row, style_center);
    }
    
  //创建表头
    private void createHeader(String headername[], HSSFRow row, HSSFCellStyle style)
    {
        for(int i = 0; i < headername.length; i++)
            createCell(row, i, style, 1, headername[i]);
        
    }

    private HSSFWorkbook showPic(String picPath, HSSFWorkbook wb, int rowIndex, int columnIndex)
    {
        try
        {
            HSSFSheet sheet = wb.getSheetAt(0);
            HSSFCellStyle cellStyle = wb.createCellStyle();
            cellStyle.setAlignment((short)2);
            cellStyle.setVerticalAlignment((short)1);
            sheet.setDefaultColumnStyle(2, cellStyle);
            sheet.setDefaultColumnStyle(1, cellStyle);
            sheet.setDefaultColumnStyle(3, cellStyle);
            HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
            ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
            java.awt.image.BufferedImage bufferImg = ImageIO.read(new File(picPath));
            ImageIO.write(bufferImg, "png", byteArrayOut);
            HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 0, 0, (short)columnIndex, rowIndex, (short)(columnIndex + 1), rowIndex + 1);
            patriarch.createPicture(anchor, wb.addPicture(byteArrayOut.toByteArray(), 5)).resize(1.0D);
        }
        catch(FileNotFoundException e)
        {
            e.printStackTrace();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        return wb;
    }

}
