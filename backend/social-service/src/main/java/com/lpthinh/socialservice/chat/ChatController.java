package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.MessageRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/social/chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<String> create(@RequestBody @Valid ChatRequest request) {
        return ResponseEntity.ok(this.chatService.create(request).getId());
    }

    @GetMapping
    public ResponseEntity<List<ChatResponse>> getAll(@RequestParam String userId) {
        return ResponseEntity.ok(this.chatService.findMyChats(userId));
    }

    @PostMapping("/{chat-id}")
    public ResponseEntity<Void> addMessage(@RequestBody @Valid MessageRequest request, @PathVariable("chat-id") String chatId) {
        this.chatService.addMessage(chatId, request);
        return ResponseEntity.ok().build();
    }
}
