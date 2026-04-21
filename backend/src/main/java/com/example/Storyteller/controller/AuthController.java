package com.example.Storyteller.controller;

import com.example.Storyteller.service.LoginService;
import com.example.Storyteller.web.dto.LoginRequest;
import com.example.Storyteller.web.dto.MemberResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final LoginService loginService;

    @PostMapping("/login")
    public MemberResponse login(@RequestBody LoginRequest request, HttpSession session) {
        return loginService.login(request, session);
    }

    @GetMapping("/me")
    public MemberResponse me(HttpSession session) {
        return loginService.me(session);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        loginService.logout(session);
    }
}
