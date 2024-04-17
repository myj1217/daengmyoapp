package com.back.dto.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class MemberSecurityDTO extends User {

    private String email;

    private String pw;


    private String name;


    private String number;


    private String nickname;




    private String streetAddress;		// 지번 주소

    private String detailAddress;		// 상세 주소(직접 입력하는값 ex. 3층)

    private List<String> memberRoleList = new ArrayList<>();

    private String addressCode;				// 우편 번호



    public MemberSecurityDTO(String email, String pw, String name, String number, String nickname, String streetAddress, String detailAddress, List<String> memberRoleList, String addressCode) {
        super(
                email,
                pw,
                memberRoleList.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));

        this.email = email;
        this.pw = pw;
        this.name = name;
        this.number = number;
        this.nickname = nickname;
        this.streetAddress = streetAddress;
        this.detailAddress = detailAddress;
        this.memberRoleList = memberRoleList;
        this.addressCode = addressCode;
    }

    //JWT문자열 생성시에 사용. 현재사용자정보를 Map타입으로 전환.

    public Map<String, Object> getClaims() {

            Map<String, Object> dataMap = new HashMap<>();

            dataMap.put("email", email);
            dataMap.put("pw", pw);
            dataMap.put("name", name);
            dataMap.put("number", number);
            dataMap.put("nickname", nickname);
            dataMap.put("streetAddress", streetAddress);
            dataMap.put("detailAddress", detailAddress);
            dataMap.put("memberRoleList", memberRoleList);
            dataMap.put("addressCode", addressCode);
            return dataMap;
        }

}