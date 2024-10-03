package com.lpthinh.notificationservice.email;

import lombok.Getter;

public enum EmailTemplates {

    PAYMENT_SUCCESS("payment-success.html", "Payment successfully processed");

    @Getter
    private final String template;
    @Getter
    private final String subject;


    EmailTemplates(String template, String subject) {
        this.template = template;
        this.subject = subject;
    }
}