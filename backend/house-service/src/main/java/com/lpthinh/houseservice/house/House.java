package com.lpthinh.houseservice.house;

import com.lpthinh.houseservice.photo.Photo;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class House {

    @Id
    @GeneratedValue
    @Column(name = "house_id")
    private Integer id;
    @Column(name = "house_name")
    private String name;
    @Column(name = "house_price")
    private BigDecimal price;
    @Column(name = "house_state")
    @Enumerated(EnumType.STRING)
    private HouseState state;

    @OneToMany
    @JoinColumn(name = "house_id")
    List<Photo> photos;

    @OneToMany
    @JoinColumn(name = "house_id")
    List<HouseAmenity> amenities;
}
