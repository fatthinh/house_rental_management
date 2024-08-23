package com.lpthinh.houseservice.house;

import com.lpthinh.houseservice.amenity.Amenity;
import com.lpthinh.houseservice.photo.Photo;

import java.math.BigDecimal;
import java.util.List;

public record HouseResponse(
        Integer id,
        String name,
        BigDecimal price,
        HouseState state,
        List<HouseAmenity> amenities,
        List<Photo> photos
) {
}
