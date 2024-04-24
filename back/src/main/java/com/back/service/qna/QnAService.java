package com.back.service.qna;


import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;


@Service

public interface QnAService {
    void sendEmail(String name, String email, String message) throws MailException;


}
