package com.back.repository;

import com.back.dto.member.MemberModifyDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import com.back.domain.member.Member;
import org.springframework.security.core.parameters.P;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.email = :email")
    Member getWithRoles(@Param("email") String email);

    Member findByEmail(@Param("email") String email);

    Member findByEmailAndPw(@Param("email") String email,@Param("pw")String pw);


    //이메일과 인증코드를 사용해서 회원찾기.
    Member findByEmailAndVerificationCode(@Param("email") String email, @Param("verificationCode") String verificationCode);

    //탈퇴를 위한 이메일과 비밀번호 조회
    boolean existsByEmailAndPw(@Param("email")String email, @Param("pw")String pw);


    boolean existsByEmail(@Param("email")String email);
    boolean existsByNickname(@Param("nickname")String nickname);


    //비밀번호 재발급을 위한 이메일과 이름 동시 검색
    boolean existsByEmailAndVerificationCode(@Param("email")String email,@Param("verificationCode")String verificationCode);

}

