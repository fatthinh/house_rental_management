package com.lpthinh.houseservice.amenity;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Amenity {
    @Id
    @GeneratedValue
    @Column(name = "amenity_id")
    private Integer id;
    @Column(name = "amenity_name")
    private String name;
    @Column(name = "count_instock")
    private Integer countInStock;
}
