package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChatMapper {

    public Chat toChat(ChatRequest request) {
        if (request == null)
            return null;

        return Chat
                .builder()
                .first(request.first())
                .second(request.second())
                .build();
    }

    public ChatResponse toChatResponse(Chat chat) {
        List<Message> messages = chat.getMessages()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())) // Sort by createdAt in descending order
                .limit(10) // Limit to 10 messages
                .collect(Collectors.toList());

        return new ChatResponse(
                chat.getId(),
                chat.getFirst(),
                chat.getSecond(),
                messages
        );
    }
}
