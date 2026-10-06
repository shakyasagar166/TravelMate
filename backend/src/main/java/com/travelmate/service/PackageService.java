package com.travelmate.service;

import com.travelmate.dto.TravelPackageDTO;
import com.travelmate.entity.Destination;
import com.travelmate.entity.TravelPackage;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.DestinationRepository;
import com.travelmate.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PackageService {

    private final TravelPackageRepository packageRepository;
    private final DestinationRepository destinationRepository;

    public PackageService(TravelPackageRepository packageRepository, DestinationRepository destinationRepository) {
        this.packageRepository = packageRepository;
        this.destinationRepository = destinationRepository;
    }

    public List<TravelPackageDTO> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TravelPackageDTO getPackageById(Long id) {
        TravelPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
        return toDTO(pkg);
    }

    public TravelPackage getPackageEntityById(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
    }

    public List<TravelPackageDTO> getPackagesByDestination(Long destinationId) {
        return packageRepository.findByDestinationId(destinationId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TravelPackageDTO> getFeaturedPackages() {
        return packageRepository.findByFeaturedTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TravelPackageDTO> searchPackages(Long destinationId, BigDecimal maxPrice, String keyword) {
        String kw = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        return packageRepository.searchPackages(destinationId, maxPrice, kw).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TravelPackageDTO createPackage(TravelPackageDTO dto) {
        Destination destination = destinationRepository.findById(dto.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + dto.getDestinationId()));

        TravelPackage pkg = new TravelPackage();
        copyDtoToEntity(dto, pkg, destination);

        TravelPackage saved = packageRepository.save(pkg);
        return toDTO(saved);
    }

    @Transactional
    public TravelPackageDTO updatePackage(Long id, TravelPackageDTO dto) {
        TravelPackage existing = getPackageEntityById(id);
        Destination destination = destinationRepository.findById(dto.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + dto.getDestinationId()));

        copyDtoToEntity(dto, existing, destination);
        TravelPackage updated = packageRepository.save(existing);
        return toDTO(updated);
    }

    @Transactional
    public void deletePackage(Long id) {
        TravelPackage pkg = getPackageEntityById(id);
        packageRepository.delete(pkg);
    }

    public TravelPackageDTO toDTO(TravelPackage entity) {
        TravelPackageDTO dto = new TravelPackageDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDurationDays(entity.getDurationDays());
        dto.setDurationNights(entity.getDurationNights());
        dto.setPrice(entity.getPrice());
        dto.setDiscountPercent(entity.getDiscountPercent());
        dto.setFeatured(entity.getFeatured());
        dto.setInclusions(entity.getInclusions());
        dto.setItinerary(entity.getItinerary());
        dto.setAvailableSeats(entity.getAvailableSeats());
        dto.setImageUrl(entity.getImageUrl());

        if (entity.getDestination() != null) {
            dto.setDestinationId(entity.getDestination().getId());
            dto.setDestinationName(entity.getDestination().getName());
            dto.setCountry(entity.getDestination().getCountry());
            dto.setCity(entity.getDestination().getCity());
        }
        return dto;
    }

    private void copyDtoToEntity(TravelPackageDTO dto, TravelPackage entity, Destination destination) {
        entity.setTitle(dto.getTitle());
        entity.setDestination(destination);
        entity.setDescription(dto.getDescription());
        entity.setDurationDays(dto.getDurationDays());
        entity.setDurationNights(dto.getDurationNights());
        entity.setPrice(dto.getPrice());
        entity.setDiscountPercent(dto.getDiscountPercent() != null ? dto.getDiscountPercent() : 0);
        entity.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        entity.setInclusions(dto.getInclusions());
        entity.setItinerary(dto.getItinerary());
        entity.setAvailableSeats(dto.getAvailableSeats() != null ? dto.getAvailableSeats() : 20);
        entity.setImageUrl(dto.getImageUrl());
    }
}
