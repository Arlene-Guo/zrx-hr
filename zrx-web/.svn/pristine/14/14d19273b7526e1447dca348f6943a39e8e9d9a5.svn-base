package com.zrx.hr.user.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tuniu.nfbird.web.annotation.Json;
import com.zrx.hr.common.constants.Constants;
import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.domain.CommonResult;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.md5.MD5Util;
import com.zrx.hr.common.util.response.ResponseBase64Util;
import com.zrx.hr.common.util.response.ResponseUtil;
import com.zrx.hr.file.domain.response.BatchInsertUsersResponse;
import com.zrx.hr.file.domain.response.UploadFileResponse;
import com.zrx.hr.file.upload.service.UploadPhotoService;
import com.zrx.hr.user.domain.dto.FindDutiesInfoDto;
import com.zrx.hr.user.domain.dto.UserRoleDto;
import com.zrx.hr.user.domain.request.SaveOrUpdateUserRoleRequest;
import com.zrx.hr.user.domain.request.SearchUserRoleListRequest;
import com.zrx.hr.user.domain.response.SaveOrUpdateUserRoleResponse;
import com.zrx.hr.user.domain.response.SaveOrUpdateUsersReponse;
import com.zrx.hr.user.domain.response.SearchRoleListResponse;
import com.zrx.hr.user.domain.response.SearchUserDutiesListResponse;
import com.zrx.hr.user.domain.response.SearchUserListResponse;
import com.zrx.hr.user.domain.response.SearchUserRoleListResponse;
import com.zrx.hr.user.domain.vo.Role;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.service.RoleService;
import com.zrx.hr.user.service.UserRoleService;
import com.zrx.hr.user.service.UserService;

@Slf4j
@RequestMapping("/user")
@Controller
public class UserController {
	
	@Resource
	UserService userService;
	
	@Resource
	UserRoleService userRoleService;
	
	@Resource
	RoleService roleService;
	
