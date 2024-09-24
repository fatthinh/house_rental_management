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
                .floor(request.floor())
                .size(request.size())
                .description(request.description())
                .build();
    }


    public HouseResponse toHouseResponse(House house) {
        String houseState = "";

        switch (house.getState()) {
            case HouseState.AVAILABLE:
                houseState = "Trống";
                break;
            case HouseState.RESERVED:
                houseState = "Đã thuê";
                break;
            case HouseState.BEING_SERVICED:
                houseState = "Bận";
                break;
        }
        return new HouseResponse(
                house.getId(),
                house.getName(),
                house.getPrice(),
                houseState,
                house.getDescription(),
                house.getFloor(),
                house.getSize()
        );
    }
}
