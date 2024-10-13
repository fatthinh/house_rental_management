package com.lpthinh.socialservice.chat;

import com.lpthinh.socialservice.message.Message;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class Chat {
    @Id
    private String id;
    private List<String> users;
    private List<Message> messages;

    @Transient
    private String name;
}
