package com.lpthinh.service.category;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq_gen")
    @SequenceGenerator(name = "category_seq_gen", sequenceName = "category_seq", allocationSize = 1)
    @Column(name = "category_id")
    private Integer id;
    @Column(name = "category_name")
    private String name;
    @Column(name = "category_price")
    private Long price;
    @Column(name = "category_unit")
    private String unit;
    @Column(name = "quantity_per_unit")
    private Integer quantityPerUnit;
}
