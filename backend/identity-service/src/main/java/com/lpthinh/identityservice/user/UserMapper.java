package com.lpthinh.identityservice.user;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User toUser(UserRequest request) {
        if (request == null) return null;
        return User
                .builder()
                .email(request.email())
                .password(this.passwordEncoder.encode(request.password()))
                .state(UserState.ACTIVE)
                .build();
    }
}
