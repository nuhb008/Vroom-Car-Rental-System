package com.trident.vroom.service;

import com.trident.vroom.model.Payment;
import com.trident.vroom.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.getAllPayments();
    }

    public Payment getPaymentById(int id) {
        Payment payment = paymentRepository.getPaymentById(id);
        if (payment == null) {
            throw new RuntimeException("Payment not found with ID: " + id);
        }
        return payment;
    }

    public Payment createPayment(Payment payment) {
        paymentRepository.savePayment(payment);
        return payment;
    }

    public Payment updatePayment(int id, Payment payment) {
        Payment existingPayment = paymentRepository.getPaymentById(id);
        if (existingPayment != null) {
            paymentRepository.updatePayment(id, payment);
            return payment;
        } else {
            throw new RuntimeException("Payment not found with ID: " + id);
        }
    }

    public void deletePayment(int id) {
        Payment existingPayment = paymentRepository.getPaymentById(id);
        if (existingPayment != null) {
            paymentRepository.deletePayment(id);
        } else {
            throw new RuntimeException("Payment not found with ID: " + id);
        }
    }

    public List<Payment> getPaymentsByRentId(int rentId) {
        return paymentRepository.getPaymentsByRentId(rentId);
    }

    public List<Payment> getPaymentsByDateRange(Date startDate, Date endDate) {
        return paymentRepository.getPaymentsByDateRange(startDate, endDate);
    }

    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.getPaymentsByStatus(status);
    }

    public List<Payment> getPaymentsByCustomerId(int customerId) {
        return paymentRepository.getPaymentsByUserID(customerId);
    }
}
