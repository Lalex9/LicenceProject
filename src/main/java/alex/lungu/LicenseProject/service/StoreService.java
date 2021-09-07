package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.model.Store;
import alex.lungu.LicenseProject.repository.ProductRepository;
import alex.lungu.LicenseProject.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public Store findStore(Long id) {
        Optional<Store> storeOptional = storeRepository.findById(id);
        return storeOptional.orElse(null);
    }
}
