package com.back.dto.member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class MemberModifyDTO {
    private String email;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    @Length(min = 2, message = "이름은 2자 이상으로 입력해주세요.")
    private String name;

    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    @Pattern(regexp="^[0-9]*$", message="전화번호는 숫자로만 입력해주세요.")
    private String number;

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    @Length(min = 2, max = 16, message = "닉네임은 2자 이상, 16자 이하로 입력해주세요.")
    private String nickname;


    private String zipCode;				// 우편 번호


    private String streetAddress;		// 지번 주소

    private String detailAddress;		// 상세 주소(직접 입력하는값 ex. 3층)

}