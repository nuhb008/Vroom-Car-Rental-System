package com.trident.vroom.controller;

import com.trident.vroom.model.Rental;
import com.trident.vroom.service.RentalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rentals")
public class RentalController {

    private static final Logger logger = Logger.getLogger(RentalController.class.getName());
    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping
    public ResponseEntity<List<Rental>> getAllRentals() {
        List<Rental> rentals = rentalService.getAllRentals();
        if (rentals.isEmpty()) {
            logger.info("No rentals found.");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rentals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable int id) {
        Rental rental = rentalService.getRentalById(id);
        if (rental != null) {
            return ResponseEntity.ok(rental);
        } else {
            logger.warning("Rental not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Rental> createRental(@RequestBody Rental rental) {
        rentalService.createRental(rental);
        logger.info("Rental created with ID: " + rental.getRentID());
        return ResponseEntity.ok(rental);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable int id, @RequestBody Rental rental) {
        try {
            Rental updatedRental = rentalService.updateRental(id, rental);
            return ResponseEntity.ok(updatedRental);
        } catch (RuntimeException e) {
            logger.warning(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable int id) {
        rentalService.deleteRental(id);
        logger.info("Rental deleted with ID: " + id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Rental>> getRentalsByStatus(@PathVariable String status) {
        List<Rental> rentals = rentalService.getRentalsByStatus(status);
        if (!rentals.isEmpty()) {
            return ResponseEntity.ok(rentals);
        } else {
            logger.warning("No rentals found with status: " + status);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Rental>> getRentalsByCustomerId(@PathVariable int customerId) {
        List<Rental> rentals = rentalService.getRentalsByCustomerId(customerId);
        if (!rentals.isEmpty()) {
            return ResponseEntity.ok(rentals);
        } else {
            logger.warning("No rentals found for customer ID: " + customerId);
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/bid/{bid}")
    public ResponseEntity<Rental> updateRentalCustomerId(@PathVariable int bid, @RequestBody Rental rental) {
        Rental updated = rentalService.updateCustomerId(bid, rental.getCustomerId());
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
