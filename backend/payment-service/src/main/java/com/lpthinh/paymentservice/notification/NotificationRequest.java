package com.lpthinh.paymentservice.notification;

import java.util.Map;

public record NotificationRequest(
        Map<String, Object> details,
        String recipient,
        String subject,
        String body
) {
}