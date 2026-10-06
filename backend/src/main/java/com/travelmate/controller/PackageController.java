package com.travelmate.controller;

import com.travelmate.dto.TravelPackageDTO;
import com.travelmate.service.PackageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@Tag(name = "Travel Packages", description = "Endpoints for discovering and curating travel tour packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @GetMapping
    @Operation(summary = "Get all packages with optional destination, price, or keyword filters")
    public ResponseEntity<List<TravelPackageDTO>> getPackages(
            @RequestParam(required = false) Long destinationId,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean featured
    ) {
        if (Boolean.TRUE.equals(featured)) {
            return ResponseEntity.ok(packageService.getFeaturedPackages());
        }
        if (destinationId != null || maxPrice != null || (keyword != null && !keyword.trim().isEmpty())) {
            return ResponseEntity.ok(packageService.searchPackages(destinationId, maxPrice, keyword));
        }
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @GetMapping("/featured")
    @Operation(summary = "Get hand-picked featured travel packages")
    public ResponseEntity<List<TravelPackageDTO>> getFeaturedPackages() {
        return ResponseEntity.ok(packageService.getFeaturedPackages());
    }

    @GetMapping("/destination/{destinationId}")
    @Operation(summary = "Get packages for a specific destination ID")
    public ResponseEntity<List<TravelPackageDTO>> getPackagesByDestination(@PathVariable Long destinationId) {
        return ResponseEntity.ok(packageService.getPackagesByDestination(destinationId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get travel package details by ID")
    public ResponseEntity<TravelPackageDTO> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new travel package (Admin only)")
    public ResponseEntity<TravelPackageDTO> createPackage(@Valid @RequestBody TravelPackageDTO dto) {
        TravelPackageDTO created = packageService.createPackage(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update travel package details (Admin only)")
    public ResponseEntity<TravelPackageDTO> updatePackage(@PathVariable Long id, @Valid @RequestBody TravelPackageDTO dto) {
        return ResponseEntity.ok(packageService.updatePackage(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete travel package (Admin only)")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
