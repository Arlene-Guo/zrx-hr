package com.zrx.hr.user.service.impl;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.springframework.stereotype.Service;

import com.zrx.hr.common.constants.Constants;
import com.zrx.hr.user.domain.dto.FindDutiesInfoDto;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.mapper.UserMapper;
import com.zrx.hr.user.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Resource
	UserMapper userMapper;


	@Override
	public List<FindDutiesInfoDto> findDutiesInfoDto() {
		return userMapper.findDutiesInfoDto();
	}

	@Override
	public List<Users> findUsers(Users users) {
		return userMapper.findUsers(users);
	}

	@Override
	public int saveOrUpdate(Users users) {
		return userMapper.saveOrUpdateUsers(users);
	}

	@Override
	public int Batchinsert(List<Users> usersList) {
		return userMapper.insertBatch(usersList);
	}
	@Override
    public List<Map<Integer,String>> ExplanExcel() {

        POIFSFileSystem fs;
        HSSFWorkbook wb;
        HSSFSheet sheet;
        HSSFRow row;


        String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
		String relative = "/"+"Excel"+"/"+"test"+"."+"xls";
		String absolutely_path = basePath + relative;
        List<Map<Integer,String>> list=new ArrayList<Map<Integer, String>>();

       
        String str = "";
        try {
            //InputStream is = new FileInputStream("D:/home/zrx_hr/upload/file/Excel/test.xls");
        	InputStream is = new FileInputStream(absolutely_path);
        	//InputStream is = new FileInputStream("/Users/hanb/work/users.xls");
            fs = new POIFSFileSystem(is);
            wb = new HSSFWorkbook(fs);
            sheet = wb.getSheetAt(0);
            // 得到总行数
            int rowNum = sheet.getLastRowNum();
            row = sheet.getRow(0);
            int colNum = row.getPhysicalNumberOfCells();

            // 正文内容应该从第二行开始,第一行为表头的标题
            for (int i = 1; i <= rowNum; i++) {
            	 Map<Integer, String> content = new HashMap<Integer, String>();
            	System.out.println("i============="+i);
                row = sheet.getRow(i);
                int j = 0;
                while (j < colNum) {
                    // 每个单元格的数据内容用"-"分割开，以后需要时用String类的replace()方法还原数据
                    // 也可以将每个单元格的数据设置到一个javabean的属性中，此时需要新建一个javabean
                    // str += getStringCellValue(row.getCell((short) j)).trim() +
                    // "-";
                    str = getCellFormatValue(row.getCell((short) j)).trim() + "    ";
                   // System.out.println(str);
                   /* if(j==6){
                    	content.put(j, str);
                        str=MD5Util.MD5(str);
                    }*/
                    
                    j++;
                    System.out.println("j=============="+j);
                    System.out.println(str);
                    content.put(j, str);
                }
                list.add(content);
                str = "";
            }
            

        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
	
	   /**
     * 根据HSSFCell类型设置数据
     * @param cell
     * @return
     */
    public String getCellFormatValue(HSSFCell cell){
        String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
                // 如果当前Cell的Type为NUMERIC
                case HSSFCell.CELL_TYPE_NUMERIC:
                case HSSFCell.CELL_TYPE_FORMULA: {
                    // 判断当前的cell是否为Date
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        // 如果是Date类型则，转化为Data格式

                        //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                        //cellvalue = cell.getDateCellValue().toLocaleString();

                        //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                        Date date = cell.getDateCellValue();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        cellvalue = sdf.format(date);

                    }
                    // 如果是纯数字
                    else {
                        // 取得当前Cell的数值
                        cellvalue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                // 如果当前Cell的Type为STRIN
                case HSSFCell.CELL_TYPE_STRING:
                    // 取得当前的Cell字符串
                    cellvalue = cell.getRichStringCellValue().getString();
                    break;
                // 默认的Cell值
                default:
                    cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;

    }


}
