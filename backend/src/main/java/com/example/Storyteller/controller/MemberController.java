package com.example.Storyteller.controller;

import lombok.RequiredArgsConstructor;
import com.example.Storyteller.service.MemberService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;

    @PostMapping
    Public Long signup(@RequestBody SignupRequest request) {
        return memberService.signup(request.name(),request.email());
    }
}
