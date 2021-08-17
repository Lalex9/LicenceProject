package alex.lungu.LicenseProject.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;

    private String description;

    private String unitPrice;

    private String imageURL;

    private Long categoryId;
}
