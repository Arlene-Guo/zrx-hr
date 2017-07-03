package com.zrx.hr.common.util.json;

import java.io.IOException;
import java.io.StringWriter;
import java.util.TimeZone;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    private static ObjectMapper objectMapper = new ObjectMapper();
    static {
//        objectMapper.setSerializationInclusion(Include.NON_NULL);
        objectMapper.setTimeZone(TimeZone.getDefault());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.READ_UNKNOWN_ENUM_VALUES_AS_NULL, true);
    }

    /**
     * Description: 转换成json<br>
     * 
     * @author wangxiaoming<br>
     * @taskId <br>
     * @param object
     * @return <br>
     */
    public static String toJson(Object object) {
        try {
            StringWriter sw = new StringWriter();
            objectMapper.writeValue(sw, object);
            return sw.toString();
        } catch (IOException e) {
            return null;
        }
    }

    public static String toJsonp(Object object, String callback) {
        return toJsonp(toJson(object), callback);
    }

    public static String toJsonp(String object, String callback) {
        return callback + "(" + object + ")";
    }

    /**
     * 
     * Description: 转换成对象 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月16日 上午10:41:11
     * @param value
     * @param type
     * @return
     */
    public static <T> T parseObject(String value, Class<T> type) {
        try {
            return objectMapper.readValue(value, type);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 
     * Description: <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月16日 上午11:01:42
     * @param value
     * @param type
     * @return
     */
    public static <T> T parseObject(String value, TypeReference<T> type) {
        try {
            return objectMapper.readValue(value, type);
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * 
     * Description: <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月16日 上午10:47:18
     * @param value
     * @param type
     * @return
     */
    public static <T> T parseObject(byte[] value, Class<T> type) {
        try {
            return objectMapper.readValue(value, type);
        } catch (IOException e) {
            return null;
        }
    }
}
