package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.exception.ElementNotFoundException;
import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductById(Long id) {
        return productRepository.findProductById(id).orElseThrow(() -> new ElementNotFoundException("Product " + id + " not found!"));
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteProductById(id);
    }
}
