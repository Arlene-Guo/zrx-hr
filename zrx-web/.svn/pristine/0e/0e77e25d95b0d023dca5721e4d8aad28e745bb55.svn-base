package com.zrx.hr.common.util.http;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.View;

public class RedirectUtils {

    protected RedirectUtils() {
    }

    public static void redirect(HttpServletRequest request, final String url) throws ModelAndViewDefiningException {
        View view = new View() {
            @Override
            public String getContentType() {
                return "text/html";
            }

            @Override
            public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
                // 对于Ajax请求，发送401，由前端自行处理sso认证
                if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                } else {
                    response.setStatus(HttpServletResponse.SC_FOUND);
                    response.setHeader("Location", url);
                }
            }
        };
        throw new ModelAndViewDefiningException(new ModelAndView(view));
    }

}
