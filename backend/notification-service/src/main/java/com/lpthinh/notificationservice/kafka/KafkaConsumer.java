package com.lpthinh.notificationservice.kafka;

import com.lpthinh.notificationservice.kafka.chat.Message;
import com.lpthinh.notificationservice.notification.Notification;
import com.lpthinh.notificationservice.notification.NotificationRepository;
import com.lpthinh.notificationservice.notification.NotificationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "payment-topic")
    public void consumePaymentNotification(NotificationRequest paymentNotification) throws MessagingException {
        log.info(String.format("Consuming the message from payment-topic Topic:: %s", paymentNotification));
        Notification newNotification = notificationRepository.save(
                Notification
                        .builder()
                        .param(paymentNotification.details())
                        .body(paymentNotification.body())
                        .subject(paymentNotification.subject())
                        .recipient(paymentNotification.recipient())
                        .createdAt(LocalDateTime.now())
                        .build()
        );
        messagingTemplate.convertAndSend("/topic/admin", newNotification);
    }


    @KafkaListener(topics = "chat-topic")
    public void consumeChat(Message message) throws MessagingException {
        log.info(String.format("Consuming the message from chat-topic Topic:: %s", message));
        messagingTemplate.convertAndSend("/topic/chat", message);
    }
}
