package com.zrx.hr.common.util.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.commons.lang3.StringUtils;

public class FileUtil {

    /**
     * 
     * Description: 根据文件路径获取文件类型 <br/>
     * e.g. D:/a.jpg <br/>
     * return .jpg
     * 
     * @author wangxiaoming
     * @date 2016年4月11日 下午1:07:06
     * @param fileUrl
     * @return
     */
    public static String getFileType(String fileUrl) {
        if (StringUtils.isBlank(fileUrl)) {
            return "";
        }
        int dotIndex = fileUrl.lastIndexOf(".");
        if (dotIndex == -1) {
            return "";
        }
        return fileUrl.substring(dotIndex);
    }
    
    public static void convertToFile(InputStream is,String fileName) {
    	BufferedInputStream bis = null;
    	FileOutputStream fos = null;
    	BufferedOutputStream bos = null;
    	try {
    		 bis = new BufferedInputStream(is);
    		 fos = new FileOutputStream(new File(fileName));
    	        bos = new BufferedOutputStream(fos);
    	        byte[] buffer = new byte[1024];
    	        while(bis.read(buffer) != -1) {
    	            bos.write(buffer);
    	        }
    	        bos.flush();
    	        bos.close();
    	        fos.close();
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    }
}
