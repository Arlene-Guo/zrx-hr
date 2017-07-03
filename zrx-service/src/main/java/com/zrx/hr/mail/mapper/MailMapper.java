package com.zrx.hr.mail.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zrx.hr.mail.domain.vo.Mail;

@Repository
public interface MailMapper {
	
	int insertMail(Mail mail);

	List<Mail> findMail(@Param("mail") Mail mail);

}
