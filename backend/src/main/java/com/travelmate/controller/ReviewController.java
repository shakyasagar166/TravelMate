package com.travelmate.controller;

import com.travelmate.dto.ReviewDTO;
import com.travelmate.entity.User;
import com.travelmate.service.AuthService;
import com.travelmate.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Reviews", description = "Endpoints for user reviews and ratings")
public class ReviewController {

    private final ReviewService reviewService;
    private final AuthService authService;

    public ReviewController(ReviewService reviewService, AuthService authService) {
        this.reviewService = reviewService;
        this.authService = authService;
    }

    @GetMapping("/package/{packageId}")
    @Operation(summary = "Get all reviews for a travel package")
    public ResponseEntity<List<ReviewDTO>> getReviewsByPackage(@PathVariable Long packageId) {
        return ResponseEntity.ok(reviewService.getReviewsByPackage(packageId));
    }

    @GetMapping("/destination/{destinationId}")
    @Operation(summary = "Get all reviews for a destination")
    public ResponseEntity<List<ReviewDTO>> getReviewsByDestination(@PathVariable Long destinationId) {
        return ResponseEntity.ok(reviewService.getReviewsByDestination(destinationId));
    }

    @GetMapping
    @Operation(summary = "Get all travel reviews")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @PostMapping
    @Operation(summary = "Submit a travel review and rating")
    public ResponseEntity<ReviewDTO> addReview(@Valid @RequestBody ReviewDTO dto) {
        User currentUser = authService.getCurrentUser();
        ReviewDTO created = reviewService.addReview(dto, currentUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review by ID (Owner or Admin)")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        User currentUser = authService.getCurrentUser();
        reviewService.deleteReview(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}
