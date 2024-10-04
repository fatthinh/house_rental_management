package com.lpthinh.notificationservice.websocket;

import com.lpthinh.notificationservice.notification.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class WebSocketController {

    @MessageMapping("/broadcast")
    @SendTo("/topic/reply")
    public String broadcastMessage(@Payload String message) {
        return "You have received a message: " + message;
    }

    @MessageMapping("/notifications.paymentNotification")
    @SendTo("/topic/admin")
    public Notification paymentNotification(@Payload Notification notification) {
        return notification;
    }

    @MessageMapping("/notifications.securityNotification")
    @SendTo("/topic/security")
    public void securityNotification(@Payload String message) {
        System.out.println(message);
    }
}
