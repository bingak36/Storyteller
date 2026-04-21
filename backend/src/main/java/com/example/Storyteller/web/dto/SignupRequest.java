package com.example.Storyteller.web.dto;

public record SignupRequest(
        String name,
        String email,
        String password,
        String passwordConfirm,
        String phone)
{

}
