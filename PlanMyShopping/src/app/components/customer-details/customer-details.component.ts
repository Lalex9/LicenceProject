import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDetails } from 'src/app/common/customer-details';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { PlanMyShoppingFormService } from 'src/app/services/plan-my-shopping-form.service';
import { PlanMyShoppingValidators } from 'src/app/validators/plan-my-shopping-validators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetailsFormGroup: FormGroup;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  storage: Storage = localStorage;

  constructor(private formBuilder: FormBuilder, private formService: PlanMyShoppingFormService, private router: Router, private customerDetailsService: CustomerDetailsService) { }

  ngOnInit(): void {

    this.customerDetailsFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), PlanMyShoppingValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    )

    this.formService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    )

    this.setInput();
  }

  onSubmit() {
    if (this.customerDetailsFormGroup.invalid) {
      this.customerDetailsFormGroup.markAllAsTouched();
      return;
    }

    let customerDetails = new CustomerDetails();
    customerDetails.shippingAddress = this.customerDetailsFormGroup.controls['shippingAddress'].value;
    customerDetails.billingAddress = this.customerDetailsFormGroup.controls['billingAddress'].value;
    customerDetails.customerEmail = JSON.parse(this.storage.getItem('userEmail'));
    customerDetails.cardType = this.customerDetailsFormGroup.controls['creditCard'].get('cardType').value;
    customerDetails.nameOnCard = this.customerDetailsFormGroup.controls['creditCard'].get('nameOnCard').value;
    customerDetails.cardNumber = this.customerDetailsFormGroup.controls['creditCard'].get('cardNumber').value;
    customerDetails.securityCode = this.customerDetailsFormGroup.controls['creditCard'].get('securityCode').value;
    customerDetails.expirationMonth = this.customerDetailsFormGroup.controls['creditCard'].get('expirationMonth').value;
    customerDetails.expirationYear = this.customerDetailsFormGroup.controls['creditCard'].get('expirationYear').value;

    this.customerDetailsService.saveDetails(customerDetails).subscribe({
        next: (response) => {
          alert(`Details saved successfully!`);
  
        },
        error: (err) => {
          alert(`Error: ${err.message}`);
        },
      });
  }

  setInput() {
    let customerEmail = JSON.parse(this.storage.getItem('userEmail'));
    this.customerDetailsService.getDetails(customerEmail).subscribe({
      next: response => {
        this.customerDetailsFormGroup.patchValue({
          shippingAddress: response.shippingAddress,
          billingAddress: response.billingAddress,
          creditCard: {
            cardType: response.cardType,
            nameOnCard: response.nameOnCard,
            cardNumber: response.cardNumber,
            securityCode: response.securityCode,
            expirationMonth: response.expirationMonth,
            expirationYear: response.expirationYear
          }
        });
      }
    });
  }

  get firstName() {
    return this.customerDetailsFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.customerDetailsFormGroup.get('customer.lastName');
  }

  get email() {
    return this.customerDetailsFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.customerDetailsFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.customerDetailsFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.customerDetailsFormGroup.get('shippingAddress.state');
  }

  get shippingAddressCountry() {
    return this.customerDetailsFormGroup.get('shippingAddress.country');
  }

  get shippingAddressZipCode() {
    return this.customerDetailsFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.customerDetailsFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.customerDetailsFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.customerDetailsFormGroup.get('billingAddress.state');
  }

  get billingAddressCountry() {
    return this.customerDetailsFormGroup.get('billingAddress.country');
  }
  
  get billingAddressZipCode() {
    return this.customerDetailsFormGroup.get('billingAddress.zipCode');
  }
  
  get creditCardType() {
    return this.customerDetailsFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.customerDetailsFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.customerDetailsFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.customerDetailsFormGroup.get('creditCard.securityCode');
  }

  copyShippingAddressToBillingAddress(event) {
    console.log(event);
    if (event.target.checked) {
      this.customerDetailsFormGroup.controls.billingAddress.setValue(this.customerDetailsFormGroup.controls.shippingAddress.value);
    } else {
      this.customerDetailsFormGroup.controls.billingAddress.reset();
    }

  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.customerDetailsFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
    }

}
