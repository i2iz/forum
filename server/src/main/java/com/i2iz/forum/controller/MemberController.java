package com.i2iz.forum.controller;

import com.i2iz.forum.dto.LoginRequest;
import com.i2iz.forum.dto.LoginResponse;
import com.i2iz.forum.dto.MemberJoinRequest;
import com.i2iz.forum.entity.Member;
import com.i2iz.forum.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@Valid @RequestBody MemberJoinRequest request) {
        Member member = new Member();
        member.setLoginId(request.getLoginId());
        member.setPassword(request.getPassword());
        member.setNickname(request.getNickname());

        memberService.join(member);

        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = memberService.login(request.getLoginId(), request.getPassword());
        return ResponseEntity.ok(response);
    }
}