package com.lpthinh.identityservice.configuration;

import java.util.HashSet;
import java.util.Optional;

import com.lpthinh.identityservice.constant.PredefinedRole;
import com.lpthinh.identityservice.role.Role;
import com.lpthinh.identityservice.role.RoleRepository;
import com.lpthinh.identityservice.user.User;
import com.lpthinh.identityservice.user.UserRepository;
import com.lpthinh.identityservice.user.UserState;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_EMAIL = "pthinh.lama@gmail.com";

    @NonFinal
    static final String ADMIN_PASSWORD = "lpthinh";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driver-class-name",
            havingValue = "org.postgresql.Driver"
    )
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (userRepository.findByEmail(ADMIN_EMAIL).orElse(null) == null) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());

                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .email(ADMIN_EMAIL)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .state(UserState.ACTIVE)
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }
}