package com.zrx.hr.file.upload.constants;

import lombok.Getter;

/**
 * Description: 上传的错误编号<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午10:18:31
 *
 */
public enum UploadErrorCode {

    DOWNLOAD_ERROR("下载文件失败"),

    URL_ERROR("URL错误");

    @Getter
    private String desc;

    private UploadErrorCode(String desc) {
        this.desc = desc;
    }

}
