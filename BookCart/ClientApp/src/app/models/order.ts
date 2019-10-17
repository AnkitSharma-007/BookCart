import { ShoppingCart } from './shoppingcart';

export class Order {
    orderDetails: ShoppingCart[] = [];
    cartTotal: number;
    orderId: string;
    orderDate: Date;
}
