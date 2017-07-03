package com.zrx.hr.mail.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testng.log.TextFormatter;

import com.zrx.hr.common.constants.Constants;
import com.zrx.hr.common.constants.EmailFormat;
import com.zrx.hr.common.constants.OrderStatus;
import com.zrx.hr.common.util.json.JsonUtil;
import com.zrx.hr.evaluation.domain.vo.EvaluationLink;
import com.zrx.hr.evaluation.mapper.EvaluationLinkMapper;
import com.zrx.hr.interviewer.domain.request.ModifyIntervieOrderRequest;
import com.zrx.hr.interviewer.mapper.InterviewerOrderMapper;
import com.zrx.hr.mail.domain.bean.MailBean;
import com.zrx.hr.mail.domain.vo.Mail;
import com.zrx.hr.mail.mapper.MailMapper;
import com.zrx.hr.mail.service.SentedMailService;
import com.zrx.hr.recruiter.domain.request.SearchResumeDistributionListRequest;
import com.zrx.hr.recruiter.domain.vo.ResumeDistribution;
import com.zrx.hr.recruiter.mapper.ResumeDistributionMapper;

@Slf4j
@Service
public class SentedMailServiceImpl implements SentedMailService {
	
//	@Resource
	JavaMailSenderImpl mailSender;
	
	@Resource
	MailMapper mailMapper;
	
	@Resource
	ResumeDistributionMapper resumeDistributionMapper;
	
	@Resource
	InterviewerOrderMapper interviewerOrderMapper;
	
	@Resource
	EvaluationLinkMapper evaluationLinkMapper;
	
	@Value("${mail.api.from}")
	private String from;
	
	public static Map<Integer, Map<String, String>> mailMaps = new HashMap<Integer, Map<String, String>>();
	
	static{
		//126 mail
		Map<String, String> mail126Config = new HashMap<String, String>();
		mail126Config.put(Constants.MAIL_API_SMTP, "smtp.126.com");
		mail126Config.put(Constants.MAIL_API_PORT, "25");
		mail126Config.put(Constants.MAIL_API_FROM, "zhongrongxin_hr@126.com");
		mail126Config.put(Constants.MAIL_API_USERNAME, "zhongrongxin_hr@126.com");
		mail126Config.put(Constants.MAIL_API_PASSWORD, "zhongrongxin666");
		mailMaps.put(0, mail126Config);
		//Yeah mail
		Map<String, String> mailYeahConfig = new HashMap<String, String>();
		mailYeahConfig.put(Constants.MAIL_API_SMTP, "smtp.yeah.net");
		mailYeahConfig.put(Constants.MAIL_API_PORT, "25");
		mailYeahConfig.put(Constants.MAIL_API_FROM, "zhongrongxin_hr@yeah.net");
		mailYeahConfig.put(Constants.MAIL_API_USERNAME, "zhongrongxin_hr@yeah.net");
		mailYeahConfig.put(Constants.MAIL_API_PASSWORD, "zhongrongxin2017");
		mailMaps.put(1, mailYeahConfig);
		//sina mail
		Map<String, String> mailSinaConfig = new HashMap<String, String>();
		mailSinaConfig.put(Constants.MAIL_API_SMTP, "smtp.sina.com");
		mailSinaConfig.put(Constants.MAIL_API_PORT, "25");
		mailSinaConfig.put(Constants.MAIL_API_FROM, "zhongrongxin_hr@sina.com");
		mailSinaConfig.put(Constants.MAIL_API_USERNAME, "zhongrongxin_hr@sina.com");
		mailSinaConfig.put(Constants.MAIL_API_PASSWORD, "zhongrongxin2017");
		mailMaps.put(2, mailSinaConfig);
		//sina mail
		Map<String, String> mailSohuConfig = new HashMap<String, String>();
		mailSohuConfig.put(Constants.MAIL_API_SMTP, "smtp.sohu.com");
		mailSohuConfig.put(Constants.MAIL_API_PORT, "25");
		mailSohuConfig.put(Constants.MAIL_API_FROM, "zhongrongxin_hr@sohu.com");
		mailSohuConfig.put(Constants.MAIL_API_USERNAME, "zhongrongxin_hr@sohu.com");
		mailSohuConfig.put(Constants.MAIL_API_PASSWORD, "zhongrongxin2017");
		mailMaps.put(3, mailSohuConfig);
	}
	
