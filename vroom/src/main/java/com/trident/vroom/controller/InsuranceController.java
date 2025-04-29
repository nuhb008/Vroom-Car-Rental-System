package com.trident.vroom.controller;

import com.trident.vroom.model.Insurance;
import com.trident.vroom.service.InsuranceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/insurances")
public class InsuranceController {

    private static final Logger logger = Logger.getLogger(InsuranceController.class.getName());
    private final InsuranceService insuranceService;

    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @GetMapping
    public ResponseEntity<List<Insurance>> getAllInsurances() {
        List<Insurance> insurances = insuranceService.getAllInsurances();
        if (insurances.isEmpty()) {
            logger.info("No insurances found.");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(insurances);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable int id) {
        Insurance insurance = insuranceService.getInsuranceById(id);
        if (insurance != null) {
            return ResponseEntity.ok(insurance);
        } else {
            logger.warning("Insurance not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Insurance> createInsurance(@RequestBody Insurance insurance) {
        insuranceService.createInsurance(insurance);
        return ResponseEntity.ok(insurance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable int id, @RequestBody Insurance insurance) {
        Insurance updatedInsurance = insuranceService.updateInsurance(id, insurance);
        if (updatedInsurance != null) {
            return ResponseEntity.ok(updatedInsurance);
        } else {
            logger.warning("Insurance not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInsurance(@PathVariable int id) {
        insuranceService.deleteInsurance(id);
        logger.info("Insurance deleted with ID: " + id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/regNo/{regNo}")
    public ResponseEntity<List<Insurance>> getInsurancesByRegNo(@PathVariable String regNo) {
        List<Insurance> insurances = insuranceService.getInsurancesByRegNo(regNo);
        if (!insurances.isEmpty()) {
            return ResponseEntity.ok(insurances);
        } else {
            logger.warning("No insurances found for Registration Number: " + regNo);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Insurance>> getInsurancesActiveOnDate(
            @RequestParam String regNo,
            @RequestParam Date date) {
        List<Insurance> insurances = insuranceService.getInsurancesActiveOnDate(regNo, date);
        if (!insurances.isEmpty()) {
            return ResponseEntity.ok(insurances);
        } else {
            logger.warning("No active insurance found for Registration Number: " + regNo + " on " + date);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Insurance>> getInsurancesByStatus(@PathVariable String status) {
    List<Insurance> insurances = insuranceService.getInsurancesByStatus(status);
    if (!insurances.isEmpty()) {
        return ResponseEntity.ok(insurances);
    } else {
        logger.warning("No insurances found with status: " + status);
        return ResponseEntity.notFound().build();
    }
}


}
