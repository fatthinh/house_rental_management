package com.lpthinh.houseservice.house;

import com.lpthinh.houseservice.amenity.Amenity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class HouseAmenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantity;
    @CreatedDate
    @Column(updatable = false, nullable = false, name = "setup_date")
    private LocalDateTime setupDate;

    @ManyToOne
    @JoinColumn(name = "amenity_id")
    private Amenity amenity;
    @ManyToOne
    @JoinColumn(name = "house_id")
    private House house;
}
