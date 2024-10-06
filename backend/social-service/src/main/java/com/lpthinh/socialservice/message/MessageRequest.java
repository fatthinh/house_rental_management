package com.lpthinh.socialservice.message;

public record MessageRequest(
        Integer id,
        String sender,
        String content
) {
}
