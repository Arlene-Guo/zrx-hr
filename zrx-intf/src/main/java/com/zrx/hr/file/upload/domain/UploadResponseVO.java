package com.zrx.hr.file.upload.domain;

import java.util.List;

import com.zrx.hr.common.domain.CommonResponseVO;
import com.zrx.hr.file.upload.domain.UploadResponseVO.DataDetail;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Description: 上传结果反馈<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午10:15:03
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UploadResponseVO extends CommonResponseVO<List<DataDetail>> {

    @Setter
    @Getter
    public static class DataDetail {
        private String url;
    }
}
