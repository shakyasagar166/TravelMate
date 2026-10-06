package com.travelmate.service;

import com.travelmate.dto.PaymentRequest;
import com.travelmate.entity.Booking;
import com.travelmate.entity.Payment;
import com.travelmate.entity.User;
import com.travelmate.exception.BookingException;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.BookingRepository;
import com.travelmate.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentService(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Payment processPayment(PaymentRequest request, User user) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + request.getBookingId()));

        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(user.getRole());
        if (!isAdmin && !booking.getUser().getId().equals(user.getId())) {
            throw new BookingException("Not authorized to process payment for this booking");
        }

        if ("CONFIRMED".equalsIgnoreCase(booking.getStatus()) || "COMPLETED".equalsIgnoreCase(booking.getStatus())) {
            throw new BookingException("Booking is already confirmed/paid");
        }

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new BookingException("Cannot pay for a cancelled booking");
        }

        Payment payment = new Payment();
        String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        payment.setTransactionId(txnId);
        payment.setBooking(booking);
        payment.setUser(user);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");

        Payment savedPayment = paymentRepository.save(payment);

        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);

        return savedPayment;
    }

    public Payment getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for booking: " + bookingId));
    }

    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }
}
