package com.zrx.hr.user.domain.request;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class LoginUserMsg {

    private Boolean success;
    private Integer errno;
    private String errmsg;
    private UserInfo data;
    
    @Getter
    @Setter
    public static class UserInfo {
        private Long id;
        private String nickname;
        private String login_source;
        private String logout_hash;
    }
}
