package com.lpthinh.paymentservice.payment;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaymentMapper {
    public Payment toPayment(PaymentRequest request) {
        if (request == null) {
            return null;
        }

        return Payment
                .builder()
                .amount(request.amount())
                .method(PaymentMethod.valueOf(request.method().toUpperCase()))
                .createdAt(LocalDateTime.now())
                .transacionId(request.transactionId())
                .build();
    }

    public PaymentResponse toPaymentResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getMethod(),
                payment.getAmount(),
                payment.getTransacionId(),
                payment.getInvoice().getId(),
                payment.getCreatedAt()
        );
    }
}
