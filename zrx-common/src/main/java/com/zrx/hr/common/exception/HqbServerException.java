package com.zrx.hr.common.exception;

import com.zrx.hr.common.constants.ErrorCode;

import lombok.Getter;

public class HqbServerException extends Exception {

    private static final long serialVersionUID = 8753622630802714474L;

    
    @Getter
    private ErrorCode errorCode;

    @Getter
    private String errorMsg;
    
    public HqbServerException(ErrorCode errorCode) {
//        super(errorCode.getDesc());
        this.errorCode = errorCode;
    }

    public HqbServerException(ErrorCode errorCode, Object[] params) {
//        super(String.format(errorCode.getDesc(), params));
        this.errorCode = errorCode;
    }
    
    public HqbServerException(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}