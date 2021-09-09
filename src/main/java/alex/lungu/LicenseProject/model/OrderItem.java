package alex.lungu.LicenseProject.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="order_item")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "image_url", referencedColumnName = "id")
    private Image imageUrl;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="quantity")
    private int quantity;

    @Column(name="name")
    private String name;

    @Column(name="product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public static OrderItem getOrderItemFromSubscriptionItem(SubscriptionItem subscriptionItem) {
        OrderItem item = new OrderItem();
        item.setImageUrl(subscriptionItem.getImageUrl());
        item.setQuantity(subscriptionItem.getQuantity());
        item.setProductId(subscriptionItem.getProductId());
        item.setUnitPrice(subscriptionItem.getUnitPrice());
        item.setName(subscriptionItem.getName());
        return item;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                ", unitPrice=" + unitPrice +
                ", quantity=" + quantity +
                ", name='" + name + '\'' +
                ", productId=" + productId +
                ", order=" + order +
                '}';
    }
}
