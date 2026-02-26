package com.i2iz.forum.service;

import com.i2iz.forum.dto.LoginResponse;
import com.i2iz.forum.entity.Member;
import com.i2iz.forum.entity.UserRole;
import com.i2iz.forum.repository.MemberRepository;
import com.i2iz.forum.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public Long join(Member member) { // 회원가입
        // 아이디 중복 체크
        memberRepository.findByLoginId(member.getLoginId())
                .ifPresent(m -> {
                    throw new RuntimeException("이미 존재하는 아이디입니다.");
                });

        // 비밀번호 암호화 및 기본 권한 설정
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(UserRole.USER);

        return memberRepository.save(member).getId();
    }

    public LoginResponse login(String loginId, String password) {
        // 1. 아이디 확인
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("아이디 또는 비밀번호가 잘못되었습니다."));

        // 2. 비밀번호 확인
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new RuntimeException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        // 3. 토큰 생성
        String token = jwtTokenProvider.createToken(member.getLoginId(), member.getRole().name());

        return new LoginResponse(token, member.getNickname());
    }
}