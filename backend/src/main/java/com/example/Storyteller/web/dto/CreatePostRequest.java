package com.example.Storyteller.web.dto;

import com.example.Storyteller.domain.PostCategory;

public record CreatePostRequest(PostCategory category, String title, String content) {}
