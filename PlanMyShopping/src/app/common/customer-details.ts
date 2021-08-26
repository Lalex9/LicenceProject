import { Address } from "./address";

export class CustomerDetails {
    customerEmail: string;
    shippingAddress: Address;
    billingAddress: Address;
    cardType: string;
    nameOnCard: string;
    cardNumber: string;
    securityCode: string;
    expirationMonth: string;
    expirationYear: string;
}
