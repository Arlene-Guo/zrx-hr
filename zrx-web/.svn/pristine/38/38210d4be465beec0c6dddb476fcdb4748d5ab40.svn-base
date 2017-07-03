package com.zrx.hr.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

import com.tuniu.nfbird.web.annotation.Json;
import com.zrx.hr.common.constants.Constants;
import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.md5.MD5Util;
import com.zrx.hr.common.util.response.ResponseBase64Util;
import com.zrx.hr.common.util.response.ResponseUtil;
import com.zrx.hr.file.domain.request.DownLoadFileRequest;
import com.zrx.hr.file.domain.response.UploadFileResponse;
import com.zrx.hr.file.download.service.DownloadService;
import com.zrx.hr.file.upload.service.UploadPhotoService;

@Slf4j
@RequestMapping("/file")
@Controller
public class FileController {
	
	@Resource
	UploadPhotoService uploadPhotoService;
	
	@Resource
	DownloadService downloadService;
	
	
	 @RequestMapping(value = "/uploadFile", method = { RequestMethod.POST, RequestMethod.GET })
	    public void uploadFile(@RequestParam(value = "file0", required = false) MultipartFile file, 
	    		HttpServletRequest request, HttpServletResponse servletRes) { 
		 	
		 UploadFileResponse response = ResponseUtil.createResponse(UploadFileResponse.class);
		 try {
			 	if(file == null){
			 		response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
			 		response.setMsg("文件为null");
			 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
			 	}
			 	
			    LOG.info("上传文件入参：{}", file.getOriginalFilename());
	    		int dotIndex = file.getOriginalFilename().lastIndexOf(".");
	    		if(dotIndex == -1){
	    			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
	    			response.setMsg("文件没有扩展，未知类型");
			 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	    		}
	    		
	    		String extName = file.getOriginalFilename().substring(dotIndex + 1);
	    		if("xlsx".equalsIgnoreCase(extName) || "xls".equalsIgnoreCase(extName) || "pdf".equalsIgnoreCase(extName)
	    				 || "doc".equalsIgnoreCase(extName) || "docx".equalsIgnoreCase(extName) || "jpg".equalsIgnoreCase(extName)){
	    			byte[] fileBytes = uploadPhotoService.InputStream2Byte(file.getInputStream());
	    			String Md5Code = MD5Util.MD5(new String(fileBytes));
	    			String path1 = Md5Code.substring(0,2);
	    			String path2 = Md5Code.substring(2,4);
	    			String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
	    			String relative = "/"+path1+"/"+path2+"/"+Md5Code+"."+extName;
	    			String absolutely_path = basePath + relative;
	    			FileUtils.writeByteArrayToFile(new File(absolutely_path), fileBytes);
	    			response.setData(relative);
	    			ResponseUtil.setResponseSuccess(response);
	    		}else{
	    			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
	    			response.setMsg("不支持的文件类型");
			 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	    		}
	    			
			} catch (Exception e) {
				LOG.info("文件上传异常:{}", e.getMessage());
			}
		 	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	 }
	 
	 
	 /**
	  * 下载
	 * @param downLoadFile
	 * @param request
	 * @param servletRes
	 */
	@RequestMapping(value = "/downLoadFile", method = { RequestMethod.POST, RequestMethod.GET })
	    public void downLoadFile(/*@Json  DownLoadFileRequest downLoadFile, */HttpServletRequest request, HttpServletResponse servletRes) { 
		 	
		 try {
			 String filepath = request.getParameter("filepath");
			 String filename1 = request.getParameter("filename");
			 String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
			 basePath = basePath + filepath;//downLoadFile.getFilepath();
			 String filename = filename1;//downLoadFile.getFilename();
			 fileDownloadSetName(servletRes, basePath, filename);
			} catch (Exception e) {
				LOG.info("文件上传异常:{}", e.getMessage());
			}
	 }
	
	
	/**
     * 文件下载
     * 
     * @param response <br>
     * @param fileUrl <br>
     * @param realName <br>
     */
    private int fileDownloadSetName(HttpServletResponse response, String fileUrl, String realName) {
        InputStream br = null;
        OutputStream os = null;

        try {

            File f = new File(fileUrl.toString());
            Long filelength = f.length();
            int cacheTime = 10;

            br = new FileInputStream(f);
            byte[] buf = new byte[4096];
            int len = 0;
            
            String extName = null;
            String contentType = "application/msword";
            int dotIndex = fileUrl.lastIndexOf(".");
            extName = fileUrl.substring(dotIndex + 1);
            if("xlsx".equalsIgnoreCase(extName) || "xls".equalsIgnoreCase(extName)){
            	contentType = "application/vnd.ms-excel";
            }else if("doc".equalsIgnoreCase(extName) || "docx".equalsIgnoreCase(extName)){
            	contentType = "application/msword";
            }else if("jpg".equalsIgnoreCase(extName)){
            	contentType = "image/jpeg";
            }

            response.reset();
            response.setHeader("Cache-Control", "max-age=" + cacheTime);
            response.setContentLength(filelength.intValue());
            response.setHeader("Content-disposition", "attachment; filename="+realName+"."+extName);
            response.setContentType(contentType);

            os = response.getOutputStream();

            while ((len = br.read(buf)) > 0) {
                os.write(buf, 0, len);
            }
            br.close();
            os.close();

        } catch (Exception e) {
            LOG.info("异常:", e.getMessage());
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                	LOG.info("异常:", e.getMessage());
                }
            }
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                	LOG.info("异常:", e.getMessage());
                }
            }
        }
        return 1;
    }
    
    
    @RequestMapping(value = "/uploadImage", method = { RequestMethod.POST, RequestMethod.GET })
    public void uploadImage(@RequestParam(value = "file0", required = false) MultipartFile file, 
    		HttpServletRequest request, HttpServletResponse servletRes) { 
	 	
	 UploadFileResponse response = ResponseUtil.createResponse(UploadFileResponse.class);
	 try {
		 	if(file == null){
		 		response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
		 		response.setMsg("文件为null");
		 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
		 	}
		 	
		    LOG.info("上传文件入参：{}", file.getOriginalFilename());
    		int dotIndex = file.getOriginalFilename().lastIndexOf(".");
    		if(dotIndex == -1){
    			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
    			response.setMsg("文件没有扩展，未知类型");
		 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
    		}
    		
    		String extName = file.getOriginalFilename().substring(dotIndex + 1);
    		if("jpg".equalsIgnoreCase(extName) || "jpeg".equalsIgnoreCase(extName) || "png".equalsIgnoreCase(extName)){
    			byte[] fileBytes = uploadPhotoService.InputStream2Byte(file.getInputStream());
    			String Md5Code = MD5Util.MD5(new String(fileBytes));
    		//	String path1 = Md5Code.substring(0,2);
    		//	String path2 = Md5Code.substring(2,4);
    	//		String path1 = "HR";
        		String path2 = "image";
    			String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
    			String relative = "/"+path2+"/"+Md5Code+"."+extName;
    			String absolutely_path = basePath + relative;
    			FileUtils.writeByteArrayToFile(new File(absolutely_path), fileBytes);
    			response.setData(relative);
    			ResponseUtil.setResponseSuccess(response);
    		}else{
    			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
    			response.setMsg("不支持的文件类型");
		 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
    		}
    			
		} catch (Exception e) {
			LOG.info("文件上传异常:{}", e.getMessage());
		}
	 	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
      }

    
    
    /**
     * 上传图片功能
     * @param multipartRequest
     * @param model
     * @param servletRes
     * @throws IOException
     */
    @RequestMapping(value = "/uploadImages", method = RequestMethod.POST)
	public void threeFileUpload(DefaultMultipartHttpServletRequest multipartRequest,
	        ModelMap model,HttpServletResponse servletRes) throws IOException{ 

        UploadFileResponse response = ResponseUtil.createResponse(UploadFileResponse.class);
        Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
        Set<java.util.Map.Entry<String, MultipartFile>> set=fileMap.entrySet();
        Iterator<java.util.Map.Entry<String, MultipartFile>> it= set.iterator();
        while (it.hasNext()) {

        Entry entry = it.next();
        String key = (String) entry.getKey();
        MultipartFile file = (MultipartFile) entry.getValue();
        if(file == null){
	 		response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
	 		response.setMsg("文件为null");
	 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	 	}
	 	
	    LOG.info("上传文件入参：{}", file.getOriginalFilename());
		int dotIndex = file.getOriginalFilename().lastIndexOf(".");
		if(dotIndex == -1){
			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
			response.setMsg("文件没有扩展，未知类型");
	 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
		}
		
		String extName = file.getOriginalFilename().substring(dotIndex + 1);
		if("jpg".equalsIgnoreCase(extName) || "jpeg".equalsIgnoreCase(extName) || "png".equalsIgnoreCase(extName)){
			byte[] fileBytes = uploadPhotoService.InputStream2Byte(file.getInputStream());
			String Md5Code = MD5Util.MD5(new String(fileBytes));
    		String path2 = "image";
			String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
			String relative = "/"+path2+"/"+Md5Code+"."+extName;
			String absolutely_path = basePath + relative;
			FileUtils.writeByteArrayToFile(new File(absolutely_path), fileBytes);
			response.setData(relative);
			ResponseUtil.setResponseSuccess(response);
		}else{
			response = ResponseUtil.createResponse(UploadFileResponse.class, ErrorCode.PARAM_ERROR);
			response.setMsg("不支持的文件类型");
	 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
		}
      }
	  
	} 
    
    
    @RequestMapping(value = "/doPost", method = { RequestMethod.POST, RequestMethod.GET })
    public void doPost(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
          
        request.setCharacterEncoding("utf-8");  //设置编码  
        System.out.println("======================"+1);
        //获得磁盘文件条目工厂  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //获取文件需要上传到的路径  
        String path2 = "image";
		String basePath =  Constants.DOWNLOADPATH;
       // String path = request.getRealPath("/upload");  
		String path = basePath+path2;
		System.out.println("======================"+2);
        //如果没以下两行设置的话，上传大的 文件 会占用 很多内存，  
        //设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同  
        /** 
         * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上，  
         * 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的  
         * 然后再将其真正写到 对应目录的硬盘上 
         */  
        factory.setRepository(new File("D:/home/zrx_hr/upload/file/image"));  
        //设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室  
        factory.setSizeThreshold(1024*1024) ;  
          
        //高水平的API文件上传处理  
        ServletFileUpload upload = new ServletFileUpload(factory);  
          
          
        try {  
            //可以上传多个文件  
        	System.out.println("======================"+3);
            List<FileItem> list = (List<FileItem>)upload.parseRequest(request);  
            System.out.println("======================"+3);
              
            for(FileItem item : list)  
            {  
                //获取表单的属性名字  
            	System.out.println("======================"+3);
                String name = item.getFieldName();  
                System.out.println("======================"+4);
                //如果获取的 表单信息是普通的 文本 信息  
                if(item.isFormField())  
                {                     
                    //获取用户具体输入的字符串 ，名字起得挺好，因为表单提交过来的是 字符串类型的  
                    String value = item.getString() ;  
                      
                    request.setAttribute(name, value);  
                }  
                //对传入的非 简单的字符串进行处理 ，比如说二进制的 图片，电影这些  
                else  
                {  
                    /** 
                     * 以下三步，主要获取 上传文件的名字 
                     */  
                    //获取路径名  
                    String value = item.getName() ;  
                    //索引到最后一个反斜杠  
                    int start = value.lastIndexOf("\\");  
                    //截取 上传文件的 字符串名字，加1是 去掉反斜杠，  
                    String filename = value.substring(start+1);  
                      
                    request.setAttribute(name, filename);  
                      
                    //真正写到磁盘上  
                    //它抛出的异常 用exception 捕捉  
                      
                    //item.write( new File(path,filename) );//第三方提供的  
                      
                    //手动写的  
                    OutputStream out = new FileOutputStream(new File(path,filename));  
                      
                    InputStream in = item.getInputStream() ;  
                      
                    int length = 0 ;  
                    byte [] buf = new byte[1024] ;  
                    System.out.println("======================"+5);
                    System.out.println("获取上传文件的总共的容量："+item.getSize());  
  
                    // in.read(buf) 每次读到的数据存放在   buf 数组中  
                    while( (length = in.read(buf) ) != -1)  
                    {  
                        //在   buf 数组中 取出数据 写到 （输出流）磁盘上  
                        out.write(buf, 0, length);  
                          
                    }  
                      
                    in.close();  
                    out.close();  
                }  
            }  
              
              
              
        } catch (FileUploadException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
        catch (Exception e) {  
            // TODO Auto-generated catch block  
              
            //e.printStackTrace();  
        }  
          
          
      //  request.getRequestDispatcher("filedemo.jsp").forward(request, response);  
          
  
    }  
    
    private void saveImg(MultipartFile multipartFile) throws IllegalStateException, IOException {
        if(multipartFile!=null && multipartFile.getSize()>0){//有图
        	System.out.println("==========================="+4);
              String originalFilename = multipartFile.getOriginalFilename();
              if( !(originalFilename.endsWith(".jpg") || originalFilename.endsWith(".jpeg")
                    || originalFilename.endsWith(".png") || originalFilename.endsWith(".gif")) ){
                    throw new RuntimeException("图片格式不正确==>"+originalFilename);
              }
              String path2 = "image";
      		  String basePath =  Constants.DOWNLOADPATH;
             // String path = request.getRealPath("/upload");  
      		String path = basePath+path2;
              File dir = new File(path2+"/");
              if (!dir.exists()) {//目录不存在则创建目录
              dir.mkdir();
          }
              String newFilename = (long)(Math.random()*1000000)
                          +originalFilename.substring(originalFilename.lastIndexOf("."));
              System.out.println("保存图片"+originalFilename);
              multipartFile.transferTo(new File(path2+"/"+newFilename));//保存文件
              System.out.println("已保存");
        }
  }
   @RequestMapping(value = "/saveImgs", method = { RequestMethod.POST, RequestMethod.GET })
    public void saveImgs(@RequestParam("files")MultipartFile[] goodsPics,HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException {
    	System.out.println("==========================="+1);
    	System.out.println("==========================="+goodsPics);
        if(goodsPics==null || goodsPics.length<=0){//数组无图片
              return;
        }
        System.out.println("==========================="+2);
        for (MultipartFile multipartFile : goodsPics) {
        	System.out.println("==========================="+3);
              System.out.println("准备处理："+(multipartFile==null?">无":(multipartFile.getOriginalFilename()+",大小"+multipartFile.getSize())));
              this.saveImg(multipartFile);
        }
  }
  
	
}
