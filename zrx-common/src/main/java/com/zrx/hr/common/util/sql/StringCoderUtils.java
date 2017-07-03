package com.zrx.hr.common.util.sql;

import java.io.UnsupportedEncodingException;

import org.apache.commons.lang3.StringUtils;

/**
 * 字符串编码判断工具类
 * @author wangxiaoming
 *
 */
public class StringCoderUtils {

	/**
	 * 判断一个字符串是否使用指定的编码进行编码
	 * @param str
	 * @param charsetName
	 * @return
	 */
	public static boolean isCode(String str, String charsetName) {
		if(StringUtils.isBlank(str)) {
			return true;
		}
		String tmp = "";
		try {
			tmp = new String(str.getBytes(charsetName), charsetName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str.equals(tmp);
	}
	
}
