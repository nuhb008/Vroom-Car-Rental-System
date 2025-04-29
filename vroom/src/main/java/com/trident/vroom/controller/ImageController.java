package com.trident.vroom.controller;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.trident.vroom.model.Image;
import com.trident.vroom.service.ImageService;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {
    private static final Logger logger = Logger.getLogger(ImageController.class.getName());

    private final ImageService imageService;
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewImage(@PathVariable Long id) {
        Image image = imageService.getImageById(id);
        if (image != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", image.getType()) // Sets the correct image type (e.g., image/jpeg)
                    .body(image.getData());
        } else {
            logger.warning("Image not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping
    public ResponseEntity<List<Image>> getAllImages() {
        List<Image> images = imageService.getAllImages();
        if (images.isEmpty()) {
            logger.info("No images found.");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }

    @GetMapping("/regNo/{regNo}")
    public ResponseEntity<List<Image>> getImagesByRegNo(@PathVariable String regNo) {
        List<Image> images = imageService.getImagesByRegNo(regNo);
        if (images.isEmpty()) {
            logger.info("No images found for registration number: " + regNo);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        Image image = imageService.getImageById(id);
        if (image != null) {
            return ResponseEntity.ok(image);
        } else {
            logger.warning("Image not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload/{regNo}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable String regNo) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        byte[] data = file.getBytes();

        Image image = new Image();
        image.setName(fileName);
        image.setType(fileType);
        image.setData(data);
        image.setRegNo(regNo); // Set the registration number
        imageService.createImage(image);
        logger.info("Image uploaded with name: " + fileName + " for registration number: " + regNo);
        return ResponseEntity.ok("Image uploaded successfully: " + fileName + " for registration number: " + regNo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable Long id, @RequestBody Image image) {
        Image updatedImage = imageService.updateImage(id, image);
        if (updatedImage != null) {
            return ResponseEntity.ok(updatedImage);
        } else {
            logger.warning("Image not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        logger.info("Image deleted with ID: " + id);
        return ResponseEntity.noContent().build();
    }

}
