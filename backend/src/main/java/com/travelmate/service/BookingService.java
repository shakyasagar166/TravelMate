package com.travelmate.service;

import com.travelmate.dto.BookingRequest;
import com.travelmate.dto.BookingResponse;
import com.travelmate.entity.Booking;
import com.travelmate.entity.TravelPackage;
import com.travelmate.entity.User;
import com.travelmate.exception.BookingException;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.BookingRepository;
import com.travelmate.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TravelPackageRepository packageRepository;

    public BookingService(BookingRepository bookingRepository, TravelPackageRepository packageRepository) {
        this.bookingRepository = bookingRepository;
        this.packageRepository = packageRepository;
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request, User user) {
        TravelPackage pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + request.getPackageId()));

        if (pkg.getAvailableSeats() < request.getNumberOfTravelers()) {
            throw new BookingException("Not enough seats available. Requested: " +
                    request.getNumberOfTravelers() + ", Available: " + pkg.getAvailableSeats());
        }

        // Calculate discounted price per traveler
        BigDecimal discountFactor = BigDecimal.ONE.subtract(
                BigDecimal.valueOf(pkg.getDiscountPercent()).divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP)
        );
        BigDecimal effectiveRate = pkg.getPrice().multiply(discountFactor);
        BigDecimal totalPrice = effectiveRate.multiply(BigDecimal.valueOf(request.getNumberOfTravelers()))
                .setScale(2, RoundingMode.HALF_UP);

        // Deduct available seats
        pkg.setAvailableSeats(pkg.getAvailableSeats() - request.getNumberOfTravelers());
        packageRepository.save(pkg);

        // Create booking
        Booking booking = new Booking();
        String bookingRef = "TM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        booking.setBookingReference(bookingRef);
        booking.setUser(user);
        booking.setTravelPackage(pkg);
        booking.setTravelDate(request.getTravelDate());
        booking.setNumberOfTravelers(request.getNumberOfTravelers());
        booking.setTotalPrice(totalPrice);
        booking.setStatus("PENDING");
        booking.setSpecialRequests(request.getSpecialRequests());

        Booking saved = bookingRepository.save(booking);
        return toResponse(saved);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return toResponse(booking);
    }

    public Booking getBookingEntityById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    public BookingResponse getBookingByReference(String reference) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with reference: " + reference));
        return toResponse(booking);
    }

    @Transactional
    public BookingResponse updateBookingStatus(Long id, String status) {
        Booking booking = getBookingEntityById(id);
        booking.setStatus(status.toUpperCase());
        Booking updated = bookingRepository.save(booking);
        return toResponse(updated);
    }

    @Transactional
    public BookingResponse cancelBooking(Long id, User user) {
        Booking booking = getBookingEntityById(id);
        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(user.getRole());
        boolean isOwner = booking.getUser().getId().equals(user.getId());

        if (!isAdmin && !isOwner) {
            throw new BookingException("You are not authorized to cancel this booking");
        }

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new BookingException("Booking is already cancelled");
        }

        booking.setStatus("CANCELLED");

        // Restore seats
        TravelPackage pkg = booking.getTravelPackage();
        if (pkg != null) {
            pkg.setAvailableSeats(pkg.getAvailableSeats() + booking.getNumberOfTravelers());
            packageRepository.save(pkg);
        }

        Booking saved = bookingRepository.save(booking);
        return toResponse(saved);
    }

    public BookingResponse toResponse(Booking booking) {
        BookingResponse res = new BookingResponse();
        res.setId(booking.getId());
        res.setBookingReference(booking.getBookingReference());
        if (booking.getUser() != null) {
            res.setUserId(booking.getUser().getId());
            res.setUserName(booking.getUser().getFullName() != null ? booking.getUser().getFullName() : booking.getUser().getUsername());
            res.setUserEmail(booking.getUser().getEmail());
        }
        if (booking.getTravelPackage() != null) {
            res.setPackageId(booking.getTravelPackage().getId());
            res.setPackageTitle(booking.getTravelPackage().getTitle());
            res.setPackageImageUrl(booking.getTravelPackage().getImageUrl());
            if (booking.getTravelPackage().getDestination() != null) {
                res.setDestinationName(booking.getTravelPackage().getDestination().getName());
            }
        }
        res.setTravelDate(booking.getTravelDate());
        res.setNumberOfTravelers(booking.getNumberOfTravelers());
        res.setTotalPrice(booking.getTotalPrice());
        res.setStatus(booking.getStatus());
        res.setSpecialRequests(booking.getSpecialRequests());
        res.setCreatedAt(booking.getCreatedAt());
        return res;
    }
}
