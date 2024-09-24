package com.lpthinh.houseservice.amenity;


import com.lpthinh.houseservice.house.House;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "amenity_seq_gen")
    @SequenceGenerator(name = "amenity_seq_gen", sequenceName = "amenity_seq", allocationSize = 1)
    @Column(name = "amenity_id")
    private Integer id;
    @Column(name = "amenity_name")
    private String name;
    @Column(name = "count_instock")
    private Integer countInStock;
}
