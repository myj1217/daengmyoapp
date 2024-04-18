package com.back.security.filter;

import com.back.dto.member.MemberSecurityDTO;
import com.back.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter{

    @Override
    //필터링 하지않고 건너뛸 조건을 정의할 수 있는데
    //해당 메서드가 true 를 반환하면 건너뛰고, false 를 반환하면 필터가 작동한다.
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{

        // Preflight요청은 체크하지 않음
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }

        String path = request.getRequestURI();

        log.info("check uri......................."+path);

        //경로의 호출은 체크하지 않음

        //MEMBER -------------------------------------------------
        if(path.startsWith("/api/member/login")) {
            return true;
        }
        if(path.startsWith("/api/member/join")) {
            return true;
        }
        if(path.startsWith("/api/member/resetPw")) {
            return true;
        }
        if(path.startsWith("/api/member/sendCode")) {
            return true;
        }
        if(path.startsWith("/api/member/check/")) {
            return true;
        }
        //--------------------------------------------------------

        if(path.startsWith("/api/products/")) {
            return true;
        }
        if(path.startsWith("/products/list")) {
            return true;
        }
        if(path.startsWith("/community/")) {
            return true;
        }
        if(path.startsWith("/community/reply/")) {
            return true;
        }
        if(path.startsWith("/notice/")) {
            return true;
        }
      
        return false;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException{


        log.info("------------------------JWTCheckFilter------------------");

        String authHeaderStr = request.getHeader("Authorization");

        try {
            //Bearer accestoken...
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            log.info("JWT claims: " + claims);

            //추가
            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String name = (String) claims.get("name");
            String number = (String) claims.get("number");
            String nickname = (String) claims.get("nickname");
            String streetAddress = (String) claims.get("streetAddress");
            String detailAddress = (String) claims.get("detailAddress");
            List<String> roleNames = (List<String>) claims.get("roleNames");
            String addressCode = (String) claims.get("addressCode");

            MemberSecurityDTO memberSecurityDTO = new MemberSecurityDTO(email, pw, name,
                    number,nickname,streetAddress,detailAddress,roleNames,addressCode);

            log.info("-----------------------------------");
            log.info(memberSecurityDTO);
            log.info(memberSecurityDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberSecurityDTO, pw, memberSecurityDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        }catch(Exception e){

            log.error("JWT Check Error..............");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();

        }
    }

}
