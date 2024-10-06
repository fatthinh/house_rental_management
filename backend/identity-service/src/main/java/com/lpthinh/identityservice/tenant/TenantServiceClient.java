package com.lpthinh.identityservice.tenant;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class TenantServiceClient {

    @Value("${application.config.rental-url}")
    private String rentalUrl;
    private final RestTemplate restTemplate;

    public TenantResponse getTenantById(String tenantId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference<TenantResponse> responseType = new ParameterizedTypeReference<>() {
        };
        ResponseEntity<TenantResponse> responseEntity = restTemplate.exchange(
                rentalUrl + "/tenant/" + tenantId,
                GET,
                requestEntity,
                responseType
        );

        return responseEntity.getBody();
    }
}
