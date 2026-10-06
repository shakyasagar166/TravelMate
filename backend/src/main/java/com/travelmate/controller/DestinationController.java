package com.travelmate.controller;

import com.travelmate.entity.Destination;
import com.travelmate.service.DestinationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@Tag(name = "Destinations", description = "Endpoints for exploring and managing travel destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    @Operation(summary = "Get all destinations or filter by keyword/category")
    public ResponseEntity<List<Destination>> getDestinations(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category
    ) {
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(destinationService.getDestinationsByCategory(category.trim()));
        }
        if (keyword != null && !keyword.trim().isEmpty()) {
            return ResponseEntity.ok(destinationService.searchDestinations(keyword.trim()));
        }
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get destination details by ID")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getDestinationById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new destination (Admin only)")
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        Destination created = destinationService.createDestination(destination);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update destination details (Admin only)")
    public ResponseEntity<Destination> updateDestination(@PathVariable Long id, @RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.updateDestination(id, destination));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete destination (Admin only)")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }
}
