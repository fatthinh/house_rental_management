package com.lpthinh.socialservice.message;


import java.time.LocalDateTime;

public record MessageResponse(
//        Integer id,
        String sender,
        String content
//        MessageState state,
//        LocalDateTime createdAt
) {
}
