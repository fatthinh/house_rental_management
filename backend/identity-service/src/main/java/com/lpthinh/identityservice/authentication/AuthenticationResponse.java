package com.lpthinh.identityservice.authentication;

import java.util.Date;

public record AuthenticationResponse(
        String token,
        Date expiryTime
) {
}