	@Resource
	UploadPhotoService uploadPhotoService;
	/**
	 * 根据角色返回用户信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findUserIdAllByRoleId", method = RequestMethod.GET)
	@ResponseBody
	public void findUserIdAllByRoleId(@Json Role requestVO, HttpServletResponse servletRes) {
		SearchUserListResponse response = ResponseUtil.createResponse(SearchUserListResponse.class);
		List<Users> userList;
        try {
            LOG.info("根据角色返回用户信息入参：{}", JsonUtil.toJson(requestVO));
            userList = userRoleService.findUserIdAllByRoleId(requestVO);
            CommonResult<Users> result = new CommonResult<Users>();
            result.setRows(userList);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("根据角色返回用户信息出参：{}",  JsonUtil.toJson(response));
        } catch (Throwable e) {
            LOG.error("根据角色返回用户信息异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchUserListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	
	/**
	 * 用户角色关系列表
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findUserRole", method = RequestMethod.GET)
	@ResponseBody
	public void findUserRole(@Json SearchUserRoleListRequest requestVO, HttpServletResponse servletRes) {
		SearchUserRoleListResponse response = ResponseUtil.createResponse(SearchUserRoleListResponse.class);
		List<UserRoleDto> userRoleList;
		List<UserRoleDto> userRoleListCount;
        try {
            LOG.info("用户角色关系入参：{}", JsonUtil.toJson(requestVO));
            userRoleList = userRoleService.findUserRole(requestVO);
//            requestVO = new SearchUserRoleListRequest();
            requestVO.setIsPage(0);
            userRoleListCount = userRoleService.findUserRole(requestVO);
            CommonResult<UserRoleDto> result = new CommonResult<UserRoleDto>();
            result.setRows(userRoleList);
            if(!CollectionUtils.isEmpty(userRoleListCount)){
            	result.setTotal(userRoleListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("用户角色关系出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("用户角色关系异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchUserRoleListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	
	/**
	 * 角色列表
	 * @param servletRes
	 */
	@RequestMapping(value = "/rolesList", method = RequestMethod.GET)
	@ResponseBody
	public void rolesList(HttpServletResponse servletRes) {
		SearchRoleListResponse response = ResponseUtil.createResponse(SearchRoleListResponse.class);
        try {
//            LOG.info("角色列表入参：{}", JsonUtil.toJson(requestVO));
        	List<Role> roleList = null;
        	roleList = roleService.findRole();
        	CommonResult<Role> result = new CommonResult<Role>();
            result.setRows(roleList);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("角色列表出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("角色列表异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchRoleListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	
	
	/**
	 * 用户分配角色
	 * @param servletRes
	 */
	@RequestMapping(value = "/assignRoles", method = RequestMethod.GET)
	@ResponseBody
	public void assignRoles(@Json SaveOrUpdateUserRoleRequest requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateUserRoleResponse response = ResponseUtil.createResponse(SaveOrUpdateUserRoleResponse.class);
		int result;
        try {
            LOG.info("分配角色入参：{}", JsonUtil.toJson(requestVO));
            result = userRoleService.saveOrUpdate(requestVO);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("分配角色出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("分配角色异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateUserRoleResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	
	/** 
	 * 花名册中包含的职位信息
	 * @param servletRes
	 */
	@RequestMapping(value = "/findDutiesInfo", method = RequestMethod.GET)
	@ResponseBody
	public void findDutiesInfo(HttpServletResponse servletRes) {
		SearchUserDutiesListResponse response = ResponseUtil.createResponse(SearchUserDutiesListResponse.class);
		List<FindDutiesInfoDto> dutiesInfoList;
        try {
            LOG.info("查找职位入参：{}");
        	dutiesInfoList = userService.findDutiesInfoDto();
            CommonResult<FindDutiesInfoDto> result = new CommonResult<FindDutiesInfoDto>();
            result.setRows(dutiesInfoList);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("查找职位出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("查找职位异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchUserDutiesListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 用户分配角色时 带出的用户信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/findUsers", method = RequestMethod.GET)
	@ResponseBody
	public void findUsers(@Json Users requestVO, HttpServletResponse servletRes) {
		SearchUserListResponse response = ResponseUtil.createResponse(SearchUserListResponse.class);
		List<Users> userList;
		List<Users> userListCount;
        try {
            LOG.info("查找用户入参：{}", JsonUtil.toJson(requestVO));
            userList = userService.findUsers(requestVO);
            requestVO.setIsPage(0);
            userListCount = userService.findUsers(requestVO);
            CommonResult<Users> result = new CommonResult<Users>();
            result.setRows(userList);
            if(!CollectionUtils.isEmpty(userListCount)){
            	result.setTotal(userListCount.size());
            }
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("查找用户出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("查找用户异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SearchUserListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 保存修改用户信息
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/saveOrUpdateUser", method = RequestMethod.GET)
	@ResponseBody
	public void saveOrUpdateUser(@Json Users requestVO, HttpServletResponse servletRes) {
		SaveOrUpdateUsersReponse response = ResponseUtil.createResponse(SaveOrUpdateUsersReponse.class);
		int result;
        try {
            LOG.info("添加修改用户入参：{}", JsonUtil.toJson(requestVO));
            result = userService.saveOrUpdate(requestVO);
            response.setData(requestVO.getId());
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("添加修改用户出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("添加修改用户异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(SaveOrUpdateUsersReponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 查询分公司下的相关面试者
	 *  @param requestVO
	 * @param servletRes
	 */

	@RequestMapping(value = "/findInterviewerByCompang", method = RequestMethod.GET)
	@ResponseBody
	public void findInterviewerByCompang(@Json Role requestVO, HttpServletResponse servletRes) {
		SearchUserListResponse response = ResponseUtil.createResponse(SearchUserListResponse.class);
		List<Users> usersList;
        try {
            LOG.info("用户角色关系入参：{}", JsonUtil.toJson(requestVO));
            usersList = userRoleService.findUserIdAllByRoleId(requestVO);
            CommonResult<Users> result = new CommonResult<Users>();
            result.setRows(usersList);
            response.setData(result);
            ResponseUtil.setResponseSuccess(response);            
        } catch (Exception e) {
            response = ResponseUtil.createResponse(SearchUserRoleListResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 批量导入花名册
	 *  @param requestVO
	 * @param servletRes
	 */

	 @RequestMapping(value = "/BatchInsert", method = { RequestMethod.POST, RequestMethod.GET })
	    public void BatchInsert(@RequestParam(value = "file0", required = false) MultipartFile file, 
	    		HttpServletRequest request, HttpServletResponse servletRes) {
		 BatchInsertUsersResponse response = ResponseUtil.createResponse(BatchInsertUsersResponse.class);
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
	    			//String path1 = Md5Code.substring(0,2);
	    			//String path2 = Md5Code.substring(2,4);
	    			String basePath =  Constants.DOWNLOADPATH;//request.getSession().getServletContext().getRealPath("upload/file/");
	    			String relative = "/"+"Excel"+"/"+"test"+"."+extName;
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
		 try{
			 
			List<Map<Integer,String>> list = userService.ExplanExcel();
			List<Users> usersList = new ArrayList<Users>();
			int length = list.size();
			if(length==0){
				response = ResponseUtil.createResponse(BatchInsertUsersResponse.class, ErrorCode.PARAM_ERROR);
		 		response.setMsg("文件为null");
		 		ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
			}else{
				for(int i = 0;i<length;i++){
					Map<Integer, String> content=list.get(i);
					int len = content.size();
					int j=1;
					Users tempUser = new Users();
					//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					//tempUser.setCreateTime(new Date());
					System.out.println("--------");
					System.out.println(content.get(j));
					tempUser.setHeadQuarters(content.get(j));
					
					System.out.println(content.get(j+1));
					tempUser.setBusiness(content.get(j+1));
					
					System.out.println(content.get(j+2));
					tempUser.setCompany(content.get(j+2));
					
					System.out.println(content.get(j+3));
					tempUser.setCore(content.get(j+3));
					
					System.out.println(content.get(j+4));
					tempUser.setDepartment(content.get(j+4));
					
					System.out.println(content.get(j+5));
					tempUser.setGroup(content.get(j+5));
					
					System.out.println(content.get(j+6));
					tempUser.setJobNumber(content.get(j+6));
					
					System.out.println(content.get(j+7));
					tempUser.setUserName(content.get(j+7));
					
					System.out.println(content.get(j+8));
					tempUser.setPhone(content.get(j+8));
					
					System.out.println(content.get(j+9));
					tempUser.setGrade(content.get(j+19));
					
					System.out.println(content.get(j+10));
					tempUser.setDutiesNumber(content.get(j+10));
					
					System.out.println(content.get(j+11));
					tempUser.setDutiesName(content.get(j+11));
					
					System.out.println(content.get(j+12));
					tempUser.setEmail(content.get(j+12));
					
					tempUser.setPwd(MD5Util.MD5(content.get(j+6)));
					System.out.println("--------");
					
					userService.saveOrUpdate(tempUser);
					response.setData(content);
		            ResponseUtil.setResponseSuccess(response);  
					System.out.println("--------");
					//usersList.add(tempUser);
				}
				//userService.Batchinsert(usersList);
				//response = ResponseUtil.createResponse(BatchInsertUsersResponse.class, ErrorCode.SUCCESS_CODE);
		 		response.setMsg("文件上传成功！");
			}
		 }catch(Exception e){
			 e.printStackTrace();
			 response.setMsg("文件上传失败！");
			 LOG.info("解析Excel异常", e.getMessage());
		 }
		 ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	 }
	 
	 /**
		 * 查询分公司下的相关已经呗授予权限者
		 *  @param requestVO
		 * @param servletRes
		 */

		@RequestMapping(value = "/findAuthorByPhone", method = RequestMethod.GET)
		@ResponseBody
		public void findAuthorByPhone(@Json Role requestVO, HttpServletResponse servletRes) {
			SearchUserRoleListResponse response = ResponseUtil.createResponse(SearchUserRoleListResponse.class);
			List<UserRoleDto> usersList;
	        try {
	            LOG.info("用户角色关系入参：{}", JsonUtil.toJson(requestVO));
	            usersList = userRoleService.findUserIdAllByPhone(requestVO);
	            CommonResult<UserRoleDto> result = new CommonResult<UserRoleDto>();
	            result.setRows(usersList);
	            response.setData(result);
	            ResponseUtil.setResponseSuccess(response);            
	        } catch (Exception e) {
	            response = ResponseUtil.createResponse(SearchUserRoleListResponse.class, ErrorCode.EXCEPTION_ERROR);
	        }
	        
	        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
	        
		}
}
