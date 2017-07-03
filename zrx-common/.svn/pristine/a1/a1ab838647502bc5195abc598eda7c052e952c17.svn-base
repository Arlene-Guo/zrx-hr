package com.zrx.hr.common.util.date;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";

    public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";

    public static final String YYYY_MM_DD = "yyyy-MM-dd";

    /**
     * 
     * Description: 转换日期 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月11日 下午5:44:32
     * @param dateStr
     * @param format
     * @return
     */
    public static Date parseDate(String dateStr, String format) {
        DateFormat df = new SimpleDateFormat(format);
        try {
            return df.parse(dateStr);
        } catch (ParseException e) {
            return null;
        }
    }

    /**
     * 
     * Description: 格式化时间 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月13日 下午5:48:47
     * @param date
     * @param format
     * @return
     */
    public static String formatDate(Date date, String format) {
        DateFormat df = new SimpleDateFormat(format);
        return df.format(date);
    }

    /**
     * 
     * Description: YYYY_MM_DD_HH_MM_SS <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月22日 下午1:33:34
     * @param date
     * @return
     */
    public static String formatDateTime(Date date) {
        return formatDate(date, YYYY_MM_DD_HH_MM_SS);
    }

    /**
     * 
     * Description: <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月15日 上午9:11:13
     * @param orderTime
     * @param valueOf
     * @return
     */
    public static Date addMinutes(Date date, Integer minutes) {
        if (null == minutes) {
            return date;
        }
        long time = date.getTime() + minutes * 60 * 1000;
        return new Date(time);
    }

    /**
     * 获取当月为 第几个月
     * 
     * @return
     */
    public static int nowMonth() {
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.MONTH) + 1;
    }

    /**
     * 获取当月总天数
     * 
     * @return
     */
    public static int monthLastDay() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }

    /**
     * 获取当月第一天为周几
     * 
     * @return
     */
    public static int monthFirstDay() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, 1); // 设置为1号
        return cal.get(Calendar.DAY_OF_WEEK);
    }

    /**
     * 获取当天几号
     * 
     * @return
     */
    public static int today() {
        Calendar cal = Calendar.getInstance();
        return cal.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * 获取当月第一天为周几
     * 
     * @return
     */
    public static int weekNum() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH)); // 设置为最后一天
        return cal.get(Calendar.WEEK_OF_MONTH);
    }
    
    
    /**
     * 
     * Description: 根据日期字符串获得周几字符串<br/>
     * 
     * @author caohui2
     * @date 2016年4月23日 上午11:14:56
     * @param dateStr
     * @return
     */
    public static String getWeekDay(String dateStr) {
        Date date = parseDate(dateStr, DateUtil.YYYY_MM_DD);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int index = cal.get(Calendar.DAY_OF_WEEK);
        String[] weeks = new String[]{"周一","周二","周三","周四","周五","周六","周日"};
        if(index == 1) {
            index = 6;
        }else {
            index = index-2;
        }
        return weeks[index]; 
    }
}
