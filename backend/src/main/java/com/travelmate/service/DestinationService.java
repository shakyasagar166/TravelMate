package com.travelmate.service;

import com.travelmate.entity.Destination;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.DestinationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
    }

    public List<Destination> searchDestinations(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return destinationRepository.findAll();
        }
        return destinationRepository.searchDestinations(keyword.trim());
    }

    public List<Destination> getDestinationsByCategory(String category) {
        return destinationRepository.findByCategoryIgnoreCase(category);
    }

    @Transactional
    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    @Transactional
    public Destination updateDestination(Long id, Destination update) {
        Destination existing = getDestinationById(id);
        existing.setName(update.getName());
        existing.setCountry(update.getCountry());
        existing.setCity(update.getCity());
        existing.setDescription(update.getDescription());
        existing.setCategory(update.getCategory());
        existing.setBestSeason(update.getBestSeason());
        existing.setImageUrl(update.getImageUrl());
        if (update.getRating() != null) {
            existing.setRating(update.getRating());
        }
        return destinationRepository.save(existing);
    }

    @Transactional
    public void deleteDestination(Long id) {
        Destination existing = getDestinationById(id);
        destinationRepository.delete(existing);
    }
}
