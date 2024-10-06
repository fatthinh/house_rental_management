package com.lpthinh.socialservice.chat;

public record ChatRequest(
        String first,
        String second,
        String message
) {
}
