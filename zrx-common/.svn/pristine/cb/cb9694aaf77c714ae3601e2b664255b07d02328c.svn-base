package com.zrx.hr.common.util.sql;

import org.apache.commons.lang3.StringUtils;

/**
 * 判断参数是否存在sql注入的工具类
 * @author wangxiaoming
 *
 */
public class PreventSqlInjectUtils {
	
	private static String []illegalityStr = {"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ";", "=", "[", "]", "{", "}", "\\", 
											 "~", "'", "xor", "and", " when ", " for ", " then ", " if ", " else ", " switch ", "script",
											 " while ", " not ", " drop ", " select ", " insert ", " into ", " update ", " where ", " order by ", " case ", 
											 " table ", " asc ", "values",
											 "avg(", "sum(", "count(", " from ", " having ", " group ", " other ", " limit ", " sub(", " div(", "mul(", "truncate",
											 " alter ", " index ", " on ", " delete ", " exec ", " net ", " shell ", " cmd ", " copy ", " cd ", " master ", "mid",
											 " char ", "now(", "sysdate(", "exit", "return", "sleep", "wait", "shutdown", "start", " between "};
	
	public static boolean isLegal(String param) {
		if(StringUtils.isBlank(param)) {
			return true;
		}
		String str = param.toLowerCase();
		for(String tmp : illegalityStr) {
			if(str.contains(tmp)) {
				return false;
			}
		}
		return true;
	}
}
