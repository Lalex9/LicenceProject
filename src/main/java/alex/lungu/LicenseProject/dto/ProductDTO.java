package alex.lungu.LicenseProject.dto;

import alex.lungu.LicenseProject.model.Image;
import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.model.Store;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private String unitPrice;
    private Long storeId ;
    private Long imageId ;

    public Product getProduct(Store store, Image image) {
        Product product = new Product();
        product.setName(this.name);
        product.setDescription(this.description);
        product.setUnitPrice(this.unitPrice);
        product.setImageURL(image);
        product.setStore(store);
        store.getProducts().add(product);

        return product;
    }
}
