package com.zrx.hr.web.method;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

//import com.tuniu.nfbird.web.method.FailData;
import com.zrx.hr.common.util.json.JsonUtil;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * Description: Json返回异常处理 <br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午4:02:21
 *
 */
@Slf4j
public class ResponseJsonExceptionResolver extends AbstractHandlerExceptionResolver {

    @Setter
    @Getter
    private HttpMessageConverter<Object> messageConverter;

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        LOG.error("", ex);

//        FailData failData = new FailData();
//
//        String errorMsg = null;
//        if (ex instanceof BindException) {
//            errorMsg = bindExceptionResolver(ex);
//        } else {
//            errorMsg = ex.getMessage() == null ? "系统错误" : ex.getMessage();
//        }
//
//        
//        failData.setMsg(errorMsg);
//
//        String callback = JsonUtil.toJsonp(failData,request.getParameter("callback"));
//       
//        try {
//            response.setContentType("application/json;charset=utf-8");
//            PrintWriter out = response.getWriter();
//            out.print(callback);
//            out.flush();
//        } catch (IOException e) {
//            LOG.error(e.getMessage(),e);
//        }
        
       
      /* String callback = JsonUtil.toJsonp(failData,request.getParameter("callback")); 
       */
      /* try {
            response.setContentType("application/json;charset=utf-8");
            messageConverter.write(callback,null, new ServletServerHttpResponse(response));
        } catch (HttpMessageNotWritableException e) {
            LOG.error(e.getMessage(), e);
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }*/
        return null;
    }

    /**
     * 
     * Description: 拦截 BindException <br/>
     * 
     * @param ex
     * @param failData
     * @return
     */
    private String bindExceptionResolver(Exception ex) {
        BindException bindException = (BindException) ex;
        List<ObjectError> allErrors = bindException.getBindingResult().getAllErrors();
        String[] errorField = new String[allErrors.size()];
        for (int i = 0; i < allErrors.size(); i++) {
            ObjectError error = allErrors.get(i);
            if (!(error instanceof FieldError)) {
                continue;
            }
            FieldError fe = (FieldError) error;
            errorField[i] = fe.getField();
        }
        return StringUtils.join(errorField, ",") + " 格式错误！";
    }

}
