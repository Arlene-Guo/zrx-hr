package com.zrx.hr.mail.domain.bean;

import java.util.List;

import com.zrx.hr.common.constants.EmailFormat;

import lombok.Data;

@Data
public class MailBean {
	
	/**邮件接收人*/
	private String to;
	/**邮件抄送人*/
	private String cc;
	/**主题*/
	private String subject;
	/**text html*/
	private Integer format;
	/**邮件内容*/
	private String content;
	/**附件*/
	private List<String> attachs;
	

}
