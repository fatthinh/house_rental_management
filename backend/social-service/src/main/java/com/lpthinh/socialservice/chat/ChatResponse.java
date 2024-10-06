package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;

import java.util.List;

public record ChatResponse(
        String id,
        String first,
        String second,
        List<Message> messages
) {
}
