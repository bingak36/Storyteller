package com.example.Storyteller.web.dto;

import com.example.Storyteller.domain.PostCategory;

public record UpdatePostRequest(PostCategory category, String title, String content) {}
