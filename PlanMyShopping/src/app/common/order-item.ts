import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
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
