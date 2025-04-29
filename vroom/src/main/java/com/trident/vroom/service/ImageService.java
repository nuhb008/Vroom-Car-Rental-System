package com.trident.vroom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trident.vroom.model.Image;
import com.trident.vroom.repository.ImageRepository;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image getImageById(Long id) {
        return imageRepository.findById(id);
    }

    public List<Image> getImagesByRegNo(String regNo) {
        return imageRepository.findAllbyRegNo(regNo);
    }

    public Image createImage(Image image) {
        imageRepository.save(image);
        return image;
    }

    public Image updateImage(Long id, Image image) {
        Image existingImage = imageRepository.findById(id);
        if (existingImage != null) {
            imageRepository.update(id, image);
            return image;
        } else {
            throw new RuntimeException("Image not found with ID: " + id);
        }
    }

    public void deleteImage(Long id) {
        imageRepository.delete(id);
    }
}
