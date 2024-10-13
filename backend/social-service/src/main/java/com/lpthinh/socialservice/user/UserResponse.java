package com.lpthinh.socialservice.user;

import java.time.LocalDate;

public record UserResponse(
        String id,
        String email,
        String name,
        LocalDate dob,
        String genderString,
        String hometown,
        String citizenId,
        String phone,
        Integer houseId
) {

}
