package alex.lungu.LicenseProject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="subscription")
@Getter
@Setter
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="customer_email")
    private String customerEmail;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "subscription")
    private Set<SubscriptionItem> subscriptionItems = new HashSet<>();

    @Column(name="order_date")
    private Date orderDate;

    @JsonManagedReference
    public Set<SubscriptionItem> getSubscriptionItems() {
        return this.subscriptionItems;
    }

}
