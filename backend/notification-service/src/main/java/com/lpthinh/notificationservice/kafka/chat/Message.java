package com.lpthinh.notificationservice.kafka.chat;

public record Message(
        String sender,
        String content
) {
}
