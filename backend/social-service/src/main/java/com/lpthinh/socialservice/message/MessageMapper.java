package com.lpthinh.socialservice.message;

import com.lpthinh.socialservice.chat.Chat;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MessageMapper {

    public Message toMessage(MessageRequest request) {
        if (request == null) return null;

        return Message
                .builder()
                .id(request.id())
                .content(request.content())
                .sender(request.sender())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
