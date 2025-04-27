package com.trident.vroom.service;

import com.trident.vroom.model.Car;
import com.trident.vroom.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.getAllCars();
    }

    public List<Car> getCarsByOwner(int id) {
        return carRepository.getCarsByOwnerId(id);
    }

    public Optional<Car> getCarByRegNo(String regNo) {
        return carRepository.getCarByRegNo(regNo);
    }

    public Car createCar(Car car) {
        carRepository.saveCar(car);
        return car;
    }

    public Car updateCar(String regNo, Car car) {
        Optional<Car> existingCar = carRepository.getCarByRegNo(regNo);
        if (existingCar.isPresent()) {
            carRepository.updateCar(regNo, car);
            return car;
        } else {
            throw new RuntimeException("Car not found with Registration Number: " + regNo);
        }
    }

    public void deleteCar(String regNo) {
        carRepository.deleteCar(regNo);
    }

    public List<Car> getAvaibaleCars() {
        return carRepository.getAvailableCars();
    }

    public List<Car> getNotAvailabeCars() {
        return carRepository.getNotAvailableCars();
    }

    public List<Car> getCarsByFuelType(String fuelType) {
        return carRepository.getCarsByFuelType(fuelType);
    }

    public List<Car> getCarsByCapacity(int capacity) {
        return carRepository.getCarsByCapacity(capacity);
    }

    public List<Car> getCarsByRate(double rate) {
        return carRepository.getCarsByRate(rate);
    }

    public List<Car> getCarsByModel(String model) {
        return carRepository.getCarsByModel(model);
    }
}
