package com.back.repository.member;


import com.back.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.back.domain.member.Member;
import com.back.domain.member.MemberRole;

@SpringBootTest
@Log4j2
public class MemberRepositoryTests {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsertUser(){  // 일반유저 생성
        Member member = Member.builder()
                .email("111@aaa.com")
                .pw(passwordEncoder.encode("1111"))
                .name("홍길동")
                .nickname("일반유저")
                .number("01012345678")
                .addressCode("1234")
                .streetAddress("12-34번지")
                .detailAddress("1층")
                .build();
        member.addRole(MemberRole.USER);
        memberRepository.save(member);
    }

    @Test
    public void testInsertManager(){   // 매니저 생성
        Member member = Member.builder()
                .email("222@aaa.com")
                .pw(passwordEncoder.encode("1111"))
                .name("홍길동")
                .nickname("매니저")
                .number("01012345678")
                .addressCode("1234")
                .streetAddress("12-34번지")
                .detailAddress("1층")
                .build();
        member.addRole(MemberRole.MANAGER);
        memberRepository.save(member);
    }
    @Test
    public void testInsertAdmin(){  // 어드민 생성
        Member member = Member.builder()
                .email("333@aaa.com")
                .pw(passwordEncoder.encode("1111"))
                .name("홍길동")
                .nickname("어드민")
                .number("01012345678")
                .addressCode("1234")
                .streetAddress("12-34번지")
                .detailAddress("1층")
                .build();
        member.addRole(MemberRole.ADMIN);
        memberRepository.save(member);
    }



}