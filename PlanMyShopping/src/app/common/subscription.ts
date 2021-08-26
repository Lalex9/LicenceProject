import { SubscriptionItem } from "./subscription-item";

export class Subscription {
    id: number;
    customerEmail: string;
    storeId: number;
    subscriptionItems: SubscriptionItem[];
}
