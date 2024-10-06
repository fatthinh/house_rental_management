package com.lpthinh.socialservice.message;

import com.lpthinh.socialservice.chat.Chat;
import com.lpthinh.socialservice.chat.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageMapper messageMapper;

    public Message create(MessageRequest request) {
        return messageMapper.toMessage(request);
    }
}