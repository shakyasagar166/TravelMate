package com.travelmate.controller;

import com.travelmate.dto.PaymentRequest;
import com.travelmate.entity.Payment;
import com.travelmate.entity.User;
import com.travelmate.service.AuthService;
import com.travelmate.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payments", description = "Endpoints for payment checkout and transaction logs")
public class PaymentController {

    private final PaymentService paymentService;
    private final AuthService authService;

    public PaymentController(PaymentService paymentService, AuthService authService) {
        this.paymentService = paymentService;
        this.authService = authService;
    }

    @PostMapping
    @Operation(summary = "Process a simulated payment for a booking")
    public ResponseEntity<Payment> processPayment(@Valid @RequestBody PaymentRequest request) {
        User currentUser = authService.getCurrentUser();
        Payment payment = paymentService.processPayment(request, currentUser);
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    @GetMapping("/booking/{bookingId}")
    @Operation(summary = "Get payment receipt by booking ID")
    public ResponseEntity<Payment> getPaymentByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(paymentService.getPaymentByBookingId(bookingId));
    }

    @GetMapping("/my")
    @Operation(summary = "Get transaction history for the logged-in user")
    public ResponseEntity<List<Payment>> getMyPayments() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(paymentService.getPaymentsByUserId(currentUser.getId()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all payment transactions (Admin only)")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payment details by ID")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }
}