	@Override
	@Transactional
	public int SendMail(Mail mail) {
		int mailId = 0; 
		mailMapper.insertMail(mail);
		mailId = mail.getId();
		if(mailId > 0){
			MailBean mailBean = new MailBean();
			mailBean.setTo(mail.getRecipient());
			mailBean.setSubject(mail.getSubject()+"--"+mail.getRecipient());
			mailBean.setContent(mail.getContent());
			mailBean.setFormat(mail.getFormat());
			sendMail(mailBean);
		}
		if(mail.getType() == 0){ //发送测评
			ResumeDistribution resumeDistribution = new ResumeDistribution();
			resumeDistribution.setId(mail.getSendMainId());
			resumeDistribution.setEvaluationMailId(mailId);
			resumeDistributionMapper.updateResumeDistributionByPrimaryKeySelective(resumeDistribution);
			
			//更新测评链接表，表示已发送测评
			EvaluationLink link = new EvaluationLink();
			link.setId(mail.getLinkId());
			link.setUserState(2);
			evaluationLinkMapper.saveOrUpdateEvaluationLink(link);
			
		} else if(mail.getType() == 5){  //发送offer
			ModifyIntervieOrderRequest direquest = new ModifyIntervieOrderRequest();
			direquest.setId(mail.getSendMainId());
			direquest.setState(OrderStatus.OFFERED.getValue());
			interviewerOrderMapper.updateInterviewerOrderByPrimaryKeySelective(direquest);
		}
		
		LOG.info("邮件 已发送 {}", JsonUtil.toJson(mail));
		return mailId;
	}
	
	private boolean sendMail(MailBean mail){
		boolean result = false;
		try{
			if(mail.getFormat() == EmailFormat.Text.getValue()){
				result = sendSimpleText(mail);
			}else{
				result = sendMimeMessage(mail);
			}
			LOG.info("发送成功");
		}catch(Throwable e){
			LOG.info("邮件发送失败, 异常：{}, {}, {}", e, e.getMessage(), JsonUtil.toJson(mail));
			result = false;
		}
		
		return result;
	}
	
	private boolean sendSimpleText(MailBean mail){
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setFrom(from);
		mailMessage.setTo(mail.getTo());
		mailMessage.setSubject(mail.getSubject());
		mailMessage.setText(mail.getContent());
		mailSender = getMailSender();
		mailSender.send(mailMessage);
		return true;
	}
	
	private boolean sendMimeMessage(MailBean mail) throws Exception{
		MimeMessage mailMessage = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(mailMessage,true);
		messageHelper.setFrom(from);
		messageHelper.setTo(mail.getTo());
		messageHelper.setSubject(mail.getSubject());
		// true 表示启动HTML格式的邮件
		messageHelper.setText(mail.getContent(), true);
		mailSender = getMailSender();
		mailSender.send(mailMessage);
		return true;
		
	}
	
	private JavaMailSenderImpl getMailSender(){
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		Map<String, String> mailConfig = null;
		mailConfig = mailMaps.get(getRoandom());
        mailSender.setHost(mailConfig.get(Constants.MAIL_API_SMTP));
        mailSender.setPort(Integer.valueOf(mailConfig.get(Constants.MAIL_API_PORT)));
        mailSender.setUsername(mailConfig.get(Constants.MAIL_API_USERNAME));
        mailSender.setPassword(mailConfig.get(Constants.MAIL_API_PASSWORD));
        Properties javaMailProperties = new Properties();
        javaMailProperties.put("mail.smtp.auth", "true");
        javaMailProperties.put("mail.debug", "true");
        javaMailProperties.put("mail.smtp.timeout", "25000");
        mailSender.setJavaMailProperties(javaMailProperties);
        return mailSender;
	}
	
	private int getRoandom(){
		int max=4;
        int min=0;
        Random random = new Random();
    	return random.nextInt(max)%(max-min+1) + min;
	}

	@Override
	public List<Mail> findMail(Mail mail) {
		return mailMapper.findMail(mail);
	}
	
	public static void main(String args[]){
		JavaMailSenderImpl mailSender = null;
		Map<String, String> mailConfig = null;
		for (Map.Entry<Integer, Map<String, String>> entry : mailMaps.entrySet()) {  
			mailSender = new JavaMailSenderImpl();
			mailConfig = entry.getValue();
	        mailSender.setHost(mailConfig.get(Constants.MAIL_API_SMTP));
	        mailSender.setPort(Integer.valueOf(mailConfig.get(Constants.MAIL_API_PORT)));
	        mailSender.setUsername(mailConfig.get(Constants.MAIL_API_USERNAME));
	        mailSender.setPassword(mailConfig.get(Constants.MAIL_API_PASSWORD));
	        Properties javaMailProperties = new Properties();
	        javaMailProperties.put("mail.smtp.auth", "true");
	        javaMailProperties.put("mail.debug", "true");
	        javaMailProperties.put("mail.smtp.timeout", "25000");
	        mailSender.setJavaMailProperties(javaMailProperties);
	        SimpleMailMessage message=new SimpleMailMessage();  
	        message.setFrom(mailConfig.get(Constants.MAIL_API_FROM));  
	        message.setTo("xiaoniba_1024@sina.com");  
	        message.setSubject("恭喜你，你收到我们公司的邀请参加会议");  
	        message.setText("收到邮件后，请回复");  
	        //发送邮件  
	        mailSender.send(message);   
		}  
		
		int max=4;
        int min=0;
        Random random = new Random();
    	int s = random.nextInt(max)%(max-min+1) + min;
            System.out.println(s);
        
	}
	
}
