package com.travelmate.repository;

import com.travelmate.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByDestinationId(Long destinationId);
    List<TravelPackage> findByFeaturedTrue();

    @Query("SELECT p FROM TravelPackage p WHERE " +
           "(:destinationId IS NULL OR p.destination.id = :destinationId) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.destination.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<TravelPackage> searchPackages(
            @Param("destinationId") Long destinationId,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("keyword") String keyword
    );
}
