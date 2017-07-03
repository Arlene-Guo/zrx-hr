package com.zrx.hr.common.util.response;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import org.apache.commons.codec.binary.Base64;

public class ResponseBase64Util {
    

    /**
     * 
     * 此方法描述的是：response 返回
     */
    public static void write(HttpServletResponse response, String responseStr) {
    	response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Content-Type", "application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Methods", "*");
        try {
            response.getWriter().write(new String(Base64.encodeBase64(responseStr.getBytes("utf-8")),"utf-8"));
        } catch (IOException e) {
            
        }

    }
}
