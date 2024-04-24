package com.back.service.qna;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service

public class QnAServiceImpl implements QnAService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String name, String email, String message) throws MailException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        try {
            helper.setTo("ccfiiilm@gmail.com");
            helper.setSubject("New form submission");
            helper.setText("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);
        } catch (MessagingException ex) {
            // 예외 처리
            ex.printStackTrace();
            // 또는 예외를 다시 던지지 않고 직접 처리
        }
        mailSender.send(mimeMessage);
    }
}
