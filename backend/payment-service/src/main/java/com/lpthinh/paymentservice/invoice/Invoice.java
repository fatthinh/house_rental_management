package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.service.ServiceResponse;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invoice_seq_gen")
    @SequenceGenerator(name = "invoice_seq_gen", sequenceName = "invoice_seq", allocationSize = 1)
    @Column(name = "invoice_id")
    private Integer id;
    @Column(name = "invoice_amount")
    private Long amount;
    @Column(name = "invoice_month")
    @Enumerated(EnumType.ORDINAL)
    private InvoiceMonth month;
    @Column(name = "invoice_state")
    @Enumerated(EnumType.STRING)
    private InvoiceState state;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "agreement_id")
    private Integer agreementId;

    @Transient
    private String houseName;
    @Transient
    private Long housePrice;
    @Transient
    private List<ServiceResponse> services;

}
