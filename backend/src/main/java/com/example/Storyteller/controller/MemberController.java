package com.example.Storyteller.controller;

import com.example.Storyteller.web.dto.MemberResponse;
import com.example.Storyteller.web.dto.SignupRequest;
import lombok.RequiredArgsConstructor;
import com.example.Storyteller.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public Long signup(@RequestBody SignupRequest request) {
        return memberService.signup(
                request.name(),
                request.email(),
                request.password(),
                request.passwordConfirm(),
                request.phone()
        );

    }
    @GetMapping
    public List<MemberResponse> list(){
        return memberService.findAll()
                .stream()
                .map(MemberResponse::from)
                .toList();
    }
}
