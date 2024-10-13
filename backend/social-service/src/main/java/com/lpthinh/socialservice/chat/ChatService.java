package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;
import com.lpthinh.socialservice.message.MessageRequest;
import com.lpthinh.socialservice.message.MessageResponse;
import com.lpthinh.socialservice.message.MessageService;
import com.lpthinh.socialservice.user.UserResponse;
import com.lpthinh.socialservice.user.UserServiceClient;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import javax.management.ServiceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.kafka.support.KafkaHeaders.TOPIC;

@Service
@AllArgsConstructor
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;
    private final MessageService messageService;
    private final UserServiceClient userServiceClient;
    private final KafkaTemplate<String, MessageResponse> kafkaTemplate;


    public Chat create(ChatRequest request) {
        // first message
        Message message = messageService.create(new MessageRequest(
                1,
                request.users().getFirst(),
                request.message()
        ));

        // new chat
        Chat chat = new Chat();

        // update chat
        List<Message> messages = new ArrayList<>();
        messages.add(message);
        chat.setMessages(messages);
        chat.setUsers(request.users());
        return chatRepository.save(chat);
    }

    public List<ChatResponse> findMyChats(String userId) {
        return this.chatRepository
                .findMyChats(userId)
                .stream()
                .peek(item -> {
                    for (String user : item.getUsers()) {
                        UserResponse u = userServiceClient.getUserById(user);
                        if (!user.matches(userId)) {
                            item.setName(u.name());
                        }
                    }
                })
                .map(chatMapper::toChatResponse)
                .collect(Collectors.toList());
    }

    public ChatResponse findById(String id, String userId) {
        return chatMapper.toChatResponse(this.findByIdDef(id, userId));
    }

    public Chat findByIdDef(String id, String userId) {
        return this.chatRepository
                .findById(id)
                .stream()
                .peek(item -> {
                    for (String user : item.getUsers()) {
                        UserResponse u = userServiceClient.getUserById(user);
                        if (!user.matches(userId)) {
                            item.setName(u.name());
                        }
                    }
                })
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Chat not found with ID:: " + id));
    }

    public void addMessage(String chatId, MessageRequest request) {
        Chat chat = this.findByIdDef(chatId, "userid");
        Message message = this.messageService.create(new MessageRequest(
                chat.getMessages().size() + 1,
                request.sender(),
                request.content()
        ));

        chat.getMessages().add(message);
        this.chatRepository.save(chat);
        this.sendToKafka(new MessageResponse(request.sender(), request.content()));
    }

    public void sendToKafka(MessageResponse request) {
        log.info("Sending message with body = < {} >", request);
        org.springframework.messaging.Message<MessageResponse> message = MessageBuilder
                .withPayload(request)
                .setHeader(TOPIC, "chat-topic")
                .build();

        kafkaTemplate.send(message);
    }
}
