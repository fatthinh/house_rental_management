package com.lpthinh.identityservice.authentication;

import com.lpthinh.identityservice.request.IntrospectRequest;
import com.lpthinh.identityservice.request.LogoutRequest;
import com.lpthinh.identityservice.request.RefreshRequest;
import com.lpthinh.identityservice.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/identity/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/token")
    ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/introspect")
    ResponseEntity<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        var result = authenticationService.introspect(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/refresh")
    ResponseEntity<AuthenticationResponse> refresh(@RequestBody RefreshRequest request) throws JOSEException, ParseException {
        var result = authenticationService.refreshToken(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    ResponseEntity<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ResponseEntity.ok().build();
    }
}
