package com.trident.vroom.service;

import com.trident.vroom.model.Rental;
import com.trident.vroom.repository.RentalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;

    public RentalService(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.getAllRentals();
    }

    public Rental getRentalById(int id) {
        return rentalRepository.getRentalById(id);
    }

    public Rental createRental(Rental rental) {
        rentalRepository.saveRental(rental);
        return rental;
    }

    public Rental updateRental(int id, Rental rental) {
        Rental existingRental = rentalRepository.getRentalById(id);
        if (existingRental != null) {
            rentalRepository.updateRental(id, rental);
            return rental;
        } else {
            throw new RuntimeException("Rental not found with ID: " + id);
        }
    }

    public void deleteRental(int id) {
        rentalRepository.deleteRental(id);
    }

    public List<Rental> getRentalsByStatus(String status) {
        return rentalRepository.getRentalsByStatus(status);
    }

    public List<Rental> getRentalsByCustomerId(int customerId) {
        return rentalRepository.getRentalsByCustomerId(customerId);
    }

    public Rental updateRentalByBID(int id, Rental rental) {
        Rental existingRental = rentalRepository.getRentalById(id);
        if (existingRental != null) {
            rentalRepository.updateRental(id, rental);
            return rental;
        } else {
            throw new RuntimeException("Rental not found with ID: " + id);
        }
    }
    
    public Rental updateCustomerId(int bid, Integer customerId) {
        return rentalRepository.updateCustomerIdByBid(bid, customerId);
    }

    public Rental getRentalByBookingId(int bid) {
        return rentalRepository.getRentalByBID(bid);
    }
    
    public Rental getRentalRemainByBookingId(int bid) {
        return rentalRepository.getRentalRemainByBID(bid);
    }
}
