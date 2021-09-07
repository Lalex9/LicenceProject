import { Product } from "./product";
import { Image } from "./image";

export class CartItem {
    id: string;
    name: string;
    imageURL: Image;
    unitPrice: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageURL = product.imageURL;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
    }
}
