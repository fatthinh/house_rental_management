package com.lpthinh.notificationservice.notification;

import java.time.LocalDateTime;
import java.util.Map;

public record NotificationResponse(
        Map<String, Object> details,
        String recipient,
        String subject,
        String body,
        LocalDateTime createdAt
) {
}