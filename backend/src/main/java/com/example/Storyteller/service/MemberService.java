package com.example.Storyteller.service;


import com.example.Storyteller.domain.Member;
import com.example.Storyteller.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Long signup(String name, String email) {
        if(memberRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 사용중인 이메일 입니다.");
        }

        Member member = new Member(name, email);

        return memberRepository.save(member).getId();
    }


}
