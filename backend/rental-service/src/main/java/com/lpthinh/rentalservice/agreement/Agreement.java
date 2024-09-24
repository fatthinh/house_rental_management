package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Agreement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "agreement_seq_gen")
    @SequenceGenerator(name = "agreement_seq_gen", sequenceName = "agreement_seq", allocationSize = 1)
    @Column(name = "agreement_id")
    private Integer id;
    @Column(name = "agreement_deposit")
    private Long deposit;
    @Enumerated(EnumType.STRING)
    @Column(name = "agreement_state")
    private AgreementState state;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "representer")
    private String representer;

    //    Foreign key
    @Column(name = "house_id")
    private Integer houseId;

    @OneToMany
    @JoinColumn(name = "agreement_id")
    private List<Tenant> tenants;

    //    Transient fields
    @Transient
    private String houseName;
    @Transient
    private Long housePrice;
}
