package com.zrx.hr.file.download.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * Description: 下载文件服务类 <br/>
 *
 * @author wangxiaoming
 * @date 2016年4月11日 上午11:35:25
 *
 */
@Slf4j
@Service
public class DownloadServiceImpl implements DownloadService {

    @Override
    public File downloadFile(String originalUrl, String folder) throws IOException {
        // 存放下载文件地址文件夹
        String basePath = DownloadServiceImpl.class.getResource("/").getPath();

        // 判断是否包含 /
        if (!basePath.endsWith("/")) {
            basePath += "/";
        }

        // 切掉 /
        if (folder.startsWith("/")) {
            folder = folder.substring(1);
        }

        // 创建目标文件夹目录
        File destFolder = new File(basePath + folder);
        if (!destFolder.exists()) {
            destFolder.mkdirs();
        }

        int dotIndex = originalUrl.lastIndexOf("/");
        String fileName = null;
        if (-1 != dotIndex) {
            fileName = originalUrl.substring(dotIndex + 1);
        }

        fileName = filterFileName(fileName);
        
        if (StringUtils.isBlank(fileName)) {
            return null;
        }

        // 目标文件 存储的地址
        String path = destFolder.getPath();
        if (!path.endsWith("/")) {
            path += "/";
        }
        File destFile = new File(path + fileName);
        if (!destFile.exists()) {
            destFile.createNewFile();
        }

        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            URL urlfile = new URL(originalUrl);
            HttpURLConnection httpUrl = (HttpURLConnection) urlfile.openConnection();
            httpUrl.connect();
            bis = new BufferedInputStream(httpUrl.getInputStream());
            bos = new BufferedOutputStream(new FileOutputStream(destFile));
            int len = 2048;
            byte[] b = new byte[len];
            while ((len = bis.read(b)) != -1) {
                bos.write(b, 0, len);
            }
            bos.flush();
            bis.close();
            httpUrl.disconnect();
        } catch (FileNotFoundException e) {
//            LOG.error("文件【{}】不存在", originalUrl);
            return null;
        } catch (Exception e) {
//            LOG.error("下载文件出错", e);
            try {
				throw e;
			} catch (Exception e1) {
//				e1.printStackTrace();
			}
        } finally {
            if (null != bis) {
                bis.close();
            }
            if (null != bos) {
                bos.close();
            }
        }
        return destFile;
    }

    private String filterFileName(String fileName) {
    	String result = "";
    	if(StringUtils.isNotBlank(fileName)) {
    		if(fileName.contains("?")) {
    			result = fileName.substring(0, fileName.indexOf("?"));
    		} else {
    			result = fileName;
    		}
    	}
    	return result;
    }
    
    
}
