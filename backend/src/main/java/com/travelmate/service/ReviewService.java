package com.travelmate.service;

import com.travelmate.dto.ReviewDTO;
import com.travelmate.entity.Destination;
import com.travelmate.entity.Review;
import com.travelmate.entity.TravelPackage;
import com.travelmate.entity.User;
import com.travelmate.exception.BookingException;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.DestinationRepository;
import com.travelmate.repository.ReviewRepository;
import com.travelmate.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TravelPackageRepository packageRepository;
    private final DestinationRepository destinationRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         TravelPackageRepository packageRepository,
                         DestinationRepository destinationRepository) {
        this.reviewRepository = reviewRepository;
        this.packageRepository = packageRepository;
        this.destinationRepository = destinationRepository;
    }

    public List<ReviewDTO> getReviewsByPackage(Long packageId) {
        return reviewRepository.findByPackageId(packageId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByDestination(Long destinationId) {
        return reviewRepository.findByDestinationId(destinationId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO addReview(ReviewDTO dto, User user) {
        Review review = new Review();
        review.setUser(user);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        if (dto.getPackageId() != null) {
            TravelPackage pkg = packageRepository.findById(dto.getPackageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + dto.getPackageId()));
            review.setTravelPackage(pkg);
            if (pkg.getDestination() != null) {
                review.setDestination(pkg.getDestination());
            }
        } else if (dto.getDestinationId() != null) {
            Destination dest = destinationRepository.findById(dto.getDestinationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + dto.getDestinationId()));
            review.setDestination(dest);
        }

        Review saved = reviewRepository.save(review);
        return toDTO(saved);
    }

    @Transactional
    public void deleteReview(Long id, User user) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));

        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(user.getRole());
        boolean isOwner = review.getUser().getId().equals(user.getId());

        if (!isAdmin && !isOwner) {
            throw new BookingException("Not authorized to delete this review");
        }

        reviewRepository.delete(review);
    }

    public ReviewDTO toDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        if (review.getUser() != null) {
            dto.setUserId(review.getUser().getId());
            dto.setUserName(review.getUser().getFullName() != null ? review.getUser().getFullName() : review.getUser().getUsername());
            dto.setUserAvatar(review.getUser().getAvatarUrl());
        }
        if (review.getDestination() != null) {
            dto.setDestinationId(review.getDestination().getId());
        }
        if (review.getTravelPackage() != null) {
            dto.setPackageId(review.getTravelPackage().getId());
        }
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
