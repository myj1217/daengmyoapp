package com.back.service.member;

import com.back.dto.member.MailDTO;
import org.springframework.stereotype.Service;

@Service
public interface MailService {
    // 이메일이 데이터베이스에 존재하는지 확인
    boolean existsByEmail(String email);

    // 인증코드 생성 및 메일 전송
    MailDTO createMail(String email);

    // 데이터베이스에 인증코드 업데이트
    void updateCode(String code, String email);

    // 임시 인증코드 생성
    String randomCode();

    // 이메일 전송
    void mailSend(MailDTO mailDTO);

}