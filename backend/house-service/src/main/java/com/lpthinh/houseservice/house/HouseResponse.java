package com.lpthinh.houseservice.house;

import com.lpthinh.houseservice.amenity.Amenity;
import com.lpthinh.houseservice.photo.Photo;

import java.math.BigDecimal;
import java.util.List;

public record HouseResponse(
        Integer id,
        String name,
        Long price,
        String state,
        String description,
        Integer floor,
        Float size
) {
}
