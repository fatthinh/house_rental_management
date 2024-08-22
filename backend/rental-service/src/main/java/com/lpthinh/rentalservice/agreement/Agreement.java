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
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "agreement_id")
    private String id;
    @Column(name = "agreement_deposit")
    private BigDecimal deposit;
    @Column(name = "agreement_state")
    private String state;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    //    Foreign key
    @Column(name = "house_id")
    private Integer houseId;

    @OneToMany
    @JoinColumn(name = "agreement_id")
    private List<Tenant> tenants;
}
