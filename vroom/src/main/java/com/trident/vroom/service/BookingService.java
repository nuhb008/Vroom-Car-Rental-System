package com.trident.vroom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trident.vroom.model.Booking;
import com.trident.vroom.repository.BookingRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.getAllBookings();
    }

    public List<Booking> getBookingsByCustomerId(int customerId) {
        return bookingRepository.getBookingsByCustomerId(customerId);
    }

    public Booking getBookingById(int id) {
        return bookingRepository.getBookingById(id);
    }

    public Booking createBooking(Booking booking) {
        int generatedId = bookingRepository.saveBooking(booking); // assumes this returns BID
        booking.setBID(generatedId);
        return booking;
    }    

    public Booking updateBooking(int id, Booking booking) {
        Booking existingBooking = bookingRepository.getBookingById(id);
        if (existingBooking != null) {
            bookingRepository.updateBooking(id, booking);
            return booking;
        } else {
            throw new RuntimeException("Booking not found with ID: " + id);
        }
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteBooking(id);
    }

    public List<Booking> getBookingsByRegNo(String regNo) {
        return bookingRepository.getBookingsByRegNo(regNo);
    }

    public Booking getLatestBookingByRegNo(String regNo) {
        return bookingRepository.getLatestBookingByRegNo(regNo);
    }
}
