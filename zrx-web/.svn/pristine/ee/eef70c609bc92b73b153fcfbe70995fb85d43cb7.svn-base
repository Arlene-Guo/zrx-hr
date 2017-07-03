package com.zrx.hr.common.web.argument;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.Header;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.alibaba.fastjson.JSONObject;
import com.zrx.hr.common.util.http.FakeHttpsUtil;
import com.zrx.hr.common.util.json.JsonUtil;
//import com.zrx.hr.sso.login.user.domain.SSOLoginUser;
import com.zrx.hr.user.domain.request.LoginUserInfo;
import com.zrx.hr.user.domain.request.LoginUserMsg;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SSOLoginUserArgumentResolver implements HandlerMethodArgumentResolver {

	@Value("${auth.check.url}")
	private String AUTH_CHECK_URL;

	@Value("${auth.fab.url}")
	private String AUTH_FAB_URL;

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
//		return SSOLoginUser.class.isAssignableFrom(parameter.getParameterType());
		return false;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
	    /*
	    SSOLoginUser sSOLoginUser = null;
	    
		String json = this.getRequestParam(webRequest);
		JSONObject jsonObject = JsonUtil.parseObject(json, JSONObject.class);
		
		String clientType = jsonObject.getString("clientType");
        OrderChannel type = OrderChannel.valueOf(Integer.parseInt(clientType));
        
        
        LoginUserMsg userMsg = null;
        
        switch(type){
        case M:{
            //1.根据token信息获取UserID
            String token = jsonObject.getString("token");
            LOG.info("M站用户 用户信息-token-【{}】", token);
            if (StringUtils.isNotBlank(token)) {
                StringBuffer urlBuffer = new StringBuffer();
                urlBuffer.append(AUTH_CHECK_URL);
                urlBuffer.append("?token=");
                urlBuffer.append(token);
                userMsg = this.requestMsgByToken(urlBuffer.toString());
               
                if(userMsg != null && userMsg.getData() != null &&
                        userMsg.getData().getId() != null){
                    // 2.根据用户Id去FAB接口获得用户详细信息
                    Long userId = userMsg.getData().getId();
                    LoginUserInfo loginUserInfo = requestLoginUser(String.valueOf(userId));
                    if (loginUserInfo != null && loginUserInfo.getCust() != null) {
                        sSOLoginUser = new SSOLoginUser(loginUserInfo.getCust());
                    }
                }            
            }
            break;
        }
        case Android:
        case IOS:{
            String userId = jsonObject.getString("userId"); 
            String realName = jsonObject.getString("realName");
            String phoneNum = jsonObject.getString("phoneNum");
            if(StringUtils.isNotBlank(userId)){
                LOG.info("app用户 用户信息-userId-【{}】", userId);
                sSOLoginUser = new SSOLoginUser();
                sSOLoginUser.setUserId(Long.parseLong(userId));
                sSOLoginUser.setRealName(realName);
                sSOLoginUser.setTel(phoneNum);
            }
            break;
        }
        default :
        }

		if (sSOLoginUser == null || StringUtils.isEmpty(sSOLoginUser.getTel())) {
			throw new OrderException(OrderErrorCode.USE_LOGIN_ERROR);
		}
		LOG.info("用户信息-【{}】", sSOLoginUser);	
		*/
//	    SSOLoginUser sSOLoginUser = new SSOLoginUser();
//        sSOLoginUser.setUserId(6675788L);
//        sSOLoginUser.setTel("18876594041");
//		return sSOLoginUser;
		return null;
	}

	/**
	 * 根据TOKEN获取用户信息
	 * 
	 * @param url
	 * @return
	 */
	private LoginUserMsg requestMsgByToken(String url) {
		LoginUserMsg loginUserMsg = null;
		
		try {
			LOG.info("TOKEN-url【{}】", url);
			String content = FakeHttpsUtil.getContent(url, (Header) null);
			LOG.info("TOKEN-reply-content【{}】", content);
			loginUserMsg = JsonUtil.parseObject(content, LoginUserMsg.class);
		} catch (Exception e) {
			LOG.error("请求【{}】异常【{}】", url, e.getMessage());
		}
        
		return loginUserMsg;
	}

	/**
	 * Description: 根据用户Id去FAB接口获得详细用户信息<br/>
	 * 
	 * @author wangxiaoming
	 * @date 2016年11月19日 下午5:13:32
	 * @param userId
	 * @return
	 */
	private LoginUserInfo requestLoginUser(String userId) {
		LoginUserInfo loginUserInfo = null;
		Map<String, Object> params = new HashMap<String, Object>();
		try {
			LOG.info("请求FAB-入参userId【{}】", userId);
			Long uId = Long.valueOf(userId);
			params.put("func", "queryById");
			params.put("params", uId);
			String content = FakeHttpsUtil.retrieveContentBase64(AUTH_FAB_URL, JsonUtil.toJson(params), "GET");
			LOG.info("请求FAB-返参【{}】", content);
			loginUserInfo = JsonUtil.parseObject(content, LoginUserInfo.class);
		} catch (Exception e) {
			LOG.error("请求FAB-入参【{}】异常【{}】", userId, e.getMessage());
		}

		return loginUserInfo;
	}
	
	/**
     * 获取HttpServletRequest参数体
     * 
     * @param webRequest
     * @return
     * @throws IOException
     */
	private String getRequestParam(NativeWebRequest webRequest) throws IOException {
        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        String method = httpServletRequest.getMethod();
        if (method.equals("GET") || method.equals("DELETE")) {
            return httpServletRequest.getQueryString();
        }
        StringBuilder buffer = new StringBuilder();
        String line;
        BufferedReader reader = httpServletRequest.getReader();
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String result = buffer.toString();
        if(StringUtils.isBlank(result)) {
        	Map <String, String[]> params = httpServletRequest.getParameterMap();
        	for(Map.Entry<String, String[]> entry : params.entrySet()) {
				buffer.append(entry.getKey());
			}
        	result = buffer.toString();
        }
        
        if(Base64.isBase64(result)) {
        	result = new String(Base64.decodeBase64(result), "UTF-8");
        }
        
        return result;
    }

}
