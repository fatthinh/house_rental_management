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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_seq_gen")
    @SequenceGenerator(name = "house_seq_gen", sequenceName = "house_seq", allocationSize = 1)
    @Column(name = "house_id")
    private Integer id;
    @Column(name = "house_name")
    private String name;
    @Column(name = "house_price")
    private Long price;
    @Column(name = "house_state")
    @Enumerated(EnumType.STRING)
    private HouseState state;
    @Column(name = "house_floor")
    private Integer floor;
    @Column(name = "house_description")
    private String description;
    @Column(name = "house_size")
    private Float size;

    @OneToMany
    @JoinColumn(name = "house_id")
    List<Photo> photos;

    @OneToMany
    @JoinColumn(name = "house_id")
    List<HouseAmenity> amenities;
}
