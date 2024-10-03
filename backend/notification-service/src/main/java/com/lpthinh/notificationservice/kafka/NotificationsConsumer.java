package com.lpthinh.notificationservice.kafka;

import com.lpthinh.notificationservice.kafka.payment.PaymentNotification;
import com.lpthinh.notificationservice.notification.Notification;
import com.lpthinh.notificationservice.notification.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationsConsumer {
    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "payment-topic")
    public void consumePaymentSuccessNotifications(PaymentNotification paymentNotification) throws MessagingException {
        log.info(String.format("Consuming the message from payment-topic Topic:: %s", paymentNotification));
        Notification newNotification = notificationRepository.save(
                Notification
                        .builder()
                        .param(paymentNotification.details())
                        .body(paymentNotification.body())
                        .subject(paymentNotification.subject())
                        .recipient(paymentNotification.recipient())
                        .build()
        );
        messagingTemplate.convertAndSend("/topic/admin", newNotification);
    }
}
