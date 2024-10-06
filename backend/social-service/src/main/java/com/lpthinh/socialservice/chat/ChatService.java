package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;
import com.lpthinh.socialservice.message.MessageRequest;
import com.lpthinh.socialservice.message.MessageService;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.ServiceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;
    private final MessageService messageService;

    public Chat create(ChatRequest request) {
//        ChatRequest request = new ChatRequest(
//                "179d9d3c-07e5-4c7c-b31a-3c54b93fc610",
//                "820e5ace-2b6d-42a4-95b5-bbac9c3dd81c",
//                "Hello"
//        );

        // first message
        Message message = messageService.create(new MessageRequest(
                1,
                request.first(),
                request.message()
        ));

        // new chat
        Chat chat = new Chat();

        // update chat
        List<Message> messages = new ArrayList<>();
        messages.add(message);
        chat.setMessages(messages);
        chat.setFirst(request.first());
        chat.setSecond(request.second());
        return chatRepository.save(chat);
    }

    public List<ChatResponse> findMyChats(String userId) {
        return this.chatRepository
                .findMyChats(userId)
                .stream()
                .map(chatMapper::toChatResponse)
                .collect(Collectors.toList());
    }

    public ChatResponse findById(String id) {
        return chatMapper.toChatResponse(this.findByIdDef(id));
    }

    public Chat findByIdDef(String id) {
        return this.chatRepository
                .findById(id)
                .stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Chat not found with ID:: " + id));
    }

    public void addMessage(String chatId, MessageRequest request) {
        Chat chat = this.findByIdDef(chatId);
        Message message = this.messageService.create(new MessageRequest(
                chat.getMessages().size() + 1,
                request.sender(),
                request.content()
        ));

        chat.getMessages().add(message);
        this.chatRepository.save(chat);
    }
}
