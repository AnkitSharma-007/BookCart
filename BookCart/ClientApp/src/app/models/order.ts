import { ShoppingCart } from "./shoppingcart";

export interface Order {
  orderDetails: ShoppingCart[];
  cartTotal?: number;
}

export interface CustomerOrder {
  orderId: string;
  orderDetails: ShoppingCart[];
  cartTotal: number;
  orderDate: Date;
}
