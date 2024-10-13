package com.lpthinh.rentalservice.identity;

import com.lpthinh.rentalservice.config.FeignClientConfig;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "identity-service",
        url = "${application.config.identity-url}",
        configuration = FeignClientConfig.class
)
public interface IdentityClient {

    @PostMapping("/user/new")
    void createUser(@RequestBody @Valid UserRequest request);
}
