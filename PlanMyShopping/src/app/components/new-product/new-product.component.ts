import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductStore } from 'src/app/common/product-store';
import { ProductService } from 'src/app/services/product.service';
import { PlanMyShoppingValidators } from 'src/app/validators/plan-my-shopping-validators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  stores: ProductStore[] = [];
  
  newProductFormGroup: FormGroup;
  file: File = null;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.newProductFormGroup = this.formBuilder.group({
      store: [''],
      name: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), PlanMyShoppingValidators.notOnlyWhitespace]),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+\.?[0-9]*'), PlanMyShoppingValidators.notOnlyWhitespace]),
      image: new FormControl('', [Validators.required]),
    });

    this.productService.getProductStores().subscribe(
      data => {
        this.stores = data;
      }
    );
  }

  onSubmit() {
    let storeName = this.newProductFormGroup.get('store').value;
    let store = null;
    for (let tempStore of this.stores) {
      if (tempStore.storeName === storeName)
        store = tempStore;
    }
    if (store == null) {
      store = this.stores[0];
    }
    let productUpload = new ProductUpload();
    productUpload.storeId = store.id;
    productUpload.name = this.newProductFormGroup.get('name').value;
    productUpload.description = this.newProductFormGroup.get('description').value;
    productUpload.unitPrice = this.newProductFormGroup.get('unitPrice').value;

    this.productService.saveImage(this.file).subscribe (
      result => {
        productUpload.imageId = result;
        console.log(result);
        this.productService.saveProduct(productUpload);
      }
    )
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  get store() {
    return this.newProductFormGroup.get('store');
  }

  get name() {
    return this.newProductFormGroup.get('name');
  }

  get description() {
    return this.newProductFormGroup.get('description');
  }

  get unitPrice() {
    return this.newProductFormGroup.get('unitPrice');
  }

  get image() {
    return this.newProductFormGroup.get('image');
  }
}

export class ProductUpload {
  storeId: number;
  name: string;
  description: string;
  unitPrice: string;
  imageId: number;
}
