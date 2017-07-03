package com.zrx.hr.mail.domain.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.zrx.hr.common.domain.CommonDomain;

@Data
@EqualsAndHashCode(callSuper = true)
public class Mail extends CommonDomain{
	
	  /**
	   * 发件人邮箱
	   */
	  private String sender;
	  /**
	   * 收件人邮箱
	   */
	  private String recipient;
	  /**
	   * 主题
	   */
	  private String subject;
	  /**
	   * 邮件正文
	   */
	  private String content;
	  
	  /**
	   * 发送主体：与type的关系。0--简历分配id，1-5--面试单id
	   */
	  private Integer sendMainId;
	  /**
	   * 邮件类型: 0测评,1 初试面试邀请 2复试面试邀请 3初试面试官通知 4复试面试官通知 5 发送offer
	   */
	  private Integer type;
	  /**
	   * 0成功 1失败
	   */
	  private Integer state;
	  /**1 text 2 html*/
	  private Integer format;
	  /**
	   * link的id
	   */
	  private Integer linkId;
}
