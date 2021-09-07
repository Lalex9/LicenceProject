package alex.lungu.LicenseProject.controllers;

import alex.lungu.LicenseProject.dto.ProductDTO;
import alex.lungu.LicenseProject.model.Image;
import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.model.Store;
import alex.lungu.LicenseProject.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImageController {
    private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<Image> getImage(@PathVariable("product_id") Long productId) {
        Image image = imageService.getImageFromProductId(productId);
        return new ResponseEntity<Image>(image, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Long> addImage(@RequestParam("file") MultipartFile imageParam) {
        Long id;
        try {
            id = imageService.saveImage(imageParam);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Long>(id, HttpStatus.CREATED);
    }
}
