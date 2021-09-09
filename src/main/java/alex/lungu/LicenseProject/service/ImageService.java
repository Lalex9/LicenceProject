package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.model.Image;
import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.repository.ImageRepository;
import alex.lungu.LicenseProject.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {
    private ImageRepository imageRepository;
    private ProductRepository productRepository;

    public ImageService(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    public Long saveImage(MultipartFile image) throws IOException {
        String imageName = StringUtils.cleanPath(image.getOriginalFilename());
        Image localImage = new Image();
        localImage.setName(imageName);
        localImage.setType(image.getContentType());
        localImage.setData(image.getBytes());

        return imageRepository.save(localImage).getId();
    }

    public Image getImage(Long id) {
        return imageRepository.findById(id).get();
    }

    public Image getImageFromProductId(Long productId) {
        Optional<Product> productOp = productRepository.findProductById(productId);
        return productOp.map(Product::getImageURL).orElse(null);
    }
}
