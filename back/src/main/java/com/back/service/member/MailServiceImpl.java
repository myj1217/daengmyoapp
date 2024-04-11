package com.back.service.member;

import com.back.domain.member.Member;
import com.back.dto.member.MailDTO;
import com.back.repository.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final MemberRepository memberRepository;

    private final JavaMailSender javaMailSender;


    @Override // 맞는 이메일이 있는지 확인용.
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 메일 내용을 생성하고 인증번호를 저장시키기
    @Override
    public MailDTO createMail(String email) {
        String code = randomCode();
        MailDTO dto = new MailDTO();
        dto.setAddress(email);
        dto.setTitle("댕묘앞 인증코드 안내 이메일 입니다.");
        dto.setMessage("<html><div align='center' style='border:1px solid grey; font-family:verdana; height: 200px;'><h3 style='color:grey;'>안녕하세요 댕묘앞 입니다. 회원님의 비밀번호 재설정을 위한 인증코드를 보내드립니다.</h3><br/><br/>" + "<div style='font-size:30px'><strong>" + code + "</strong></div></div></html>");
        updateCode(code, email);
        return dto;
    }

    //데이터베이스에 인증번호를 저장.
    @Override
    public void updateCode(String code, String email) {
        Member member = memberRepository.findByEmail(email);
        member.changeVerificationCode(code);
        memberRepository.save(member);
    }

    //랜덤으로 인증코드 만들기
    @Override
    public String randomCode() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    // 메일보내기
    @Override
    public void mailSend(MailDTO mailDTO) {
        System.out.println("전송 완료!");
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(mailDTO.getAddress());
            helper.setSubject(mailDTO.getTitle());
            helper.setText(mailDTO.getMessage(), true);
            helper.setFrom("nmnmtest6@gmail.com");
            helper.setReplyTo("nmnmtest6@gmail.com");
            System.out.println("message" + message);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}