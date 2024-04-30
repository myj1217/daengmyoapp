package com.back.repository.member;

import com.back.repository.member.MemberRepository;
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
    public void testInsertUser(){  // Create regular users
        for (int i = 1; i <= 10; i++) {
            String email = "user" + i + "@aaa.com";
            String nickname = "유저" + i;
            Member member = Member.builder()
                    .email(email)
                    .pw(passwordEncoder.encode("1111"))
                    .name("홍길동")
                    .nickname(nickname)
                    .number("01012345678")
                    .addressCode("1234")
                    .streetAddress("12-34번지")
                    .detailAddress("1층")
                    .build();
            member.addRole(MemberRole.USER);
            memberRepository.save(member);
        }
    }

    @Test
    public void testInsertManager(){   // Create managers
        for (int i = 1; i <= 10; i++) {
            String email = "manager" + i + "@aaa.com";
            String nickname = "매니저" + i;
            Member member = Member.builder()
                    .email(email)
                    .pw(passwordEncoder.encode("1111"))
                    .name("홍길동")
                    .nickname(nickname)
                    .number("01012345678")
                    .addressCode("1234")
                    .streetAddress("12-34번지")
                    .detailAddress("1층")
                    .build();
            member.addRole(MemberRole.MANAGER);
            memberRepository.save(member);
        }
    }

    @Test
    public void testInsertAdmin(){  // Create admins
        for (int i = 1; i <= 3; i++) {
            String email = "admin" + i + "@aaa.com";
            String nickname = "어드민" + i;
            Member member = Member.builder()
                    .email(email)
                    .pw(passwordEncoder.encode("1111"))
                    .name("홍길동")
                    .nickname(nickname)
                    .number("01012345678")
                    .addressCode("1234")
                    .streetAddress("12-34번지")
                    .detailAddress("1층")
                    .build();
            member.addRole(MemberRole.ADMIN);
            memberRepository.save(member);
        }
    }


    @Test
    public void testInsertAdmin2(){  // Create admins

            String email = "admin1@aaa.com";
            String nickname = "어드민1";
            Member member = Member.builder()
                    .email(email)
                    .pw(passwordEncoder.encode("1111"))
                    .name("홍길동")
                    .nickname(nickname)
                    .number("01012345678")
                    .addressCode("1234")
                    .streetAddress("12-34번지")
                    .detailAddress("1층")
                    .build();
            member.addRole(MemberRole.ADMIN);
            memberRepository.save(member);
        }
    }

