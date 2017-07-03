package com.zrx.hr.common.web.interceptor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.zrx.hr.common.util.sql.PreventSqlInjectUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * sql注入拦截器
 * @author wangxiaoming
 *
 */
@Slf4j
public class SqlInjectInterceptor implements HandlerInterceptor {

	private static final String CHARSET_NAME = "UTF-8";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	    /*
		Map <String, String[]> params = request.getParameterMap();
		StringBuffer buf = new StringBuffer();
		String queryStr = request.getQueryString();
		if(queryStr != null) {
			queryStr = URLDecoder.decode(queryStr, CHARSET_NAME);
		}
		LOG.info("前端请求参数:[{}]",queryStr);
		if(params == null) {
			return true;
		}
		if(params != null && params.size() == 1) {
			try {
				for(Map.Entry<String, String[]> entry : params.entrySet()) {
					buf.append(entry.getKey());
				}
				
				String json = buf.toString().trim();
				if(Base64.isBase64(json)) {
					json = new String(Base64.decodeBase64(json), CHARSET_NAME);
				}
				json = json.substring(0, json.length()-1).replaceAll("[\\[\\]\\{\\}]", "");
				json = URLDecoder.decode(json, CHARSET_NAME);
				LOG.info("post请求数据为:[{}]", json);
				String []kValues = json.split(",");
				String []inKValues = null;
				String value = null;
				for(String str : kValues) {
					if(str.contains(":")) {
						inKValues = str.split("\":");
						if(inKValues != null && inKValues.length > 1) {
							switch(inKValues.length) {
							case 1: break;
							case 2: value = inKValues[1]; break;
							case 3: value = inKValues[2]; break;
							}
							if(!PreventSqlInjectUtils.isLegal(URLDecoder.decode(value, CHARSET_NAME))) {
								return false;
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		for(Map.Entry<String, String[]> entry : params.entrySet()) {
			String []values = entry.getValue();
			for(String value : values) {
				if(Base64.isBase64(value)) {
					value = new String(Base64.decodeBase64(value), CHARSET_NAME);
				}
				if(!PreventSqlInjectUtils.isLegal(URLDecoder.decode(value, CHARSET_NAME))) {
					LOG.info("参数可能存在sql注入风险, value:[{}], qury:[{}]", value, request.getQueryString());
					return false;
				}
			}
		}*/
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}
