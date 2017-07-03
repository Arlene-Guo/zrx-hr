package com.zrx.hr.user.controller;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuniu.nfbird.web.annotation.Json;
import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.common.util.response.ResponseBase64Util;
import com.zrx.hr.common.util.response.ResponseUtil;
import com.zrx.hr.freezentime.domain.request.SaveOrUpdateFreezenTimeRequest;
import com.zrx.hr.freezentime.domain.response.SaveOrUpdateFreezenTimeResponse;
import com.zrx.hr.user.domain.dto.LoginUserRoleDto;
import com.zrx.hr.user.domain.dto.UserRoleDto;
import com.zrx.hr.user.domain.request.LoginRequest;
import com.zrx.hr.user.domain.request.SearchUserRoleListRequest;
import com.zrx.hr.user.domain.response.LoginResponse;
import com.zrx.hr.user.domain.vo.Users;
import com.zrx.hr.user.service.UserRoleService;
import com.zrx.hr.user.service.UserService;

@Slf4j
@RequestMapping("/login")
@Controller
public class LoginController {
	
	@Resource
	UserService userService;
	
	@Resource
	UserRoleService userRoleService;
	
	/**
	 * 登录
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	@ResponseBody
	public void login(@Json Users requestVO, HttpServletRequest request,  HttpServletResponse servletRes) {
		LoginResponse response = ResponseUtil.createResponse(LoginResponse.class);
        try {
            LOG.info("登录入参：{}", JsonUtil.toJson(requestVO));
            List<Users> usreList = userService.findUsers(requestVO);
            if(CollectionUtils.isEmpty(usreList) || usreList.size() > 1){
            	response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.EXCEPTION_ERROR);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            }
            
            Users userLogin = usreList.get(0);
            if(userLogin == null){
            	response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.LOGIN_ERROR);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            }
            
           /* boolean isPassed = (requestVO.getUserName().equals(userLogin.getUserName()) && 
            		requestVO.getPwd().toUpperCase().equals(userLogin.getPwd().toUpperCase()))?Boolean.TRUE:Boolean.FALSE;
            */
            boolean isPassed = (requestVO.getPhone().equals(userLogin.getPhone()) && 
            		requestVO.getPwd().toUpperCase().equals(userLogin.getPwd().toUpperCase()))?Boolean.TRUE:Boolean.FALSE;
            
            Map<Integer, LoginUserRoleDto>map = new HashMap<Integer, LoginUserRoleDto>();
            HttpSession session = request.getSession(true);
            if(isPassed){
            	//保存用户信息到session
            	session.setAttribute("userSession", userLogin);
            	
            	SearchUserRoleListRequest roleRequest = new SearchUserRoleListRequest();
                roleRequest.setUid(userLogin.getId());
                List<UserRoleDto> roleList = userRoleService.findUserRoleByAthory(roleRequest);
                if(CollectionUtils.isEmpty(roleList)){
                	response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.LOGIN_UNASSIGNED_ROLE);
                	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
                }
                
                LoginUserRoleDto userRoleDto = null;
                for(UserRoleDto dto:roleList){
                	userRoleDto = map.get(dto.getUid());
                	if(userRoleDto == null){
                		userRoleDto = new LoginUserRoleDto();
                		map.put(dto.getUid(), userRoleDto);
                		userRoleDto.setUid(dto.getUid());
                		userRoleDto.setUserName(dto.getUserName());
//                		返回当前登录人员所在的公司
                		userRoleDto.setCompany(dto.getCompany());
                		List<Integer> userRoleId = new ArrayList<Integer>();
                		userRoleDto.setUserRoleId(userRoleId);
                	}
                	//保存用户角色信息到session
                	userRoleDto.getUserRoleId().add(dto.getRoleid());
                }
            	request.getSession().setAttribute("userRole", map);
            }else{
            	response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.LOGIN_ERROR);
            	ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
            }
           
            response.setData(map.get(userLogin.getId()));
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("{} 登录成成功 ，登录出参：{}", userLogin.getUserName(), JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("登录异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}
	
	/**
	 * 登出
	 * @param requestVO
	 * @param servletRes
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@ResponseBody
	public void logout(HttpServletRequest request, HttpServletResponse servletRes) {
		LoginResponse response = ResponseUtil.createResponse(LoginResponse.class);
        try {
//            LOG.info("登出入参：{}", JsonUtil.toJson(requestVO));
            HttpSession session = request.getSession();
            Users user = null;
            if(session != null)
                user = (Users)session.getAttribute("userSession");
            if(session != null)
            {
                String name;
                for(Enumeration attrs = session.getAttributeNames(); attrs.hasMoreElements(); session.removeAttribute(name))
                    name = String.valueOf(attrs.nextElement());

                session.invalidate();
            }
            if(user != null)
                LOG.info("logout {} successfully", user.getUserName().trim());
            ResponseUtil.setResponseSuccess(response);            
            LOG.info("登出出参：{}",  JsonUtil.toJson(response));
        } catch (Exception e) {
            LOG.error("登出异常:{}", e.getMessage());
            response = ResponseUtil.createResponse(LoginResponse.class, ErrorCode.EXCEPTION_ERROR);
        }
        
        ResponseBase64Util.write(servletRes, JsonUtil.toJson(response));
        
	}

}
