package com.zrx.hr.common.util.properties;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 
 * Description: 测试环境很多外部系统只能采用REST请求 <br/>
 *
 * @author wangxiaoming
 * @date 2016年4月21日 下午3:21:14
 *
 */
public class TspPropertiesLoader {

    private TspPropertiesLoader() {
    }

    private static Properties properties = null;

    /**
     * 
     * Description: 根据Key获取键值 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月21日 下午4:03:09
     * @param key
     * @return
     */
    public static String getPropertis(String key) {
        if (null == properties) {
            synchronized (TspPropertiesLoader.class) {
                if (null == properties) {
                    InputStream inputStream = TspPropertiesLoader.class.getResourceAsStream("/tsp-rest.properties");
                    if (null == inputStream) {
                        return null;
                    }
                    properties = new Properties();
                    try {
                        properties.load(inputStream);
                    } catch (IOException e) {
                        // nothing to do
                    }
                }
            }
            if (null == properties) {
                return null;
            }
        }
        return properties.getProperty(key);
    }
}
