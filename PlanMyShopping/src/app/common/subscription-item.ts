import { Product } from "./product";

export class SubscriptionItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageURL;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
        this.productId = product.id;
    }
}
