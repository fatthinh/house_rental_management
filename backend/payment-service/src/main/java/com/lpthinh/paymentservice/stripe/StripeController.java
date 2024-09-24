package com.lpthinh.paymentservice.stripe;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.EphemeralKey;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentMethodAttachParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/payment")
public class StripeController {

    @Value("pk_test_51Pzrp0AsJepXypEdCR4QJFma3GQ0ND313uUbHMzAkToxzk6UDu304lrOn3q9vuEm9xRi2754UKeB4W018LMX81yK00MZHOUs10")
    private String stripePublicKey;

    @PostMapping("/checkout/integrated")
    public ResponseEntity<Response> checkout(@RequestBody RequestDTO requestDTO) throws StripeException {
        Stripe.apiKey = "sk_test_51Pzrp0AsJepXypEd4vFHCY6S9JgRuQx8CJWOZK0myr83vQVdaiU4fFjfjb1M3h2l9FtPezh5sEkgpgqR6JipjaWU00M5yxxhI7";
        Customer customer = CustomerUtil.findOrCreateCustomer(requestDTO.email(), requestDTO.name());

        // Create a PaymentIntent and send it's client secret to the client
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(requestDTO.amount())
                        .setCurrency(("vnd"))
                        .setCustomer(customer.getId())
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return ResponseEntity.ok(new Response(paymentIntent.getClientSecret(), paymentIntent.getId(), customer.getId(), paymentIntent.getPaymentMethod()));
    }

    @PostMapping("/checkout/pay")
    public ResponseEntity<PayResponse> pay(@RequestBody Request request) throws StripeException {
        Stripe.apiKey = "sk_test_51Pzrp0AsJepXypEd4vFHCY6S9JgRuQx8CJWOZK0myr83vQVdaiU4fFjfjb1M3h2l9FtPezh5sEkgpgqR6JipjaWU00M5yxxhI7";

        // Prepare the params to confirm the payment intent
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", request.paymentMethodId()); // Attach the payment method ID
        params.put("return_url", "https://www.google.com.vn");  // Add the return URL for redirect-based payment methods

        // Confirm the payment intent
        PaymentIntent paymentIntent = PaymentIntent.retrieve(request.paymentIntentId());

        paymentIntent.confirm(params);
        return ResponseEntity.ok(new PayResponse(true, "Payment successful"));
    }
}