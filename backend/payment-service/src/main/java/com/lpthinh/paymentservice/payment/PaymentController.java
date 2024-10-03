package com.lpthinh.paymentservice.payment;

import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout/integrated")
    public ResponseEntity<IntegratedResponse> checkout(@RequestBody IntegratedRequest request) throws StripeException {
        return ResponseEntity.ok(this.paymentService.checkout(request));
    }

    @PostMapping("/checkout/pay")
    public ResponseEntity<PayResponse> checkout(@RequestBody PayRequest request) throws StripeException {
        return ResponseEntity.ok(this.paymentService.pay(request));
    }
}
