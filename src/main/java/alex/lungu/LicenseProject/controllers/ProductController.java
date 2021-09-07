package alex.lungu.LicenseProject.controllers;

import alex.lungu.LicenseProject.dto.ProductDTO;
import alex.lungu.LicenseProject.model.Image;
import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.model.Store;
import alex.lungu.LicenseProject.service.ImageService;
import alex.lungu.LicenseProject.service.ProductService;
import alex.lungu.LicenseProject.service.StoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {
    private final ProductService productService;
    private final StoreService storeService;
    private final ImageService imageService;

    public ProductController(ProductService productService, StoreService storeService, ImageService imageService) {
        this.productService = productService;
        this.storeService = storeService;
        this.imageService = imageService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Product product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        Store store = storeService.findStore(productDTO.getStoreId());
        System.out.println(store);
        if (store == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Image image = imageService.getImage(productDTO.getImageId());
        Product product = productDTO.getProduct(store, image);
        Product localProduct = productService.addProduct(product);
        System.out.println(localProduct);
        return new ResponseEntity<>(localProduct, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateUser(@RequestBody Product product) {
        Product localProduct  = productService.updateProduct(product);
        return new ResponseEntity<>(localProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
