package com.zrx.hr.common.util.requestid;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;

public class GeneratorRquestId {
    
    /**
     * 下单请求序列号  唯一标示一次下单请求
     * 生成规则：HQB(3)+001(3下单)+UUID(12)+随机数(3)+时间戳(14)
     * */

    public static String getRequestId(){
        return subSysCode()+"001"+uuid()+random()+time();
    }
    
    private static String subSysCode(){
        return "HQB";
    }
    
    private static String uuid(){
        return StringUtils.left(UUID.randomUUID().toString().toUpperCase().replace("-", ""), 9);
    }
    
    private static String random(){
        return String.valueOf((int)((Math.random()*9+1)*100));
    }
    
    public static String time(){
        DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        return df.format(new Date());
    }
    
}
