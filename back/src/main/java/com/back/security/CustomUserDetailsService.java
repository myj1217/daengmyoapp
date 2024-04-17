package com.back.security;

import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.back.domain.member.Member;
import com.back.dto.member.MemberSecurityDTO;
import com.back.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("----------------loadUserByUsername-----------------------------");

        Member member = memberRepository.getWithRoles(username);

        if(member == null){
            throw new UsernameNotFoundException("Not Found");
        }

        MemberSecurityDTO memberSecurityDTO = new MemberSecurityDTO(
                member.getEmail(),
                member.getPw(),
                member.getName(),
                member.getNumber(),
                member.getNickname(),
                member.getStreetAddress(),
                member.getDetailAddress(),
                member.getMemberRoleList()
                        .stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()),
                member.getAddressCode());

        log.info(memberSecurityDTO);

        return memberSecurityDTO;


    }

}