package com.zrx.hr.common.web.argument;

import java.io.InputStreamReader;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.zrx.hr.common.tsp.annotation.TspRequest;
import com.zrx.hr.common.util.json.JsonUtil;

/**
 * Description: TSP请求Base64编码<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月19日 下午5:21:49
 *
 */
public class TspRequestArgumentResolver implements HandlerMethodArgumentResolver {

    private Charset defaultCharset = Charset.forName("UTF-8");

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(TspRequest.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        HttpInputMessage message = new ServletServerHttpRequest(request);
        Charset charset = getContentTypeCharset(message.getHeaders().getContentType());
        String body = FileCopyUtils.copyToString(new InputStreamReader(request.getInputStream(), charset));
        if (StringUtils.isEmpty(body)) {
            body = request.getQueryString();
        }
        byte[] content;
        if (!Base64.isBase64(body)) {
            content = body.getBytes(charset);
        } else {
            content = Base64.decodeBase64(body);
        }
        return JsonUtil.parseObject(content, parameter.getParameterType());
    }

    /**
     * Description: 获取编码 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年11月19日 下午5:22:03
     * @param contentType
     * @return
     */
    private Charset getContentTypeCharset(MediaType contentType) {
        if (contentType != null && contentType.getCharSet() != null) {
            return contentType.getCharSet();
        } else {
            return this.defaultCharset;
        }
    }

}
