package com.lpthinh.notificationservice.notification;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationMapper {

    public NotificationResponse toNotificationResponse(Notification notification) {
        return new NotificationResponse(
                notification.getParam(),
                notification.getRecipient(),
                notification.getSubject(),
                notification.getBody(),
                notification.getCreatedAt()
        );
    }
}
