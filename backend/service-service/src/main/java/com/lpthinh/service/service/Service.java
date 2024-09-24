package com.lpthinh.service.service;

import com.lpthinh.service.category.Category;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "service_seq_gen")
    @SequenceGenerator(name = "service_seq_gen", sequenceName = "service_seq", allocationSize = 1)
    @Column(name = "service_id")
    private Long id;
    @Column(name = "service_state")
    @Enumerated(EnumType.STRING)
    private ServiceState serviceState;
    @Column(name = "service_quantity")
    private Integer quantity;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = "invoice_id")
    private Long invoiceId;
}
