package alex.lungu.LicenseProject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private String unitPrice;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "image_url", referencedColumnName = "id")
    private Image imageURL;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store ;


    @JsonBackReference
    public Store getStore() {
        return this.store;
    }

    @JsonBackReference
    public Image getImage() { return this.imageURL; }
}
