import { CartItem } from "./cart-item";
import { Image } from "./image";

export class OrderItem {
    imageUrl: Image;
    unitPrice: number;
    quantity: number;
    productId: string;
    name: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageURL;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
        this.name = cartItem.name;
    }
}
