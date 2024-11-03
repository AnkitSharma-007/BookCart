import { ShoppingCart } from "./shoppingcart";

export interface Order {
  orderDetails: ShoppingCart[];
  cartTotal?: number;
  orderId?: string;
  orderDate?: Date;
}
