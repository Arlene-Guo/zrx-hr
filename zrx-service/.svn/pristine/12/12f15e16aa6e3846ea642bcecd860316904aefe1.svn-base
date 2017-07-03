package com.zrx.hr.file.upload.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.md5.MD5Util;
import com.zrx.hr.file.download.service.DownloadService;
import com.zrx.hr.file.upload.constants.UploadErrorCode;
import com.zrx.hr.file.upload.exception.UploadException;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * Description: 上传图片服务<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月11日 上午10:50:40
 *
 */
@Slf4j
@Service
public class UploadPhotoServiceImpl implements UploadPhotoService {

//    /** 目标服务器 */
//    @Getter
//    @Value("${file.server.url}")
    private String fileServerUrl;

    @Resource
    DownloadService downloadService;
    
    public  byte[] InputStream2Byte(InputStream is){
    	
    	 ByteArrayOutputStream bos=new ByteArrayOutputStream();  
    	try{
    		 byte[] buffer=new byte[1024];  
    	        int len=0;  
    	       
    	        while((len=is.read(buffer))!=-1){  
    	            bos.write(buffer,0,len);  
    	        }  
    	        bos.flush();  
    	}catch(Throwable e){
    		
    	}finally{
    		try {
				is.close();
			} catch (IOException e) {
				LOG.info("上传文件关闭失败:{}",e.getMessage());
			}
    	}
       
        return bos.toByteArray();
    }
    
//
    @Override
    public String uploadPhoto(String originalUrl, String folder, String fileName) throws UploadException {
//        // 1. 校验url
        URL url = validUrl(originalUrl);

        // 2. 下载文件
        File downloadFile = null;
        int lastIndexOf = url.getPath().lastIndexOf("/");
        String fileFolder = url.getPath().substring(0, lastIndexOf);
        try {
            downloadFile = downloadService.downloadFile(originalUrl, folder + fileFolder);
        } catch (IOException e1) {
            throw new UploadException(UploadErrorCode.DOWNLOAD_ERROR);
        }

        return uploadToCDN(downloadFile,fileName);
    }
//
    public String uploadToCDN(File downloadFile,String newFileName) {
        if (null == downloadFile) {
            return null;
        }
//
//        // 3. 上传至 CDN
//        String newName = null;
//        ResponseResult result1 = null;
//        try {
//            newName = Base64.encodeBase64URLSafeString(newFileName.getBytes("utf8"));
//            DefaultClient client = ClientFactory.getClient().setConnectionTimeout(2000).setSocketTimeout(2000);
//            String serverUrl = getFileServerUrl().trim() + "?name=" + newName + "&folder=cdn";
//            result1 = client.post(serverUrl, null, downloadFile);
//            UploadResponseVO parseObject = JsonUtil.parseObject(result1.getContent(), UploadResponseVO.class);
//            if (null == parseObject) {
//                return null;
//            }
//
//            List<DataDetail> data = parseObject.getData();
//            if (null == parseObject || CollectionUtils.isEmpty(data)) {
//                return null;
//            }
//            return data.get(0).getUrl();
//        } catch (Exception e) {
//            LOG.error("上传失败", e);
//        } finally {
//            // 4. 最后删除
//            downloadFile.delete();
//        }
        return null;
    }
    /**
     * 
     * Description: 校验url是否合法 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年11月11日 下午13:27:00
     * @param originalUrl
     * @return
     * @throws UploadException
     */
    private URL validUrl(String originalUrl) throws UploadException {
        try {
            return new URL(originalUrl);
        } catch (MalformedURLException e2) {
            throw new UploadException(UploadErrorCode.URL_ERROR);
        }
    }

	@Override
	public String uploadFile(MultipartFile file, String filepath) {
		
		return null;
	}

}
