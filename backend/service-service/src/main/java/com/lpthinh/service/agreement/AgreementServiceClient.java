package com.lpthinh.service.agreement;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class AgreementServiceClient {
    @Value("${application.config.rental-url}")
    private String rentalUrl;
    private final RestTemplate restTemplate;


    public AgreementResponse getAgreementById(Integer id) {
        // Get the current token from SecurityContextHolder
        String token = getCurrentAuthenticationToken();

        // Set headers, including Authorization
        HttpHeaders headers = new HttpHeaders();
        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);
        headers.set("Authorization", "Bearer " + token); // Add the token to the headers

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference<AgreementResponse> responseType = new ParameterizedTypeReference<>() {
        };

        ResponseEntity<AgreementResponse> responseEntity = restTemplate.exchange(
                rentalUrl + "/agreement/" + id,
                GET,
                requestEntity,
                responseType
        );

        return responseEntity.getBody();
    }

    private String getCurrentAuthenticationToken() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getTokenValue();
    }
}
