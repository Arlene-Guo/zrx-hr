package com.zrx.hr.file.upload.service;

import java.io.File;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.zrx.hr.file.upload.exception.UploadException;

/**
 * 
 * Description: 上传图片服务<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月11日 上午10:50:40
 *
 */
public interface UploadPhotoService {
	
	String uploadFile(MultipartFile file, String filepath);
	
    
    String uploadToCDN(File downloadFile,String newFileName);

    /**
     * 
     * Description: 下载文件并上传只cdn <br/>
     * 
     * @author wangxiaoming
     * @date 2016年11月11日 上午10:50:06
     * @param originalUrl
     *            原始路径
     * @param fileName
     *            文件名称，长度不能超过6位
     * @return
     */
    String uploadPhoto(String originalUrl, String folder, String fileName) throws UploadException;

	byte[] InputStream2Byte(InputStream inputStream);

}
