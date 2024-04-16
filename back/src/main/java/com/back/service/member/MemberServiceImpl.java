//MemberServiceImpl
package com.back.service.member;

import com.back.domain.member.Member;
import com.back.domain.member.MemberRole;
import com.back.dto.member.MemberJoinDTO;
import com.back.dto.member.MemberModifyDTO;
import com.back.dto.member.MemberSecurityDTO;
import com.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {


    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    //일반 회원가입 부분
    @Override
    public void join(MemberJoinDTO memberJoinDTO){

        Member member = Member.builder()
                .email(memberJoinDTO.getEmail())
                .pw(passwordEncoder.encode(memberJoinDTO.getPw()))
                .name(memberJoinDTO.getName())
                .nickname(memberJoinDTO.getNickname())
                .number(memberJoinDTO.getNumber())
                .zipCode(memberJoinDTO.getNumber())
                .streetAddress(memberJoinDTO.getStreetAddress())
                .detailAddress(memberJoinDTO.getDetailAddress())
                .build();

        member.addRole(MemberRole.USER);
        memberRepository.save(member);

    }

    //카카오 회원가입 부분
    @Override
    public MemberSecurityDTO getKakaoMember(String accessToken) {

        String email = getEmailFromKakaoAccessToken(accessToken);

        log.info("email: " + email);

        Optional<Member> result = memberRepository.findById(email);

        // 기존의 회원
        if (result.isPresent()) {
            MemberSecurityDTO memberSecurityDTO = entityToDTO(result.get());

            return memberSecurityDTO;
        }

        // 회원이 아니었다면
        // 닉네임은 '카카오#~~~'으로
        // 패스워드는 임의로 생성
        Member socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);

        MemberSecurityDTO memberSecurityDTO = entityToDTO(socialMember);

        return memberSecurityDTO;
    }


    private String getEmailFromKakaoAccessToken(String accessToken) {

        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        entity,
                        LinkedHashMap.class);

        log.info(response);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

        log.info("------------------------------");
        log.info(bodyMap);

        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");

        log.info("kakaoAccount: " + kakaoAccount);

        return kakaoAccount.get("email");

    }

    private String makeTempPassword() {
        // 생성된 비밀번호를 저장할 StringBuffer 생성
        StringBuffer buffer = new StringBuffer();

        // 비밀번호의 길이가 10인지 확인하기위한 10번의 루프
        for (int i = 0; i < 10; i++) {
            // 55를 곱한다는 것은 0부터 54까지
            // 65를 더해서 범위를 준다는 것은 A부터 119(z)결과를 char로 캐스팅하여 문자로 변환
            buffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        // StringBuffer를 String 으로 변환하고 생성된 비밀번호를 반환
        return buffer.toString();
    }

    private Member makeSocialMember(String email) {

        String tempPassword = makeTempPassword();

        log.info("tempPassword: " + tempPassword);

        String name = "이름을 수정 해주세요.";

        String randomString = generateRandomString(10); // 랜덤 문자열 생성부분

        Member member = Member.builder()
                .email(email)
                .pw(passwordEncoder.encode(tempPassword))
                .name(name)
                .nickname("카카오#" + randomString) // 랜덤 문자열을 닉네임에 추가.
//                .social(true)
                .number("전화번호를 수정 해주세요.")
                .zipCode("")
                .streetAddress("")
                .detailAddress("")
                .build();

        member.addRole(MemberRole.USER);

        return member;

    }

    private String generateRandomString(int length) { // 주어진 길이의 랜덤 문자열을 생성시킨다.
        StringBuilder buffer = new StringBuilder();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < length; i++) {
            int randomIndex = (int) (Math.random() * characters.length());
            buffer.append(characters.charAt(randomIndex));
        }
        return buffer.toString();
    }

    @Override // 추가됨.
    public void modifyMember(MemberModifyDTO memberModifyDTO) {

        Member member = memberRepository.findByEmail(memberModifyDTO.getEmail());



//        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
//        member.changeSocial(false);
        member.changeName(memberModifyDTO.getName());
        member.changeNumber(memberModifyDTO.getNumber());
        member.changeZipCode(memberModifyDTO.getZipCode());
        member.changeNickname(memberModifyDTO.getNickname());
        member.changeStreetAddress(memberModifyDTO.getStreetAddress());
        member.changeDetailAddress(memberModifyDTO.getDetailAddress());

        memberRepository.save(member);

    }

    //중복처리를 위한 코드
    /* 회원가입 시, 유효성 및 중복 검사 */
    @Override
    @Transactional(readOnly = true)
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();
        /* 유효성 및 중복 검사에 실패한 필드 목록을 받음 */
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());validatorResult.put(validKeyName, error.getDefaultMessage());}
        return validatorResult;
    }

    public Member getMemberInfo(String email) {
        Member memberInfo = memberRepository.findByEmail(email);
        return memberInfo;
    }

    @Transactional
    @Override
    public boolean checkNickname(String nickname) {
        log.info("Auth Service's Service Layer :: Call checkNickname Method!");

        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    @Override
    public boolean checkEmail(String email) {
        log.info("Auth Service's Service Layer :: Call checkEmail Method!");

        return memberRepository.existsByEmail(email);
    }
}

