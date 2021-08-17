package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
