package alex.lungu.LicenseProject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="subscription_item")
@Getter
@Setter
public class SubscriptionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_url", referencedColumnName = "id")
    private Image imageUrl;

    @Column(name="name")
    private String name;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="quantity")
    private int quantity;

    @Column(name="product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @JsonBackReference
    public Subscription getSubscription() {
        return this.subscription;
    }
}