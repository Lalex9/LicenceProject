package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.model.CustomerDetails;
import alex.lungu.LicenseProject.repository.CustomerDetailRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class CustomerDetailsService {
    private final CustomerDetailRepository customerDetailRepository;

    @PersistenceContext
    private EntityManager em;

    public CustomerDetailsService(CustomerDetailRepository customerDetailRepository) {
        this.customerDetailRepository = customerDetailRepository;
    }

    @Transactional
    public CustomerDetails getCustomerDetails(String customerEmail) {
        return customerDetailRepository.findByCustomerEmail(customerEmail);
    }

    @Transactional
    public void saveCustomerDetails(CustomerDetails details) {
        CustomerDetails previousDetails = customerDetailRepository.findByCustomerEmail(details.getCustomerEmail());
        if (previousDetails != null) {
            CustomerDetails detailsById = em.find(CustomerDetails.class, previousDetails.getId());
            em.remove(detailsById);
        }
        customerDetailRepository.save(details);
    }
}
