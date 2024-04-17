package com.back.domain.member;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString (exclude = "memberRoleList")
public class Member {

    @Id
    private String email;  // 이메일

    private String pw;     // 비밀번호

    private String name;    //이름

    private String nickname; // 닉네임

    private String number;   //휴대폰 번호




    private String streetAddress;		// 지번 주소

    private String detailAddress;		// 상세 주소(직접 입력하는값 ex. 3층)

    private String verificationCode; // 비밀번호 재설정시에 인증코드.

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

        public void addRole(MemberRole memberRole){

        memberRoleList.add(memberRole);
    }
    private String addressCode;				// 우편 번호


    public void changeNickname(String nickname) {this.nickname = nickname; }

    public void changeName(String name) {
        this.name = name;
    }

    public void changeNumber(String number) {
        this.number = number;
    }

    public void changePw(String pw){
        this.pw = pw;
    }

    public void changeAddressCode(String addressCode){
        this.addressCode = addressCode;
    }


    public void changeStreetAddress(String streetAddress){
        this.streetAddress = streetAddress;
    }

    public void changeDetailAddress(String detailAddress) {this.detailAddress = detailAddress;}

//    public void changeSocial(boolean social) {
//        this.social = social;
//    }

    public void changeVerificationCode(String verificationCode) {this.verificationCode = verificationCode;}

}