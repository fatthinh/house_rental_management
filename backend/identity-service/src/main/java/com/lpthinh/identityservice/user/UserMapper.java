package com.lpthinh.identityservice.user;

import com.lpthinh.identityservice.tenant.TenantResponse;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserMapper {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User toUser(UserRequest request) {
        if (request == null) return null;
        return User
                .builder()
                .id(request.id())
                .email(request.email())
                .password(this.passwordEncoder.encode(request.password()))
                .state(UserState.ACTIVE)
                .build();
    }

    public TenantUserResponse toTenantResponse(User user, TenantResponse tenantInfo) {
        if (user == null || tenantInfo == null) return null;

        return new TenantUserResponse(
                user.getId(),
                user.getEmail(),
                tenantInfo.name(),
                tenantInfo.dob(),
                tenantInfo.genderString(),
                tenantInfo.hometown(),
                tenantInfo.citizenId(),
                tenantInfo.phone(),
                tenantInfo.houseId()
        );
    }
}
