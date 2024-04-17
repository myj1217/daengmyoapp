//MemberJoinDTO 
package com.back.dto.member;

import com.back.domain.member.MemberRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;

@Data
public class MemberJoinDTO {

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @NotBlank(message = "비밀번호는 4자 이상 16자 이하로 입력해주세요.")
    @Length(min = 4, max = 16, message = "비밀번호는 4자 이상, 16자 이하로 입력해주세요.")
    private String pw;

    @NotBlank(message = "이름은 2자 이상 16자 이하로 입력해주세요.")
    @Length(min = 2, max=16 ,message = "이름은 2자 이상 16자 이하로 입력해주세요.")
    private String name;

    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp="^[0-9]*$", message="휴대폰 번호는 숫자로만 입력해주세요.")
    private String number;

    @NotBlank(message = "닉네임은 2자 이상 16자 이하로 입력해주세요.")
    @Length(min = 2, max = 16, message = "닉네임은 2자 이상 16자 이하로 입력해주세요.")
    private String nickname;

    private String addressCode;				// 우편 번호


    private String streetAddress;		// 지번 주소

    private String detailAddress;		// 상세 주소(직접 입력하는값 ex. 3층)


    private List<MemberRole> memberRoleList = new ArrayList<>();

    private String profileImage;
}