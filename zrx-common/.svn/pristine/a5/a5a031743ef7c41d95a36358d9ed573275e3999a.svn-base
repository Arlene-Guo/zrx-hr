package com.zrx.hr.common.util.excel;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;

public class ImportExcel
{

    public ImportExcel(InputStream in){
        try {
       	
        	workbook = WorkbookFactory.create(in);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public List getDatasInSheet(int sheetNumber)
    {
        List result = new ArrayList();
        Sheet sheet = workbook.getSheetAt(sheetNumber);
        int rowCount = sheet.getLastRowNum();
        if(rowCount < 1)
            return result;
        for(int rowIndex = 0; rowIndex <= rowCount; rowIndex++)
        {
            Row row = sheet.getRow(rowIndex);
            if(row != null)
            {
                List rowData = new ArrayList();
                int cellCount = row.getLastCellNum();
                if(-1!=cellCount){
                	int nullNum = 0;
                    for(short cellIndex = 0; cellIndex < cellCount; cellIndex++)
                    {
                        Cell cell = row.getCell(cellIndex);
                        
                        if(cell!=null){
                        	Object cellStr=null;
                            if(ImportExcel.isMergedRegion(sheet,cell.getRowIndex(),cell.getColumnIndex())){
                            	cellStr=getMergedRegionValue(sheet,cell.getRowIndex(),cell.getColumnIndex());
                              }else{
                            	  cellStr = getCellString(cell);
                              }
                          	
                            if(cellStr == null || "".equals(cellStr)){
                            	 nullNum++;
                            	 cellStr=null;
                            }else{
                            cellStr = String.valueOf(cellStr).replaceAll("\t|\r|\n", "");
                            cellStr = String.valueOf(cellStr).trim();
                            }
                            rowData.add(cellStr);
                        }else{
                        	nullNum++;
                        	rowData.add(null);
                        }
                    }

                    if(nullNum != cellCount)
                        result.add(rowData);
                }
                }
        }

        return result;
    }

    private static Object getCellString(Cell cell)
    {
        Object result = null;
        if(cell != null)
        {
            int cellType = cell.getCellType();
            switch(cellType)
            {
            default:
                break;

            case 1: // '\001'
                result = cell.getRichStringCellValue().getString().replaceAll(" ", "").replaceAll("　", "");
                break;

            case 0: // '\0'
                if(HSSFDateUtil.isCellDateFormatted(cell))
                {
                    result = DEFAULT_DATE_FORMAT.format(cell.getDateCellValue()).replaceAll(" ", "").replaceAll("　", "");
                } else
                {
                   // result = String.valueOf(cell.getNumericCellValue());
                    NumberFormat nf = NumberFormat.getInstance();
                	nf.setGroupingUsed(false);//true时的格式：1,234,567,890
                	result=nf.format(cell.getNumericCellValue());
                }
                break;

            case 2: // '\002'
                result = Double.valueOf(cell.getNumericCellValue());
                break;

            case 4: // '\004'
                result = Boolean.valueOf(cell.getBooleanCellValue());
                break;

            case 3: // '\003'
                result = null;
                break;

            case 5: // '\005'
                result = null;
                break;
            }
        }
        return result;
    }

    public static TableInfo buildTableInfo(InputStream in, TableInfo tableInfo)
    {
        ImportExcel parser = new ImportExcel(in);
        List datas = parser.getDatasInSheet(0);
        if(datas != null && datas.size() > 0)
        {
            List row = (List)datas.get(0);
            int num = 0;
            for(short j = 0; j < row.size(); j++)
            {
                Object value = row.get(j);
                String data = "";
                if(value == null)
                    continue;
                num++;
                if(1 < num)
                {
                    tableInfo.setTitle("");
                    break;
                }
                data = String.valueOf(value).trim();
                tableInfo.setTitle(data);
            }

        }
        return tableInfo;
    }

    public static List buildTableColumn(InputStream in, int beginLine)
    {
        ImportExcel parser = new ImportExcel(in);
        List datas = parser.getDatasInSheet(0);
        List tableColumnList = new ArrayList();
        if(datas != null && datas.size() > 0)
        {
            List row = (List)datas.get(beginLine);
            for(short j = 0; j < row.size(); j++)
            {
                TableColumn tableColumn = new TableColumn();
                Object value = row.get(j);
                String data = "";
                if(value != null)
                    data = String.valueOf(value).trim();
                tableColumn.setColumnName(data);
                tableColumnList.add(tableColumn);
            }

        }
        return tableColumnList;
    }

    public static List buildTableValue(InputStream in, List columnId, int beginLine)
    {
        ImportExcel parser = new ImportExcel(in);
        int sheetNum = parser.workbook.getNumberOfSheets();
        List tableValueList = new ArrayList();
        int line = 0;
        for(int sheet = 0; sheet < sheetNum; sheet++)
        {
            List datas = parser.getDatasInSheet(sheet);
            if(datas != null && beginLine < datas.size())
            {
                for(int i = beginLine; i < datas.size(); i++)
                {
                    List row = (List)datas.get(i);
                    line++;
                    for(short j = 0; j < row.size(); j++)
                    {
                        TableValue tableValue = new TableValue();
                        Object value = row.get(j);
                        String data = "";
                        if(value != null)
                            data = String.valueOf(value).trim();
                        if(j >= columnId.size())
                            break;
                        tableValue.setColumnValue(data);
                        tableValue.setColumnId((String)columnId.get(j));
                        tableValue.setRow_index((new StringBuilder(String.valueOf(line))).toString());
                        tableValueList.add(tableValue);
                    }

                }

            }
        }

        return tableValueList;
    }
    /**  
	 * 获取合并单元格的值  
	 * @param sheet  
	 * @param row  
	 * @param column  
	 * @return  
	 */  
	public static Object getMergedRegionValue(Sheet sheet ,int row , int column){   
	    int sheetMergeCount = sheet.getNumMergedRegions();   
	       
	    for(int i = 0 ; i < sheetMergeCount ; i++){   
	        CellRangeAddress ca = sheet.getMergedRegion(i);   
	        int firstColumn = ca.getFirstColumn();   
	        int lastColumn = ca.getLastColumn();   
	        int firstRow = ca.getFirstRow();   
	        int lastRow = ca.getLastRow();   
	       
	           
	        if(row >= firstRow && row <= lastRow){   
	               
	            if(column >= firstColumn && column <= lastColumn){   
	                Row fRow = sheet.getRow(firstRow);   
	                Cell fCell = fRow.getCell(firstColumn);   
                return getCellString((Cell)fCell) ;   
	            }   
	        }   
	    }   
	       
	    return null ;   
	}   
	  
	/**  
	 * 判断指定的单元格是否是合并单元格  
	 * @param sheet  
	 * @param row  
	 * @param column  
	 * @return  
	 */  
	public static boolean isMergedRegion(Sheet sheet , int row , int column){   
	    int sheetMergeCount = sheet.getNumMergedRegions();   
	       
	    for(int i = 0 ; i < sheetMergeCount ; i++ ){   
	        CellRangeAddress ca = sheet.getMergedRegion(i);   
	        int firstColumn = ca.getFirstColumn();   
	        int lastColumn = ca.getLastColumn();   
	        int firstRow = ca.getFirstRow();   
	        int lastRow = ca.getLastRow();   
	           
	        if(row >= firstRow && row <= lastRow){   
	            if(column >= firstColumn && column <= lastColumn){   
	                   
	                return true ;   
	            }   
	        }   
	    }   
	       
	    return false ;   
	}   
	  

    public static void main(String args1[]) throws FileNotFoundException
    {
    	File file = new File("D:\\abc.xlsx");
    	InputStream in = new FileInputStream(file);
    	ImportExcel imp =  new ImportExcel(in);
    	List list = imp.getDatasInSheet(0);
    	System.out.println(list.size());
    	/*for(int i=0;i<list.size();i++){
			List row =(List) list.get(i);
			for(int j=0;j<row.size();j++){
				String data = row.get(j)==null? "null" : row.get(j).toString();
				System.out.print(data+"  ");
			}
			System.out.println("");
    	}*/
    	/*DecimalFormat df = new DecimalFormat("0.0");
    	String  result = df.format(Double.valueOf("1.92"));
       	System.out.println(result);
    	/*double acno=1.111;
    	NumberFormat nf = NumberFormat.getInstance();
    	nf.setGroupingUsed(false);//true时的格式：1,234,567,890
    	String acnoStr=nf.format(acno);*/
    	String acnoStr = "　　红桥区";
    	System.out.println(acnoStr.replaceAll("　", ""));
    	}

    private Workbook workbook;
    public static final DateFormat DEFAULT_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

}