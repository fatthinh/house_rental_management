package com.lpthinh.houseservice.house;

import org.springframework.stereotype.Component;

@Component
public class HouseMapper {
    public House toHouse(HouseRequest request) {
        if (request == null)
            return null;

        return House
                .builder()
                .name(request.name())
                .price(request.price())
                .build();
    }


    public HouseResponse toHouseResponse(House house) {
        return new HouseResponse(
                house.getId(),
                house.getName(),
                house.getPrice(),
                house.getState(),
                house.getAmenities(),
                house.getPhotos()
        );
    }
}
