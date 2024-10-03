package com.lpthinh.paymentservice.payment;

import com.lpthinh.paymentservice.invoice.Invoice;
import com.lpthinh.paymentservice.invoice.InvoiceRequest;
import com.lpthinh.paymentservice.invoice.InvoiceService;
import com.lpthinh.paymentservice.notification.NotificationProducer;
import com.lpthinh.paymentservice.notification.PaymentNotificationRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("sk_test_51Pzrp0AsJepXypEd4vFHCY6S9JgRuQx8CJWOZK0myr83vQVdaiU4fFjfjb1M3h2l9FtPezh5sEkgpgqR6JipjaWU00M5yxxhI7")
    private String stripeApiKey;

    private final NotificationProducer notificationProducer;
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final InvoiceService invoiceService;

    public IntegratedResponse checkout(IntegratedRequest request) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        Customer customer = CustomerUtil.findOrCreateCustomer(request.email(), request.name());

        // Create a PaymentIntent
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(request.amount())
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
        return new IntegratedResponse(paymentIntent.getClientSecret(), paymentIntent.getId(), paymentIntent.getCustomer(), paymentIntent.getPaymentMethod());
    }

    public PayResponse pay(PayRequest request) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        // Prepare the params to confirm the payment intent
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", request.paymentMethodId()); // Attach the payment method ID
        params.put("return_url", "https://www.google.com.vn");  // Add the return URL for redirect-based payment methods

        // Confirm the payment intent
        PaymentIntent paymentIntent = PaymentIntent.retrieve(request.paymentIntentId());
        paymentIntent.confirm(params);


        Payment payment = this.create(new PaymentRequest(paymentIntent.getAmount(), "visa", paymentIntent.getId(), request.invoiceId()));
        payment.setStatus(PaymentStatus.SUCCESS);
        this.paymentRepository.save(payment);
        this.invoiceService.changeState(request.invoiceId(), "paid");
        Invoice invoice = this.invoiceService.findById(request.invoiceId());

        // send notification
        Map<String, Object> details = new HashMap<>();
        details.put("amount", paymentIntent.getAmount());
//        details.put("currency", paymentIntent.getCurrency());
        details.put("transaction", paymentIntent.getId());

        notificationProducer.sendNotification(
                new PaymentNotificationRequest(
                        details,
                        "admin",
                        "Phòng" + invoice.getHouseName(),
                        "Thanh toán hóa đơn tháng " + invoice.getMonth()
                )
        );

        return new PayResponse(true, "Payment successful");
    }

    public Payment create(PaymentRequest request) {
        Payment payment = paymentMapper.toPayment(request);
        var invoice = invoiceService.findById(request.invoiceId());
        payment.setInvoice(invoice);
        payment.setStatus(PaymentStatus.PENDING);
        return this.paymentRepository.save(payment);
    }
}
