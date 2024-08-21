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
    @GeneratedValue
    @Column(name = "photo_id")
    private Integer id;
    @Column(name = "photo_src")
    private String source;
    @ManyToOne
    @JoinColumn(name = "house_id")
    private House house;
}
