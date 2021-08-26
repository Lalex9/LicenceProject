package alex.lungu.LicenseProject.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="store")
@Getter
@Setter
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "store_name")
    private String storeName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "store")
    private Set<Product> products;
}
