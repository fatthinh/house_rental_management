package com.lpthinh.notificationservice.notification;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document
public class Notification {
    @Id
    private String id;
    private String channel;
    private String recipient;
    private Map<String, Object> param;
    private String subject;
    private String body;
    private LocalDateTime createdAt;
}
