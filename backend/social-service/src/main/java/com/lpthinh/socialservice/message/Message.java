package com.lpthinh.socialservice.message;

import com.lpthinh.socialservice.chat.Chat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    private Integer id;
    private String sender;
    private String content;
    private MessageState state;
    private LocalDateTime createdAt;
}
