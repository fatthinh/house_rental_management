package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;
import com.lpthinh.socialservice.user.UserServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    public Chat toChat(ChatRequest request) {
        if (request == null)
            return null;

        return Chat
                .builder()
                .build();
    }

    public ChatResponse toChatResponse(Chat chat) {
        List<Message> messages = chat.getMessages()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())) // Sort by createdAt in descending order
                .limit(12) // Limit to 10 messages
                .collect(Collectors.toList());


        return new ChatResponse(
                chat.getId(),
                chat.getName(),
                chat.getUsers(),
                messages
        );
    }
}
