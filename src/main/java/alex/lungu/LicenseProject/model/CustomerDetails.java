package alex.lungu.LicenseProject.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="customer_details")
@Getter
@Setter
public class CustomerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="customer_email")
    private String customerEmail;

    @OneToOne(cascade ={CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress;

    @Column(name="card_type")
    private String cardType;

    @Column(name="name_on_card")
    private String nameOnCard;

    @Column(name="card_number")
    private String cardNumber;

    @Column(name="security_code")
    private String securityCode;

    @Column(name="expiration_month")
    private String expirationMonth;

    @Column(name="expiration_year")
    private String expirationYear;
}
