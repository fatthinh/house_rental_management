package com.lpthinh.houseservice.house;

public record HouseRequest(
        Integer id,
        String name,
        Long price,
        String description,
        Float size,
        Integer floor
) {
}
