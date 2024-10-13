package com.lpthinh.rentalservice.house;

import com.lpthinh.rentalservice.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(
        name = "house-service",
        url = "${application.config.house-url}",
        configuration = FeignClientConfig.class
)
public interface HouseClient {

    @PutMapping("/{house-id}/{new-state}")
    ResponseEntity<Void> updateState(@PathVariable("house-id") Integer houseId, @PathVariable("new-state") String newState);
}
