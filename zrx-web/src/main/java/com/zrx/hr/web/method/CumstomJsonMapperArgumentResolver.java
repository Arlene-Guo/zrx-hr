package com.zrx.hr.web.method;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.tuniu.nfbird.utils.execption.ErrorCodeException;
import com.tuniu.nfbird.utils.json.ObjectMapperFactory;
import com.tuniu.nfbird.web.MVCErrorCode;
import com.tuniu.nfbird.web.annotation.Json;
import com.zrx.hr.common.util.json.JsonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CumstomJsonMapperArgumentResolver implements HandlerMethodArgumentResolver {
	
    private ObjectMapper objectMapper;
    private static final String PATH_DELIMITER = "/";

    public CumstomJsonMapperArgumentResolver() {
        objectMapper = ObjectMapperFactory.getDefaultObjectMapper();
    }

    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Json.class);
    }

    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        try {
            Json jsonAnn = parameter.getParameterAnnotation(Json.class);
            String path = jsonAnn.path();
            String allParam = getRequestParam(webRequest);
            
            LOG.info("参数自动解析:{}", allParam);
            if (allParam == null || allParam.length() == 0) {
                return null;
            }
            JsonNode node = objectMapper.readTree(allParam);
            if (path == null || "".equals(path)) {
                path = parameter.getParameterName();
                if (node.has(path)) {
                    @SuppressWarnings("deprecation")
					ObjectReader objectReader = objectMapper.reader(getReferenceType(parameter));
                    return objectReader.readValue(node.path(path));
                }
//                try {
                    return objectMapper.readValue(allParam, getReferenceType(parameter));
//                } catch (Throwable e) {
//                    log.error("json map error", e);
//                    return null;
//                }

            } else {
                String[] paths = StringUtils.split(path, PATH_DELIMITER);
                for (String p : paths) {
                    node = node.path(p);
                }
                if (node == null) {
                    return null;
                }
                ObjectReader objectReader = objectMapper.reader(getReferenceType(parameter));
                return objectReader.readValue(node);
            }
        } catch (Exception e) {
            LOG.error("can't generate param [" + parameter.getParameterName() + "] for url "
                    + webRequest.getNativeRequest(HttpServletRequest.class).getServletPath() + ", and source input is "
                    + getRequestParam(webRequest));
            throw new ErrorCodeException(MVCErrorCode.REQUEST_ERROR, e);
        }
    }

    /**
     * 获取反射的对象类型
     */
    private JavaType getReferenceType(MethodParameter parameter) {
        Type type = parameter.getGenericParameterType();
        return getReferenceType(type);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
	private JavaType getReferenceType(Type type) {
        if (type instanceof ParameterizedType) {
            Type[] genericTypes = ((ParameterizedType) type).getActualTypeArguments();
            Class<?> parameterType = (Class<?>) ((ParameterizedType) type).getRawType();
            if (Collection.class.isAssignableFrom(parameterType)) {
                if (genericTypes.length >= 1) {
                    return objectMapper.getTypeFactory().constructCollectionType(
                            (Class<? extends Collection>) parameterType, getReferenceType(genericTypes[0]));
                }

            } else if (Map.class.isAssignableFrom(parameterType)) {
                if (genericTypes.length >= 2) {
                    return objectMapper.getTypeFactory().constructMapType((Class<? extends Map>) parameterType,
                            getReferenceType(genericTypes[0]), getReferenceType(genericTypes[1]));
                } else if (genericTypes.length == 1) {
                    return objectMapper.getTypeFactory().constructMapType((Class<? extends Map>) parameterType,
                            getReferenceType(genericTypes[0]), getReferenceType(Object.class));
                } else {
                    return objectMapper.getTypeFactory().constructMapType((Class<? extends Map>) parameterType,
                            Object.class, Object.class);
                }

            }
            //其他交给Databind-specific annotations处理
//            throw new UnsupportedOperationException("Unsuppored Reference To JavaType " + type);
        }
        return objectMapper.getTypeFactory().constructType(type);
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
        String result = null;
        if (method.equals("GET") || method.equals("DELETE")) {
            result = httpServletRequest.getQueryString();
            if(Base64.isBase64(result)) {
                result = new String(Base64.decodeBase64(result), "UTF-8");
                return result;
            }
        }
        StringBuilder buffer = new StringBuilder();
        String line;
        BufferedReader reader = httpServletRequest.getReader();
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        result = buffer.toString();
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
