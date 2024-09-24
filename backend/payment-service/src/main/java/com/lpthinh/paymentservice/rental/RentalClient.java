package com.lpthinh.paymentservice.rental;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class RentalClient {

    @Value("${application.config.rental-url}")
    private String rentalUrl;
    private final RestTemplate restTemplate;

    public AgreementResponse getAgreementById(Integer id) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);
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

    public List<AgreementResponse> getAgreements() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference<List<AgreementResponse>> responseType = new ParameterizedTypeReference<>() {
        };
        ResponseEntity<List<AgreementResponse>> responseEntity = restTemplate.exchange(
                rentalUrl + "/agreement?state=active",
                GET,
                requestEntity,
                responseType
        );

        return responseEntity.getBody();
    }
}
