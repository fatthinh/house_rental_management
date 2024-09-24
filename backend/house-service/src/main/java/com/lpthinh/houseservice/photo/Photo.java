package com.lpthinh.houseservice.photo;

import com.lpthinh.houseservice.house.House;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "house_photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "photo_seq_gen")
    @SequenceGenerator(name = "photo_seq_gen", sequenceName = "photo_seq", allocationSize = 1)
    @Column(name = "photo_id")
    private Integer id;
    @Column(name = "photo_src")
    private String source;
    @ManyToOne
    @JoinColumn(name = "house_id")
    private House house;
}
