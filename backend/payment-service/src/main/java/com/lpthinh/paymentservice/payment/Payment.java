package com.lpthinh.paymentservice.payment;

import com.lpthinh.paymentservice.invoice.Invoice;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq_gen")
    @SequenceGenerator(name = "payment_seq_gen", sequenceName = "payment_seq", allocationSize = 1)
    @Column(name = "payment_id")
    private Integer id;
    @Column(name = "payment_amount")
    private Long amount;
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod method;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "transaction_id")
    private String transacionId;
    @Column(name = "payment_state")
    @Enumerated(EnumType.ORDINAL)
    private PaymentStatus status;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}
