package com.lpthinh.rentalservice.tenant;

import com.lpthinh.rentalservice.agreement.Agreement;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Tenant {
    @Id
    @Column(name = "tenant_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "tenant_name")
    private String name;
    @Column(name = "tenant_phone")
    private String phone;
    @Column(name = "tenant_state")
    @Enumerated(EnumType.STRING)
    private TenantState state;
    @Column(name = "tenant_dob")
    private LocalDate dob;
    @Column(name = "tenant_gender")
    @Enumerated(EnumType.STRING)
    private TenantGender gender;
    @Column(name = "tenant_hometown")
    private String hometown;
    @Column(name = "citizen_id")
    private String citizenId;
    @ManyToOne
    @JoinColumn(name = "agreement_id")
    private Agreement agreement;
}
