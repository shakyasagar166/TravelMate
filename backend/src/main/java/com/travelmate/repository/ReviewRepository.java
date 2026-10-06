package com.travelmate.repository;

import com.travelmate.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPackageId(Long packageId);
    List<Review> findByDestinationId(Long destinationId);
    List<Review> findByUserId(Long userId);
}
