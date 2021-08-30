import { Address } from "./address";
import { OrderItem } from "./order-item";

export class OrderHistory {
    id: string;
    orderTrackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    dateCreated: Date;
    status: string;
    shippingAddress: Address;
    orderItems: OrderItem[];
}
