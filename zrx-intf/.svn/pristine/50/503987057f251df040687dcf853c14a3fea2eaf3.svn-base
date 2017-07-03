package com.zrx.hr.user.domain.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Description: 获得从FAB接口的实例类<br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 下午1:12:08
 *
 */
@Data
public class LoginUserInfo {

    private UserInfo cust;
   
    @Getter
    @Setter
    public static class UserInfo {
        /**
         *	用户ID 
         */
        private Long custId;
        /**
         *	电话号 
         */
        private String tel;
        /**
         *	区号 
         */
        private String telCode;
        /**
         *	邮箱 
         */
        private String email;
        /**
         *	真实姓名 
         */
        private String realName;
        
        /**
         * 昵称
         */
        private String nickName;
    }
    
}
