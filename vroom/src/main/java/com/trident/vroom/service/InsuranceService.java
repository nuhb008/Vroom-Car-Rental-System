package com.trident.vroom.service;

import com.trident.vroom.model.Insurance;
import com.trident.vroom.repository.InsuranceRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class InsuranceService {
    private final InsuranceRepository insuranceRepository;

    public InsuranceService(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    public List<Insurance> getAllInsurances() {
        return insuranceRepository.getAllInsurances();
    }

    public Insurance getInsuranceById(int id) {
        return insuranceRepository.getInsuranceById(id);
    }

    public Insurance createInsurance(Insurance insurance) {
        insuranceRepository.saveInsurance(insurance);
        return insurance;
    }

    public Insurance updateInsurance(int id, Insurance insurance) {
        Insurance existingInsurance = insuranceRepository.getInsuranceById(id);
        if (existingInsurance != null) {
            insuranceRepository.updateInsurance(id, insurance);
            return insurance;
        } else {
            throw new RuntimeException("Insurance not found with ID: " + id);
        }
    }

    public void deleteInsurance(int id) {
        insuranceRepository.deleteInsurance(id);
    }

    public List<Insurance> getInsurancesByRegNo(String regNo) {
        return insuranceRepository.getInsurancesByRegNo(regNo);
    }

    public List<Insurance> getInsurancesActiveOnDate(String regNo, Date date) {
        return insuranceRepository.getInsurancesActiveOnDate(regNo, date);
    }

    public List<Insurance> getInsurancesByStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Status cannot be null or empty");
        }
        try {
            return insuranceRepository.getInsurancesByStatus(status);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching insurances by status: " + status, e);
        }
    }

    public boolean approveInsurance(int id) {
        Insurance existingInsurance = insuranceRepository.getInsuranceById(id);
        if (existingInsurance == null) {
            throw new RuntimeException("Insurance not found with ID: " + id);
        }
        
        // Check if it's already valid
        if ("Valid".equals(existingInsurance.getStatus())) {
            return false; // Already approved
        }
        
        int rowsAffected = insuranceRepository.approveInsurance(id);
        return rowsAffected > 0;
    }
}
