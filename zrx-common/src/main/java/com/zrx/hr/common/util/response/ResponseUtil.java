package com.zrx.hr.common.util.response;

import com.zrx.hr.common.constants.ErrorCode;
import com.zrx.hr.common.domain.CommonResponseVO;

public class ResponseUtil {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T createResponse(Class <? extends CommonResponseVO>clazz) {
		CommonResponseVO response = null;
		try {
			response = clazz.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (T)response;
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T createResponse(Class <? extends CommonResponseVO>clazz, ErrorCode errorCode) {
		CommonResponseVO response = createResponse(clazz, errorCode, false);
		return (T)response;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T createResponse(Class <? extends CommonResponseVO>clazz, ErrorCode errorCode, boolean success) {
		
		CommonResponseVO response = null;
		try {
			response = clazz.newInstance();
			response.setSuccess(success);
			response.setErrorCode(errorCode.getCode());
			response.setMsg(errorCode.getDesc());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (T)response;
	}
	
	@SuppressWarnings("rawtypes")
	public static void setResponseSuccess(CommonResponseVO response) {
		if(response == null) {
			return;
		}
		response.setMsg("OK");
		response.setSuccess(true);
		response.setErrorCode(ErrorCode.SUCCESS_CODE.getCode());
	}
}
