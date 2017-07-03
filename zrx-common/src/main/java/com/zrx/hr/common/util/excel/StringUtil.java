 package com.zrx.hr.common.util.excel;
 
 import java.io.UnsupportedEncodingException;
import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

//import com.signway.cdms.util.log.LogFactory;
//import com.signway.cdms.util.log.Logger;
 
 public class StringUtil
 {
   private static final int SPACAE_CH_ACII = 12288;
 
   public static int getLength(String src)
   {
     return (((src == null) || ("".equals(src))) ? 0 : src.getBytes().length);
   }
 
   public static String nvl(Object obj)
   {
     return ((obj == null) ? "" : obj.toString().trim());
   }
 
   public static float toFloat(String str, float def)
   {
     float flat = def;
     try
     {
       flat = Float.parseFloat(str);
     }
     catch (Exception e)
     {
       flat = def;
     }
     return flat;
   }
 
   public static int toInt(String str, int def)
   {
     int value = def;
     try
     {
       value = Integer.parseInt(str);
     }
     catch (Exception e)
     {
       value = def;
     }
 
     return value;
   }
 
   public static Date timeStr2Date(String time, String pattern)
   {
     Date date = null;
     if ((isEmpty(time)) || (isEmpty(pattern)))
     {
       return null;
     }
     SimpleDateFormat sdf = new SimpleDateFormat(pattern, new Locale("EN"));
     try
     {
       date = sdf.parse(time);
     }
     catch (ParseException e)
     {
//       log.error(e.toString());
     }
     return date;
   }
 
   public static String date2TimeStr(Date time, String pattern)
   {
     if (pattern == null)
     {
       throw new IllegalArgumentException("pattern parameter can not be null");
     }
     if (time == null)
     {
       throw new IllegalArgumentException("time parameter can not be null");
     }
     SimpleDateFormat sdf = new SimpleDateFormat(pattern, new Locale("EN"));
     return sdf.format(time);
   }
 
   public static String asDefault(String str, String def)
   {
     String resultStr = "";
     if ((str == null) || ("".equals(str.trim())))
     {
       resultStr = def;
     }
     else
     {
       resultStr = str;
     }
     return resultStr;
   }
 
   public static String trim(String str)
   {
     return ((str == null) ? null : str.trim());
   }
 
   public static boolean isEmpty(String str)
   {
     boolean result;
     if ((str == null) || ("".equals(str.trim())))
     {
       result = true;
     }
     else
     {
       result = false;
     }
     return result;
   }
 
   public static boolean isEmpty(String[] str)
   {
     if (str == null)
     {
       return true;
     }
     boolean result = true;
     for (String s : str)
     {
       if (isEmpty(s))
         continue;
       result = false;
       break;
     }
 
     return result;
   }
 
   public static String checkStringLen(String str, int checkLen)
   {
     if (isEmpty(str))
     {
       return "";
     }
     if (str.length() > checkLen)
     {
       return addPoint(str.substring(0, checkLen));
     }
     return str;
   }
 
   public static String addPoint(String str)
   {
     return str + "...";
   }
 
   public static String filterHTMLinput(String s)
   {
     if (!(isEmpty(s)))
     {
       s = s.trim();
       s = s.replaceAll("'", "&acute;");
       s = s.replaceAll("\"", "&quot;");
       s = s.replaceAll("\r\n", "<br/>");
       s = s.replaceAll("\n", "<br/>");
       s = s.replaceAll("<", "&lt;");
       s = s.replaceAll(">", "&gt;");
     }
     return s;
   }
 
   public static String filterHTMLReverseForView(String s)
   {
     if (!(isEmpty(s)))
     {
       s = s.trim();
       s = s.replaceAll("&lt;", "<");
       s = s.replaceAll("&gt;", ">");
       s = s.replaceAll("<br/>", "\r\n");
       s = s.replaceAll("<", "&lt;");
       s = s.replaceAll(">", "&gt;");
     }
     return s;
   }
 
   public static String filterHTMLReverseForTextArea(String s)
   {
     if (!(isEmpty(s)))
     {
       s = s.trim();
       s = s.replaceAll("&acute;", "'");
       s = s.replaceAll("&quot;", "\"");
       s = s.replaceAll("&lt;", "<");
       s = s.replaceAll("&gt;", ">");
       s = s.replaceAll("<br/>", "\r\n");
     }
     return s;
   }
 
   public static String filterHTMLReverseForXML(String s)
   {
     if (!(isEmpty(s)))
     {
       s = 
         s.trim()
         .replaceAll("&nbsp;", " ")
         .replaceAll("&quot;", "\"")
         .replaceAll("&lt;", "<")
         .replaceAll("&gt;", ">")
         .replaceAll("\r\n", "")
         .replaceAll("\r", "")
         .replaceAll("  ", "")
         .replaceAll("　", " ")
         .replaceAll("　　", "")
         .replaceAll("                                    ", " ");
     }
     return s.trim();
   }
 
   public static String matchStringParameter(String matchString, Object[] args)
   {
     if ((matchString == null) || ("".equals(matchString.trim())))
     {
       return matchString;
     }
 
     if (matchString.indexOf("{}") == -1)
     {
       return matchString;
     }
 
     String[] matchStrings = matchString.split("\\{\\}");
     StringBuffer sb = new StringBuffer();
     if ((args == null) || (args.length == 0))
     {
       int i = 0; 
       while (true) {
         sb.append(matchStrings[i]);
 
         ++i; if (i >= matchStrings.length)
         {
            return sb.toString(); } }
     }
     if (args.length >= matchStrings.length)
     {
       int i = 0; 
       while (true) {
         sb.append(matchStrings[i]);
         sb.append(args[i]);
 
         ++i; if (i >= matchStrings.length)
         {
            return sb.toString();
         }
       }
     }
     for (int i = 0; i < matchStrings.length; ++i)
     {
       if (i < args.length)
       {
         sb.append(matchStrings[i]);
         sb.append(args[i]);
       }
       else
       {
         sb.append(matchStrings[i]);
       }
     }
     return sb.toString();
   }
 
   public static String str2HexStr(String str)
   {
     char[] chars = "0123456789abcdef".toCharArray();
     StringBuilder sb = new StringBuilder("");
     byte[] bs = str.getBytes();
 
     for (int i = 0; i < bs.length; ++i)
     {
       int bit = (bs[i] & 0xF0) >> 4;
       sb.append(chars[bit]);
       bit = bs[i] & 0xF;
       sb.append(chars[bit]);
     }
 
     return sb.toString();
   }
 
   public static String hexStr2Str(String hexStr)
   {
     String str = "0123456789abcdef";
     char[] hexs = hexStr.toCharArray();
     byte[] bytes = new byte[hexStr.length() / 2];
 
     for (int i = 0; i < bytes.length; ++i)
     {
       int n = str.indexOf(hexs[(2 * i)]) * 16;
       n += str.indexOf(hexs[(2 * i + 1)]);
       bytes[i] = (byte)(n & 0xFF);
     }
     return new String(bytes);
   }
 
   public static String uni2utf8(String param)
     throws UnsupportedEncodingException
   {
     byte[] bytes = param.getBytes("UTF-8");
 
     return new String(Hex.encodeHex(bytes));
   }
 
   public static String utf82uni(String param)
     throws UnsupportedEncodingException, DecoderException
   {
     byte[] bytes = Hex.decodeHex(param.toCharArray());
 
     return new String(bytes, "UTF-8");
   }
 
   public static List<String> splitString(String str, String separator)
   {
     List list = new ArrayList();
     if (!(isEmpty(str)))
     {
       try
       {
         String[] strs = str.split(separator);
         for (String string : strs)
         {
           if (isEmpty(str))
             continue;
//           list.add(string);
         }
 
       }
       catch (Exception e)
       {
//         log.error(e.toString());
       }
     }
     return list;
   }
 
 
   public static String beanToString(Object bean)
   {
     StringBuffer buffer = new StringBuffer();
     if (bean == null)
     {
       return buffer.toString();
     }
 
     Class c = bean.getClass();
     Field[] fields = c.getDeclaredFields();
 
     buffer.append(c.getName().substring(c.getName().lastIndexOf(".") + 1) + '[');
     try
     {
       AccessibleObject.setAccessible(fields, true);
 
       for (int i = 0; i < fields.length; ++i)
       {
         Field f = fields[i];
         buffer.append(f.getName());
         buffer.append('=');
         Object field = f.get(bean);
         if (field instanceof Object[])
         {
           Object[] obj = (Object[])field;
           buffer.append(arrayToString(obj));
         }
         else if (("password".equals(toLowerCase(f.getName()))) || ("pwd".equals(toLowerCase(f.getName()))) || 
           ("newpswd".equals(toLowerCase(f.getName()))) || ("oldpswd".equals(toLowerCase(f.getName()))))
         {
           buffer.append("******");
         }
         else
         {
           buffer.append(field);
         }
 
         if (i + 1 >= fields.length)
           continue;
         buffer.append(',');
       }
 
     }
     catch (Exception e)
     {
//       log.error(e.toString());
     }
     buffer.append(']');
     return buffer.toString();
   }
 
   public static String toLowerCase(String str)
   {
     if (str == null)
     {
       return str;
     }
     return str.toLowerCase(Locale.getDefault());
   }
 
   public static String arrayToString(Object[] objs)
   {
     if (objs != null)
     {
       StringBuffer objsBuffer = new StringBuffer();
       objsBuffer.append("{");
       for (int i = 0; i < objs.length; ++i)
       {
         objsBuffer.append((objs[i] == null) ? "null" : objs[i]);
         if (i >= objs.length - 1)
           continue;
         objsBuffer.append(",");
       }
 
       objsBuffer.append("}");
       return objsBuffer.toString();
     }
     return "{null}";
   }
 
   public static String escape(String src)
     throws UnsupportedEncodingException
   {
     StringBuffer tmp = new StringBuffer();
     tmp.ensureCapacity(src.length() * 6);
     for (int i = 0; i < src.length(); ++i)
     {
       char j = src.charAt(i);
       if ((Character.isDigit(j)) || (Character.isLowerCase(j)) || (Character.isUpperCase(j))) {
         tmp.append(j);
       } else if (j < 256)
       {
         tmp.append("%");
         if (j < '\16')
           tmp.append("0");
         tmp.append(Integer.toString(j, 16));
       }
       else
       {
         tmp.append("%u");
         tmp.append(Integer.toString(j, 16));
       }
     }
     return tmp.toString();
   }
 
   public static String unescape(String src)
   {
     if ((src == null) || ("".equals(src)))
     {
       return "";
     }
     StringBuffer tmp = new StringBuffer();
     tmp.ensureCapacity(src.length());
     int lastPos = 0; int pos = 0;
 
     while (lastPos < src.length())
     {
       pos = src.indexOf("%", lastPos);
       if (pos == lastPos)
       {
         char ch;
         if (src.charAt(pos + 1) == 'u')
         {
           ch = (char)Integer.parseInt(src.substring(pos + 2, pos + 6), 16);
           tmp.append(ch);
           lastPos = pos + 6;
         }
         else
         {
           ch = (char)Integer.parseInt(src.substring(pos + 1, pos + 3), 16);
           tmp.append(ch);
           lastPos = pos + 3;
         }
 
       }
       else if (pos == -1)
       {
         tmp.append(src.substring(lastPos));
         lastPos = src.length();
       }
       else
       {
         tmp.append(src.substring(lastPos, pos));
         lastPos = pos;
       }
     }
 
     return tmp.toString();
   }
 
   public static String replaceHtmlChar(String str)
   {
     if (isEmpty(str))
     {
       return "";
     }
     String result = str.replaceAll("'", "&acute;");
     result = result.replaceAll("\"", "&quot;");
     return result;
   }
 
   public static String cutString(String str, int index, String regex)
   {
     String content = "";
     int start = 0;
     int end = 0;
     for (int i = 0; i < index; ++i)
     {
       end = str.indexOf(regex, (i == 0) ? start : start + 1);
       content = str.substring(0, end);
       start = end;
     }
     return content;
   }
 
   public static String cutString2(String str, int index, String regex)
   {
     for (int i = 0; i < index; ++i)
     {
       str = str.substring(0, str.lastIndexOf(regex));
     }
     return str;
   }
 
   public static String replacePlaceChar(String str, String[] arrs)
   {
     if (arrs == null)
       return str;
     for (int i = 0; i < arrs.length; ++i)
     {
       str = str.replace("{" + i + "}", arrs[i]);
     }
     return str;
   }
 
   public static String replaceFileNameChar(String fileName)
   {
     if (fileName.indexOf("\\") != -1)
     {
       fileName = fileName.replaceAll("\\\\", "/");
     }
     return fileName;
   }
 
   public static String getFileName(String filePath)
   {
     String fileName = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."));
     return fileName;
   }
 
   public static String matchContext(String result, String regex)
   {
     Pattern p = Pattern.compile(regex);
     Matcher m = p.matcher(result);
     StringBuffer sb = new StringBuffer();
     while (m.find())
     {
       sb.append(m.group());
     }
     return sb.toString();
   }
 
   public static List<String> matchContextToList(String result, String regex)
   {
     Pattern p = Pattern.compile(regex);
     Matcher m = p.matcher(result);
     List list = new ArrayList();
     while (m.find())
     {
       list.add(m.group());
     }
     return list;
   }
 
   public static String double2Percent(double d)
   {
     String percent = "";
     NumberFormat num = NumberFormat.getPercentInstance();
     num.setMaximumIntegerDigits(3);
     num.setMaximumFractionDigits(2);
     percent = num.format(d);
     return percent; }
 
   public static String bytesToHexString(byte[] src) {
     StringBuilder stringBuilder = new StringBuilder();
     if ((src == null) || (src.length <= 0)) {
       return null;
     }
     for (int i = 0; i < src.length; ++i) {
       int v = src[i] & 0xFF;
       String hv = Integer.toHexString(v);
       if (hv.length() < 2) {
         stringBuilder.append(0);
       }
       stringBuilder.append(hv);
     }
     return stringBuilder.toString();
   }
 
   public static String transNull(String value)
   {
     if (value == null)
     {
       return value;
     }
 
     if ("".equals(value.trim()))
     {
       return "";
     }
     String tempValue = value.trim();
     while (tempValue.codePointAt(0) == 12288)
     {
       tempValue = tempValue.substring(1, tempValue.length()).trim();
     }
     while (tempValue.codePointAt(0) == 12288)
     {
       tempValue = tempValue.substring(0, tempValue.length() - 1).trim();
     }
     return tempValue;
   }
 
   public static boolean isBoolean(String s)
   {
     return ("true".equals(s));
   }
   /**
    * 生成随即密码
    * @param pwd_len 生成的密码的总长度
    * @return  密码的字符串
    */
   public static String getRandomNum(int pwd_len){
    //35是因为数组是从0开始的，26个字母+10个数字
    final int  e_maxNum = 26;
    final int  n_maxNum = 10;
    int i;  //生成的随机数
    int count = 0; //生成的密码的长度
    char[] e_str = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
      'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
    char[] n_str = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
    
    StringBuffer pwd = new StringBuffer("");
    Random r = new Random();
    while(count < pwd_len){
     //生成随机数，取绝对值，防止生成负数，
    	if(count%2==0){
    		 i = Math.abs(r.nextInt(n_maxNum));  //生成的数最大为36-1
    	     if (i >= 0 && i < n_str.length) {
    	      pwd.append(n_str[i]);
    	      count ++;
    	     }
    	}else{
		     i = Math.abs(r.nextInt(e_maxNum));  //生成的数最大为36-1
		     if (i >= 0 && i < e_str.length) {
		      pwd.append(e_str[i]);
		      count ++;
		     }
    	}
    }
    
    return pwd.toString();
   }
   public static void main(String[] arg){
	   StringUtil.getRandomNum(6);
   }
 }
