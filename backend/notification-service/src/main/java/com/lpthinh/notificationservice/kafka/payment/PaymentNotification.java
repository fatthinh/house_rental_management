package com.lpthinh.notificationservice.kafka.payment;

import java.util.Map;

public record PaymentNotification(
        Map<String, Object> details,
        String recipient,
        String subject,
        String body
) {
}