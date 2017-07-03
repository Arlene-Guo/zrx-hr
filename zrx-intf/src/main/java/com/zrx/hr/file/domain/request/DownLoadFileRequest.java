package com.zrx.hr.file.domain.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.request.QueryCommonParamVO;

@Data
@EqualsAndHashCode(callSuper = true)
public class DownLoadFileRequest extends QueryCommonParamVO {
	
	private String filepath;
	private String filename;

}
